define(['jquery', 'backbone'], function ($, Backbone) {

        'use strict';

        var Activity;
        Activity = Backbone.Model.extend({

            initialize: function () {

            },

            defaults: {
                label: null,
                location: null,
                photos: [],
                users: [],
                quantity: 1,
                price: null
            },

            validate: function (attrs) {

            }

        });

        return Activity;

    }

);