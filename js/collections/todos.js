/*js/collections/todos.js*/
var app = app || {};

var TodoList = Backbone.Collection.extend({
    //Reference to this collection's model
    //the model type used by collection.create() to instantiate new model in the collection
    model: app.Todo,

    //Save all of the todo items under the "todos-backbone" namespace
    localStorage: new Backbone.LocalStorage('todos-backbone'),
    //localStorage: new Store('todos-backbone'),
   //localStorage : new Backbone.
    //Filter down the list of all todo items that are finished.
    completed: function () {
        return this.filter(function( todo ){
            return todo.get('completed');
        });
    },

    //Filter down the list to only todo items that are still not finished
    remaining: function () {
        return this.without.apply(this,this.completed());
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    // 保证todos的顺序。
    nextOrder: function () {
        if ( !this.length ) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    comparator: function (todo) {
        return todo.get('order');
    }
});

//create our global collection of ***Todos**
app.Todos = new TodoList();