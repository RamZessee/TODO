// Node.js 22+. Run only against an isolated test database: this creates two test users.
// Their tasks are deleted by the test; the accounts remain for inspection.
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';

if (!process.argv.includes('--allow-test-writes')) {
    console.error('This test creates two accounts. Use a disposable database, then run:');
    console.error('node scripts/smoke.mjs http://127.0.0.1:8080 --allow-test-writes');
    process.exit(2);
}

const baseUrl = new URL(process.argv[2] || 'http://127.0.0.1:8080');
assert.ok(['http:', 'https:'].includes(baseUrl.protocol), 'Use an HTTP(S) application URL.');
const suffix = `${Date.now()}-${randomBytes(4).toString('hex')}`;
const password = `Smoke-${randomBytes(16).toString('hex')}`;
let checks = 0;

class Client {
    cookie = '';
    csrf = '';

    async request(path, options = {}) {
        const response = await fetch(new URL(path, baseUrl), {
            ...options,
            redirect: 'manual',
            headers: { ...(this.cookie ? { Cookie: this.cookie } : {}), ...options.headers },
            signal: AbortSignal.timeout(10000),
        });
        for (const cookie of response.headers.getSetCookie()) {
            const pair = cookie.split(';', 1)[0];
            if (pair.startsWith('todo_session=')) this.cookie = pair;
        }
        const body = await response.text();
        ++checks;
        return { response, body };
    }

    async page(path) {
        const result = await this.request(path);
        assert.equal(result.response.status, 200, `${path} should render.`);
        const token = result.body.match(/name="csrf_token"\s+value="([a-f0-9]+)"/i);
        assert.ok(token, `${path} should contain a CSRF token.`);
        this.csrf = token[1];
        return result;
    }

    async form(path, data) {
        return this.request(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data),
        });
    }

    async api(action, data, expectedStatus = 200, token = this.csrf, method = 'POST') {
        const { response, body } = await this.request(`tasks_api.php?action=${action}`, {
            method,
            headers: { 'Content-Type': 'application/json', ...(token ? { 'X-CSRF-Token': token } : {}) },
            ...(method === 'GET' ? {} : { body: JSON.stringify(data ?? {}) }),
        });
        assert.equal(response.status, expectedStatus, `${method} ${action}: ${body}`);
        assert.match(response.headers.get('content-type') ?? '', /application\/json/);
        const result = JSON.parse(body);
        assert.equal(result.success, expectedStatus < 400, `${action} success flag`);
        return result;
    }
}

async function registerAndLogin(client, label) {
    const email = `smoke-${suffix}-${label}@example.test`;
    const registration = await client.page('index.php?page=registration');
    assert.ok(registration.body.includes('Создать аккаунт'));
    const sessionCookie = registration.response.headers.getSetCookie().join(';');
    assert.match(sessionCookie, /HttpOnly/i, 'Session cookie must be inaccessible to JavaScript.');
    assert.match(sessionCookie, /SameSite=Lax/i, 'Session cookie should use SameSite.');
    const registrationResult = await client.form('index.php?page=registration', {
        login: `Smoke ${label}`,
        email,
        password,
        send: '1',
        csrf_token: client.csrf,
    });
    assert.equal(registrationResult.response.status, 200, 'Registration should render confirmation.');
    assert.match(registrationResult.body, /Аккаунт создан/i);

    await client.page('index.php?page=home');
    const cookieBeforeLogin = client.cookie;
    const csrfBeforeLogin = client.csrf;
    const login = await client.form('index.php?page=home', {
        email, password, send: '1', csrf_token: client.csrf,
    });
    assert.ok([302, 303].includes(login.response.status), 'Successful login must redirect before output.');
    assert.match(login.response.headers.get('location') ?? '', /page=tasks/);
    assert.notEqual(client.cookie, cookieBeforeLogin, 'Login must regenerate the session id.');
    const board = await client.page('index.php?page=tasks');
    assert.match(board.body, /csrfToken/);
    assert.notEqual(client.csrf, csrfBeforeLogin, 'Login must rotate the CSRF token.');
    const account = await client.page('index.php?page=account');
    assert.ok(account.body.includes(email), 'Account page should show the current user.');
    assert.doesNotMatch(account.body, /account-field[^>]*>password|\$2[aby]\$|\$argon2/i, 'Account must not expose password hashes.');
    console.log(`Created test account: ${email}`);
    return email;
}

const anonymous = new Client();
await anonymous.api('list', undefined, 401, '', 'GET');
const unknown = await anonymous.request('index.php?page=form');
assert.equal(unknown.response.status, 404, 'Unknown page should return 404.');
for (const page of ['tasks', 'account']) {
    const denied = await anonymous.request(`index.php?page=${page}`);
    assert.ok([302, 303].includes(denied.response.status), 'Private pages must redirect anonymous visitors.');
}
for (const path of ['.env', 'app/config.php', 'database/migrations/001_initial.sql', 'scripts/migrate.php']) {
    const result = await anonymous.request(path);
    assert.equal(result.response.status, 404, `Private file must not be served: ${path}`);
}

const alice = new Client();
const bob = new Client();
const aliceEmail = await registerAndLogin(alice, 'alice');
await registerAndLogin(bob, 'bob');
const loginCheck = new Client();
await loginCheck.page('index.php?page=home');
const missingLoginToken = await loginCheck.form('index.php?page=home', { email: aliceEmail, password, send: '1' });
assert.equal(missingLoginToken.response.status, 403, 'Login requires CSRF.');
const wrongPassword = await loginCheck.form('index.php?page=home', {
    email: aliceEmail, password: 'incorrect-password', send: '1', csrf_token: loginCheck.csrf,
});
assert.equal(wrongPassword.response.status, 200);
assert.match(wrongPassword.body, /Неверная почта или пароль/i);
await loginCheck.api('list', undefined, 401, '', 'GET');
await loginCheck.page('index.php?page=registration');
const duplicate = await loginCheck.form('index.php?page=registration', {
    login: 'Duplicate', email: aliceEmail, password, send: '1', csrf_token: loginCheck.csrf,
});
assert.equal(duplicate.response.status, 200);
assert.match(duplicate.body, /почтой уже существует/i);
const initial = await alice.api('list', undefined, 200, '', 'GET');
assert.deepEqual(initial.tasks, []);
await alice.api('add', { task: 'missing csrf' }, 403, '');
await alice.api('add', undefined, 405, alice.csrf, 'GET');
await alice.api('add', { task: '' }, 422);
await alice.api('add', { task: 'я'.repeat(256) }, 422);
await alice.api('add', { task: ['array'] }, 422);
await alice.api('add', { task: 'invalid status', status: 'unexpected' }, 422);
await alice.api('add', { task: 'invalid priority', priority: 'urgent' }, 422);
await alice.api('delete', { id: 0 }, 422);
await alice.api('delete', { id: [1] }, 422);

for (const body of ['{invalid', '[]']) {
    const result = await alice.request('tasks_api.php?action=add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': alice.csrf },
        body,
    });
    assert.equal(result.response.status, 400, 'Malformed/non-object JSON should return 400.');
    assert.equal(JSON.parse(result.body).success, false);
}

const text = 'Задача 😀 <script>alert("x")</script>';
const details = {
    description: 'Описание 😀 <img src=x onerror=alert(1)>',
    dueDate: '2028-02-29',
    labels: [{ name: 'Учёба', color: 'purple' }, { name: '<b>Своя</b>', color: 'green' }],
    checklist: [{ text: 'Первый шаг', done: true }, { text: 'Второй шаг 😀', done: false }],
};
for (const invalid of [
    { dueDate: '2027-02-29' }, { dueDate: '2026-11-01T12:00' }, { dueDate: ['2026-11-01'] },
    { description: 'я'.repeat(5001) }, { description: [] },
    { labels: [{ name: 'bad', color: 'red;display:none' }] },
    { labels: [{ name: '', color: 'blue' }] }, { labels: Array(6).fill({ name: 'Метка', color: 'blue' }) },
    { checklist: [{ text: 'Пункт', done: 'false' }] }, { checklist: [{ text: '', done: false }] },
    { checklist: Array(31).fill({ text: 'Пункт', done: false }) },
]) await alice.api('add', { task: text, ...invalid }, 422);
const added = await alice.api('add', { task: text, status: 'new', priority: 'high', ...details });
assert.equal(added.tasks.length, 1);
assert.equal(added.tasks[0].task, text, 'Unicode and literal text should round-trip.');
for (const [key, value] of Object.entries(details)) assert.deepEqual(added.tasks[0][key], value, `${key} should round-trip.`);
const id = added.tasks[0].id;
assert.ok(Number.isInteger(id) && id > 0);
assert.deepEqual((await bob.api('list', undefined, 200, '', 'GET')).tasks, [], 'Other users must not see the task.');
await bob.api('update', { id, task: 'stolen', status: 'done', priority: 'low' }, 404);
await bob.api('update', { id, task: 'stolen', ...details }, 404);
await bob.api('delete', { id }, 404);
await bob.api('move', { id, direction: 'forward' }, 404);

const moved = await alice.api('move', { id, direction: 'forward' });
assert.equal(moved.tasks[0].status, 'inProgress');
const editedText = 'я'.repeat(255);
const updated = await alice.api('update', { id, task: editedText, status: 'done', priority: 'low' });
assert.equal(updated.tasks[0].task, editedText);
assert.equal(updated.tasks[0].status, 'done');
assert.equal(updated.tasks[0].priority, 'low');
for (const [key, value] of Object.entries(details)) assert.deepEqual(updated.tasks[0][key], value, 'Legacy updates must preserve details.');
const cleared = await alice.api('update', { id, task: editedText, status: 'done', priority: 'low', description: '', dueDate: null, labels: [], checklist: [] });
for (const [key, value] of Object.entries({ description: '', dueDate: null, labels: [], checklist: [] })) assert.deepEqual(cleared.tasks[0][key], value, `${key} should clear explicitly.`);
await alice.api('update', { id, task: editedText, status: 'done', priority: 'low' });
assert.equal((await alice.api('move', { id, direction: 'back' })).tasks[0].status, 'inProgress');
assert.deepEqual((await alice.api('delete', { id })).tasks, []);
await alice.api('delete', { id }, 404);

const deniedLogout = await alice.form('index.php?page=tasks', { action: 'logout' });
assert.equal(deniedLogout.response.status, 403, 'Logout requires CSRF.');
const logout = await alice.form('index.php?page=tasks', { action: 'logout', csrf_token: alice.csrf });
assert.ok([302, 303].includes(logout.response.status));
await alice.api('list', undefined, 401, '', 'GET');

console.log(`PASS: ${checks} HTTP checks; registration/login, session renewal, CSRF, task CRUD, Unicode, isolation and private-file access.`);
console.log('Two smoke accounts remain in the disposable test database; all test tasks were deleted.');
