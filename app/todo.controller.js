eventsModule
  .controller('todoController', function(todoService){
    this.newTodo = '';
    this.list = [];

    todoService.retrieve()
      .then(response => {
        this.list = response.data.splice(0,10);
        console.log(this.list);
      })


     this.addTodo = function() {
      if (!this.newTodo){
        return;
      }
        todoService.create()
          .then(response => {
            this.list.unshift({
            title: this.newTodo,
            completed: false
          })
        this.newTodo = '';
        });
      };




      this.removeTodo = function(index) {
        todoService.remove(index)
          .then(response => {
            this.list.splice(index, 1);
          })
      };

      this.updateTodo = function(item, index) {
        if (!item.title) {
          this.removeTodo(item,index);
          return;
        }
        todoService.update(item);
      };


      this.getRemaining = function() {
        return this.list.filter(function(item){
          return !item.completed;
        });
      }

      this.toggleState = function(item) {
        todoService.update(item)
          .then(),
          () => item.completed = !item.completed;
      }
  })
