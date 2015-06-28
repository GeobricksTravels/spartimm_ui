define(['jquery', 'backbone'], function ($, Backbone) {

        'use strict';

        var User;
        User = Backbone.Model.extend({

            initialize: function () {

            },

            defaults: {
                label: null,
                username: null,
                email: null,
                phone: null
            },

            validate: function (attrs) {

            }

        });

        return User;

    }

);