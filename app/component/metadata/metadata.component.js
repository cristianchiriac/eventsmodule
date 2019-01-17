eventsModule
    .component('metadata', {
        bindings: {
            metadata: '<'
        },
        templateUrl: 'app/component/metadata/metadata.component.html',
        controller: function () {

            this.$onInit = () => {
                this.removeMetadata = (index, list) => {
                    if (!list) list = []
                    list.splice(index, 1)
                }

                this.addNewMetadata = () => {
                    let newMetadata = { "points": []}
                    this.metadata.unshift(newMetadata)
                }

                this.addNewMetadataRule = (points) => {
                    let newRule =
                    {
                        "value": "STRING_VALUE",
                        "query": ""
                    }

                    points.unshift(newRule)
                    
                }

            }


        },
        controllerAs: 'metadataCtrl'
    })