eventsModule
    .component('mappingobject', {
        bindings: {
            fields: '<'
        },
        templateUrl: 'app/component/mapping-object/mappingobject.component.html',
        controller: function () {
            this.$onInit = () => {
                this.removeMappingObject = (index) => {
                    this.fields.splice(index, 1)
                }
            }
            
            this.addNewData = (list) => {
                list.push({});
            }
        },
        controllerAs: 'mappingCtrl'
    })