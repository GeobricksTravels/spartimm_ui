define(function (require) {

        'use strict';

        var Backbone = require('backbone');

        return Backbone.Model.extend({

            urlRoot: 'http://127.0.0.1:5000/dao/events/prod/',

            initialize: function () {

            },

            defaults: {
                _id: null,
                date_last_update: null,
                users: [],
                name: null,
                status: null,
                total: null
            },

            validate: function (attrs) {

            }

        });

    }

);