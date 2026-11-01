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
});
