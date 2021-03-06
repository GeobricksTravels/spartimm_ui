require.config({

    baseUrl: 'js/libs',

    paths: {
        application: '../../',
        APPLICATION: '../application',
        auth: '../../',
        AUTH: '../auth',
        router: '../../',
        ROUTER: '../router'
    },

    shim: {
        bootstrap: ['jquery'],
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        highcharts: ['jquery'],
        underscore: {
            exports: '_'
        }
    }

});

require(['APPLICATION'], function(APP) {

    /* Initiate components. */
    var app = new APP();

    /* Initiate the application. */
    app.init();

});