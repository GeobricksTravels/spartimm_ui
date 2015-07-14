define(function (require) {

    'use strict';

    var Event = require('models/Event');

    return Backbone.Collection.extend({

        model: Event

    });

});