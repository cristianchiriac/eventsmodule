eventsModule
    .component('actions', {
        bindings: {
            actions: "<"
        },
        templateUrl: "app/component/actions/actions.component.html",
        controller: function (eventService, $stateParams ) {

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