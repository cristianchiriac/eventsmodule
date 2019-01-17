eventsModule
    .service('eventService', function () {

        this.getTemplates = function () {
            return new Promise(resolve => {
                let templates =
                    [{ "slug": "return-credit-note", "name": "Return Credit Note", "versions": [17, 18, 19, 28, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34] }, { "slug": "cancellation-by-mse", "name": "Cancellation By MSE", "versions": [7, 19, 20, 21, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 31, 32, 33, 37, 34, 35, 36, 39, 40, 38, 41] }, { "slug": "release-date-changed", "name": "Release Date Changed", "versions": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, { "slug": "delivery-split", "name": "Delivery Split", "versions": [5, 6, 7, 8, 9, 10, 11, 14, 12] }, { "slug": "pickup-second-reminder", "name": "Pickup Second Reminder", "versions": [9, 10, 13, 14, 15, 16, 17, 23, 20] }, { "slug": "asdasd", "name": "asdasd", "versions": [1, 2, 3, 8] }, { "slug": "cancellation-internal", "name": "Cancellation Internal", "versions": [5, 12, 13, 6, 7, 8, 9, 10, 11, 18, 19, 24, 20, 21, 22, 23, 27, 29, 26] }, { "slug": "replacement-shipment-confirmation", "name": "Replacement Shipment Confirmation", "versions": [9, 11, 13, 12, 33] }, { "slug": "store-employee-message", "name": "Store Employee Message", "versions": [12, 13, 17, 18, 19, 20, 21, 22, 27, 28, 23, 24, 25, 26, 32, 30, 33, 39, 34, 35, 36, 37, 38, 42] }, { "slug": "invoice", "name": "Invoice", "versions": [3, 4, 5, 6, 7, 8, 26] }, { "slug": "confirm-shipment", "name": "Confirm Shipment", "versions": [1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 32, 33, 35] }, { "slug": "low-price-goodwill", "name": "Low Price Goodwill", "versions": [5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 17] }, { "slug": "reminder-advanced-return", "name": "Reminder Advanced Return", "versions": [4, 5] }, { "slug": "pickup-first-reminder", "name": "Pickup First Reminder", "versions": [2, 4, 5, 6, 7, 8, 9, 10, 11] }, { "slug": "invoice-aroma-copy", "name": "Invoice Aroma Copy", "versions": [1, 2, 3, 4, 5] }, { "slug": "template-designer", "name": "Template designer", "versions": [1] }, { "slug": "replacement-request", "name": "Replacement Request", "versions": [3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, { "slug": "alex", "name": "alex", "versions": [1, 2] }, { "slug": "order-confirmation", "name": "Order Confirmation", "versions": [13, 22, 23, 28, 29, 31, 33, 34, 36, 37, 38, 39, 40, 41, 45, 49, 50, 51, 52, 53, 56, 58, 59, 60, 61, 62, 64, 65, 66, 67, 80, 81, 82, 83, 84, 70, 72, 74, 75, 76, 77, 79, 69, 86, 89, 90, 91, 96, 92, 93, 95, 97, 104, 98, 100, 102, 103] }, { "slug": "ready-for-pickup", "name": "Ready For Pickup", "versions": [2, 3, 4, 5, 6, 8, 9] }, { "slug": "cancellation-by-customer", "name": "Cancellation By Customer", "versions": [14, 15, 26, 27, 16, 17, 18, 19, 20, 21, 22, 23, 24, 28, 29, 35, 37, 38, 48, 42, 43, 44, 45, 46, 47, 41, 50, 51, 52, 53, 49] }, { "slug": "return-with-replacement", "name": "Return With Replacement", "versions": [2, 7, 3, 4, 6, 8, 9, 10] }, { "slug": "cosmin-test", "name": "Cosmin test", "versions": [2, 3, 4] }]
                setTimeout(function () {
                    resolve(templates);
                }, 0);
            });

        }
        this.getDocuments = function () {
            return new Promise(resolve => {
                let documents =
                    [{ "slug": "template-designer-test", "name": "Template-designer test", "versions": [2] }, { "slug": "return-credit-note-document", "name": "Rueckgabebestaetigung", "versions": [6, 8, 9, 10, 11, 12, 13, 14, 18, 19, 21, 24, 25, 27, 28, 30, 32, 33, 15, 46, 48, 49, 50, 42, 43, 44, 45, 36, 37, 39, 51, 52, 53, 54, 65, 66, 68, 69, 73, 74, 75, 76, 77, 62, 63, 64, 55, 56, 57, 58, 59, 60, 61, 78, 79, 80, 89, 90, 91, 81, 82, 86, 87, 88, 92] }, { "slug": "confirm-shipment-invoice", "name": "Rechnung", "versions": [1, 4, 7, 8, 9, 11, 12, 13, 14, 2, 15, 17, 18, 19, 21, 22, 24, 25, 28, 36, 37, 38, 39, 40, 41, 43, 44, 46, 47, 49, 50, 51, 52, 29, 31, 32, 33, 34, 35, 53, 54, 56, 57, 58, 59, 60, 62, 63, 64, 65, 66, 67, 68, 77, 78, 75, 76, 69, 70, 71, 72, 73, 74, 81, 89, 90, 85, 82, 86, 83, 87, 88, 91, 92, 93, 96, 97, 98, 99, 100, 101, 94, 95] }, { "slug": "pickup-handover", "name": "Übernahmebestätigung", "versions": [49, 51, 52, 53, 56, 57, 59, 60, 61, 62, 63, 65, 66] }, { "slug": "terms-and-conditions", "name": "AGB Onlinekauf", "versions": [14, 15, 19, 20, 21, 22, 23, 25, 26, 27, 28] }, { "slug": "delivery-note", "name": "Lieferschein", "versions": [24, 18, 22, 23, 31, 39, 41, 43, 44, 46, 47, 48, 49, 51, 52, 53, 32, 33, 34, 35, 36, 37, 55, 56, 57, 58, 60, 61, 62, 59] }, { "slug": "complementary-invoice", "name": "Ergänzungsbeleg", "versions": [38, 39, 43, 46, 48, 60, 61, 62, 63, 56, 57, 58, 59, 64, 65, 66, 67, 68, 69, 70, 71, 49, 53, 54, 72, 73, 75, 76, 77, 78, 79, 81, 82, 95, 98, 99, 100, 101, 102, 94, 83, 85, 86, 87, 88, 89, 91, 92, 93, 103, 104, 108, 109, 107, 106, 110, 111, 113] }]
                setTimeout(function () {
                    resolve(documents);
                }, 0);
            });
        }
        this.getFiles = function () {
            return new Promise(resolve => {
                let staticFiles =
                    [{ "slug": "test-static-doc", "name": "Test Static Doc", "versions": [1] }, { "slug": "scjp-sun-certified-programmer-for-java-platform-6th-edtqw_darksiderg", "name": "scjp-sun-certified-programmer-for-java-platform-6th-edtqw_darksiderg", "versions": [1, 2] }]
                setTimeout(function () {
                    resolve(staticFiles);
                }, 0);
            });
        }

        var eventAlex = {
            "slug": "ship_conf_1",
            "name": "SHIP_CONF_1",
            "definition": {
                "condition": "AND",
                "rules": [
                    {
                        "xpath": "/NotificationMessage/messageType",
                        "operator": "EQUAL",
                        "value": "SHIP_CONF_1"
                    }
                ]
            },
            "actions": [
                {
                    "type": "EMAIL",
                    "trigger": {
                        "condition": "AND",
                        "rules": [
                            {
                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                "operator": "EQUAL",
                                "value": "MSH_HOME_DEL"
                            },
                            {
                                "xpath": "/NotificationMessage/documentType",
                                "operator": "EQUAL",
                                "value": "0001"
                            }
                        ]
                    },
                    "to": {
                        "source": "JMS",
                        "point": {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "cc": null,
                    "bcc": null,
                    "template": {
                        "slug": "confirm-shipment",
                        "version": 35
                    },
                    "locale": [
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/subsidiary"
                            }
                        }
                    ],
                    "defaultLocale": "de_CH",
                    "attachments": [
                        {
                            "type": "TEMPLATE",
                            "trigger": 
                            {
                                "condition": "AND",
                                "rules": [
                                    {
                                        "condition": "OR",
                                        "rules": [
                                            {
                                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                                "operator": "EQUAL",
                                                "value": "MSH_PICKUP"
                                            },
                                            {
                                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                                "operator": "EQUAL",
                                                "value": "MSH_SAMEDAY_DEL"
                                            },
                                            {
                                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                                "operator": "EQUAL",
                                                "value": "MSH_SAMEDAY_PICKUP"
                                            },
                                            {
                                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                                "operator": "EQUAL",
                                                "value": "MSH_WISHDAY_DEL"
                                            }
                                        ]
                                    },
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                        "operator": "NOT_EQUAL",
                                        "value": "COP"
                                    },
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                        "operator": "NOT_EQUAL",
                                        "value": "PICKUP_FINANCING"
                                    }
                                ]
                            },
                            "template": {
                                "slug": "confirm-shipment-invoice",
                                "version": 72
                            }
                        }
                    ]
                },
                {
                    "type": "EMAIL",
                    "trigger": {
                        "condition": "AND",
                        "rules": [
                            {
                                "condition": "OR",
                                "rules": [
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator": "EQUAL",
                                        "value": "MSH_PICKUP"
                                    },
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator": "EQUAL",
                                        "value": "MSH_SAMEDAY_DEL"
                                    },
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator": "EQUAL",
                                        "value": "MSH_SAMEDAY_PICKUP"
                                    },
                                    {
                                        "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                        "operator": "EQUAL",
                                        "value": "MSH_WISHDAY_DEL"
                                    }
                                ]
                            },
                            {
                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                "operator": "NOT_EQUAL",
                                "value": "COP"
                            },
                            {
                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                                "operator": "NOT_EQUAL",
                                "value": "PICKUP_FINANCING"
                            }
                        ]
                    },
                    "to": {
                        "source": "JMS",
                        "point": {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "cc": null,
                    "bcc": null,
                    "template": {
                        "slug": "invoice",
                        "version": 26
                    },
                    "locale": [
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/subsidiary"
                            }
                        }
                    ],
                    "defaultLocale": "de_CH",
                    "attachments": [
                        {
                            "type": "TEMPLATE",
                            "trigger": null,
                            "template": {
                                "slug": "confirm-shipment-invoice",
                                "version": 72
                            }
                        }
                    ]
                },
                {
                    "type": "EMAIL",
                    "trigger": {
                        "condition": "AND",
                        "rules": [
                            {
                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                "operator": "EQUAL",
                                "value": "MSH_HOME_DEL"
                            },
                            {
                                "xpath": "/NotificationMessage/documentType",
                                "operator": "EQUAL",
                                "value": "0003"
                            }
                        ]
                    },
                    "to": {
                        "source": "JMS",
                        "point": {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@EMailID"
                        }
                    },
                    "cc": null,
                    "bcc": null,
                    "template": {
                        "slug": "replacement-shipment-confirmation",
                        "version": 33
                    },
                    "locale": [
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/subsidiary"
                            }
                        }
                    ],
                    "defaultLocale": "de_CH",
                    "attachments": [
                        {
                            "type": "TEMPLATE",
                            "trigger": null,
                            "template": {
                                "slug": "confirm-shipment-invoice",
                                "version": 72
                            }
                        }
                    ]
                }
            ],
            "key": [
                {
                    "source": "JMS",
                    "point": [
                        {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/subsidiary"
                        }
                    ]
                },
                {
                    "source": "JMS",
                    "point": [
                        {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@Language"
                        }
                    ]
                },
                {
                    "source": "JMS",
                    "point": [
                        {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/brand"
                        }
                    ]
                },
                {
                    "source": "JMS",
                    "point": [
                        {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/orderId"
                        }
                    ]
                },
                {
                    "source": "JMS",
                    "point": [
                        {
                            "value": "STRING_VALUE",
                            "query": "/NotificationMessage/timeStamp"
                        }
                    ]
                }
            ],
            "context": [
                {
                    "source": "JMS",
                    "points": [
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@LoyaltyId",
                            "value": "STRING_VALUE",
                            "name": "loyaltyId",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@OrderNo",
                            "value": "STRING_VALUE",
                            "name": "orderNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@ZipCode",
                            "value": "STRING_VALUE",
                            "name": "billZipcode",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@JobTitle",
                            "value": "STRING_VALUE",
                            "name": "jobTitle",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@VATPerBand",
                            "value": "STRING_VALUE",
                            "name": "VATPerBand",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@VATPercentage",
                            "value": "STRING_VALUE",
                            "name": "VATPercentage",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@DayPhone",
                            "value": "STRING_VALUE",
                            "name": "shipPhoneNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@CustomerPONo",
                            "value": "STRING_VALUE",
                            "name": "originalOrderNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@GrossTotal",
                            "value": "STRING_VALUE",
                            "name": "productGrossTotal",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@OrderPurpose",
                            "value": "STRING_VALUE",
                            "name": "orderPurpose",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentOverallTotals/@GrandTotal",
                            "value": "STRING_VALUE",
                            "name": "grandTotal",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@VATPercentage",
                            "value": "STRING_VALUE",
                            "name": "totalVATPercentage",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/@ShipDate",
                            "value": "STRING_VALUE",
                            "name": "shipDate",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@ZipCode",
                            "value": "STRING_VALUE",
                            "name": "shipZipcode",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@DayPhone",
                            "value": "STRING_VALUE",
                            "name": "billPhoneNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@FirstName",
                            "value": "STRING_VALUE",
                            "name": "shipFirstName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@LastName",
                            "value": "STRING_VALUE",
                            "name": "firstName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/MSHB2bCustomerDtlList/MSHB2bCustomerDtl/@VATRegNo",
                            "value": "STRING_VALUE",
                            "name": "billVatRegisterNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType",
                            "value": "STRING_VALUE",
                            "name": "paymentMethod",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@AddressLine2",
                            "value": "STRING_VALUE",
                            "name": "billAddress2",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@AddressLine1",
                            "value": "STRING_VALUE",
                            "name": "billAddress1",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@NetTotal",
                            "value": "STRING_VALUE",
                            "name": "shippingNetTotal",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/@ShipDate",
                            "value": "STRING_VALUE",
                            "name": "orderDate",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@LastName",
                            "value": "STRING_VALUE",
                            "name": "shipLastName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@FirstName",
                            "value": "STRING_VALUE",
                            "name": "lastName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentCharges/ShipmentCharge/@ChargeCategory",
                            "value": "STRING_LIST",
                            "name": "chargeCategory",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Item/Extn/@URAFlag",
                            "value": "STRING_VALUE",
                            "name": "URAFlag",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Extn/@ShipAdviceNo",
                            "value": "STRING_VALUE",
                            "name": "shipAdviceNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@GrossTotal",
                            "value": "STRING_VALUE",
                            "name": "grossTotal",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@VATPerBand",
                            "value": "STRING_VALUE",
                            "name": "shippingVATPerBand",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@Title",
                            "value": "STRING_VALUE",
                            "name": "title",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@FirstName",
                            "value": "STRING_VALUE",
                            "name": "billFirstName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@Country",
                            "value": "STRING_VALUE",
                            "name": "shipCountry",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine",
                            "value": "OBJECT_LIST",
                            "name": "products",
                            "fields": [
                                {
                                    "query": "OrderLine/LinePriceInfo/@UnitPrice",
                                    "value": "STRING_VALUE",
                                    "name": "unitPrice",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/Extn/@WarrantyNumber",
                                    "value": "STRING_VALUE",
                                    "name": "warrantyNumber",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/@PrimeLineNo",
                                    "value": "STRING_VALUE",
                                    "name": "primeLineNo",
                                    "fields": []
                                },
                                {
                                    "query": "ShipmentTagSerials/ShipmentTagSerial",
                                    "value": "OBJECT_LIST",
                                    "name": "serials",
                                    "fields": [
                                        {
                                            "name": "number",
                                            "query": "@SerialNo",
                                            "value": "STRING_VALUE"
                                        }
                                    ]
                                },
                                {
                                    "query": "@ItemDesc",
                                    "value": "STRING_VALUE",
                                    "name": "articleName",
                                    "fields": []
                                },
                                {
                                    "query": "@Quantity",
                                    "value": "STRING_VALUE",
                                    "name": "quantity",
                                    "fields": []
                                },
                                {
                                    "query": "Item/Extn/@URAFlag",
                                    "value": "STRING_VALUE",
                                    "name": "URAFlag",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/LineTaxes/LineTax/@TaxPercentage",
                                    "value": "STRING_VALUE",
                                    "name": "taxPercentage",
                                    "fields": []
                                },
                                {
                                    "query": "Item/@ItemID",
                                    "value": "STRING_VALUE",
                                    "name": "articleId",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/LinePriceInfo/@ExtendedPrice",
                                    "value": "STRING_VALUE",
                                    "name": "linePrice",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/Extn/MSHWarrantyExtensionsList/MSHWarrantyExtensions/@ExternalFlag",
                                    "value": "STRING_VALUE",
                                    "name": "externalFlag",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine",
                                    "value": "OBJECT_LIST",
                                    "name": "lineCharges",
                                    "fields": [
                                        {
                                            "name": "unitPrice",
                                            "query": "LineCharges/LineCharge/@ChargePerUnit",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "number",
                                            "query": "LineCharges/LineCharge/@Reference",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "qualifier",
                                            "query": "LineCharges/LineCharge/Extn/@DiscountQualifier",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "name",
                                            "query": "LineCharges/LineCharge/@ChargeName",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "linePrice",
                                            "query": "LineCharges/LineCharge/@ChargeAmount",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "description",
                                            "query": "LineCharges/LineCharge/Extn/@ChargeDescription",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "chargeAmount",
                                            "query": "LineCharges/LineCharge/@ChargeAmount",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "category",
                                            "query": "LineCharges/LineCharge/@ChargeCategory",
                                            "value": "STRING_VALUE"
                                        },
                                        {
                                            "name": "salesTax",
                                            "query": "LineTaxes/LineTax/@TaxPercentage",
                                            "value": "STRING_VALUE"
                                        }
                                    ]
                                },
                                {
                                    "query": "OrderLine/@LineType",
                                    "value": "STRING_VALUE",
                                    "name": "lineType",
                                    "fields": []
                                },
                                {
                                    "query": "OrderLine/@LineItemNumber",
                                    "value": "STRING_VALUE",
                                    "name": "lineItemNumber",
                                    "fields": []
                                }
                            ],
                            "sort": [
                                {
                                    "field": "primeLineNo",
                                    "order": "ASCENDING",
                                    "then": null
                                }
                            ]
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/Extn/@SalesDocumentNo",
                            "value": "STRING_VALUE",
                            "name": "salesDocumentNumber",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue",
                            "value": "OBJECT_LIST",
                            "name": "vatValues",
                            "fields": [
                                {
                                    "query": "@NetTotal",
                                    "value": "STRING_VALUE",
                                    "name": "netAmount",
                                    "fields": []
                                },
                                {
                                    "query": "@VATPercentage",
                                    "value": "STRING_VALUE",
                                    "name": "percentage",
                                    "fields": []
                                },
                                {
                                    "query": "@GrossTotal",
                                    "value": "STRING_VALUE",
                                    "name": "grossAmount",
                                    "fields": []
                                },
                                {
                                    "query": "@VATPerBand",
                                    "value": "STRING_VALUE",
                                    "name": "vatAmount",
                                    "fields": []
                                }
                            ],
                            "sort": [
                                {
                                    "field": "percentage",
                                    "order": "ASCENDING",
                                    "then": null
                                }
                            ]
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@Country",
                            "value": "STRING_VALUE",
                            "name": "billCountry",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentCharges/ShipmentCharge/@ActualCharge",
                            "value": "STRING_VALUE",
                            "name": "chargeAmount",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/@Currency",
                            "value": "STRING_VALUE",
                            "name": "currency",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@City",
                            "value": "STRING_VALUE",
                            "name": "shipCity",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/Containers/Container/Extn/@ExtnCarrierURL",
                            "value": "STRING_VALUE",
                            "name": "trackingLink",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@AddressLine1",
                            "value": "STRING_VALUE",
                            "name": "shipAddress1",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@AddressLine2",
                            "value": "STRING_VALUE",
                            "name": "shipAddress2",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                            "value": "STRING_VALUE",
                            "name": "deliveryType",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/MSHB2bCustomerDtlList/MSHB2bCustomerDtl/@CompanyName",
                            "value": "STRING_VALUE",
                            "name": "billCompanyName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@LastName",
                            "value": "STRING_VALUE",
                            "name": "billLastName",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@City",
                            "value": "STRING_VALUE",
                            "name": "billCity",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentCharges/ShipmentCharge",
                            "value": "OBJECT_LIST",
                            "name": "shipmentCharges",
                            "fields": [
                                {
                                    "query": "@ChargeCategory",
                                    "value": "STRING_VALUE",
                                    "name": "chargeCategory",
                                    "fields": []
                                },
                                {
                                    "query": "@ActualCharge",
                                    "value": "STRING_VALUE",
                                    "name": "actualCharge",
                                    "fields": []
                                }
                            ],
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@NetTotal",
                            "value": "STRING_VALUE",
                            "name": "netTotal",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Extn/@SplitCriteria1",
                            "value": "STRING_VALUE",
                            "name": "splitCriteria",
                            "sort": []
                        }
                    ]
                },
                {
                    "source": "CAR",
                    "points": [
                        {
                            "query": "/manageOrganization/outletName",
                            "value": "STRING_VALUE",
                            "name": "outletName",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/address/addressData/addressLine1",
                            "value": "STRING_VALUE",
                            "name": "outletAddress",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/registerCourt",
                            "value": "STRING_VALUE",
                            "name": "outletRegisterCourt",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/locationName",
                            "value": "STRING_VALUE",
                            "name": "outletLocationName",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/tradeRegisterBook",
                            "value": "STRING_VALUE",
                            "name": "outletTradeRegisterBook",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/address/addressData/zipCode",
                            "value": "STRING_VALUE",
                            "name": "outletZipcode",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/chairman",
                            "value": "OBJECT_LIST",
                            "name": "chairman",
                            "fields": [
                                {
                                    "query": "chairmanName",
                                    "value": "STRING_VALUE",
                                    "name": "name",
                                    "fields": []
                                },
                                {
                                    "query": "chairmanId",
                                    "value": "STRING_VALUE",
                                    "name": "id",
                                    "fields": []
                                }
                            ],
                            "sort": [
                                {
                                    "field": "id",
                                    "order": "ASCENDING",
                                    "then": null
                                }
                            ]
                        },
                        {
                            "query": "/manageOrganization/vatId",
                            "value": "STRING_VALUE",
                            "name": "outletVatId",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/tradeRegister_No",
                            "value": "STRING_VALUE",
                            "name": "outletStoreRegisterNumber",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/address/addressData/city",
                            "value": "STRING_VALUE",
                            "name": "outletCity",
                            "sort": []
                        },
                        {
                            "query": "/manageOrganization/tradeRegister_No",
                            "value": "STRING_VALUE",
                            "name": "outletRegisterNumber",
                            "sort": []
                        }
                    ],
                    "outlet": "/NotificationMessage/outletId"
                }
            ],
            "metadata": [
                {
                    "source": "JMS",
                    "points": [
                        {
                            "query": "/NotificationMessage/messageType",
                            "value": "STRING_VALUE",
                            "name": "messageType",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/orderId",
                            "value": "STRING_VALUE",
                            "name": "orderId",
                            "sort": []
                        },
                        {
                            "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Extn/@ShipAdviceNo",
                            "value": "STRING_VALUE",
                            "name": "ShipAdviceNo",
                            "sort": []
                        }
                    ]
                }
            ],
            "isDirty": true
        }

        this.getEvent = function () {

            return new Promise(resolve => {

                setTimeout(function () {
                    resolve(eventAlex);
                }, 0);
            });
        }
    })
