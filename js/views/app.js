/*views  app.js*/
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#todoapp',

    statsTemplate: _.template($('#stats-template').html()),

    initialize: function () {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        this.listenTo(app.Todos,'add',this.addOne);
        this.listenTo(app.Todos,'reset',this.addAll);
    },

    //通过创建一个视图来向列表中添加一个todo项，并将其(html
    // 元素)显示在ul中
    addOne : function (todo) {
        var view = new app.TodoView({model: todo});
        $('#todo-list').append( view.render().el );
    },

    //Add all items in the **Todos** collection at once
    addAll : function () {
        this.$('#todo-list').html('');
        app.Todos.each(this.addOne,this);
    }
});