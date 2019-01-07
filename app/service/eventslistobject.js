eventsModule
    .service ('eventsListObject', function() {
        this.getList = function() {
            return new Promise(resolve => {
                let events = [{
                    name: 'SHIP_CONF_1',
                    slug: 'ship-conf-1',
                    isDirty: false // asta afiseaza statusul de PENDING CHANGES
                },{
                    name: 'ORD_CRE_1',
                    slug: 'ord-cre-1',
                    isDirty: true// asta afiseaza statusul de PENDING CHANGES
                },{
                    name: 'PUSHBACK',
                    slug: 'pushback',
                    isDirty: false // asta afiseaza statusul de PENDING CHANGES
                },{
                    name: 'PUSHBACK',
                    slug: 'pushback',
                    isDirty: true
                }];
                setTimeout(function() {
                    resolve(events);
                }, 0);
            });
        }

    });
