eventsModule
    .component('notificationId', {
        bindings: {
            key: '<'
        },
        templateUrl: 'app/component/notificationid/notificationid.component.html',
        controller: function () {

            this.$onInit = () => {
                this.remove = (index) => {
                    this.key.splice(index,1)
                }            }

 

        },
        controllerAs: 'notificationIdCtrl'
    })