define(['jquery',
        'backbone',
        'AUTH',
        'models/Event',
        'views/EventView',
        'models/Activity',
        'views/ActivityView',
        'views/CreateEventView',
        'views/DeleteEventView',
        'domReady!'], function($, Backbone, AUTH, Event, EventView, Activity, ActivityView,
                               CreateEventView, DeleteEventView) {

    'use strict';

    function ROUTER() {

        this.CONFIG = {
            placeholder_id: 'placeholder',
            url_dao: 'http://127.0.0.1:5000/dao/users/prod/'
        }

    }

    ROUTER.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang !== null ? this.CONFIG.lang : 'en';

        /* This... */
        var _this = this;

        /* Define the router. */
        var AppRouter = Backbone.Router.extend({

            /* Define the routes. */
            routes: {
                ''                                      :   'home',
                '(/):lang(/)'                           :   'home',
                '(/):lang(/)events(/)'                  :   'events',
                '(/):lang(/)activities(/):event_id(/)'  :   'activities',
                '(/):lang(/)events(/)create(/)'         :   'create_event',
                '(/):lang(/)events(/)delete(/)'         :   'delete_event'
            }

        });

        /* Initiate router. */
        var app_router = new AppRouter;

        /* Root URL. */
        app_router.on('route:home', function (lang) {

            /* Initiate authorization. */
            var auth = new AUTH();
            auth.init({
                lang: _this.CONFIG.lang,
                placeholder_id: _this.CONFIG.placeholder_id,
                url_dao: _this.CONFIG.url_dao
            });

        });

        /* Events. */
        app_router.on('route:events', function (lang) {

            /* Display events. */
            new Event().fetch({
                success: function (data) {
                    var view = new EventView({
                        model: data.toJSON(),
                        el: $('#placeholder')
                    });
                    view.render();
                }
            });

        });

        /* Create a new event. */
        app_router.on('route:create_event', function (lang) {

            /* Display event form. */
            var view = new CreateEventView({
                el: $('#' + _this.CONFIG.placeholder_id)
            });
            view.render();

        });

        /* Delete an event. */
        app_router.on('route:delete_event', function (lang) {

            /* Delete events. */
            new Event().fetch({
                success: function (data) {
                    var view = new DeleteEventView({
                        model: data.toJSON(),
                        el: $('#placeholder')
                    });
                    view.render();
                }
            });

        });

        /* Activities. */
        app_router.on('route:activities', function (lang, event_id) {

            /* Display events. */
            new Activity({event_id: event_id}).fetch({
                success: function (data) {
                    var view = new ActivityView({
                        model: data.toJSON(),
                        id: event_id,
                        el: $('#placeholder')
                    });
                    view.render();
                }
            });

        });

        /* Initiate Backbone history. */
        Backbone.history.start();

    };

    ROUTER.prototype.init_language = function(lang) {
        lang = (lang !== null) ? lang : 'en';
        this.CONFIG.lang = lang;
        try {
            require.config({'locale': lang});
            var locale = localStorage.getItem('locale');
            localStorage.setItem('locale', lang);
            if (locale !== lang) {
                localStorage.setItem('locale', lang);
                location.reload();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return ROUTER;

});