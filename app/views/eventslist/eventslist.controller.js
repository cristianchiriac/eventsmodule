eventsModule
    .controller('eventslistController', function(eventsListObject, $state, $breadcrumb){


        console.log(222222, $breadcrumb.getStatesChain())

        console.log("dsfsdfdsdf", $state.current)
            this.list = eventsListObject.getList()
                .then(response => {
                    this.list=response;
                }
        )
    });
