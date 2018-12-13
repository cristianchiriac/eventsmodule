eventsModule
    .controller('eventslistController', function(eventsListObject){
            this.list = eventsListObject.getList()
                .then(response => {
                    this.list=response;
                    console.log(response);
                }
        )
            console.log(this.list);
    });
