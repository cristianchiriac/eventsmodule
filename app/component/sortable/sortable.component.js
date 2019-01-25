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
                getFieldsNotSortedBy()
            }

            getFieldsNotSortedBy = () => {
                if(this.sortby.length >0){
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
                
            }

            this.ascDescOrder = (item) =>{
                if (item.order === 'ASCENDING') {
                    item.order = 'DESCENDING';
                } else {
                    item.order = 'ASCENDING';
                }            }
        },
        controllerAs: 'sortableCtrl'
    })