eventsModule
    .component('conditions', {
        bindings: {
            model:"<"
        },
        templateUrl:"app/component/conditions/conditions.component.html",
        controller: function () {
            this.options= ['EQUAL', 'NOT_EQUAL', 'CONTAINS', 'NOT_CONTAINS', 'EXISTS', 'NOT_EXISTS']

            this.deleteCondition = (index) => {
                this.model.rules.splice(index,1)
               
            }
        },
        controllerAs: "conditionCtrl"
        })