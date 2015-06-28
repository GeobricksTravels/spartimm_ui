define(['jquery',
        'handlebars',
        'text!application/html/templates.hbs',
        'i18n!application/nls/translate',
        'ROUTER',
        'domReady!'], function($, Handlebars, templates, translate, ROUTER) {

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
        require(['https://apis.google.com/js/client.js?onload=define'], function() {
            var auth2 = {};
            gapi.load('auth2', function(){
                auth2 = gapi.auth2.init({
                    client_id: '434353927155-kfl4co4ijbn18mesrpom116cikeq9339.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    scope:'https://www.googleapis.com/auth/plus.login'
                });
                auth2.attachClickHandler(document.getElementById('google_login'), {},
                    function(googleUser) {
                        $('#logo_image').attr('src', googleUser.getBasicProfile().getImageUrl());
                        $('#logo_welcome_message').html(translate.welcome + googleUser.getBasicProfile().getName() + '!');
                        console.debug(googleUser);
                    }, function(error) {
                        alert(JSON.stringify(error, undefined, 2));
                    });
            });
        });




    };

    return APP;

});