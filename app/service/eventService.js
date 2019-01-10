eventsModule
    .service('eventService', function () {

        this.getTemplates = function () {
            return new Promise(resolve => {
                let templates =
                    [{ "slug": "return-credit-note", "name": "Return Credit Note", "versions": [17, 18, 19, 28, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30] }, { "slug": "cancellation-by-mse", "name": "Cancellation By MSE", "versions": [7, 19, 20, 21, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 31, 32, 33, 37, 34, 35, 36, 39, 40, 38, 41] }, { "slug": "release-date-changed", "name": "Release Date Changed", "versions": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, { "slug": "delivery-split", "name": "Delivery Split", "versions": [5, 6, 7, 8, 9, 10, 11, 14, 12] }, { "slug": "pickup-second-reminder", "name": "Pickup Second Reminder", "versions": [9, 10, 13, 14, 15, 16, 17, 23, 20] }, { "slug": "asdasd", "name": "asdasd", "versions": [1, 2, 3, 8] }, { "slug": "cancellation-internal", "name": "Cancellation Internal", "versions": [5, 12, 13, 6, 7, 8, 9, 10, 11, 18, 19, 24, 20, 21, 22, 23, 27, 29, 26] }, { "slug": "replacement-shipment-confirmation", "name": "Replacement Shipment Confirmation", "versions": [9, 11, 13, 12] }, { "slug": "store-employee-message", "name": "Store Employee Message", "versions": [12, 13, 17, 18, 19, 20, 21, 22, 27, 28, 23, 24, 25, 26, 32, 30, 33, 39, 34, 35, 36, 37, 38, 42] }, { "slug": "invoice", "name": "Invoice", "versions": [3, 4, 5, 6, 7] }, { "slug": "confirm-shipment", "name": "Confirm Shipment", "versions": [1, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21] }, { "slug": "low-price-goodwill", "name": "Low Price Goodwill", "versions": [5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 17] }, { "slug": "reminder-advanced-return", "name": "Reminder Advanced Return", "versions": [4, 5] }, { "slug": "pickup-first-reminder", "name": "Pickup First Reminder", "versions": [2, 4, 5, 6, 7, 8, 9, 10, 11] }, { "slug": "invoice-aroma-copy", "name": "Invoice Aroma Copy", "versions": [1, 2, 3, 4, 5] }, { "slug": "template-designer", "name": "Template designer", "versions": [1] }, { "slug": "replacement-request", "name": "Replacement Request", "versions": [3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, { "slug": "alex", "name": "alex", "versions": [1, 2] }, { "slug": "order-confirmation", "name": "Order Confirmation", "versions": [13, 22, 23, 28, 29, 31, 33, 34, 36, 37, 38, 39, 40, 41, 45, 49, 50, 51, 52, 53, 56, 58, 59, 60, 61, 62, 64, 65, 66, 67, 80, 81, 82, 83, 84, 70, 72, 74, 75, 76, 77, 79, 69, 86, 89, 90, 91, 96, 92, 93, 95, 97, 104, 98, 100, 102, 103] }, { "slug": "ready-for-pickup", "name": "Ready For Pickup", "versions": [2, 3, 4, 5, 6, 8, 9] }, { "slug": "cancellation-by-customer", "name": "Cancellation By Customer", "versions": [14, 15, 26, 27, 16, 17, 18, 19, 20, 21, 22, 23, 24, 28, 29, 35, 37, 38, 48, 42, 43, 44, 45, 46, 47, 41, 50, 51, 52, 53, 49] }, { "slug": "return-with-replacement", "name": "Return With Replacement", "versions": [2, 7, 3, 4, 6, 8, 9, 10] }, { "slug": "cosmin-test", "name": "Cosmin test", "versions": [2, 3, 4] }]
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

        this.getEvent = function () {

            return new Promise(resolve => {


                let event = {
                    "slug": "ship_conf_1",
                    "name": "SHIP_CONF_1",
                    "definition": {
                        "condition": "AND",
                        "rules": [
                            {
                                "xpath": "/NotificationMessage/messageType",
                                "operator": "EQUAL",
                                "value": "SHIP_CONF_1"
                            },
                            {
                                "xpath": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService",
                                "operator": "EQUAL",
                                "value": "MSH_SAMEDAY_DEL"
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
                                "version": 6
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
                            "defaultLocale": "de_AT",
                            "attachments": []
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
                                "version": 21
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
                            "defaultLocale": "de_AT",
                            "attachments": [
                                {
                                    "type": "UPLOADED_FILE",
                                    "trigger": null,
                                    "uploadedFile": {
                                        "slug": "test-static-doc",
                                        "version": 1
                                    }
                                },
                                {
                                    "type": "TEMPLATE",
                                    "trigger": null,
                                    "template": {
                                        "slug": "confirm-shipment-invoice",
                                        "version": 95
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
                                "version": 13
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
                            "defaultLocale": "de_AT",
                            "attachments": []
                        }
                    ],
                    "key": [
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/subsidiary"
                            }
                        },
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
                                "query": "/NotificationMessage/brand"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/orderId"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/timeStamp"
                            }
                        },
                        {
                            "source": "JMS",
                            "point": {
                                "value": "STRING_VALUE",
                                "query": "/NotificationMessage/transactionId"
                            }
                        }
                    ],
                    "context": [
                        {
                            "source": "JMS",
                            "points": {
                                "loyaltyId": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/@LoyaltyId"
                                },
                                "orderNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@OrderNo"
                                },
                                "billZipcode": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@ZipCode"
                                },
                                "jobTitle": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@JobTitle"
                                },
                                "VATPerBand": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@VATPerBand"
                                },
                                "VATPercentage": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@VATPercentage"
                                },
                                "shipPhoneNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@DayPhone"
                                },
                                "originalOrderNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@CustomerPONo"
                                },
                                "productGrossTotal": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@GrossTotal"
                                },
                                "orderPurpose": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/@OrderPurpose"
                                },
                                "brand": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/brand"
                                },
                                "grandTotal": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentOverallTotals/@GrandTotal"
                                },
                                "totalVATPercentage": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@VATPercentage"
                                },
                                "shipDate": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/@ShipDate"
                                },
                                "shipZipcode": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@ZipCode"
                                },
                                "billPhoneNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@DayPhone"
                                },
                                "shipFirstName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@FirstName"
                                },
                                "firstName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@FirstName"
                                },
                                "billVatRegisterNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/MSHB2bCustomerDtlList/MSHB2bCustomerDtl/@VATRegNo"
                                },
                                "paymentMethod": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod/@PaymentType"
                                },
                                "billAddress2": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@AddressLine2"
                                },
                                "billAddress1": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@AddressLine1"
                                },
                                "shippingNetTotal": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@NetTotal"
                                },
                                "orderDate": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/@ShipDate"
                                },
                                "shipLastName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@LastName"
                                },
                                "lastName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@LastName"
                                },
                                "chargeCategory": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentCharges/ShipmentCharge/@ChargeCategory"
                                },
                                "URAFlag": {
                                    "value": "STRING_LIST",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Item/Extn/@URAFlag",
                                    "order": null
                                },
                                "shipAdviceNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Extn/@ShipAdviceNo"
                                },
                                "grossTotal": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@GrossTotal"
                                },
                                "payments": {
                                    "value": "OBJECT_LIST",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/PaymentMethods/PaymentMethod",
                                    "fields": {
                                        "bankName": {
                                            "value": "STRING_VALUE",
                                            "query": "@PaymentReference9"
                                        },
                                        "paymentType": {
                                            "value": "STRING_VALUE",
                                            "query": "@PaymentType"
                                        }
                                    },
                                    "sort": null
                                },
                                "shippingVATPerBand": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/ShippingCost/@VATPerBand"
                                },
                                "title": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@Title"
                                },
                                "billFirstName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@FirstName"
                                },
                                "shipCountry": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@Country"
                                },
                                "products": {
                                    "value": "OBJECT_LIST",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine",
                                    "fields": {
                                        "unitPrice": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/LinePriceInfo/@UnitPrice"
                                        },
                                        "warrantyNumber": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/Extn/@WarrantyNumber"
                                        },
                                        "primeLineNo": {
                                            "value": "STRING_VALUE",
                                            "query": "@PrimeLineNo"
                                        },
                                        "serials": {
                                            "value": "OBJECT_LIST",
                                            "query": "ShipmentTagSerials/ShipmentTagSerial",
                                            "fields": {
                                                "number": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@SerialNo"
                                                }
                                            },
                                            "sort": null
                                        },
                                        "articleName": {
                                            "value": "STRING_VALUE",
                                            "query": "@ItemDesc"
                                        },
                                        "quantity": {
                                            "value": "STRING_VALUE",
                                            "query": "@Quantity"
                                        },
                                        "URAFlag": {
                                            "value": "STRING_VALUE",
                                            "query": "Item/Extn/@URAFlag"
                                        },
                                        "taxPercentage": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/LineTaxes/LineTax/@TaxPercentage"
                                        },
                                        "articleId": {
                                            "value": "STRING_VALUE",
                                            "query": "Item/@ItemID"
                                        },
                                        "linePrice": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/LinePriceInfo/@ExtendedPrice"
                                        },
                                        "externalFlag": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/Extn/MSHWarrantyExtensionsList/MSHWarrantyExtensions/@ExternalFlag"
                                        },
                                        "lineCharges": {
                                            "value": "OBJECT_LIST",
                                            "query": "OrderLine/LineCharges/LineCharge",
                                            "fields": {
                                                "unitPrice": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@ChargePerUnit"
                                                },
                                                "number": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@Reference"
                                                },
                                                "qualifier": {
                                                    "value": "STRING_VALUE",
                                                    "query": "Extn/@DiscountQualifier"
                                                },
                                                "name": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@ChargeName"
                                                },
                                                "linePrice": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@ChargeAmount"
                                                },
                                                "description": {
                                                    "value": "STRING_VALUE",
                                                    "query": "Extn/@ChargeDescription"
                                                },
                                                "chargeAmount": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@ChargeAmount"
                                                },
                                                "category": {
                                                    "value": "STRING_VALUE",
                                                    "query": "@ChargeCategory"
                                                },
                                                "salesTax": {
                                                    "value": "STRING_VALUE",
                                                    "query": "../../LineTaxes/LineTax/@TaxPercentage"
                                                }
                                            },
                                            "sort": null
                                        },
                                        "isAssona": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/LineTaxes/LineTax/@Reference_1"
                                        },
                                        "lineType": {
                                            "value": "STRING_VALUE",
                                            "query": "OrderLine/@LineType"
                                        }
                                    },
                                    "sort": {
                                        "field": "primeLineNo",
                                        "order": "ASCENDING",
                                        "then": null
                                    }
                                },
                                "salesDocumentNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/Extn/@SalesDocumentNo"
                                },
                                "vatValues": {
                                    "value": "OBJECT_LIST",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue",
                                    "fields": {
                                        "netAmount": {
                                            "value": "STRING_VALUE",
                                            "query": "@NetTotal"
                                        },
                                        "percentage": {
                                            "value": "STRING_VALUE",
                                            "query": "@VATPercentage"
                                        },
                                        "grossAmount": {
                                            "value": "STRING_VALUE",
                                            "query": "@GrossTotal"
                                        },
                                        "vatAmount": {
                                            "value": "STRING_VALUE",
                                            "query": "@VATPerBand"
                                        }
                                    },
                                    "sort": {
                                        "field": "percentage",
                                        "order": "ASCENDING",
                                        "then": null
                                    }
                                },
                                "billCountry": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@Country"
                                },
                                "chargeAmount": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentCharges/ShipmentCharge/@ActualCharge"
                                },
                                "currency": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/@Currency"
                                },
                                "shipCity": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@City"
                                },
                                "trackingLink": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/Containers/Container/Extn/@ExtnCarrierURL"
                                },
                                "shipAddress1": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@AddressLine1"
                                },
                                "shipAddress2": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ToAddress/@AddressLine2"
                                },
                                "deliveryType": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/@LevelOfService"
                                },
                                "billCompanyName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Order/Extn/MSHB2bCustomerDtlList/MSHB2bCustomerDtl/@CompanyName"
                                },
                                "billLastName": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@LastName"
                                },
                                "billCity": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/BillToAddress/@City"
                                },
                                "netTotal": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/VatValues/Product/VatValue/@NetTotal"
                                },
                                "splitCriteria": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/OrderLine/Extn/@SplitCriteria1"
                                }
                            }
                        },
                        {
                            "source": "CAR",
                            "points": {
                                "outletName": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/outletName"
                                },
                                "outletAddress": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/address/addressData/addressLine1"
                                },
                                "outletRegisterCourt": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/registerCourt"
                                },
                                "outletLocationName": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/locationName"
                                },
                                "outletTradeRegisterBook": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/tradeRegisterBook"
                                },
                                "outletZipcode": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/address/addressData/zipCode"
                                },
                                "chairman": {
                                    "value": "OBJECT_LIST",
                                    "query": "/manageOrganization/chairman",
                                    "fields": {
                                        "name": {
                                            "value": "STRING_VALUE",
                                            "query": "chairmanName"
                                        },
                                        "id": {
                                            "value": "STRING_VALUE",
                                            "query": "chairmanId"
                                        }
                                    },
                                    "sort": {
                                        "field": "id",
                                        "order": "ASCENDING",
                                        "then": null
                                    }
                                },
                                "outletVatId": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/vatId"
                                },
                                "outletStoreRegisterNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/tradeRegister_No"
                                },
                                "outletCity": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/address/addressData/city"
                                },
                                "outletRegisterNumber": {
                                    "value": "STRING_VALUE",
                                    "query": "/manageOrganization/tradeRegister_No"
                                }
                            },
                            "outlet": "/NotificationMessage/outletId"
                        }
                    ],
                    "metadata": [
                        {
                            "source": "JMS",
                            "points": {
                                "messageType": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/messageType"
                                },
                                "orderId": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/orderId"
                                },
                                "ShipAdviceNo": {
                                    "value": "STRING_VALUE",
                                    "query": "/NotificationMessage/payload/Shipments/Shipment/ShipmentLines/ShipmentLine/Extn/@ShipAdviceNo"
                                }
                            }
                        }
                    ],
                    "isDirty": true
                }
                setTimeout(function () {
                    resolve(event);
                }, 0);
            });
        }
    })
