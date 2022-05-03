const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/bootstrap.js', 'public/js')
    .js('resources/js/parking-c/chart-one-day.js', 'public/js/parking-c')
    .js('resources/js/parking-c/chart-bubble.js', 'public/js/parking-c')
    .postCss('resources/css/app.css', 'public/css', [
        require("tailwindcss"),
    ]);
