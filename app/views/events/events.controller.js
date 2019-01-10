eventsModule
    .controller('eventsController', function(eventsListObject){
        
            this.list = eventsListObject.getList()
                .then(response => {
                    this.list = response;
                }
        )
    });
