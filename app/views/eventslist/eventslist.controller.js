eventsModule
    .controller('eventslistController', function(eventsListObject){
            this.list = eventsListObject.getList;
            console.log(this.list);
    });