eventsModule
    .service('eventService', function() {
        this.getEvent = function() {
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
                setTimeout(function() {
                    resolve(event);
                }, 0);
            });
        }
    })
