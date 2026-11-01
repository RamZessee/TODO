FROM php:8.4-apache

RUN docker-php-ext-install pdo_mysql \
    && cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && sed -ri 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf \
    && printf '%s\n' '<Directory /var/www/html/public>' '    Options -Indexes' '    AllowOverride None' '    Require all granted' '</Directory>' 'ServerTokens Prod' 'ServerSignature Off' > /etc/apache2/conf-available/todo.conf \
    && a2enconf todo

WORKDIR /var/www/html
COPY app/ app/
COPY public/ public/
COPY database/ database/
COPY scripts/ scripts/

EXPOSE 80
