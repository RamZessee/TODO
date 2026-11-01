document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.localBoard !== 'true') return;
    const config = window.taskBoardConfig, byId = id => document.getElementById(id);
    const dialog = byId('task-dialog'), form = byId('task-form'), input = byId('task-input');
    const status = byId('task-status'), priority = byId('task-priority'), submit = byId('add-btn');
    const sections = [...document.querySelectorAll('.board-column')], filters = [...document.querySelectorAll('[data-filter]')];
    let tasks = [], filter = 'all', view = 'board', sort = null, editingId = null, draggedId = null, busy = false;
    let labels = [], checklist = [], originalDraft = '', lastFocus = null, loaded = false;
});
