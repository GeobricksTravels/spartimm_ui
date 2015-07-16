define(['jquery',
        'handlebars',
        'backbone',
        'text!application/html/templates.hbs',
        'i18n!application/nls/translate',
        'AUTH',
        'ROUTER',
        'amplify',
        'domReady!'], function($, Handlebars, Backbone, templates, translate, AUTH, ROUTER) {

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

        /* Load main structure. */
        var source = $(templates).filter('#structure').html();
        var template = Handlebars.compile(source);
        var dynamic_data = {};
        var html = template(dynamic_data);
        $('#' + this.CONFIG.placeholder_id).html(html);

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init({});

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
                    var d = new Date();
                    d.setTime(d.getTime() + 180000);
                    document.cookie='user_id=' + json._id.$oid + '; expires=' + d.toUTCString() + ';';

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