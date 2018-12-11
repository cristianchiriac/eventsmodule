eventsModule
    .service ('eventsListObject', function() {
       this.getList = [{
           name: 'SHIP_CONF_1',
           slug: 'ship-conf-1',
           isDirty: false // asta afiseaza statusul de PENDING CHANGES
        },{
            name: 'ORD_CRE_1',
            slug: 'ord-cre-1',
            isDirty: false // asta afiseaza statusul de PENDING CHANGES
        },{
            name: 'PUSHBACK',
            slug: 'pushback',
            isDirty: false // asta afiseaza statusul de PENDING CHANGES
        },{
           name: 'PUSHBACK',
           slug: 'pushback',
           isDirty: false
       }]
    });
