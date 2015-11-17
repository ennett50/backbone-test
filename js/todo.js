$(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };


    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs){
            if (!$.trim(attrs.title)) {
                return 'Name is empty'
            }
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',
        template : template('taskTemplate'),

        initialize : function(){
           // _.bindAll(this, 'editTask', 'render');
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        events: {
            'click .edit' : 'editTask',
            'click .delete' : 'destroyTask'
        },
        editTask : function(){
            var newTaskTitle = prompt('How to rename this task?', this.model.get('title'));
            //if (!newTaskTitle) return;
            this.model.set('title', newTaskTitle, {validate: true});
        },
        destroyTask : function(){
            this.model.destroy();
            //console.log(tasksCollection);
        },
        remove : function(){
            this.$el.remove();
        }
    });
    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ol',
        initialize : function(){
            this.collection.on('add', this.addOne, this);
        },
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


    App.Views.AddTask = Backbone.View.extend({

        el : '#addTask',
        events: {
          'submit' : 'submit'
        },
        initialize: function(){
           //console.log(this.el.innerHTML)
        },
        submit: function(e){
            e.preventDefault();
            var newTitle = this.$el.find('input[type="text"]').val();
            var newTask = new App.Models.Task({ title:  newTitle});
            this.collection.add(newTask);
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

    var addTaskView = new App.Views.AddTask({
        collection:  tasksCollection
    })

});