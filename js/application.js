define(['jquery',
        'ROUTER',
        'domReady!'], function($, ROUTER) {

    'use strict';

    function APP() {

        this.CONFIG = {
            geobricks_config: null
        }

    }

    APP.prototype.init = function() {

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init({});

    };

    return APP;

});