eventsModule
    .component('datamapping',{
        bindings:{
            context:'<'
        },
        templateUrl: 'app/component/data-mapping/datamapping.component.html',
        controller: function() {
            console.log('AAAAAAA');
        },
        controllerAs: 'dataMapping'
    } )