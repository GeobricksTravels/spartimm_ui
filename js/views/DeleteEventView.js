define(function (require) {

    'use strict';

    require('bootstrap');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var translate = require('i18n!application/nls/translate');
    var templates = require('text!application/html/templates.hbs');
    var Event = require('models/Event');

    return Backbone.View.extend({

        events: {
            'click #delete_events_button': 'create_event',
            'click #go_back_to_events_button': 'go_back_to_events'
        },

        render: function() {

            /* Load header. */
            this.create_header();

            /* Retrieve user details. */
            var name = this.get_cookie('name');
            var image_url = this.get_cookie('image_url');

            /* Prepare data for Handlebars. */
            var events = [];
            for (var key in Object.keys(this.model)) {
                if (this.model[key] != undefined)
                    events.push(this.model[key]);
            }

            /* Load template. */
            var source = $(templates).filter('#delete_event_structure').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events: events
            };
            var html = template(dynamic_data);
            this.$el.find('[data-role="content"]').html(html);

        },

        create_event: function(e) {

            e.preventDefault();
            e.stopPropagation();

            /* Create the event. */
            var event = new Event({
                name: $('#create_event_name').val(),
                users: [
                    {
                        user_id: this.get_cookie('user_id'),
                        name: this.get_cookie('name'),
                        image_url: this.get_cookie('image_url')
                    }
                ]
            }).save(null, {
                    success: function(model, response) {
                        Backbone.history.navigate('/en/events/', {trigger: true});
                    },
                    error: function(model, response) {

                    }
                });

        },

        go_back_to_events: function() {
            Backbone.history.navigate('/en/events/', {trigger: true});
        },

        get_cookie: function(key) {
            return document.cookie.substring((key + '=').length + document.cookie.indexOf(key),
                                             document.cookie.indexOf(';', document.cookie.indexOf(key)))
        },

        create_header: function() {

            /* Load header. */
            var source = $(templates).filter('#delete_event_header').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                delete_event_label: translate.delete_event_label
            };
            var html = template(dynamic_data);
            this.$el.find('[data-role="header"]').html(html);

            /* make the header sticky. */
            $('#event_header').affix({
                offset: {
                    top: 0
                }
            });

        }

    });

});