# Этапы восстановления проекта

История создана из готовой версии с настоящими текущими датами. Это реконструкция этапов, а не исходная история разработки. CSS добавлялся по отдельным правилам, JavaScript — по синтаксически завершённым блокам. Серверные обработчики и разметка страниц добавлены отдельными этапами.

| Коммит | Изменение |
| --- | --- |
| 8ba5234 | docs: описать проект и восстановление истории разработки |
| 24075b2 | chore: исключить пароли, локальную базу, архивы и временные файлы |
| 68b62d0 | chore: настроить окончания строк и бинарные изображения |
| a3edd4f | config: добавить образец настроек без личных секретов |
| 1816c4b | config: загрузить настройки окружения и подключение PDO |
| 95e743a | security: добавить сессии, CSRF и общие функции авторизации |
| 7755a66 | db: создать таблицы пользователей и задач |
| 2f96fd1 | db: добавить запуск и журнал миграций |
| ca156a9 | setup: генерировать локальные настройки со случайными паролями |
| 01f9306 | ui: добавить набор SVG-иконок |
| 6f5be71 | ui: добавить кнопку переключения темы |
| 32807c7 | ui: добавить шапку с логотипом |
| d696159 | ui: добавить подвал страницы |
| c533af1 | ui: добавить иллюстрацию страниц авторизации |
| 237350c | routing: добавить страницу неизвестного адреса |
| 59cfb8b | feat: добавить серверную обработку регистрации |
| c3b47f8 | ui: добавить разметку регистрации |
| b4d4586 | feat: добавить серверную обработку входа |
| cc75881 | ui: добавить разметку входа |
| e0d1d1f | feat: добавить серверную обработку личного кабинета |
| 7e04ad0 | ui: добавить разметку личного кабинета |
| 2fa1469 | feat: добавить серверную обработку доски задач |
| 4fe446c | ui: добавить разметку доски задач |
| 9051f64 | routing: собрать страницы через общий вход и шаблон |
| 1b257c9 | db: добавить описание, сроки, метки и чек-листы |
| d8dc9f0 | api: добавить операции с задачами и проверку владельца |
| 72d5cb1 | board: добавить блок поведения 1 |
| dab3874 | board: добавить config |
| 2268adc | board: добавить dialog |
| 7a6a4a3 | board: добавить status |
| 9deca6b | board: добавить sections |
| 3cc376a | board: добавить tasks |
| 30bafcb | board: добавить labels |
| 7bb9eb3 | board: добавить paths |
| fa7cea3 | board: добавить icon |
| 7a6f89b | board: добавить escape |
| 07dc857 | board: добавить localDate |
| 54ad86e | board: добавить overdue |
| c379c0c | board: добавить dateInfo |
| d20c293 | board: добавить labelsHtml |
| 93111ca | board: добавить message |
| b63f0d7 | board: добавить clearMessages |
| 6085e07 | board: добавить draft |
| f9ae1e7 | board: добавить closeEditor |
| 3fd165e | board: добавить openEditor |
| 2d445c4 | board: обработать click для button |
| 16e7783 | board: обработать click для close-dialog |
| 10191b0 | board: обработать cancel для dialog |
| b710807 | board: обработать close для dialog |
| 5682438 | board: добавить renderEditorLabels |
| b6d4c2e | board: добавить addLabel |
| 58b477f | board: обработать click для add-label |
| 282500b | board: обработать keydown для label-name |
| f5c0565 | board: добавить b |
| aeb7b9c | board: обработать click для b |
| 6889064 | board: добавить renderChecklist |
| cee3aff | board: добавить addChecklist |
| ef391e7 | board: обработать click для add-checklist |
| b6a12bb | board: обработать keydown для checklist-input |
| 1fc0408 | board: обработать input для editor-checklist |
| 15a0232 | board: обработать change для editor-checklist |
| 484375e | board: добавить b |
| 3092d24 | board: обработать keydown для editor-checklist |
| d96d9c4 | board: обработать click для clear-due |
| 5508969 | board: обработать click для b |
| a2c23ec | board: добавить request |
| 4cb93f3 | board: добавить sync |
| c3920e9 | board: добавить makeCard |
| 8dbc17d | board: добавить renderUpcoming |
| 1c229df | board: добавить render |
| a573ac8 | board: обработать submit для form |
| d0f5d8e | board: добавить cardAction |
| b6742b7 | board: обработать click для task-list |
| 4ac8565 | board: добавить b |
| 5f8092d | board: добавить блок поведения 2 |
| ef5cd38 | board: обработать click для b |
| 2c994c5 | board: обработать click для b |
| 15168c2 | board: обработать input для task-search |
| a1df687 | board: обработать click для priority-sort-btn |
| 3bc6934 | board: обработать visibilitychange для document |
| 9672452 | board: добавить блок поведения 3 |
| 197ed22 | board: добавить блок поведения 4 |
| 8ebf326 | theme: сохранять выбор светлой и тёмной темы в браузере |
| f0d1a5b | style: подключить шрифт Manrope с нужными начертаниями |
| c35422d | style: оформить :root |
| a949d42 | style: оформить * |
| 8d1a0fe | style: задать фон, цвет и базовые размеры текста страницы |
| 253e10c | style: применить Manrope и резервные системные шрифты |
| 309c1a8 | style: оформить button,input,select,textarea |
| 6b90143 | style: оформить button,a,input,textarea,select |
| 42241af | style: оформить button,a |
| a3e2996 | style: оформить button |
| 9000372 | style: оформить a |
| 9a2b1b1 | style: оформить button |
| cfc1527 | style: оформить svg |
| 691f732 | style: оформить button,a,input,textarea,select |
| a4e88c0 | style: оформить button:focus-visible,a:focus-visible |
| a36ef57 | style: оформить input:focus,textarea:focus,select:focus |
| 53f9334 | style: оформить .brand |
| 6c9140b | style: оформить .brand-mark |
| d589e14 | style: оформить .brand-mark svg |
| 8aaec09 | style: оформить .brand-light |
| 6dad60d | style: оформить .brand-period |
| 3ddbf1e | style: оформить .sidebar |
| 5dd40e9 | style: оформить .sidebar .brand |
| e520628 | style: оформить .workspace |
| 81a5e12 | style: оформить .workspace small,.user-profile small |
| c302b12 | style: оформить .workspace-icon |
| c305935 | style: оформить .nav-caption |
| 3731326 | style: оформить .nav-link |
| da5fa77 | style: оформить .nav-link.selected |
| 834e5ac | style: оформить .nav-link:hover |
| b6bfc40 | style: оформить .nav-link.selected:hover |
| 37ddf6f | style: оформить .nav-link span |
| 8728a5a | style: оформить .nav-link svg |
| 835a276 | style: оформить .sidebar-note |
| 93f5933 | style: оформить .note-orbit |
| 322ae39 | style: оформить .sidebar-note h3 |
| 62ee87a | style: оформить .sidebar-note p |
| 685d8eb | style: оформить .note-line |
| e0cbb00 | style: оформить .sidebar-bottom |
| b9aa7bd | style: оформить .user-profile |
| 51ce2f3 | style: оформить .user-profile>div |
| ec2120a | style: оформить .avatar |
| 9d4956b | style: оформить .icon-btn |
| ed71f6b | style: оформить .icon-btn:hover |
| 79c32e9 | style: оформить .icon-btn svg |
| ac52794 | style: оформить .logout:hover |
| 7799f18 | style: оформить .board-main |
| c03f4ce | style: оформить .workspace-bar |
| 3b11cbe | style: оформить .workspace-bar strong |
| 07de9c6 | style: оформить .breadcrumb-slash |
| 5e285df | style: оформить .private-label |
| 809ff4a | style: оформить .private-label svg |
| 358192a | style: оформить .board-heading |
| ae74ea2 | style: оформить .eyebrow |
| f6212be | style: оформить h1 |
| 443ff29 | style: оформить .heading-dot |
| 4f05a07 | style: оформить .board-heading p |
| ee0f566 | style: оформить .auth-btn |
| d06cb01 | style: оформить .auth-btn:active |
| 016b195 | style: оформить .primary |
| 855d9a2 | style: оформить .primary:hover |
| 6fe9f72 | style: оформить .secondary |
| 3fb33ed | style: оформить .secondary:hover |
| 2a453d9 | style: оформить .board-overview |
| d0f27e7 | style: оформить .board-overview>div:first-child |
| 68e401d | style: оформить .overview-symbol |
| df553a5 | style: оформить .board-overview strong |
| c210490 | style: оформить .board-overview>div>div>span |
| b6a80f2 | style: оформить .progress-track |
| f6b12ed | style: оформить .progress-track span |
| e50b321 | style: оформить .board-overview>strong |
| 84fba84 | style: оформить .overview-hint |
| 01fe39c | style: оформить .board-toolbar |
| f49a94b | style: оформить .filters |
| 2ddb988 | style: оформить .filter |
| 759fa9b | style: оформить .filter:hover |
| b89514e | style: оформить .filter.active |
| 5157fe9 | style: оформить .toolbar-right |
| 153c934 | style: оформить .search-field |
| 4db403a | style: оформить .search-field svg |
| 067f694 | style: оформить .search-field input |
| 55f5af7 | style: оформить .search-field input:focus |
| 4434a59 | style: оформить .search-field:focus-within |
| 78d8fb6 | style: оформить .sort-button |
| f394b4a | style: оформить .sort-button.active |
| f7c9634 | style: оформить #task-list |
| 9029616 | style: оформить .board-column |
| 1cec8c9 | style: оформить .in-progress-task |
| 61f4fae | style: оформить .ended-task |
| e8f50c5 | style: оформить .column-heading |
| 8a49971 | style: оформить .column-heading h2 |
| c6ea79b | style: оформить .status-dot |
| 0b68c00 | style: оформить .in-progress-task .status-dot |
| fabe21b | style: оформить .ended-task .status-dot |
| fe7ebe7 | style: оформить .column-count |
| 984c625 | style: оформить .in-progress-task .column-count |
| 3f4e17d | style: оформить .ended-task .column-count |
| c635569 | style: оформить .tasks-container |
| 00a4c97 | style: оформить .task |
| 5b66b31 | style: оформить .task:hover |
| 7a2e95e | style: оформить .task:active |
| 9437e9a | style: оформить .task-top |
| f878a86 | style: оформить .task-id |
| 3a8b1eb | style: оформить .badge |
| 6bded67 | style: оформить .badge:before |
| b2b2b9f | style: оформить .badge.priority-high |
| 22e83e5 | style: оформить .badge.priority-medium |
| 71ebf81 | style: оформить .badge.priority-low |
| c8481ce | style: оформить .task-text |
| 8f36600 | style: оформить .task.done .task-text |
| 7fac031 | style: оформить .task-bottom |
| fa152c7 | style: оформить .task-state |
| 3f06351 | style: оформить .task-state svg |
| 6d2ecad | style: оформить .task-buttons |
| bc194e5 | style: оформить .task-btn |
| f4ed798 | style: оформить .task-btn svg |
| a5bd628 | style: оформить .task-btn:hover |
| 23d1faf | style: оформить .task-btn[data-action=delete]:hover |
| 634ae05 | style: оформить .column-add |
| d1fd58b | style: оформить .column-add:hover |
| 1346cfd | style: оформить .column-add svg |
| d63764a | style: оформить .empty-column |
| f59bae1 | style: оформить .empty-column svg |
| 4b242f7 | style: оформить .empty-column p |
| 1c7ce1c | style: оформить .empty-column span |
| b5ecd52 | style: оформить .dragging |
| 150dd95 | style: оформить .drop-hover |
| a75ef0a | style: оформить .board-footnote |
| 898f771 | style: оформить .mini-board svg |
| 4cf4eb0 | style: оформить .board-footnote>span:last-child |
| 022dd6b | style: оформить .auth-message |
| 3dbe896 | style: оформить .is-hidden |
| 7695dcc | style: оформить dialog |
| 0aa3441 | style: оформить dialog::backdrop |
| e5277fd | style: оформить .dialog-heading |
| 684392c | style: оформить .dialog-heading h2 |
| fc9e016 | style: оформить .add-task>label,.form-row label |
| ebd6612 | style: оформить .add-task textarea |
| 7d8d112 | style: оформить .form-row |
| 03976c1 | style: оформить .form-row label |
| 8e69e4d | style: оформить .form-row select |
| 0d07c78 | style: оформить .dialog-actions |
| b0290ff | style: оформить .site-header |
| c9510bb | style: оформить .header-caption |
| 29c2003 | style: оформить footer |
| 33e81d0 | style: оформить body.page-tasks footer |
| 4d68d62 | style: оформить .auth-layout |
| 3b22871 | style: оформить .auth-visual |
| eb8340e | style: оформить .auth-visual .eyebrow |
| b0ce711 | style: оформить .auth-visual h1 |
| 182204f | style: оформить .auth-visual>p |
| 826e868 | style: оформить .auth-visual .visual-caption |
| 7b3b875 | style: оформить .mini-preview |
| 0d4b27a | style: оформить .mini-lane |
| aeff976 | style: оформить .mini-lane>span |
| 038a422 | style: оформить .mini-card |
| 6d0974b | style: оформить .mini-card em |
| 11b44c5 | style: оформить .mini-card .mini-done |
| e271552 | style: оформить .auth-container |
| 8a05b45 | style: оформить .auth-title |
| 022f520 | style: оформить .auth-subtitle |
| 4e614b8 | style: оформить .auth-table |
| 87c9131 | style: оформить .auth-table tr,.auth-table td |
| adf6cb7 | style: оформить .auth-table td label |
| 64b690e | style: оформить .auth-table td:has(input) |
| c5062a7 | style: оформить .auth-input |
| 7606143 | style: оформить .auth-table .auth-btn |
| 1e50530 | style: оформить .auth-switch |
| 43f1045 | style: оформить .auth-switch a |
| 9543fbc | style: оформить .account-page |
| 206e70c | style: оформить .tasks-topbar |
| 8faac88 | style: оформить .topbar-actions |
| c473f60 | style: оформить .tasks-user |
| fdde335 | style: оформить .account-table tr |
| b4d892c | style: оформить .account-field |
| cc373aa | style: оформить .account-table td |
| fed976d | style: оформить .inline |
| 0e9af97 | style: оформить @keyframes card-in |
| 7eebcf1 | style: адаптировать интерфейс @media(min-width:1650px) |
| 887e736 | style: адаптировать интерфейс @media(max-width:1150px) |
| 2dc67a9 | style: адаптировать интерфейс @media(max-width:800px) |
| af41fb3 | style: адаптировать интерфейс @media(max-width:560px) |
| cbafb8e | style: адаптировать интерфейс @media(prefers-reduced-motion:reduce) |
| 1ed2144 | style: оформить /* Theme controls stay available on the board, auth pages and profile. */ :root |
| 80eb887 | style: оформить .header-actions,.workspace-tools |
| e90fc38 | style: оформить .theme-toggle |
| 673041c | style: оформить .theme-toggle:hover |
| e831848 | style: оформить .theme-sun |
| e69d4d7 | style: оформить тёмную тему [data-theme=dark] |
| 09c64b1 | style: оформить тёмную тему [data-theme=dark] .theme-moon |
| 28740ff | style: оформить тёмную тему [data-theme=dark] .theme-sun |
| 6ec99ad | style: оформить тёмную тему [data-theme=dark] .theme-toggle |
| 8551d47 | style: оформить тёмную тему [data-theme=dark] .theme-toggle:hover |
| e64d97e | style: оформить тёмную тему [data-theme=dark] .workspace-bar |
| 3f6a9d7 | style: оформить тёмную тему [data-theme=dark] .workspace-bar strong |
| 8a7c161 | style: оформить тёмную тему [data-theme=dark] .breadcrumb-slash |
| 054d6e1 | style: оформить тёмную тему [data-theme=dark] .eyebrow,[data-theme=dark] .board-heading p |
| 023c793 | style: оформить тёмную тему [data-theme=dark] .board-overview |
| 341f66d | style: оформить тёмную тему [data-theme=dark] .overview-symbol |
| 58a25eb | style: оформить тёмную тему [data-theme=dark] .board-overview>div>div>span,[data-theme=dark] .overview-hint |
| de34eb9 | style: оформить тёмную тему [data-theme=dark] .progress-track |
| f85032f | style: оформить тёмную тему [data-theme=dark] .board-overview>strong |
| f5019bd | style: оформить тёмную тему [data-theme=dark] .filters |
| 0e5d526 | style: оформить тёмную тему [data-theme=dark] .filter |
| 67a9a30 | style: оформить тёмную тему [data-theme=dark] .filter.active |
| f698542 | style: оформить тёмную тему [data-theme=dark] .filter:hover |
| 58b3858 | style: оформить тёмную тему [data-theme=dark] .search-field,[data-theme=dark] .sort-button |
| ff4d539 | style: оформить тёмную тему [data-theme=dark] .search-field input |
| b707e99 | style: оформить тёмную тему [data-theme=dark] input::placeholder,[data-theme=dark] textarea::placeholder |
| 10c5eb4 | style: оформить тёмную тему [data-theme=dark] .sort-button.active |
| 5c6498d | style: оформить тёмную тему [data-theme=dark] .board-column |
| ce93873 | style: оформить тёмную тему [data-theme=dark] .in-progress-task |
| 8e3092f | style: оформить тёмную тему [data-theme=dark] .ended-task |
| 3280ca2 | style: оформить тёмную тему [data-theme=dark] .column-count |
| 519ee24 | style: оформить тёмную тему [data-theme=dark] .in-progress-task .column-count |
| 298cfae | style: оформить тёмную тему [data-theme=dark] .ended-task .column-count |
| e77e4bd | style: оформить тёмную тему [data-theme=dark] .task |
| 1b8cbc3 | style: оформить тёмную тему [data-theme=dark] .in-progress-task .task |
| 02d7406 | style: оформить тёмную тему [data-theme=dark] .ended-task .task |
| 31d7538 | style: оформить тёмную тему [data-theme=dark] .task:hover |
| 71712a5 | style: оформить тёмную тему [data-theme=dark] .task-text |
| e3cdae7 | style: оформить тёмную тему [data-theme=dark] .task.done .task-text |
| 89dab02 | style: оформить тёмную тему [data-theme=dark] .task-id |
| d224eed | style: оформить тёмную тему [data-theme=dark] .task-bottom |
| 34a0cfd | style: оформить тёмную тему [data-theme=dark] .task-state,[data-theme=dark] .task-btn |
| 3c5c2d6 | style: оформить тёмную тему [data-theme=dark] .task-btn:hover |
| fe7c26e | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=delete]:hover |
| 20cb2b6 | style: оформить тёмную тему [data-theme=dark] .badge.priority-high |
| bfd81eb | style: оформить тёмную тему [data-theme=dark] .badge.priority-medium |
| 5a8b385 | style: оформить тёмную тему [data-theme=dark] .badge.priority-low |
| e5a695b | style: оформить тёмную тему [data-theme=dark] .column-add |
| 514860d | style: оформить тёмную тему [data-theme=dark] .column-add:hover |
| d733d2b | style: оформить тёмную тему [data-theme=dark] .empty-column,[data-theme=dark] .empty-column p |
| 4f490cb | style: оформить тёмную тему [data-theme=dark] .empty-column svg |
| e5d7a5e | style: оформить тёмную тему [data-theme=dark] .board-footnote |
| abc4605 | style: оформить тёмную тему [data-theme=dark] .drop-hover |
| 95ef000 | style: оформить тёмную тему [data-theme=dark] .icon-btn:hover |
| be1e7b8 | style: оформить тёмную тему [data-theme=dark] .secondary |
| 690c0bc | style: оформить тёмную тему [data-theme=dark] .secondary:hover |
| dfd07ba | style: оформить тёмную тему [data-theme=dark] .auth-message |
| 44ae0cd | style: оформить тёмную тему [data-theme=dark] dialog |
| 86b5961 | style: оформить тёмную тему [data-theme=dark] dialog::backdrop |
| e584e45 | style: оформить тёмную тему [data-theme=dark] .add-task>label,[data-theme=dark] .form-row label |
| dcbfb64 | style: оформить тёмную тему [data-theme=dark] .add-task textarea,[data-theme=dark] .form-row select,[data-theme=dark] .auth-input |
| 916f757 | style: оформить тёмную тему [data-theme=dark] .auth-layout,[data-theme=dark] .account-page |
| bd80c3b | style: оформить тёмную тему [data-theme=dark] .auth-visual |
| e1054d5 | style: оформить тёмную тему [data-theme=dark] .auth-visual .eyebrow,[data-theme=dark] .auth-visual>p,[data-theme=dark] .auth-visual .visual-caption |
| 9840628 | style: оформить тёмную тему [data-theme=dark] .mini-lane |
| 020efae | style: оформить тёмную тему [data-theme=dark] .mini-lane>span |
| 76eebf0 | style: оформить тёмную тему [data-theme=dark] .mini-card |
| 4394d8d | style: оформить тёмную тему [data-theme=dark] .mini-card em |
| 23993eb | style: оформить тёмную тему [data-theme=dark] .mini-card .mini-done |
| e4162a4 | style: оформить тёмную тему [data-theme=dark] .auth-subtitle,[data-theme=dark] .auth-switch,[data-theme=dark] .tasks-user,[data-theme=dark] .account-field,[data-theme=dark] .auth-table td label,[data-theme=dark] .header- |
| b942bbd | style: оформить тёмную тему [data-theme=dark] .auth-switch a |
| c92153f | style: оформить тёмную тему [data-theme=dark] footer |
| 06ccad0 | style: адаптировать интерфейс @media(max-width:560px) |
| 05e83ee | style: оформить /* Task details, focus view and denser board. */ .board-heading |
| 713868f | style: оформить .board-heading h1 |
| 2bab228 | style: оформить .board-overview |
| 357ac8c | style: оформить .workspace-bar |
| b3de30f | style: оформить .board-viewbar |
| 6224fc8 | style: оформить .view-switch |
| 9803288 | style: оформить .view-btn |
| a2c6b02 | style: оформить .view-btn svg |
| 809b2f2 | style: оформить .view-btn.active |
| 149f61d | style: оформить .view-btn>span |
| 5fca2ba | style: оформить .view-date |
| 2a98706 | style: оформить .board-toolbar |
| 4bd1f70 | style: оформить .filters |
| c38f7b3 | style: оформить .toolbar-right |
| 5a389b4 | style: оформить #label-filter |
| 0520cdc | style: оформить .board-column |
| fb25bcc | style: оформить .column-heading |
| 45c5e90 | style: оформить .task |
| e6409a3 | style: оформить .task-top |
| d355827 | style: оформить .task-open |
| b05a5a3 | style: оформить .task-open:hover .task-text |
| 901ff76 | style: оформить .task-text |
| c4381b2 | style: оформить .task-description |
| 60f7007 | style: оформить .card-labels |
| 4a48f86 | style: оформить .card-labels:empty |
| e7da092 | style: оформить .task-label |
| 3607388 | style: оформить .label-green |
| fd5c245 | style: оформить .label-blue |
| 79b0b09 | style: оформить .label-purple |
| 08fd473 | style: оформить .label-orange |
| 70e2e55 | style: оформить .label-pink |
| 8e46e60 | style: оформить .card-details |
| 912635f | style: оформить .card-details:empty |
| 11647fe | style: оформить .due-badge |
| 11adf30 | style: оформить .due-badge svg,.checklist-summary svg |
| 38390d8 | style: оформить .due-badge.is-today |
| 4a05358 | style: оформить .due-badge.is-overdue |
| 5b2d267 | style: оформить .overdue-card |
| e1759b9 | style: оформить .checklist-summary |
| f6e6b44 | style: оформить .card-check-track,.checklist-track |
| d9a6e28 | style: оформить .card-check-track>span,.checklist-track>span |
| 0915236 | style: оформить .task-bottom |
| 04ea305 | style: оформить .task-buttons |
| 3b9c59f | style: оформить .task-btn[data-action=complete] |
| 849ac8c | style: оформить .task-btn[data-action=complete]:hover |
| ed85868 | style: оформить .empty-column |
| 2a0697e | style: оформить .empty-illustration |
| 139d15f | style: оформить .empty-illustration svg |
| 3a51c5d | style: оформить .empty-illustration>span |
| 15cce00 | style: оформить .ended-task .empty-illustration |
| 9d69613 | style: оформить .sidebar-upcoming |
| cac0326 | style: оформить .upcoming-heading |
| b7e3a1a | style: оформить .upcoming-heading>span |
| 3420614 | style: оформить .upcoming-item |
| 71d9fe6 | style: оформить .upcoming-item>span:first-child |
| 731d10d | style: оформить .upcoming-item .due-badge |
| 916c995 | style: оформить .upcoming-item .is-overdue |
| 1126150 | style: оформить .upcoming-item:hover>span:first-child |
| 6b5b85c | style: оформить .upcoming-empty |
| 7381bb7 | style: оформить .upcoming-empty svg |
| b38eb53 | style: оформить .upcoming-empty p |
| bbbb5ce | style: оформить .upcoming-empty span |
| dabaffc | style: оформить .today-list |
| b9bb59e | style: оформить .today-group |
| 0b18a8e | style: оформить .today-group h2 |
| 819a117 | style: оформить .today-group h2>span |
| 47db84a | style: оформить .compact-task |
| 44a5726 | style: оформить .compact-task .task-text |
| 2b9ec15 | style: оформить .compact-task .task-top |
| 0f89499 | style: оформить .compact-task .task-id |
| 2b85ca7 | style: оформить .compact-task .task-open |
| 40c8aec | style: оформить .compact-task .card-details |
| 98c7bd7 | style: оформить .compact-task .task-description |
| c2a2cbe | style: оформить .compact-task .card-check-track |
| 116737d | style: оформить .today-empty |
| 406ccba | style: оформить .today-empty>svg |
| 5815568 | style: оформить .today-empty h2 |
| 5cecf7d | style: оформить .today-empty p |
| 498c37d | style: оформить .task-drawer |
| d1056a5 | style: оформить .task-drawer[open] |
| 63fa923 | style: оформить .task-drawer::backdrop |
| b977a2d | style: оформить .task-drawer .dialog-heading |
| 43f9cab | style: оформить .task-drawer .dialog-heading h2 |
| 12bd065 | style: оформить .task-drawer #dialog-message |
| ecddb06 | style: оформить .task-drawer .add-task |
| 555f166 | style: оформить .drawer-body |
| 429f0eb | style: оформить .drawer-body>label,.deadline-field>label |
| a2a19c4 | style: оформить .optional |
| 810c560 | style: оформить .task-drawer textarea |
| 49e8cab | style: оформить .task-drawer #task-description |
| c9b057b | style: оформить .deadline-field |
| bb0402d | style: оформить .due-input-row |
| da642ac | style: оформить .due-input-row input,.label-entry input,.label-entry select,.checklist-entry input |
| df7ce50 | style: оформить .due-input-row input |
| 44874fd | style: оформить .text-btn |
| f7cb929 | style: оформить .text-btn:hover |
| 5e1f4ae | style: оформить .date-shortcuts,.label-presets |
| 485ed4d | style: оформить .date-shortcuts button,.label-presets button |
| dc48f72 | style: оформить .date-shortcuts button:hover,.label-presets button:hover |
| 8663b26 | style: оформить .details-section |
| 31ef5d3 | style: оформить .details-section h3 |
| 45571ac | style: оформить .details-section h3>span |
| a7c6a5f | style: оформить .label-chips |
| 488a804 | style: оформить .label-chips .task-label |
| 349ab02 | style: оформить .task-label button |
| 9a8ced8 | style: оформить .label-entry |
| 16d2a34 | style: оформить .label-entry input |
| b5089ae | style: оформить .label-entry select |
| 3b9ffbf | style: оформить .label-entry .icon-btn,.checklist-entry .icon-btn |
| b8a9a63 | style: оформить .checklist-entry |
| 4e734ef | style: оформить .checklist-entry input |
| 1eef46b | style: оформить .checklist-row |
| 644e76b | style: оформить .checklist-row input[type=checkbox] |
| 18c96c6 | style: оформить .checklist-row input[type=text] |
| 2ca1275 | style: оформить .checklist-row input[type=text]:hover |
| 22caef7 | style: оформить .checklist-row.checked input[type=text] |
| 2d98ae2 | style: оформить .task-drawer .dialog-actions |
| fef38e5 | style: оформить .save-hint |
| 48e724c | style: оформить .task-drawer .dialog-actions .auth-btn |
| 3cfb120 | style: оформить .checklist-track |
| db52395 | style: оформить тёмную тему [data-theme=dark] .view-btn |
| 07c7e36 | style: оформить тёмную тему [data-theme=dark] .view-btn.active |
| 36eff51 | style: оформить тёмную тему [data-theme=dark] .view-btn>span |
| a7d4a9c | style: оформить тёмную тему [data-theme=dark] .view-date |
| e384475 | style: оформить тёмную тему [data-theme=dark] #label-filter |
| 158c170 | style: оформить тёмную тему [data-theme=dark] .task-open:hover .task-text |
| 6f450dd | style: оформить тёмную тему [data-theme=dark] .task-description |
| 024c6cb | style: оформить тёмную тему [data-theme=dark] .label-green |
| 8994835 | style: оформить тёмную тему [data-theme=dark] .label-blue |
| 154049e | style: оформить тёмную тему [data-theme=dark] .label-purple |
| 3df8ca0 | style: оформить тёмную тему [data-theme=dark] .label-orange |
| acf8f18 | style: оформить тёмную тему [data-theme=dark] .label-pink |
| 425a916 | style: оформить тёмную тему [data-theme=dark] .due-badge,[data-theme=dark] .checklist-summary |
| 6ee9937 | style: оформить тёмную тему [data-theme=dark] .due-badge.is-overdue |
| f4c21e4 | style: оформить тёмную тему [data-theme=dark] .due-badge.is-today |
| 107259e | style: оформить тёмную тему [data-theme=dark] .overdue-card |
| 85aba7e | style: оформить тёмную тему [data-theme=dark] .card-check-track,[data-theme=dark] .checklist-track |
| 7345b1e | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=complete] |
| a214fe4 | style: оформить тёмную тему [data-theme=dark] .task-btn[data-action=complete]:hover |
| 38da0b2 | style: оформить тёмную тему [data-theme=dark] .empty-illustration |
| 1d9823e | style: оформить тёмную тему [data-theme=dark] .empty-illustration svg |
| 6f12288 | style: оформить тёмную тему [data-theme=dark] .empty-illustration>span |
| d79c805 | style: оформить тёмную тему [data-theme=dark] .today-group h2 |
| e32931f | style: оформить тёмную тему [data-theme=dark] .today-group h2>span |
| 66669a8 | style: оформить тёмную тему [data-theme=dark] .today-empty |
| 9cfe62f | style: оформить тёмную тему [data-theme=dark] .today-empty h2 |
| aab77a7 | style: оформить тёмную тему [data-theme=dark] .task-drawer::backdrop |
| 5672d67 | style: оформить тёмную тему [data-theme=dark] .drawer-body>label,[data-theme=dark] .deadline-field>label,[data-theme=dark] .details-section h3 |
| e6bbb15 | style: оформить тёмную тему [data-theme=dark] .due-input-row input,[data-theme=dark] .label-entry input,[data-theme=dark] .label-entry select,[data-theme=dark] .checklist-entry input |
| 07eb7ed | style: оформить тёмную тему [data-theme=dark] .date-shortcuts button,[data-theme=dark] .label-presets button |
| 1674116 | style: оформить тёмную тему [data-theme=dark] .checklist-row input[type=text] |
| 719802b | style: оформить тёмную тему [data-theme=dark] .checklist-row.checked input[type=text] |
| 492972d | style: оформить тёмную тему [data-theme=dark] .text-btn |
| fad66b9 | style: оформить тёмную тему [data-theme=dark] .optional,[data-theme=dark] .save-hint |
| 18db929 | style: адаптировать интерфейс @media(min-width:1650px) |
| 57abe8e | style: адаптировать интерфейс @media(max-width:1150px) |
| 827b0ea | style: адаптировать интерфейс @media(max-width:800px) |
| 52d7681 | style: адаптировать интерфейс @media(max-width:560px) |
| a7fb741 | assets: добавить изображение ArrowLeft.webp |
| 95e5ef3 | assets: добавить изображение ArrowRight.webp |
| 65a77d7 | assets: добавить изображение CheckMark.webp |
| f2b44ee | assets: добавить изображение Pen.webp |
| a5d01c0 | assets: добавить изображение Save.webp |
| 84249da | assets: добавить изображение Trashcan.webp |
| 8d7dad9 | docker: исключить секреты и локальные файлы из образа |
| bdcc9b5 | docker: собрать PHP с Apache и PDO MySQL |
| 1d5808a | docker: настроить приложение, MySQL и миграции |
| bdead57 | test: добавить проверку синтаксиса PHP |
| d4a5898 | test: проверить авторизацию, задачи и изоляцию пользователей |
| 3f85a63 | ci: запускать сборку, миграции и HTTP-проверки на GitHub |
| 3c090e1 | docs: сохранить результаты аудита проекта |
| cdd11e4 | docs: описать идеи развития приложения |
| e3b0f5e | docs: описать пользовательский сценарий срочной задачи |
| 987c3c5 | docs: добавить полную инструкцию запуска и отметить восстановленную историю |
