document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.localBoard !== 'true') return;
    const config = window.taskBoardConfig, byId = id => document.getElementById(id);
    const dialog = byId('task-dialog'), form = byId('task-form'), input = byId('task-input');
    const status = byId('task-status'), priority = byId('task-priority'), submit = byId('add-btn');
    const sections = [...document.querySelectorAll('.board-column')], filters = [...document.querySelectorAll('[data-filter]')];
    let tasks = [], filter = 'all', view = 'board', sort = null, editingId = null, draggedId = null, busy = false;
    let labels = [], checklist = [], originalDraft = '', lastFocus = null, loaded = false;
    const paths = {
        edit:'<path d="m16 3 5 5-12 12H4v-5Z"/><path d="m14 5 5 5"/>',
        delete:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
        'move-back':'<path d="M20 12H4m6-6-6 6 6 6"/>',
        'move-forward':'<path d="M4 12h16m-6-6 6 6-6 6"/>',
        check:'<path d="m5 12 4 4L19 6"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
        board:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M9 8h6M9 12h6m-6 4h3"/>',
        calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h3"/>',
        list:'<path d="m3 6 1 1 2-2m3 1h12M3 12h3m3 0h12M3 18h3m3 0h12"/>'
    };
    const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.board}</svg>`;
    const escape = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const localDate = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
    const overdue = task => task.status !== 'done' && !!task.dueDate && task.dueDate < localDate();
    const dateInfo = task => {
        if (!task.dueDate) return '';
        const date = task.dueDate === localDate() ? 'Сегодня' : task.dueDate === localDate(1) ? 'Завтра' : new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('ru-RU',{day:'numeric',month:'short',...(task.dueDate.slice(0,4) !== localDate().slice(0,4) ? {year:'numeric'} : {})});
        return `<span class="due-badge ${overdue(task) ? 'is-overdue' : task.dueDate === localDate() && task.status !== 'done' ? 'is-today' : ''}" title="${escape(task.dueDate)}">${icon('calendar')}${overdue(task) ? 'Просрочено · ' : ''}${date}</span>`;
    };
    const labelsHtml = values => values.map(label => `<span class="task-label label-${escape(label.color)}">${escape(label.name)}</span>`).join('');
    const message = text => { const box = byId(dialog.open ? 'dialog-message' : 'task-message'); box.textContent = text; box.classList.toggle('is-hidden', !text); };
    const clearMessages = () => ['task-message','dialog-message'].forEach(id => { byId(id).textContent = ''; byId(id).classList.add('is-hidden'); });
    const draft = () => JSON.stringify({task:input.value,description:byId('task-description').value,status:status.value,priority:priority.value,dueDate:byId('task-due').value,labels,checklist,labelInput:byId('label-name').value,checkInput:byId('checklist-input').value});
    function closeEditor() {
        if (busy) return;
        if (draft() !== originalDraft && !window.confirm('Закрыть без сохранения изменений?')) return;
        dialog.close();
    }
    function openEditor(task, target = 'new') {
        if (!loaded || busy) return;
        clearMessages(); lastFocus = document.activeElement; editingId = task?.id ?? null; form.reset();
        input.value = task?.task ?? ''; status.value = task?.status ?? target; priority.value = task?.priority ?? 'medium';
        byId('task-description').value = task?.description ?? ''; byId('task-due').value = task?.dueDate ?? '';
        labels = (task?.labels ?? []).map(x => ({...x})); checklist = (task?.checklist ?? []).map(x => ({...x}));
        byId('drawer-task-id').textContent = task ? `TASK-${String(task.id).padStart(3,'0')}` : 'МОИ ЗАДАЧИ';
        byId('dialog-title').textContent = task ? 'Детали задачи' : 'Новая задача';
        submit.textContent = task ? 'Сохранить изменения' : 'Создать задачу';
        renderEditorLabels(); renderChecklist(); originalDraft = draft(); dialog.showModal(); input.focus();
    }
    document.querySelectorAll('[data-create]').forEach(button => button.addEventListener('click', () => openEditor(null, button.dataset.create)));
    byId('close-dialog').addEventListener('click', closeEditor); byId('cancel-edit-btn').addEventListener('click', closeEditor);
    dialog.addEventListener('cancel', e => { e.preventDefault(); closeEditor(); });
    dialog.addEventListener('close', () => { if (lastFocus?.isConnected) lastFocus.focus(); });
    function renderEditorLabels() {
        byId('editor-labels').innerHTML = labels.map((label,i) => `<span class="task-label label-${escape(label.color)}">${escape(label.name)}<button type="button" data-remove-label="${i}" aria-label="Убрать метку ${escape(label.name)}">×</button></span>`).join('');
        byId('label-limit').textContent = `${labels.length} / 5`;
    }
    function addLabel(name = byId('label-name').value, color = byId('label-color').value) {
        name = name.trim(); if (!name) return true;
        if ([...name].length > 30) {message('Название метки: не более 30 символов.');return false;}
        if (labels.some(x => x.name.toLocaleLowerCase('ru') === name.toLocaleLowerCase('ru'))) {byId('label-name').value='';return true;}
        if (labels.length >= 5) {message('На задаче может быть до 5 меток.');return false;}
        labels.push({name,color}); byId('label-name').value = ''; renderEditorLabels(); return true;
    }
    byId('add-label').addEventListener('click', () => addLabel());
    byId('label-name').addEventListener('keydown', e => {if(e.key==='Enter'){e.preventDefault();addLabel();}});
    byId('editor-labels').addEventListener('click', e => {const b=e.target.closest('[data-remove-label]');if(b){labels.splice(Number(b.dataset.removeLabel),1);renderEditorLabels();}});
    document.querySelectorAll('[data-label-name]').forEach(b => b.addEventListener('click',()=>addLabel(b.dataset.labelName,b.dataset.labelColor)));
    function renderChecklist() {
        const done=checklist.filter(x=>x.done).length; byId('checklist-count').textContent=`${done} из ${checklist.length}`;
        byId('checklist-progress').style.width=`${checklist.length ? done/checklist.length*100 : 0}%`;
        byId('editor-checklist').innerHTML=checklist.map((item,i)=>`<div class="checklist-row ${item.done?'checked':''}"><input type="checkbox" data-check="${i}" ${item.done?'checked':''} aria-label="Выполнено: ${escape(item.text)}"><input type="text" data-check-text="${i}" value="${escape(item.text)}" maxlength="200" aria-label="Текст пункта ${i+1}" required><button type="button" class="icon-btn" data-remove-check="${i}" aria-label="Удалить пункт ${i+1}">${icon('close')}</button></div>`).join('');
    }
    function addChecklist() {
        const text=byId('checklist-input').value.trim();if(!text)return true;
        if(checklist.length>=30){message('В чек-листе может быть до 30 пунктов.');return false;}
        checklist.push({text,done:false});byId('checklist-input').value='';renderChecklist();return true;
    }
    byId('add-checklist').addEventListener('click',addChecklist);
    byId('checklist-input').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addChecklist();}});
    byId('editor-checklist').addEventListener('input',e=>{if(e.target.dataset.checkText!==undefined)checklist[Number(e.target.dataset.checkText)].text=e.target.value;});
    byId('editor-checklist').addEventListener('change',e=>{if(e.target.dataset.check!==undefined){checklist[Number(e.target.dataset.check)].done=e.target.checked;renderChecklist();}});
    byId('editor-checklist').addEventListener('click',e=>{const b=e.target.closest('[data-remove-check]');if(b){checklist.splice(Number(b.dataset.removeCheck),1);renderChecklist();}});
    byId('editor-checklist').addEventListener('keydown',e=>{if(e.key==='Enter')e.preventDefault();});
    byId('clear-due').addEventListener('click',()=>{byId('task-due').value='';});
    document.querySelectorAll('[data-due-offset]').forEach(b=>b.addEventListener('click',()=>{byId('task-due').value=localDate(Number(b.dataset.dueOffset));}));
    async function request(action,payload) {
        const read=action==='list';let response;
        try {response=await fetch(`${config.apiUrl}?action=${encodeURIComponent(action)}`,{method:read?'GET':'POST',credentials:'same-origin',cache:'no-store',headers:read?{'Accept':'application/json'}:{'Accept':'application/json','Content-Type':'application/json','X-CSRF-Token':config.csrfToken},...(read?{}:{body:JSON.stringify(payload)})});}
        catch {throw new Error('Нет связи с сервером. Проверьте подключение и попробуйте ещё раз.');}
        if(response.status===401 || response.status===403)throw new Error('Сессия истекла. Обновите страницу и войдите снова.');
        let data;try{data=await response.json();}catch{throw new Error('Не удалось прочитать ответ сервера. Попробуйте ещё раз.');}
        if(!response.ok || data.success!==true)throw new Error(response.status===404?'Задача уже удалена. Обновите страницу.':response.status===422?'Проверьте поля задачи: дату, длину текста и пункты чек-листа.':'Не удалось сохранить изменения. Попробуйте ещё раз.');
        return data;
    }
    async function sync(action,payload) {
        if(busy)return false;busy=true;submit.disabled=true;byId('task-list').setAttribute('aria-busy','true');
        try {const data=await request(action,payload);tasks=Array.isArray(data.tasks)?data.tasks:[];loaded=true;render();clearMessages();return true;}
        finally{busy=false;submit.disabled=false;byId('task-list').setAttribute('aria-busy','false');}
    }
    function makeCard(task,compact=false) {
        const card=document.createElement('article');card.className=`task priority-${task.priority}${task.status==='done'?' done':''}${overdue(task)?' overdue-card':''}${compact?' compact-task':''}`;
        card.dataset.id=task.id;card.draggable=!compact;
        const action=(name,label)=>`<button type="button" class="task-btn" data-action="${name}" title="${label}" aria-label="${label}">${icon(name==='complete'?'check':name)}</button>`;
        const checks=task.checklist||[], done=checks.filter(x=>x.done).length;
        card.innerHTML=`<div class="task-top"><span class="task-id">TASK-${String(task.id).padStart(3,'0')}</span><span class="badge priority-${escape(task.priority)}">${escape(config.priorityLabels[task.priority]||'Средний')}</span></div><button type="button" class="task-open" data-action="edit" aria-label="Открыть задачу: ${escape(task.task)}"><span class="task-text">${escape(task.task)}</span></button>${task.description?`<p class="task-description">${escape(task.description)}</p>`:''}<div class="card-labels">${labelsHtml(task.labels||[])}</div><div class="card-details">${dateInfo(task)}${checks.length?`<span class="checklist-summary" title="Выполнено пунктов">${icon('list')}${done} из ${checks.length}</span>`:''}</div>${checks.length?`<div class="card-check-track"><span style="width:${done/checks.length*100}%"></span></div>`:''}<div class="task-bottom"><span class="task-state">${icon(task.status==='done'?'check':'board')}${escape(config.statusLabels[task.status])}</span><div class="task-buttons">${task.status!=='done'?action('complete','Выполнить задачу'):''}${task.status!=='new'?action('move-back','На предыдущий этап'):''}${task.status!=='done'?action('move-forward','На следующий этап'):''}${action('edit','Редактировать задачу')}${action('delete','Удалить задачу')}</div></div>`;
        card.addEventListener('dragstart',e=>{if(busy || e.target.closest('button')){e.preventDefault();return;}draggedId=task.id;card.classList.add('dragging');e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(task.id));});
        card.addEventListener('dragend',()=>{draggedId=null;card.classList.remove('dragging');sections.forEach(s=>s.classList.remove('drop-hover'));});
        return card;
    }
    function renderUpcoming() {
        const upcoming=tasks.filter(t=>t.status!=='done' && t.dueDate).sort((a,b)=>a.dueDate.localeCompare(b.dueDate)||b.id-a.id);
        byId('upcoming-count').textContent=upcoming.length;
        byId('upcoming-tasks').innerHTML=upcoming.length?upcoming.slice(0,3).map(t=>`<button type="button" class="upcoming-item" data-open-task="${t.id}"><span>${escape(t.task)}</span>${dateInfo(t)}</button>`).join(''):`<div class="upcoming-empty">${icon('calendar')}<p>Всё под контролем</p><span>Задайте срок — ближайшие дела появятся здесь.</span></div>`;
    }
    function render() {
        const done=tasks.filter(t=>t.status==='done').length,percent=tasks.length?Math.round(done/tasks.length*100):0;
        byId('completed-count').textContent=`${done} из ${tasks.length}`;byId('sidebar-count').textContent=tasks.length;
        byId('progress-percent').textContent=`${percent}%`;byId('board-progress').style.width=`${percent}%`;document.querySelector('.progress-track').setAttribute('aria-valuenow',percent);
        byId('today-count').textContent=tasks.filter(t=>t.status!=='done'&&t.dueDate===localDate()).length;
        byId('overdue-count').textContent=tasks.filter(overdue).length;
        byId('view-date').textContent=new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
        const names=[...new Set(tasks.flatMap(t=>(t.labels||[]).map(l=>l.name)))].sort((a,b)=>a.localeCompare(b,'ru'));
        const selected=byId('label-filter').value;byId('label-filter').innerHTML='<option value="">Все метки</option>'+names.map(n=>`<option value="${escape(n)}">${escape(n)}</option>`).join('');byId('label-filter').value=names.includes(selected)?selected:'';
        byId('label-suggestions').innerHTML=names.map(n=>`<option value="${escape(n)}"></option>`).join('');
        const query=byId('task-search').value.trim().toLocaleLowerCase('ru'),label=byId('label-filter').value;
        let visible=tasks.filter(t=>(filter==='all'||(filter==='done'?t.status==='done':filter==='overdue'?overdue(t):t.status!=='done'))&&(!label||(t.labels||[]).some(l=>l.name===label))&&[t.task,t.description,...(t.labels||[]).map(l=>l.name)].join(' ').toLocaleLowerCase('ru').includes(query));
        if(sort)visible.sort((a,b)=>{const ranks={low:1,medium:2,high:3};return(sort==='desc'?-1:1)*(ranks[a.priority]-ranks[b.priority])||b.id-a.id;});
        sections.forEach(section=>{
            const items=visible.filter(t=>t.status===section.dataset.status),container=section.querySelector('.tasks-container');section.querySelector('.column-count').textContent=items.length;container.replaceChildren();
            if(!items.length){const empty=document.createElement('div');empty.className='empty-column';empty.innerHTML=`<div class="empty-illustration">${icon(section.dataset.status==='done'?'check':'board')}<span></span></div><p>${query||label||filter!=='all'?'Задач не найдено':section.dataset.status==='done'?'Место для ваших побед':'Пока чистый лист'}</p><span>${query||label||filter!=='all'?'Измените поиск или фильтры':'Начните с одной небольшой задачи'}</span>`;container.append(empty);}
            items.forEach(t=>container.append(makeCard(t)));
        });
        const today=byId('today-list');today.replaceChildren();
        const due=visible.filter(t=>t.status!=='done'&&t.dueDate&&t.dueDate<=localDate());
        for(const [heading,items] of [['Просроченные',due.filter(overdue)],['Сегодня',due.filter(t=>!overdue(t))]]){
            if(!items.length)continue;const group=document.createElement('section');group.className='today-group';group.innerHTML=`<h2>${heading}<span>${items.length}</span></h2>`;items.sort((a,b)=>a.dueDate.localeCompare(b.dueDate)).forEach(t=>group.append(makeCard(t,true)));today.append(group);
        }
        if(!due.length)today.innerHTML=`<div class="today-empty">${icon('check')}<h2>${query||label||filter!=='all'?'Задач не найдено':'На сегодня всё спокойно'}</h2><p>${query||label||filter!=='all'?'Измените поиск или фильтры.':'Здесь появятся активные задачи на сегодня и просроченные дела.'}</p><button type="button" class="auth-btn primary" id="today-create">Добавить задачу на сегодня</button></div>`;
        byId('today-create')?.addEventListener('click',()=>{openEditor(null);byId('task-due').value=localDate();originalDraft=draft();});
        byId('task-list').classList.toggle('is-hidden',view!=='board');today.classList.toggle('is-hidden',view!=='today');
        const sortButton=byId('priority-sort-btn');sortButton.textContent=sort==='desc'?'Сначала важные ↓':sort==='asc'?'Сначала низкие ↑':'Приоритет ↕';sortButton.classList.toggle('active',!!sort);
        filters.forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.filter===filter));b.classList.toggle('active',b.dataset.filter===filter);});
        document.querySelectorAll('[data-view]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.view===view));b.classList.toggle('active',b.dataset.view===view);});renderUpcoming();
    }
    form.addEventListener('submit',async e=>{
        e.preventDefault();if(busy)return;const text=input.value.trim();if(!text||[...text].length>255){message('Введите название от 1 до 255 символов.');return;}
        if(!addLabel()||!addChecklist())return;
        if(checklist.some(x=>!x.text.trim())){message('Заполните или удалите пустые пункты чек-листа.');return;}
        const payload={task:text,status:status.value,priority:priority.value,description:byId('task-description').value.trim(),dueDate:byId('task-due').value||null,labels,checklist:checklist.map(x=>({...x,text:x.text.trim()}))};
        try{if(await sync(editingId===null?'add':'update',editingId===null?payload:{id:editingId,...payload}))dialog.close();}catch(error){message(error.message);}
    });
    async function cardAction(e){
        const button=e.target.closest('[data-action]');if(!button||busy)return;
        const task=tasks.find(t=>String(t.id)===button.closest('.task')?.dataset.id);if(!task)return;const action=button.dataset.action;
        if(action==='edit'){openEditor(task);return;}
        if(action==='delete'&&!window.confirm('Удалить эту задачу?'))return;
        try{if(action==='complete')await sync('update',{id:task.id,task:task.task,status:'done',priority:task.priority});else await sync(action==='delete'?'delete':'move',action==='delete'?{id:task.id}:{id:task.id,direction:action==='move-back'?'back':'forward'});}catch(error){message(error.message);}
    }
    byId('task-list').addEventListener('click',cardAction);byId('today-list').addEventListener('click',cardAction);
    byId('upcoming-tasks').addEventListener('click',e=>{const b=e.target.closest('[data-open-task]');if(b)openEditor(tasks.find(t=>String(t.id)===b.dataset.openTask));});
    sections.forEach(section=>{
        section.addEventListener('dragover',e=>{if(draggedId===null||busy)return;e.preventDefault();section.classList.add('drop-hover');});
        section.addEventListener('dragleave',e=>{if(!section.contains(e.relatedTarget))section.classList.remove('drop-hover');});
        section.addEventListener('drop',async e=>{e.preventDefault();sections.forEach(s=>s.classList.remove('drop-hover'));const task=tasks.find(t=>t.id===draggedId);draggedId=null;if(!task||task.status===section.dataset.status)return;try{await sync('update',{id:task.id,task:task.task,priority:task.priority,status:section.dataset.status});}catch(error){message(error.message);}});
    });
    filters.forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render();}));
    document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;filter='all';render();}));
    byId('task-search').addEventListener('input',render);byId('label-filter').addEventListener('change',render);
    byId('priority-sort-btn').addEventListener('click',()=>{sort=sort===null?'desc':sort==='desc'?'asc':null;render();});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
    setInterval(()=>{if(loaded&&!dialog.open)render();},60000);
    sync('list').catch(error=>{render();message(error.message);});
});
