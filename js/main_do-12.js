//helper tpl

(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };


    App.Models.Person = Backbone.Model.extend({
        defaults: {
            name: 'Dima',
            age: '28',
            job: 'Frontend Developer'
        },

        validate: function (attrs, options) {
            //Person.toJSON();
            console.log(attrs);
            if (attrs.age <= 0) {
                return "Age cant be is negative"
            }
            if (!attrs.name) {
                return "Name is required field"
            }
        },

        walk: function () {
            return this.get('name') + ' is walking'
        }
    });

    //var person = new App.Models.Person();

    App.Collections.People = Backbone.Collection.extend({
        model: App.Models.Person
    });
//вид спска
    App.Views.People = Backbone.View.extend({
        tagName: 'ul',
        initialize: function () {
            //console.log('s')
            this.render();
        },
        render: function () {
            this.collection.each(function (person) {
                var personView = new App.Views.Person({model: person});
                this.$el.append(personView.render().el)
            }, this)
        }
    });

    App.Views.Person = Backbone.View.extend({
        tagName: 'li',
        template: template('person-id'),
        initialize: function () {
            this.render();
        },
        render: function () {
            //наполнение html
            //антипатерн
            //this.$el.html(this.model.get('name') + '(' + this.model.get('age') + ')')
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }


    });


//var personView = new PersonView({model: person});

    var peopleCollection = new App.Collections.People();
    peopleCollection.add([
        {
            name: 'Ivan'
        }, {
            age: 24,
            name: 'Ennet'
        }
    ]);

    var peopleView = new App.Views.People({
        collection: peopleCollection
    });
    $('body').append(peopleView.el);


}());