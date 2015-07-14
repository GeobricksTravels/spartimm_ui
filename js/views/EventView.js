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

            /* Load header. */
            var source = $(templates).filter('#event_header').html();
            var template = Handlebars.compile(source);
            var dynamic_data = {
                events_label: translate.events_label
            };
            var html = template(dynamic_data);
            this.$el.append(html);

            /* make the header sticky. */
            $('#event_header').affix({
                offset: {
                    top: 0
                }
            });

            /* Prepare data for Handlebars. */
            var events = [];
            for (var key in Object.keys(this.model)) {
                if (this.model[key] != undefined)
                    events.push(this.model[key]);
            }

            /* Load sign-in page. */
            source = $(templates).filter('#event_structure').html();
            template = Handlebars.compile(source);
            dynamic_data = {
                events: events
            };
            html = template(dynamic_data);
            this.$el.append(html);

            /* Return... */
            return this;

        }

    });

});