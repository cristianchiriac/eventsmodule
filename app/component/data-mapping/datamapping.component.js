eventsModule
    .component('datamapping',{
        bindings:{
            context:'<'
        },
        templateUrl: 'app/component/data-mapping/datamapping.component.html',
        controller: function() {
            this.$onInit = () => {
                this.removeMapping = (index) => {
                    this.context.splice(index,1)
                }
            }            

        },
        controllerAs: 'dataMappingCtrl'
    } )