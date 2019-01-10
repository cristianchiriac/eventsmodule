eventsModule
    .component('metadata', {
        bindings: {
            metadata: '<'
        },
        templateUrl: 'app/component/metadata/metadata.component.html',
        controller: function () {

            this.$onInit = () => {
                this.removeMetadata= (index, list) => {
                    list.splice(index, 1)
                }

                this.removeMetadataItem = (propName, obj) => {
                    delete obj[propName] 
                }

            }


        },
        controllerAs: 'metadataCtrl'
    })