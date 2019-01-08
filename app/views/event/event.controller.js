eventsModule
    .controller('eventController', function ($scope,$stateParams, eventService, ncyBreadcrumb) {
        this.state = $stateParams;
        console.log(this.state, '1111111');
        // $scope.breadcrumbLabel = "
        // for (var key in this.state ) {
        //     if (this.state[key] === true){
        //         $scope.breadcrumbLabel = this.state[key]
        //     }
        // }

        this.event = eventService.getEvent()
            .then(response => {
                this.event = response;
            })
        })
