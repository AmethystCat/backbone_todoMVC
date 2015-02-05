/*views  todos.js*/
var app = app || {};


app.TodoView = Backbone.View.extend({
    tagName : 'li',
    //编译并缓存模板函数
    // _.template($('#item-template').html())返回一个javascript函数用于编译
    template : _.template($('#item-template').html()),

    //对每一条列表进行dom事件声明

    events : {
        'click .toggle' : 'togglecompleted',  //new
        'dbclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',
        'click .destroy' : 'clear' //new
    },
    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
        this.listenTo(this.model,'change',this.render);
        this.listenTo(this.model,'destroy',this.remove);   //new
        this.listenTo(this.model,'visible',this.toggleVisible); //new
    },
    render : function () {
       this.$el.html(this.template(this.model.toJSON()));

        this.$el.toggleClass( 'completed',this.model.get('completed') ); //new
        this.toggleVisible(); //new

        this.$input = this.$('.edit');
        return this;
    },

    //Switch this view into `"editing"` mode, displaying the input field.
    edit : function(){
        this.$el.addClass('editing');
        this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close : function(){
        var value = this.$input.val().trim();

        if ( value ) {
            this.model.save({title: value});
        }

        this.$el.removeClass('editing');
    },

    updateOnEnter : function(e){
        if (e.which === ENTER_KEY ) {
            this.close();
        }
    },

    //new - Toggles visibility of item

    toggleVisible : function () {
        this.$el.toggleClass( 'hidden', this.isHidden() );
    },

    //new - determins if item should be hidden
    isHidden : function () {
        var isCompleted = this.model.get('completed');
        return ( //hidden cases only
            (!isCompleted && app.TodoFilter === 'completed')
            || (isCompleted && app.TodoFilter === 'active')
        );
    },

    // new - toggle the 'completed' state of the model
    togglecompleted : function () {
        this.model.toggle();
    },

    //new - remove the item,destroy the model from
    // *localStorage* and delete its view
    clear : function () {
        this.model.destroy();
    }
});