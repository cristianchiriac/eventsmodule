eventsModule
    .component('actions', {
        bindings: {
            actions: "<"
        },
        templateUrl: "app/component/actions/actions.component.html",
        controller: function (eventService, $stateParams ) {

            this.$onInit = () => {
                this.addNewAction = () => {
                    this.actions.unshift({ 
                        "type": "EMAIL",
                        "attachments": [],
                        "trigger": {},
                        "locale": []
                    })
                }
            }

            this.templates = eventService.getTemplates()
                .then(response => {
                    this.templates = response;
                })

            this.documents = eventService.getDocuments()
                .then(response => {
                    this.documents = response;
                })
            this.files = eventService.getFiles()
                .then(response => {
                    this.files = response;
                })

            this.removeAction = (index) => {
                this.actions.splice(index, 1)
            }
        },
        controllerAs: "ctrlActions"
    });