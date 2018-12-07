      const API = '//jsonplaceholder.typicode.com/todos/';
eventsModule

  .service('todoService', function($http) {
    this.retrieve = function() {
      return $http.get(API);
    }
    this.update = function(todo) {
      return $http.put(API + todo);
        //.then( response => {return response.data})
    }
    this.remove = function(todo) {
      return $http.delete(API + todo);
    }
    this.create = function() {
      return $http.post(API);
    }
  })

