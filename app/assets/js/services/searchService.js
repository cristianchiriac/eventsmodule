angular
    .module('app')
    .service(
        'searchService', [
            '$http',
            'generalServices',
            (
                $http,
                generalServices
            ) => {
                return {
                    getOutbound: (url, headers) => {
                        return $http.get(
                                url, {
                                    headers: headers
                                })
                            .then(
                                response => {
                                    return response.data.map(
                                        item => {
                                            let metadata;
                                            metadata = generalServices.keysToLowercase(item.metadata);
                                            return {
                                                id: item.id,
                                                sentOn: generalServices.convertTimestamp(item.sentOn, false),
                                                orderId: metadata.orderid ? metadata.orderid : null,
                                                distributionChannel: metadata.distributionChannel ? metadata.distributionChannel : null,
                                                subject: item.subject,
                                                attachments: item.attachments,
                                                email: item.to[0],
                                                status: item.status,
                                                source: 'outboundemail'
                                            };
                                        });
                                });
                    },
                    getNotifications: (url, headers) => {
                        return $http.get(
                                url, {
                                    headers: headers
                                })
                            .then(
                                response => {
                                    return response.data.map(
                                        item => {
                                            let metadata;
                                            metadata = generalServices.keysToLowercase(item.metadata);
                                            return {
                                                id: item.id,
                                                sentOn: item.sentOn ? generalServices.convertTimestamp(item.sentOn, false) : null,
                                                orderId: metadata.orderid ? metadata.orderid : null,
                                                distributionChannel: metadata.distributionchannel ? metadata.distributionchannel : null,
                                                subject: item.subject,
                                                attachments: item.attachments,
                                                email: item.to[0],
                                                status: (item.status === 'DELIVERED') ? 'SENT' : item.status,
                                                notification: true
                                            };
                                        });
                                });
                    },
                    getMigratedDocuments: (url, headers) => {
                        return $http.get(
                                url, {
                                    headers: headers
                                })
                            .then(
                                response => {
                                    return response.data.map(
                                        item => {
                                            var metadata;
                                            metadata = generalServices.keysToLowercase(item.metadata);
                                            return {
                                                id: item.id,
                                                sentOn: generalServices.convertTimestamp(item.sentOn, true),
                                                orderId: metadata.orderid,
                                                distributionChannel: metadata.distributionChannel,
                                                firstName: metadata.aroma_first_name,
                                                lastName: metadata.aroma_last_name,
                                                subject: metadata.aroma_file_name,
                                                uuid: item.uuid,
                                                email: metadata.aroma_mail_address
                                            };
                                        });
                                });
                    }
                };
            }
        ]);