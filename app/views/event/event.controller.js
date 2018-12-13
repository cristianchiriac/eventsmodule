eventsModule
    .controller('eventController', function($stateParams){
        this.state = $stateParams;
        
        console.log('abbb', $stateParams);
    })
