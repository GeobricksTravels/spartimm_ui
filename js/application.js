define(['jquery',
        'handlebars',
        'text!application/html/templates.hbs',
        'i18n!application/nls/translate',
        'AUTH',
        'ROUTER',
        'amplify',
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
        console.debug(this.CONFIG.user_id);
        if (this.CONFIG.user_id == null) {
            var auth = new AUTH();
            auth.init({
                create_user: this.create_user,
                placeholder_id: this.CONFIG.placeholder_id
            });
        }

        /* Handle user creation. */
        this.create_user();

    };

    APP.prototype.create_user = function() {

        /* This... */
        var _this = this;

        amplify.subscribe('user', function(data) {

            $.ajax({

                url: _this.CONFIG.url_dao,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data.user),
                contentType: 'application/json',

                success: function(response) {

                    /* Cast the response to JSON, if needed. */
                    var json = response;
                    if (typeof json == 'string')
                        json = $.parseJSON(response);

                    /* Show user name and image. */
                    $('#logo_image').attr('src', data.user.image_url);
                    $('#logo_welcome_message').html(translate.welcome +
                        data.user.name + '!' +
                        '<br><small>[' + json._id.$oid + ']</small>');

                    /* Store user id. */
                    _this.CONFIG.user_id = json._id.$oid;

                },

                error: function (e) {
                    swal({
                        title: translate.error,
                        type: 'error',
                        text: e.statusText + ' (' + e.status + ')',
                        html: true
                    });
                }

            });

        });

    };

    return APP;

});