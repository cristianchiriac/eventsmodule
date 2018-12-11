eventsModule
    .controller('homeController', [function(){
        this.hashName = window.location.hash;
        console.log(this.hashName);
    }]);