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

        tagName: 'div',

        className: 'item-wrap',

        template: $(templates).filter('#event_structure').html(),

        events: {
            'click #create_event_button': 'create_event'
        },

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

            /* This... */
            var _this = this;

            /* Retrieve user details. */
            var name = this.get_cookie('name');
            var image_url = this.get_cookie('image_url');

            /* Load template. */
            var source = $(templates).filter('#event_structure_edit').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                name: name,
                image_url: image_url
            };
            var html = template(dynamic_data);
            this.$el.html(html);

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
                    console.log(response);
                    Backbone.history.navigate('/en/events/', {trigger: true, replace: true});
                },
                error: function(model, response) {

                }
            });

        },

        get_cookie: function(key) {
            return document.cookie.substring((key + '=').length + document.cookie.indexOf(key), document.cookie.indexOf(';', document.cookie.indexOf(key)))
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