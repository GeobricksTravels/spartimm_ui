define(function (require) {

    'use strict';

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var translate = require('i18n!application/nls/translate');
    var templates = require('text!application/html/templates.hbs');

    return Backbone.View.extend({

        tagName: 'div',

        className: 'item-wrap',

        template: $(templates).filter('#event_structure').html(),

        render: function() {

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
                events: events
            };
            var html = template(dynamic_data);
            this.$el.html(html);

            return this;

        }

    });

});