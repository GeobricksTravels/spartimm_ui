require.config({

    baseUrl: 'js/libs',

    paths: {
        application: '../../',
        APPLICATION: '../application',
        auth: '../../',
        AUTH: '../auth',
        router: '../../',
        ROUTER: '../router',
        facebook: '//connect.facebook.net/en_US/sdk'
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
        },
        facebook : {
            exports: 'FB'
        }
    }

});

require(['APPLICATION'], function(APP) {

    /* Initiate components. */
    var app = new APP();

    /* Initiate the application. */
    app.init();

});