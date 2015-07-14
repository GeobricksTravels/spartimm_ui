define(['jquery',
        'backbone',
        'AUTH',
        'models/Event',
        'views/EventView',
        'domReady!'], function($, Backbone, AUTH, Event, EventView) {

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
                ''                      :   'home',
                '(/):lang(/)'           :   'home',
                '(/):lang(/)events(/)'  :   'events'
            },

            /* Overwrite language settings. */
            init_language: function (lang) {

                /* Initiate language. */
                lang = (lang !== null) ? lang : 'en';
                require.config({'locale': lang});
                var locale = localStorage.getItem('locale');
                localStorage.setItem('locale', lang);
                if (locale !== lang) {
                    localStorage.setItem('locale', lang);
                    location.reload();
                }
                _this.CONFIG.lang = lang;

            }

        });

        /* Initiate router. */
        var app_router = new AppRouter;

        /* Root URL. */
        app_router.on('route:home', function (lang) {

            /* Set default language. */
            lang = lang != null ? lang : 'en';

            /* Setup language. */
            this.init_language(lang);

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

            /* Set default language. */
            lang = lang != null ? lang : _this.CONFIG.lang;

            /* Setup language. */
            this.init_language(lang);

            /* Display events. */
            new Event().fetch({
                success: function (data) {
                    var view = new EventView({model: data.toJSON(), el: $('#placeholder')});
                    view.render();
                }
            });

        });

        /* Initiate Backbone history. */
        Backbone.history.start();

    };

    return ROUTER;

});