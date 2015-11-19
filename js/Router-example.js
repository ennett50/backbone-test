$(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {}
    };
    //глобальный кастомный объект событий
    var vent = _.extend({}, Backbone.Events);

    //console.log(vent);

    App.Views.SpecialTask = Backbone.View.extend({
        initialize: function () {
            vent.on('specialTasks:show', this.show, this)
        },
        show: function (id) {
            console.log('show / ' + id)
        }

    });


    window.template = function (id) {
        return _.template($('#' + id).html());
    };


    App.Router = Backbone.Router.extend({
        routes: {
            '': 'start',
            'page/:id': 'page',
            'splat/:id/*simbo': 'splat',
            // 'search/:query' : 'search',

            'specialTasks/:id': 'showSpecialTasks',
            '*other': 'defaulting' //404,

        },
        start: function () {
            console.log('Page is start')
        },
        page: function (id) {
            console.log('Router page/' + id)
        },
        splat: function (id) {
            console.log('Router splat/' + id)
        },
        defaulting: function (page) {
            alert('page not found ' + page)
        },
        showSpecialTasks: function (id) {
            vent.trigger('specialTasks:show', id)
        }


    });


    new App.Views.SpecialTask;

    new App.Router();
    Backbone.history.start();
});