eventsModule
    .component('sortable', {
        bindings: {
            fields: '<',
            sortby : '<'
        },
        templateUrl: 'app/component/sortable/sortable.component.html',
        controller: function () {
            // check if sort fields are already assigned in order to have a unique list of available sort fields
            this.items = [];

            this.$onInit = () => {
                console.log(111, this.sortby)
                getFieldsNotSortedBy()
            }

            getFieldsNotSortedBy = () => {
                if(this.sortby){
                    for (var i = 0; i < this.fields.length; i++){
                        for (var j = 0; j < this.sortby.length; j++){
                            if(this.fields[i].name !== this.sortby[j].field){
                                this.items.push({
                                    field: this.fields[i].name,
                                    order: 'ASCENDING'
                                })
                            }
                        }
                    }
                } else {
                    
                    for (var i = 0; i < this.fields.length; i++){
                        this.items.push({
                            field: this.fields[i].name,
                            order: 'ASCENDING'
                        })
                    }
                }
                console.log(this.items)
                
            }

            this.ascDescOrder = (item) =>{
                if (item.order === 'ASCENDING') {
                    item.order = 'DESCENDING';
                } else {
                    item.order = 'ASCENDING';
                }            }

            // for (var i = 0; i < list.length; i++)  {
            //     if (list[i][listProperty] === object[objectProperty]) {
            //         return true;
            //     }
            // }
            // for (var i = 0; i < this.fields.length; i++) {
            //     if (!generalServices.containsObject(scope.sortableList[i], scope.dropzone, 'name', 'field')) {
            //         scope.sortableItems.push({
            //             field: scope.sortableList[i].name,
            //             order: 'ASCENDING'
            //         });
            //     }
            // }
        },
        controllerAs: 'sortableCtrl'
    })