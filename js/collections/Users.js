define(['jquery', 'backbone', 'models/User'], function ($, Backbone, User) {

        'use strict';

        /*
         https://antoviaque.org/docs/tutorials/backbone-relational-tutorial/
         */
        var Users;
        Users = Backbone.Collection.extend({

            model: User

        });

        return Users;

    }

);