define(['jquery',
        'handlebars',
        'text!auth/html/templates.hbs',
        'i18n!auth/nls/translate',
        'facebook',
        'swal',
        'https://apis.google.com/js/client.js?onload=define'], function($, Handlebars, templates, translate) {

    'use strict';

    function AUTH() {
        this.CONFIG = {
            user_id: null,
            create_user_success: null,
            placeholder_id: null,
            url_dao: 'http://127.0.0.1:5000/dao/users/prod/'
        }
    }

    AUTH.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Display login options if the user is not logged in. */
        if (this.CONFIG.user_id == null) {

            /* This... */
            var _this = this;

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
            this.google();

            /* Load Facebook sign-in. */
            $('#facebook_login').click(function () {
                _this.facebook();
            });

        }

    };

    AUTH.prototype.facebook = function() {
        var _this = this;
        FB.init({
            appId      : '861172487306706',
            version    : 'v2.3',
            xfbml      : true,
            oauth   : true,
            status  : true
        });
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                _this.handle_facebook_response(response);
            } else if (response.status === 'not_authorized') {
                FB.login(function(response){
                    _this.handle_facebook_response(response);
                }, {scope: 'email,user_likes'});
            } else {
                FB.login(function(response){
                    _this.handle_facebook_response(response);
                }, {scope: 'email,user_friends'});
            }
        });
    };

    AUTH.prototype.handle_facebook_response = function(facebook_response) {
        var _this = this;
        FB.api('/me', function(response) {
            FB.api(
                '/me/picture',
                function (picture_response) {
                    /* Create user object. */
                    var user = {
                        user_id: response.id,
                        name: response.name,
                        email: response.email,
                        image_url: picture_response.data.url
                    };
                    _this.create_user(user);
                }
            );
        });
    };

    AUTH.prototype.create_user = function(user) {

        $.ajax({

            url: this.CONFIG.url_dao,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json',

            success: this.CONFIG.create_user_success,

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

    AUTH.prototype.google = function() {

        /* Initiate objects. */
        var auth2 = {};
        var client_id = '434353927155-kfl4co4ijbn18mesrpom116cikeq9339.apps.googleusercontent.com';
        var scope = 'https://www.googleapis.com/auth/plus.login';
        var _this = this;

        /* Load Google API. */
        gapi.load('auth2', function() {
            $('#google_login').click(function() {
                gapi.auth.authorize({
                    client_id: client_id,
                    scope: scope,
                    immediate: true
                }, function(result) {
                    if (result && !result.error) {
                        gapi.client.load('plus', 'v1', function() {
                            var request = gapi.client.plus.people.get({
                                'userId': 'me'
                            });
                            request.execute(function(googleUser) {
                                var user = {
                                    user_id: googleUser.id,
                                    name: googleUser.displayName,
                                    email: googleUser.emails[0].value,
                                    image_url: googleUser.image.url
                                };
                                _this.create_user(user);
                            });
                        });
                    } else {
                        gapi.client.load('plus', 'v1', function() {
                            var request = gapi.client.plus.people.get({
                                'userId': 'me'
                            });
                            request.execute(function(googleUser) {
                                var user = {
                                    user_id: googleUser.id,
                                    name: googleUser.displayName,
                                    email: googleUser.emails[0].value,
                                    image_url: googleUser.image.url
                                };
                                _this.create_user(user);
                            });
                        });
                    }
                });
            });
        });

    };

    return AUTH;

});