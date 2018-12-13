eventsModule
    .controller('actionsController', function(){
        this.event = {
            "_id" : "ship_conf_1",
            "name" : "SHIP_CONF_1",
            "actions" : [
                {
                    "to" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS",
                        "point" : {
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                            "query" : "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "locale" : [
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        },
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/subsidiary"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        }
                    ],
                    "defaultLocale" : "de_AT",
                    "template" : {
                        "slug" : "invoice",
                        "version" : Number(6)
                    },
                    "attachments" : [
                        {
                            "template" : {
                                "slug" : "confirm-shipment-invoice",
                                "version" : Number(101)
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAttachment$RenderedAttachment"
                        }
                    ],
                    "trigger" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$Group",
                        "condition" : "AND",
                        "rules" : [
                            {
                                "condition" : "OR",
                                "rules" : [
                                    {
                                        "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator" : "EQUAL",
                                        "value" : "MSH_PICKUP",
                                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                                    },
                                    {
                                        "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator" : "EQUAL",
                                        "value" : "MSH_SAMEDAY_DEL",
                                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                                    },
                                    {
                                        "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator" : "EQUAL",
                                        "value" : "MSH_SAMEDAY_PICKUP",
                                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                                    },
                                    {
                                        "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator" : "EQUAL",
                                        "value" : "MSH_WISHDAY_DEL",
                                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                                    }
                                ],
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$Group"
                            },
                            {
                                "xpath" : "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                "operator" : "NOT_EQUAL",
                                "value" : "COP",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            },
                            {
                                "xpath" : "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                "operator" : "NOT_EQUAL",
                                "value" : "PICKUP_FINANCING",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            }
                        ]
                    },
                    "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAction$Email"
                },
                {
                    "to" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS",
                        "point" : {
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                            "query" : "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "locale" : [
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        },
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/subsidiary"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        }
                    ],
                    "defaultLocale" : "de_AT",
                    "template" : {
                        "slug" : "confirm-shipment",
                        "version" : Number(21)
                    },
                    "attachments" : [
                        {
                            "template" : {
                                "slug" : "confirm-shipment-invoice",
                                "version" : Number(102)
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAttachment$RenderedAttachment"
                        }
                    ],
                    "trigger" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$Group",
                        "condition" : "AND",
                        "rules" : [
                            {
                                "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                "operator" : "EQUAL",
                                "value" : "MSH_HOME_DEL",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            },
                            {
                                "xpath" : "/NotificationMessage/documentType",
                                "operator" : "EQUAL",
                                "value" : "0001",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            }
                        ]
                    },
                    "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAction$Email"
                },
                {
                    "to" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS",
                        "point" : {
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                            "query" : "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "locale" : [
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        },
                        {
                            "point" : {
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredPoint$StringValue",
                                "query" : "/NotificationMessage/subsidiary"
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredDataPoint$JMS"
                        }
                    ],
                    "defaultLocale" : "de_AT",
                    "template" : {
                        "slug" : "replacement-shipment-confirmation",
                        "version" : Number(13)
                    },
                    "attachments" : [
                        {
                            "template" : {
                                "slug" : "confirm-shipment-invoice",
                                "version" : Number(101)
                            },
                            "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAttachment$RenderedAttachment"
                        }
                    ],
                    "trigger" : {
                        "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$Group",
                        "condition" : "AND",
                        "rules" : [
                            {
                                "xpath" : "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                "operator" : "EQUAL",
                                "value" : "MSH_HOME_DEL",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            },
                            {
                                "xpath" : "/NotificationMessage/documentType",
                                "operator" : "EQUAL",
                                "value" : "0003",
                                "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredRule$BinaryOperator"
                            }
                        ]
                    },
                    "_class" : "com.mediasaturn.rea.events.storage.mongo.StoredAction$Email"
                }
            ],
        }
    });