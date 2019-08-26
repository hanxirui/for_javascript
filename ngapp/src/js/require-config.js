var requireConfig = {
    baseUrl: 'js',
    waitSeconds: 0,
    // List of all the dependencies
    paths: {

        jquery: '/bower_components/jquery/dist/jquery.min',
        lodash: '/bower_components/lodash/dist/lodash.min',
        angular: '/bower_components/angular/angular'
    },
    map: {
        '*': {
            css: '/bower_components/require-css/css.min.js',
            json: '/bower_components/requirejs-json/json.js',
            text: '/bower_components/requirejs-text/text.js'
        }
    },

    // Ensure that the dependencies are loaded in the right order
    shim: {
        jquery: {
            exports: '$'
        },
        jqueryLang: {
            exports: 'Lang',
            deps: ['jquery', 'js.cookie']
        },
        lodash: {
            exports: '_'
        },
        angular: {
            deps: ['jquery', 'css!angularCsp'],
            exports: 'angular'
        }
    }
};

try {
    window.requireConfig = requireConfig;
} catch (e) {}

try {
    module.exports = requireConfig;
} catch (e) {}