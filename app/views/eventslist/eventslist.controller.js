eventsModule
    .controller('eventslistController', function(eventsListObject){
            this.list = eventsListObject.getList()
                .then(response => {
                    this.list=response;
                    console.log(3333, response);
                }
        )
            console.log(5555, this.list);
    });
