define(function (require) {

    'use strict';

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Bootstrap = require('bootstrap');
    var Handlebars = require('handlebars');
    var translate = require('i18n!application/nls/translate');
    var templates = require('text!application/html/templates.hbs');

    return Backbone.View.extend({

        tagName: 'div',

        className: 'item-wrap',

        template: $(templates).filter('#event_structure').html(),

        render: function() {

            /* This... */
            var _this = this;

            /* Load header. */
            this.create_header();

            /* Enhance buttons. */
            $('#add_event_button').click(function() {
                _this.show_create_event_form();
            });

            /* Prepare data for Handlebars. */
            var events = [];
            for (var key in Object.keys(this.model)) {
                if (this.model[key] != undefined)
                    events.push(this.model[key]);
            }

            /* Load sign-in page. */
            var source = $(templates).filter('#event_structure').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events: events,
                ongoing_label: translate.ongoing_label,
                finished_label: translate.finished_label
            };
            var html = template(dynamic_data);
            this.$el.append(html);

            /* Return... */
            return this;

        },

        show_create_event_form: function() {

            /* Load template. */
            var source = $(templates).filter('#event_structure_edit').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events_label: translate.events_label
            };
            var html = template(dynamic_data);
            this.$el.html(html);

        },

        create_header: function() {

            /* Clean interface. */
            this.$el.html('');

            /* Load header. */
            var source = $(templates).filter('#event_header').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events_label: translate.events_label
            };
            var html = template(dynamic_data);
            $('#header').append(html);

            /* make the header sticky. */
            $('#event_header').affix({
                offset: {
                    top: 0
                }
            });

        }

    });

});