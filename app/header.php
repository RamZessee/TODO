<?php if ($page !== 'tasks'): ?>
<header class="site-header">
    <a class="brand" href="index.php"><span class="brand-mark"><?= icon('layers') ?></span>to<span class="brand-light">do</span><span class="brand-period">.</span></a>
    <div class="header-actions"><span class="header-caption">Меньше хаоса. Больше сделанного.</span><?php require __DIR__ . '/theme-toggle.php'; ?></div>
</header>
<?php endif; ?>

