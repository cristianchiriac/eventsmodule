eventsModule
    .controller('eventController', function ($stateParams, eventService) {
        this.state = $stateParams;

        // console.log('abbb', $stateParams);
        this.event = 0;

        this.event = eventService.getEvent()
            .then(response => {
                this.event = response;
                console.log(9999, response);
            })
        console.log(1111, this.event);

    });
