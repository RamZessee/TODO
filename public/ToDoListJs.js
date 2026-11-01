document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.localBoard !== 'true') return;
    const config = window.taskBoardConfig, byId = id => document.getElementById(id);
    const dialog = byId('task-dialog'), form = byId('task-form'), input = byId('task-input');
});
