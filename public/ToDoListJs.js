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
});
