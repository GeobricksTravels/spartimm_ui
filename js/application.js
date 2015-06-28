define(['jquery',
        'handlebars',
        'text!application/html/templates.hbs',
        'i18n!application/nls/translate',
        'AUTH',
        'ROUTER',
        'domReady!'], function($, Handlebars, templates, translate, AUTH, ROUTER) {

    'use strict';

    function APP() {

        this.CONFIG = {
            lang: 'en',
            placeholder_id: 'placeholder'
        }

    }

    APP.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init({});

        /* Load sign-in page. */
        var source = $(templates).filter('#login_structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {
            facebook_login_label: translate.facebook_login_label,
            google_login_label: translate.google_login_label
        };
        var html = template(dynamic_data);
        $('#' + this.CONFIG.placeholder_id).html(html);

        /* Load Google sign-in. */
        AUTH.google();

    };

    return APP;

});