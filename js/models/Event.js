define(function (require) {

        'use strict';

        var Backbone = require('backbone');

        return Backbone.Model.extend({

            urlRoot: 'http://127.0.0.1:5000/dao/events/prod/',

            defaults: {
                users: [],
                total: 0,
                name: null,
                status: true,
                date_last_update: null
            }

        });

    }

);