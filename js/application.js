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
            user_id: null,
            placeholder_id: 'placeholder',
            url_dao: 'http://127.0.0.1:5000/dao/users/prod/'
        }

    }

    APP.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init({});

        /* Initiate the authentication. */
        var auth = new AUTH();
        auth.init({
            create_user: this.create_user,
            placeholder_id: this.CONFIG.placeholder_id
        });

    };

    APP.prototype.create_user = function(user) {

        $.ajax({

            url: this.CONFIG.url_dao,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json',

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Show user name and image. */
                $('#logo_image').attr('src', user.image_url);
                $('#logo_welcome_message').html(translate.welcome +
                    user.name + '!' +
                    '<br><small>[' + json._id.$oid + ']</small>');

            },

            error: function(e) {
                swal({
                    title: translate.error,
                    type: 'error',
                    text: e.statusText + ' (' + e.status + ')',
                    html: true
                });
            }

        });

    };

    return APP;

});