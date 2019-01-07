eventsModule
    .component('field',{
        templeteUrl: 'app/component/field-data-mapping/field.data.mapping.component.html',
        bindings:{
            fields: '<'
        },
        controllerAs:'fieldData',
        controller: function() {
            console.log('123');
        }
    })
