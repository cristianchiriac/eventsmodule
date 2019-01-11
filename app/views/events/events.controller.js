eventsModule
    .controller('eventsController', function ($scope, eventsListObject) {
        this.$onInit = function () {
            getEvents();
        }

        getEvents = () => {
            console.log(1)
            eventsListObject.getList()
                .then(response => {
                    console.log(2, this)
                    this.events = response
                })
        }

    });
