define(['i18n!application/nls/translate',
        'https://apis.google.com/js/client.js?onload=define'], function(translate) {

    'use strict';

    function AUTH() {

    }

    AUTH.prototype.google = function() {

        /* Initiate object. */
        var auth2 = {};

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
                    console.debug(user);
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