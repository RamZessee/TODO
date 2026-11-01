<?php
function icon(string $name): string {
    $paths = [
        'board' => '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 3v18M15 3v18"/>',
        'plus' => '<path d="M12 5v14M5 12h14"/>',
        'search' => '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
        'arrow' => '<path d="M5 12h14m-6-6 6 6-6 6"/>',
        'check' => '<path d="m5 12 4 4L19 6"/>',
        'user' => '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
        'logout' => '<path d="M9 4H4v16h5m5-12 4 4-4 4m-6-4h13"/>',
        'close' => '<path d="m6 6 12 12M6 18 18 6"/>',
        'layers' => '<path d="m12 3 10 6-10 6L2 9Zm-9 12 9 5 9-5M3 15l9 5 9-5"/>',
    ];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . ($paths[$name] ?? $paths['board']) . '</svg>';
}
