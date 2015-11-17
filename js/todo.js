$(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };


    App.Models.Task = Backbone.Model.extend({});

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',
        template : template('taskTemplate'),

        initialize : function(){
           // _.bindAll(this, 'editTask', 'render');
            this.model.on('change', this.render, this);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        events: {
            'click .edit' : 'editTask'
        },
        editTask : function(){
            var newTaskTitle = prompt('How to rename this task?', this.model.get('title'));
            this.model.set('title', newTaskTitle);
        }

    });
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ol',
        render: function () {
            this.collection.each(this.addOne, this);
            return this
        },
        addOne: function(task){
            var taskView = new App.Views.Task({
                model: task
            });
            this.$el.append(taskView.render().el)
        }
    });

    App.Collections.Task =  Backbone.Collection.extend({
        model: App.Models.Task
    });

    var tasksCollection = new App.Collections.Task([
        {
            title: 'Go to the shop',
            priority: 4
        },
        {
            title: 'Get post office',
            priority: 3
        },
        {
            title: 'Go to job',
            priority: 5
        }
    ]);
    var tasksView = new App.Views.Tasks({
        collection:  tasksCollection
    });


    $('.tasks').append(tasksView.render().el);

    //console.log(App.Views.Tasks.render().el)

});