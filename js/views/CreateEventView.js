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
            'click #create_event_button': 'create_event',
            'click #go_back_to_events_button': 'go_back_to_events'
        },

        render: function() {

            /* This... */
            var _this = this;

            /* Load header. */
            this.create_header();

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
            this.$el.find('[data-role="content"]').html(html);

        },

        go_back_to_events: function() {
            Backbone.history.navigate('/en/events/', {trigger: true});
        },

        get_cookie: function(key) {
            return document.cookie.substring((key + '=').length + document.cookie.indexOf(key), document.cookie.indexOf(';', document.cookie.indexOf(key)))
        },

        create_header: function() {

            /* Load header. */
            var source = $(templates).filter('#create_event_header').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                create_event_label: translate.create_event_label
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