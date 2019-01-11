eventsModule
    .controller('eventsController', function ($scope, eventsListObject) {
        this.$onInit =  () =>{
            this.getEvents();
            console.log(3)
        }

        this.getEvents = () => {
            eventsListObject.getList()
                .then(response => {
                    let r = response
                    this.events = r;
                })

        }

    });
