define(function (require) {

    'use strict';

    require('bootstrap');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var translate = require('i18n!application/nls/translate');
    var templates = require('text!application/html/templates.hbs');
    var Event = require('models/Event');
    var CreateEventView = require('views/CreateEventView');

    return Backbone.View.extend({

        events: {
            'click #delete_events_button'   :   'show_delete_events',
            'click #add_event_button'       :   'show_create_event_form'
        },

        render: function() {

            /* This... */
            var _this = this;

            /* Load header. */
            this.create_header();

            /* Prepare data for Handlebars. */
            var events = [];
            for (var key in Object.keys(this.model)) {
                if (this.model[key] != undefined)
                    events.push(this.model[key]);
            }

            /* Render events. */
            var source = $(templates).filter('#event_structure').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events: events,
                ongoing_label: translate.ongoing_label,
                finished_label: translate.finished_label
            };
            var html = template(dynamic_data);
            this.$el.find('[data-role="content"]').html(html);

            /* Return... */
            return this;

        },

        show_create_event_form: function() {
            Backbone.history.navigate('/en/events/create/', {trigger: true});
        },

        show_delete_events: function() {
            Backbone.history.navigate('/en/events/delete/', {trigger: true});
        },

        get_cookie: function(key) {
            return document.cookie.substring((key + '=').length + document.cookie.indexOf(key), document.cookie.indexOf(';', document.cookie.indexOf(key)))
        },

        create_header: function() {

            /* Load header. */
            var source = $(templates).filter('#event_header').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events_label: translate.events_label
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