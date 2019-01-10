eventsModule
    .controller('eventController', function ($stateParams, eventService) {
        this.state = $stateParams;

        this.event = eventService.getEvent()
            .then(response => {
                this.event = response;
            })

    })

