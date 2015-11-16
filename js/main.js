//var Person = function(config){
//    this.name=config.name;
//    this.age=config.age;
//    this.job=config.job;
//};
//
//Person.prototype.walk = function(){
//  return this.name + 'is walking'
//};
//var nick = new Person({
//    name: "Nick",
//    age: "24",
//    job: "Frontend Developer"
//});

var Person = Backbone.Model.extend({
    defaults: {
        name: 'Dima',
        age: '24',
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

var PersonView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#person-id').html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        //наполнение html
        //антипатерн
        //this.$el.html(this.model.get('name') + '(' + this.model.get('age') + ')')
        this.$el.html(this.template(this.model.toJSON()));
    }


});


var person = new Person;
var personView = new PersonView({model: person});