(() => {
    const root = document.documentElement;
    let saved = null;
    try { saved = localStorage.getItem('todo-theme'); } catch { /* Theme works without storage. */ }
    if (!['light', 'dark'].includes(saved)) saved = null;
    const apply = theme => {
        root.dataset.theme = theme;
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            const dark = theme === 'dark';
            button.setAttribute('aria-pressed', String(dark));
            button.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
            button.title = dark ? 'Светлая тема' : 'Тёмная тема';
        });
    };
    apply(saved || 'dark');
    document.addEventListener('DOMContentLoaded', () => {
        apply(root.dataset.theme);
        document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
            saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('todo-theme', saved); } catch { /* Keep the choice for this page. */ }
            apply(saved);
        }));
    });
    window.addEventListener('storage', event => {
        if (event.key !== 'todo-theme') return;
        saved = ['light', 'dark'].includes(event.newValue) ? event.newValue : null;
        apply(saved || 'dark');
    });
})();
