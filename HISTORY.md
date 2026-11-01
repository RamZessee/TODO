# Этапы восстановления проекта

История создана из готовой версии с настоящими текущими датами. Это реконструкция этапов, а не исходная история разработки. CSS добавлялся по отдельным правилам, JavaScript — по синтаксически завершённым блокам. Серверные обработчики и разметка страниц добавлены отдельными этапами.

| Коммит | Изменение |
| --- | --- |
| 19e1bd9 | docs: описать проект и восстановление истории разработки |
| a731e6f | chore: исключить пароли, локальную базу, архивы и временные файлы |
| c6b7a23 | chore: настроить окончания строк и бинарные изображения |
| 95f8999 | config: добавить образец настроек без личных секретов |
| fe4f195 | config: загрузить настройки окружения и подключение PDO |
| 2db4f47 | security: добавить сессии, CSRF и общие функции авторизации |
| 2b6e2fe | db: создать таблицы пользователей и задач |
| 875d47a | db: добавить запуск и журнал миграций |
| c3e4754 | setup: генерировать локальные настройки со случайными паролями |
| a0c6f7f | ui: добавить набор SVG-иконок |
| 2f5977b | ui: добавить кнопку переключения темы |
| a8dc524 | ui: добавить шапку с логотипом |
| 5a91b7f | ui: добавить подвал страницы |
| 8f77fe6 | ui: добавить иллюстрацию страниц авторизации |
| e073784 | routing: добавить страницу неизвестного адреса |
| b00002a | feat: добавить серверную обработку регистрации |
| 2b05a2b | ui: добавить разметку регистрации |
| f1b975f | feat: добавить серверную обработку входа |
| 766577c | ui: добавить разметку входа |
| 4787a00 | feat: добавить серверную обработку личного кабинета |
| ae79562 | ui: добавить разметку личного кабинета |
| b89b922 | feat: добавить серверную обработку доски задач |
| 9e1ae7b | ui: добавить разметку доски задач |
| 8c7b5d4 | routing: собрать страницы через общий вход и шаблон |
| a23737e | db: добавить описание, сроки, метки и чек-листы |
| 6c521b0 | api: добавить операции с задачами и проверку владельца |
| 0b2bdd4 | board: добавить блок поведения 1 |
| 1c4a3c2 | board: добавить config |
| e00ebfa | board: добавить dialog |
| af5e855 | board: добавить status |
| 643df4e | board: добавить sections |
| a9b4fe5 | board: добавить tasks |
| 37fb75e | board: добавить labels |
| e2c8d38 | board: добавить paths |
| 35bf83f | board: добавить icon |
| c41da48 | board: добавить escape |
| ee026c5 | board: добавить localDate |
| 1db6a95 | board: добавить overdue |
| 5f29c8e | board: добавить dateInfo |
| 66be469 | board: добавить labelsHtml |
| 9a9b3ce | board: добавить message |
| ffe90eb | board: добавить clearMessages |
| 000d548 | board: добавить draft |
| c96ffb7 | board: добавить closeEditor |
| c67a72a | board: добавить openEditor |
| 2666a27 | board: обработать click для button |
| 38fa4ea | board: обработать click для close-dialog |
| beda2a7 | board: обработать cancel для dialog |
| ee13a71 | board: обработать close для dialog |
| 88eef77 | board: добавить renderEditorLabels |
| bb25042 | board: добавить addLabel |
| 0652623 | board: обработать click для add-label |
| 8303105 | board: обработать keydown для label-name |
| d4592dd | board: добавить b |
| 70f99aa | board: обработать click для b |
| 44db205 | board: добавить renderChecklist |
| 78320cc | board: добавить addChecklist |
| 14219a8 | board: обработать click для add-checklist |
| 5c59b09 | board: обработать keydown для checklist-input |
| d7612f8 | board: обработать input для editor-checklist |
| 946dc87 | board: обработать change для editor-checklist |
| 16053e3 | board: добавить b |
| 1ad7a6f | board: обработать keydown для editor-checklist |
| d8b1593 | board: обработать click для clear-due |
| d621e72 | board: обработать click для b |
| 7b6db85 | board: добавить request |
| 6b8da17 | board: добавить sync |
| 93eefb8 | board: добавить makeCard |
| 5049ced | board: добавить renderUpcoming |
| 8753c18 | board: добавить render |
| 22a64fd | board: обработать submit для form |
| 41ee6d9 | board: добавить cardAction |
| e3aada3 | board: обработать click для task-list |
| 960eee7 | board: добавить b |
| b356bea | board: добавить блок поведения 2 |
| e4b5780 | board: обработать click для b |
| afe3e55 | board: обработать click для b |
| ceca327 | board: обработать input для task-search |
| 73e62f1 | board: обработать click для priority-sort-btn |
| 0fa8a1d | board: обработать visibilitychange для document |
| 6936a4e | board: добавить блок поведения 3 |
| 66d0225 | board: добавить блок поведения 4 |
| dabdd46 | theme: сохранять выбор светлой и тёмной темы в браузере |
| 0e4214e | style: подключить шрифт Manrope с нужными начертаниями |
| 7b9ea0f | style: оформить :root |
| aaf4c58 | style: оформить * |
| 176116c | style: задать фон, цвет и базовые размеры текста страницы |
| 9484ac7 | style: применить Manrope и резервные системные шрифты |
| 26e865c | style: оформить button,input,select,textarea |
| 78ef289 | style: оформить button,a,input,textarea,select |
| 5aa1d0a | style: оформить button,a |
| aa3715a | style: оформить button |
| 2b68d86 | style: оформить a |
| e70de04 | style: оформить button |
| d31926b | style: оформить svg |
| a0a1fce | style: оформить button,a,input,textarea,select |
| 58e6541 | style: оформить button:focus-visible,a:focus-visible |
| dd99485 | style: оформить input:focus,textarea:focus,select:focus |
| 0b5842a | style: оформить .brand |
| b8ff510 | style: оформить .brand-mark |
| 8991a3d | style: оформить .brand-mark svg |
| ad22e54 | style: оформить .brand-light |
| 8706187 | style: оформить .brand-period |
| 86cf992 | style: оформить .sidebar |
| 3e03689 | style: оформить .sidebar .brand |
| 8cf0ab7 | style: оформить .workspace |
| 83897ef | style: оформить .workspace small,.user-profile small |
| f92ecb8 | style: оформить .workspace-icon |
| 32eeeb6 | style: оформить .nav-caption |
| bab8541 | style: оформить .nav-link |
| f9f5860 | style: оформить .nav-link.selected |
| 9f7d818 | style: оформить .nav-link:hover |
| 469d364 | style: оформить .nav-link.selected:hover |
| 439bbb7 | style: оформить .nav-link span |
| a91f450 | style: оформить .nav-link svg |
| b7c308a | style: оформить .sidebar-note |
| f28e815 | style: оформить .note-orbit |
| 3bdc8b1 | style: оформить .sidebar-note h3 |
| 2ed8de6 | style: оформить .sidebar-note p |
| 78cbb23 | style: оформить .note-line |
| 8d457cb | style: оформить .sidebar-bottom |
| 7551af6 | style: оформить .user-profile |
| 74c23f1 | style: оформить .user-profile>div |
| 177091b | style: оформить .avatar |
| eccea90 | style: оформить .icon-btn |
| a452a59 | style: оформить .icon-btn:hover |
| 165af8b | style: оформить .icon-btn svg |
| e5dfa70 | style: оформить .logout:hover |
| cf4bd2f | style: оформить .board-main |
| 0a2c7a8 | style: оформить .workspace-bar |
| 61dad45 | style: оформить .workspace-bar strong |
| 9d8e692 | style: оформить .breadcrumb-slash |
| ea4e874 | style: оформить .private-label |
| fad510f | style: оформить .private-label svg |
| 102e94d | style: оформить .board-heading |
| 8b46b46 | style: оформить .eyebrow |
| 148a553 | style: оформить h1 |
| 7002833 | style: оформить .heading-dot |
| e27e4d8 | style: оформить .board-heading p |
| 7c95e67 | style: оформить .auth-btn |
| 64542ce | style: оформить .auth-btn:active |
| 58d94d2 | style: оформить .primary |
| f56a73d | style: оформить .primary:hover |
| b6edb9b | style: оформить .secondary |
| ca5c868 | style: оформить .secondary:hover |
| fe4a1d3 | style: оформить .board-overview |
| ebe79a6 | style: оформить .board-overview>div:first-child |
| 7a3d2e4 | style: оформить .overview-symbol |
| 92d36ea | style: оформить .board-overview strong |
| 3d354ac | style: оформить .board-overview>div>div>span |
| 15cd8c7 | style: оформить .progress-track |
| b56bb28 | style: оформить .progress-track span |
| 8ce9de7 | style: оформить .board-overview>strong |
| a436aa4 | style: оформить .overview-hint |
| e53915d | style: оформить .board-toolbar |
| ffa0c50 | style: оформить .filters |
| 1003341 | style: оформить .filter |
| e575602 | style: оформить .filter:hover |
| b575ae8 | style: оформить .filter.active |
| 896cae0 | style: оформить .toolbar-right |
| d7b514c | style: оформить .search-field |
| 3bfc1d1 | style: оформить .search-field svg |
| 5e05168 | style: оформить .search-field input |
| 8e891ee | style: оформить .search-field input:focus |
| ebb51a0 | style: оформить .search-field:focus-within |
| 85e5d3f | style: оформить .sort-button |
| 2e318b9 | style: оформить .sort-button.active |
| 7c7f5ff | style: оформить #task-list |
| 2b9996a | style: оформить .board-column |
| d58a8b6 | style: оформить .in-progress-task |
| 9734d74 | style: оформить .ended-task |
| 487c4b6 | style: оформить .column-heading |
| 64bd27e | style: оформить .column-heading h2 |
| b490770 | style: оформить .status-dot |
| b76527e | style: оформить .in-progress-task .status-dot |
| d581651 | style: оформить .ended-task .status-dot |
| 31ccc93 | style: оформить .column-count |
| 3f95356 | style: оформить .in-progress-task .column-count |
| 40f0d07 | style: оформить .ended-task .column-count |
| 336e420 | style: оформить .tasks-container |
| c913e32 | style: оформить .task |
| 494d91e | style: оформить .task:hover |
| 99d09d0 | style: оформить .task:active |
| ebc9240 | style: оформить .task-top |
| 12d081f | style: оформить .task-id |
| 4b837a4 | style: оформить .badge |
| 628464c | style: оформить .badge:before |
| 5b6ca43 | style: оформить .badge.priority-high |
| 9271a39 | style: оформить .badge.priority-medium |
| bc8c2e0 | style: оформить .badge.priority-low |
| cb5102a | style: оформить .task-text |
| b630003 | style: оформить .task.done .task-text |
| 2b5f64a | style: оформить .task-bottom |
| fdca402 | style: оформить .task-state |
| 6543b6b | style: оформить .task-state svg |
| 8bbf3e2 | style: оформить .task-buttons |
| dda787b | style: оформить .task-btn |
| ee93695 | style: оформить .task-btn svg |
| 8b5af43 | style: оформить .task-btn:hover |
| bb36eb4 | style: оформить .task-btn[data-action=delete]:hover |
| f0c227f | style: оформить .column-add |
| 874b2e7 | style: оформить .column-add:hover |
| 5b9e159 | style: оформить .column-add svg |
| 3086dae | style: оформить .empty-column |
| 188b76a | style: оформить .empty-column svg |
| bc22c54 | style: оформить .empty-column p |
| 1e0708b | style: оформить .empty-column span |
| 945cedc | style: оформить .dragging |
| 82a9519 | style: оформить .drop-hover |
| 20918ef | style: оформить .board-footnote |
| fdfa2fc | style: оформить .mini-board svg |
| 4215759 | style: оформить .board-footnote>span:last-child |
| 1d5f287 | style: оформить .auth-message |
| 6af4b9d | style: оформить .is-hidden |
| 74be492 | style: оформить dialog |
| e8cb412 | style: оформить dialog::backdrop |
| 868355d | style: оформить .dialog-heading |
| 6780796 | style: оформить .dialog-heading h2 |
| 3130a34 | style: оформить .add-task>label,.form-row label |
| 8e5ef28 | style: оформить .add-task textarea |
| fc6ab92 | style: оформить .form-row |
| 4cc6649 | style: оформить .form-row label |
| fab38b7 | style: оформить .form-row select |
| d419461 | style: оформить .dialog-actions |
| 37aa8a3 | style: оформить .site-header |
| 2f4f58e | style: оформить .header-caption |
| 121befb | style: оформить footer |
| 21ebeef | style: оформить body.page-tasks footer |
| fdf11bf | style: оформить .auth-layout |
| 3cc896b | style: оформить .auth-visual |
| ec40dc6 | style: оформить .auth-visual .eyebrow |
| 66538b0 | style: оформить .auth-visual h1 |
| dba8d63 | style: оформить .auth-visual>p |
| da9344f | style: оформить .auth-visual .visual-caption |
| 7143802 | style: оформить .mini-preview |
| b1f555c | style: оформить .mini-lane |
| babf65a | style: оформить .mini-lane>span |
| 1939f46 | style: оформить .mini-card |
| b792427 | style: оформить .mini-card em |
| 71c6783 | style: оформить .mini-card .mini-done |
| db7814f | style: оформить .auth-container |
| 1d14ea6 | style: оформить .auth-title |
| fdd23b9 | style: оформить .auth-subtitle |
| cc6c8f5 | style: оформить .auth-table |
| 0ff9ab9 | style: оформить .auth-table tr,.auth-table td |
| e42ce7d | style: оформить .auth-table td label |
| 02d3a7a | style: оформить .auth-table td:has(input) |
| f6f14c1 | style: оформить .auth-input |
| c83212b | style: оформить .auth-table .auth-btn |
| fb08c2e | style: оформить .auth-switch |
| ce561fd | style: оформить .auth-switch a |
| ec9b9c3 | style: оформить .account-page |
| 45f290e | style: оформить .tasks-topbar |
| 8e2dab1 | style: оформить .topbar-actions |
| 965e1af | style: оформить .tasks-user |
| 4ad2673 | style: оформить .account-table tr |
| b0abafe | style: оформить .account-field |
| 423e0e3 | style: оформить .account-table td |
| cd9ad4d | style: оформить .inline |
| e7c4dad | style: оформить @keyframes card-in |
| 6307170 | style: адаптировать интерфейс @media(min-width:1650px) |
| f25a355 | style: адаптировать интерфейс @media(max-width:1150px) |
| e12bb12 | style: адаптировать интерфейс @media(max-width:800px) |
| 5e7ea8a | style: адаптировать интерфейс @media(max-width:560px) |
| 5d38eee | style: адаптировать интерфейс @media(prefers-reduced-motion:reduce) |
| c0c135d | style: оформить /* Theme controls stay available on the board, auth pages and profile. */ :root |
| b112e8b | style: оформить .header-actions,.workspace-tools |
| 58960ee | style: оформить .theme-toggle |
| be1f916 | style: оформить .theme-toggle:hover |
| eebd4aa | style: оформить .theme-sun |
| 935a455 | style: оформить тёмную тему [data-theme=dark] |
| bf19ae4 | style: оформить тёмную тему [data-theme=dark] .theme-moon |
| 13dddf3 | style: оформить тёмную тему [data-theme=dark] .theme-sun |
| 5b3d73f | style: оформить тёмную тему [data-theme=dark] .theme-toggle |
| ca26985 | style: оформить тёмную тему [data-theme=dark] .theme-toggle:hover |
| 7f9e094 | style: оформить тёмную тему [data-theme=dark] .workspace-bar |
| be19a5e | style: оформить тёмную тему [data-theme=dark] .workspace-bar strong |
| 15f199d | style: оформить тёмную тему [data-theme=dark] .breadcrumb-slash |
| 492f1bf | style: оформить тёмную тему [data-theme=dark] .eyebrow,[data-theme=dark] .board-heading p |
| 687a0d0 | style: оформить тёмную тему [data-theme=dark] .board-overview |
| bcae0df | style: оформить тёмную тему [data-theme=dark] .overview-symbol |
| e56571a | style: оформить тёмную тему [data-theme=dark] .board-overview>div>div>span,[data-theme=dark] .overview-hint |
| ebd55ba | style: оформить тёмную тему [data-theme=dark] .progress-track |
| 7e2cde6 | style: оформить тёмную тему [data-theme=dark] .board-overview>strong |
| d3a8dc8 | style: оформить тёмную тему [data-theme=dark] .filters |
| f3fbbcd | style: оформить тёмную тему [data-theme=dark] .filter |
| 9dcafb0 | style: оформить тёмную тему [data-theme=dark] .filter.active |
| da1e9c0 | style: оформить тёмную тему [data-theme=dark] .filter:hover |
| 282ad66 | style: оформить тёмную тему [data-theme=dark] .search-field,[data-theme=dark] .sort-button |
| 61cae09 | style: оформить тёмную тему [data-theme=dark] .search-field input |
| 277d2c1 | style: оформить тёмную тему [data-theme=dark] input::placeholder,[data-theme=dark] textarea::placeholder |
| baf9461 | style: оформить тёмную тему [data-theme=dark] .sort-button.active |
| 1e9e1ae | style: оформить тёмную тему [data-theme=dark] .board-column |
| 8e1f1af | style: оформить тёмную тему [data-theme=dark] .in-progress-task |
| 7175d29 | style: оформить тёмную тему [data-theme=dark] .ended-task |
| f00da4f | style: оформить тёмную тему [data-theme=dark] .column-count |
| ff4b813 | style: оформить тёмную тему [data-theme=dark] .in-progress-task .column-count |
| 65f4f24 | style: оформить тёмную тему [data-theme=dark] .ended-task .column-count |
| 0c03d5c | style: оформить тёмную тему [data-theme=dark] .task |
| d122fed | style: оформить тёмную тему [data-theme=dark] .in-progress-task .task |
| b985d70 | style: оформить тёмную тему [data-theme=dark] .ended-task .task |
| f11fbf0 | style: оформить тёмную тему [data-theme=dark] .task:hover |
| 0e7acd0 | style: оформить тёмную тему [data-theme=dark] .task-text |
| f8a8b80 | style: оформить тёмную тему [data-theme=dark] .task.done .task-text |
| 346bc47 | style: оформить тёмную тему [data-theme=dark] .task-id |
| 43695b4 | style: оформить тёмную тему [data-theme=dark] .task-bottom |
| 57f7ad3 | style: оформить тёмную тему [data-theme=dark] .task-state,[data-theme=dark] .task-btn |
| 11609bd | style: оформить тёмную тему [data-theme=dark] .task-btn:hover |
| ca9251a | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=delete]:hover |
| 28c8b72 | style: оформить тёмную тему [data-theme=dark] .badge.priority-high |
| b1241bb | style: оформить тёмную тему [data-theme=dark] .badge.priority-medium |
| 84232bf | style: оформить тёмную тему [data-theme=dark] .badge.priority-low |
| bf68f39 | style: оформить тёмную тему [data-theme=dark] .column-add |
| 4f2c501 | style: оформить тёмную тему [data-theme=dark] .column-add:hover |
| d5fb086 | style: оформить тёмную тему [data-theme=dark] .empty-column,[data-theme=dark] .empty-column p |
| 2db1e17 | style: оформить тёмную тему [data-theme=dark] .empty-column svg |
| 7031815 | style: оформить тёмную тему [data-theme=dark] .board-footnote |
| 59ecbb5 | style: оформить тёмную тему [data-theme=dark] .drop-hover |
| c157cb8 | style: оформить тёмную тему [data-theme=dark] .icon-btn:hover |
| 73e881b | style: оформить тёмную тему [data-theme=dark] .secondary |
| c38be26 | style: оформить тёмную тему [data-theme=dark] .secondary:hover |
| 7031088 | style: оформить тёмную тему [data-theme=dark] .auth-message |
| 3284a7c | style: оформить тёмную тему [data-theme=dark] dialog |
| 4caa5aa | style: оформить тёмную тему [data-theme=dark] dialog::backdrop |
| c88b160 | style: оформить тёмную тему [data-theme=dark] .add-task>label,[data-theme=dark] .form-row label |
| ddda501 | style: оформить тёмную тему [data-theme=dark] .add-task textarea,[data-theme=dark] .form-row select,[data-theme=dark] .auth-input |
| 6a0345b | style: оформить тёмную тему [data-theme=dark] .auth-layout,[data-theme=dark] .account-page |
| 8b4bdb6 | style: оформить тёмную тему [data-theme=dark] .auth-visual |
| 6778851 | style: оформить тёмную тему [data-theme=dark] .auth-visual .eyebrow,[data-theme=dark] .auth-visual>p,[data-theme=dark] .auth-visual .visual-caption |
| fcbae9c | style: оформить тёмную тему [data-theme=dark] .mini-lane |
| 2732088 | style: оформить тёмную тему [data-theme=dark] .mini-lane>span |
| d22b5c7 | style: оформить тёмную тему [data-theme=dark] .mini-card |
| 5a381c2 | style: оформить тёмную тему [data-theme=dark] .mini-card em |
| 06a24a2 | style: оформить тёмную тему [data-theme=dark] .mini-card .mini-done |
| 2bb7b56 | style: оформить тёмную тему [data-theme=dark] .auth-subtitle,[data-theme=dark] .auth-switch,[data-theme=dark] .tasks-user,[data-theme=dark] .account-field,[data-theme=dark] .auth-table td label,[data-theme=dark] .header- |
| ba66b9a | style: оформить тёмную тему [data-theme=dark] .auth-switch a |
| cb5b13c | style: оформить тёмную тему [data-theme=dark] footer |
| 10cc130 | style: адаптировать интерфейс @media(max-width:560px) |
| f336a94 | style: оформить /* Task details, focus view and denser board. */ .board-heading |
| 0ca299d | style: оформить .board-heading h1 |
| ebb5099 | style: оформить .board-overview |
| 921622f | style: оформить .workspace-bar |
| da8d4c3 | style: оформить .board-viewbar |
| 7b1dce9 | style: оформить .view-switch |
| 90498ce | style: оформить .view-btn |
| eba7ae7 | style: оформить .view-btn svg |
| 3a94512 | style: оформить .view-btn.active |
| 0f68644 | style: оформить .view-btn>span |
| 3ad7558 | style: оформить .view-date |
| 724fa39 | style: оформить .board-toolbar |
| 776298d | style: оформить .filters |
| 2cc7645 | style: оформить .toolbar-right |
| 8f401d5 | style: оформить #label-filter |
| fce9eda | style: оформить .board-column |
| d57efff | style: оформить .column-heading |
| 4c2eb34 | style: оформить .task |
| 2f6679a | style: оформить .task-top |
| dcfc7f2 | style: оформить .task-open |
| 532f14d | style: оформить .task-open:hover .task-text |
| 23b28be | style: оформить .task-text |
| 4d485e1 | style: оформить .task-description |
| 2504bf0 | style: оформить .card-labels |
| 63a3401 | style: оформить .card-labels:empty |
| 84d7aca | style: оформить .task-label |
| a30705a | style: оформить .label-green |
| d9db46a | style: оформить .label-blue |
| 3e06ff7 | style: оформить .label-purple |
| 7427a32 | style: оформить .label-orange |
| f66800a | style: оформить .label-pink |
| 4e04ca6 | style: оформить .card-details |
| 68f87fb | style: оформить .card-details:empty |
| cc33390 | style: оформить .due-badge |
| 724db9a | style: оформить .due-badge svg,.checklist-summary svg |
| 9b6c40f | style: оформить .due-badge.is-today |
| 948a17c | style: оформить .due-badge.is-overdue |
| dfafb56 | style: оформить .overdue-card |
| cd3cf18 | style: оформить .checklist-summary |
| 24eddc0 | style: оформить .card-check-track,.checklist-track |
| 69eed65 | style: оформить .card-check-track>span,.checklist-track>span |
| 9c3bcee | style: оформить .task-bottom |
| 5168d44 | style: оформить .task-buttons |
| 8607ae0 | style: оформить .task-btn[data-action=complete] |
| 6d43e30 | style: оформить .task-btn[data-action=complete]:hover |
| 06590b1 | style: оформить .empty-column |
| e07e14c | style: оформить .empty-illustration |
| 9df9a6f | style: оформить .empty-illustration svg |
| 102af7c | style: оформить .empty-illustration>span |
| 0df83c8 | style: оформить .ended-task .empty-illustration |
| a5ffa1e | style: оформить .sidebar-upcoming |
| a463e6e | style: оформить .upcoming-heading |
| 1ba2f02 | style: оформить .upcoming-heading>span |
| 93eb149 | style: оформить .upcoming-item |
| 3e973d8 | style: оформить .upcoming-item>span:first-child |
| 7a8e2eb | style: оформить .upcoming-item .due-badge |
| b5e23ea | style: оформить .upcoming-item .is-overdue |
| 43ebdcd | style: оформить .upcoming-item:hover>span:first-child |
| e854609 | style: оформить .upcoming-empty |
| d0154cf | style: оформить .upcoming-empty svg |
| ddef8ad | style: оформить .upcoming-empty p |
| 361d721 | style: оформить .upcoming-empty span |
| 28835e9 | style: оформить .today-list |
| b89a83f | style: оформить .today-group |
| 0c855bd | style: оформить .today-group h2 |
| fcb057e | style: оформить .today-group h2>span |
| 35c3d28 | style: оформить .compact-task |
| 47d3768 | style: оформить .compact-task .task-text |
| 9aeb860 | style: оформить .compact-task .task-top |
| a97bf0a | style: оформить .compact-task .task-id |
| 2488a87 | style: оформить .compact-task .task-open |
| 077fefe | style: оформить .compact-task .card-details |
| 80502f1 | style: оформить .compact-task .task-description |
| 731b387 | style: оформить .compact-task .card-check-track |
| 8762295 | style: оформить .today-empty |
| 24b9046 | style: оформить .today-empty>svg |
| 9f7c7ee | style: оформить .today-empty h2 |
| 58411f5 | style: оформить .today-empty p |
| a8d75a9 | style: оформить .task-drawer |
| fc24aec | style: оформить .task-drawer[open] |
| 07f2493 | style: оформить .task-drawer::backdrop |
| 2f5807b | style: оформить .task-drawer .dialog-heading |
| 6c92b98 | style: оформить .task-drawer .dialog-heading h2 |
| 7eb302d | style: оформить .task-drawer #dialog-message |
| 6bc495b | style: оформить .task-drawer .add-task |
| 70d666c | style: оформить .drawer-body |
| f84b6f0 | style: оформить .drawer-body>label,.deadline-field>label |
| a4ed73f | style: оформить .optional |
| 40261fd | style: оформить .task-drawer textarea |
| 947daee | style: оформить .task-drawer #task-description |
| 4032337 | style: оформить .deadline-field |
| 7bc152f | style: оформить .due-input-row |
| 21fd535 | style: оформить .due-input-row input,.label-entry input,.label-entry select,.checklist-entry input |
| 548a11a | style: оформить .due-input-row input |
| 27cf8bc | style: оформить .text-btn |
| 519ddc3 | style: оформить .text-btn:hover |
| 1ae9c66 | style: оформить .date-shortcuts,.label-presets |
| a9fbc70 | style: оформить .date-shortcuts button,.label-presets button |
| f38cbf0 | style: оформить .date-shortcuts button:hover,.label-presets button:hover |
| d7c0fe5 | style: оформить .details-section |
| 5f52544 | style: оформить .details-section h3 |
| 30cdbaf | style: оформить .details-section h3>span |
| bc60824 | style: оформить .label-chips |
| f142d30 | style: оформить .label-chips .task-label |
| 5019409 | style: оформить .task-label button |
| fa2f97e | style: оформить .label-entry |
| 26af397 | style: оформить .label-entry input |
| c1ea7f8 | style: оформить .label-entry select |
| 86b3a2d | style: оформить .label-entry .icon-btn,.checklist-entry .icon-btn |
| e941679 | style: оформить .checklist-entry |
| ba5ddea | style: оформить .checklist-entry input |
| e3b16e3 | style: оформить .checklist-row |
| fb74d79 | style: оформить .checklist-row input[type=checkbox] |
| f1609c3 | style: оформить .checklist-row input[type=text] |
| e473759 | style: оформить .checklist-row input[type=text]:hover |
| a286605 | style: оформить .checklist-row.checked input[type=text] |
| 515e3cb | style: оформить .task-drawer .dialog-actions |
| 55f842f | style: оформить .save-hint |
| 47d1a6a | style: оформить .task-drawer .dialog-actions .auth-btn |
| 4af18e1 | style: оформить .checklist-track |
| 4328217 | style: оформить тёмную тему [data-theme=dark] .view-btn |
| 9df3da1 | style: оформить тёмную тему [data-theme=dark] .view-btn.active |
| ff1b6f0 | style: оформить тёмную тему [data-theme=dark] .view-btn>span |
| 517e0f3 | style: оформить тёмную тему [data-theme=dark] .view-date |
| 833496b | style: оформить тёмную тему [data-theme=dark] #label-filter |
| 322d424 | style: оформить тёмную тему [data-theme=dark] .task-open:hover .task-text |
| 58325de | style: оформить тёмную тему [data-theme=dark] .task-description |
| fcef0ba | style: оформить тёмную тему [data-theme=dark] .label-green |
| 8039511 | style: оформить тёмную тему [data-theme=dark] .label-blue |
| bd12e4c | style: оформить тёмную тему [data-theme=dark] .label-purple |
| d13a156 | style: оформить тёмную тему [data-theme=dark] .label-orange |
| db90c07 | style: оформить тёмную тему [data-theme=dark] .label-pink |
| 741dbe5 | style: оформить тёмную тему [data-theme=dark] .due-badge,[data-theme=dark] .checklist-summary |
| 5bfabf8 | style: оформить тёмную тему [data-theme=dark] .due-badge.is-overdue |
| b67ad7d | style: оформить тёмную тему [data-theme=dark] .due-badge.is-today |
| 572f892 | style: оформить тёмную тему [data-theme=dark] .overdue-card |
| df98e07 | style: оформить тёмную тему [data-theme=dark] .card-check-track,[data-theme=dark] .checklist-track |
| 16ec72d | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=complete] |
| 9d907b3 | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=complete]:hover |
| 10dfc4a | style: оформить тёмную тему [data-theme=dark] .empty-illustration |
| 650f6cd | style: оформить тёмную тему [data-theme=dark] .empty-illustration svg |
| c8b29db | style: оформить тёмную тему [data-theme=dark] .empty-illustration>span |
| a65c982 | style: оформить тёмную тему [data-theme=dark] .today-group h2 |
| ea0feb3 | style: оформить тёмную тему [data-theme=dark] .today-group h2>span |
| ceae4eb | style: оформить тёмную тему [data-theme=dark] .today-empty |
| 6464b18 | style: оформить тёмную тему [data-theme=dark] .today-empty h2 |
| 6a4b6ce | style: оформить тёмную тему [data-theme=dark] .task-drawer::backdrop |
| 51f59a3 | style: оформить тёмную тему [data-theme=dark] .drawer-body>label,[data-theme=dark] .deadline-field>label,[data-theme=dark] .details-section h3 |
| 120cacd | style: оформить тёмную тему [data-theme=dark] .due-input-row input,[data-theme=dark] .label-entry input,[data-theme=dark] .label-entry select,[data-theme=dark] .checklist-entry input |
| 6541e80 | style: оформить тёмную тему [data-theme=dark] .date-shortcuts button,[data-theme=dark] .label-presets button |
| 5c3097e | style: оформить тёмную тему [data-theme=dark] .checklist-row input[type=text] |
| d910938 | style: оформить тёмную тему [data-theme=dark] .checklist-row.checked input[type=text] |
| 37a74f1 | style: оформить тёмную тему [data-theme=dark] .text-btn |
| 5b8f1cd | style: оформить тёмную тему [data-theme=dark] .optional,[data-theme=dark] .save-hint |
| a8d3bcc | style: адаптировать интерфейс @media(min-width:1650px) |
| 2378b68 | style: адаптировать интерфейс @media(max-width:1150px) |
| 4ebdbcf | style: адаптировать интерфейс @media(max-width:800px) |
| 00874ea | style: адаптировать интерфейс @media(max-width:560px) |
| d931281 | assets: добавить изображение ArrowLeft.webp |
| ff8c640 | assets: добавить изображение ArrowRight.webp |
| 5ed437c | assets: добавить изображение CheckMark.webp |
| 95ec784 | assets: добавить изображение Pen.webp |
| eb1612c | assets: добавить изображение Save.webp |
| f275b35 | assets: добавить изображение Trashcan.webp |
| a152e3b | docker: исключить секреты и локальные файлы из образа |
| 60e386c | docker: собрать PHP с Apache и PDO MySQL |
| 68a4797 | docker: настроить приложение, MySQL и миграции |
| de0cddd | test: добавить проверку синтаксиса PHP |
| 7e5a069 | test: проверить авторизацию, задачи и изоляцию пользователей |
| 2b1fc59 | ci: запускать сборку, миграции и HTTP-проверки на GitHub |
| 0e305f1 | docs: сохранить результаты аудита проекта |
| 1161343 | docs: описать идеи развития приложения |
| 71ff670 | docs: описать пользовательский сценарий срочной задачи |
| 3f83c46 | docs: добавить полную инструкцию запуска и отметить восстановленную историю |
