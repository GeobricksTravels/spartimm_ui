define(['i18n!application/nls/translate',
        'facebook',
        'swal',
        'https://apis.google.com/js/client.js?onload=define'], function(translate) {

    'use strict';

    function AUTH() {
        this.CONFIG = {
            url_dao: 'http://127.0.0.1:5000/dao/users/prod/'
        }
    }

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

    AUTH.prototype.google = function() {

        /* Initiate objects. */
        var auth2 = {};
        var _this = this;

        /* Load Google API. */
        gapi.load('auth2', function(){

            /* Initiate API. */
            auth2 = gapi.auth2.init({
                client_id: '434353927155-kfl4co4ijbn18mesrpom116cikeq9339.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope:'https://www.googleapis.com/auth/plus.login'
            });

            /* Implement click listener. */
            auth2.attachClickHandler(document.getElementById('google_login'), {},

                /* Success. */
                function(googleUser) {

                    /* Create user object. */
                    var user = {
                        user_id: googleUser.getBasicProfile().getId(),
                        name: googleUser.getBasicProfile().getName(),
                        email: googleUser.getBasicProfile().getEmail(),
                        image_url: googleUser.getBasicProfile().getImageUrl()
                    };
                    _this.create_user(user);

                },

                /* Error. */
                function(error) {
                    alert(JSON.stringify(error, undefined, 2));
                }

            );

        });

    };

    return new AUTH();

});