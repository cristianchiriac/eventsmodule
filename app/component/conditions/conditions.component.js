eventsModule
    .component('conditions', {
        bindings: {
            model: "<"        },
        templateUrl: "app/component/conditions/conditions.component.html",
        controller: function () {

            this.options = ['EQUAL', 'NOT_EQUAL', 'CONTAINS', 'NOT_CONTAINS', 'EXISTS', 'NOT_EXISTS']

           this.$onInit =() => {

                this.addNewRule = () => {
                    if (this.model.rules){
                        this.addRule();
                    } else {
                        this.model=  {
                            "condition": "",
                            "rules": [
                                {}
                            ]
                        }

                    }
                }
                this.deleteCondition = (index) => {
                    this.model.rules.splice(index, 1)

                }
                this.addRule = () => {
                    let newRule = {}
                    this.model.rules.push(newRule)
                }

            
                this.addGroup = () => {
                    var newRuleGroup = {
                        "condition": "AND",
                        "rules": [
                            {}
                        ]
                    }
                    this.model.rules.push(newRuleGroup)
                }
            }
                
            
        },
        controllerAs: "conditionCtrl"
    })