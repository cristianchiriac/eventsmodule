eventsModule
    .component('mappingobject',{
        bindings:{
            fields:'<'
        },
        templateUrl: 'app/component/mapping-object/mappingobject.component.html',
        controller: function() {
            this.$onInit = () => {
                this.removeMappingObject =(key) =>{
                    delete this.fields[key]
                }
            }
        },
        controllerAs: 'mappingCtrl'
    } )