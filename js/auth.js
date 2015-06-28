define(['i18n!application/nls/translate',
        'swal',
        'https://apis.google.com/js/client.js?onload=define'], function(translate) {

    'use strict';

    function AUTH() {
        this.CONFIG = {
            url_dao: 'http://127.0.0.1:5000/dao/users/prod/'
        }
    }

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

                    /* Show user name and image. */
                    $('#logo_image').attr('src', googleUser.getBasicProfile().getImageUrl());
                    $('#logo_welcome_message').html(translate.welcome + googleUser.getBasicProfile().getName() + '!');

                    /* Create user object. */
                    var user = {
                        user_id: googleUser.getBasicProfile().getId(),
                        name: googleUser.getBasicProfile().getName(),
                        email: googleUser.getBasicProfile().getEmail(),
                        image_url: googleUser.getBasicProfile().getImageUrl()
                    };

                    $.ajax({

                        url: _this.CONFIG.url_dao,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(user),
                        contentType: 'application/json',

                        success: function (response) {

                            /* Cast the response to JSON, if needed. */
                            var json = response;
                            if (typeof json == 'string')
                                json = $.parseJSON(response);
                            console.debug(json);

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