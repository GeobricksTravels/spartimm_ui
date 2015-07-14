define(function (require) {

        'use strict';

        var Backbone = require('backbone');

        return Backbone.Model.extend({

            urlRoot: 'http://127.0.0.1:5000/dao/activities/',

            url : function() {
                return this.urlRoot + this.attributes.event_id + '/prod/';
            },

            initialize: function (attributes, options) {

            },

            defaults: {
                _id: null,
                event_id: null,
                users: [],
                name: null,
                location: null,
                total: null
            },

            validate: function (attrs) {

            }

        });

    }

);