eventsModule
    .component('eventDefinition', {
        bindings: {
            definition:'<',
            rules:'<'
        },
        templateUrl: 'app/component/eventdefinition/definition.component.html',
        controllerAs:'eventDefinition'
    })