ALTER TABLE tasks
    ADD COLUMN description TEXT NULL,
    ADD COLUMN due_date DATE NULL,
    ADD COLUMN labels JSON NULL,
    ADD COLUMN checklist JSON NULL,
    ADD KEY idx_tasks_owner_due (todo_id, due_date);
