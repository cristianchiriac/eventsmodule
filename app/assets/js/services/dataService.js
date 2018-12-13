angular
    .module('app')
    .service('DataService', ['$http', '_', function($http, _) {
        this.getDataByDistributionChannel = function(url, parameters) {
            var params = parameters || '';
            return $http({
                method: 'GET',
                url: '/api' + url,
                params: {
                    salesLine: params.salesLine.toUpperCase(),
                    countryCode: params.countryCode.toUpperCase(),
                    languageCode: params.languageCode
                }
            });
        };
        this.getData = function(url, mock, headers) {
            var requestUrl = (mock === 1) ? url : '/api' + url,
                config = {
                    url: requestUrl,
                };
            config.headers = headers;
            return $http(config).then(function(response) {
                return response;
            });
        };
        this.getMock = function(url) {
            return $http({
                method: 'GET',
                url: url,
            });
        };
        this.putData = function(url, data, method, headers) {
            var config = {
                method: method,
                url: '/api' + url,
            };
            config.headers = headers;
            config.data = data;

            return $http(config).then(function(response) {
                return response;
            });
        };
        this.transformEvent = function(event, key, save) {
            for (var i in event) {
                if (event[i]) {
                    if (event[i].points) {
                        /* store points under a temporary variable */
                        var temp = event[i].points;
                        /* transform points from array to an empty object where
                        we add the transformed structure or xpath/value */
                        event[i].points = (!save) ? [] : {};
                        for (var j in temp) {
                            if (!save) {
                                event[i].points.push({
                                    query: temp[j].query,
                                    value: temp[j].value,
                                    name: j,
                                    fields: temp[j].fields,
                                    sort: this.flattenNestedList(temp[j].sort)
                                });
                            } else {
                                event[i].points[temp[j].name] = {
                                    query: temp[j].query,
                                    value: (temp[j].value) ? temp[j].value : 'STRING_VALUE',
                                    name: temp[j].name,
                                    sort: this.unflattedNestedList(temp[j].sort)
                                };
                            }
                            if (temp[j].fields) {
                                var tempFields = temp[j].fields;
                                if (!save) {
                                    var index = event[i].points.map(function(e) {
                                        return e.name;
                                    }).indexOf(j);
                                    event[i].points[index].fields = [];
                                } else {
                                    event[i].points[temp[j].name].fields = {};
                                }
                                for (var k in tempFields) {
                                    if (!save) {
                                        event[i].points[index].fields.push({
                                            query: tempFields[k].query,
                                            value: tempFields[k].value,
                                            name: k,
                                            fields: this.formatFields(tempFields[k].fields, 'list')
                                        });
                                    } else {
                                        event[i].points[temp[j].name].fields[tempFields[k].name] = {
                                            query: tempFields[k].query,
                                            value: tempFields[k].value,
                                            fields: this.formatFields(tempFields[k].fields, 'object')
                                        };
                                    }

                                }
                            }
                        }
                    }
                    if (event[i].point && key === 'key') {
                        var temp = event[i].point;
                        event[i].point = (!save) ? [] : {};
                        if (!save) {
                            event[i].point.push({
                                value: temp.value,
                                query: temp.query
                            })
                        } else {
                            for (var j in temp) {
                                event[i].point = {
                                    value: temp[0].value,
                                    query: temp[0].query
                                }
                            }
                        }
                    }
                }
                if (!event.hasOwnProperty(i)) continue;
                if ((typeof event[i]) == 'object') {
                    this.transformEvent(event[i], i, save);
                }
            }
            return event;
        };
        this.formatFields = (object, type) => {
            let i = 0,
                list;
            if (!list) {
                list = (type === 'list') ? [] : {};
            }

            if (type === 'list') {
                for (var key in object) {
                    list.push({
                        name: key,
                        query: object[key].query,
                        value: 'STRING_VALUE'
                    });
                }
            } else {
                if (object) {
                    object.map((item) => {
                        list[item.name] = {
                            query: item.query,
                            value: item.value
                        }
                    })
                }
            }
            return list;
        };
        this.unflattedNestedList = function(object) {
            if (!object || (object && object.length <= 0)) return null;
            var data = {},
                d = data;
            for (var i = 0; i < object.length; i++) {
                if (i != object.length - 1) {
                    d.field = object[i].field;
                    d.order = object[i].order;
                    d = d.then = {};
                } else {
                    d.field = object[i].field;
                    d.order = object[i].order;
                    d.then = null;
                }
            }
            return data;
        };
        this.flattenNestedList = function(object, index, data) {
            data = data ? data : [];
            var temp = {};

            if (!index) index = 0;

            for (var key in object) {
                if (typeof object[key] === 'object' && object[key] !== null) {
                    index++;
                    this.flattenNestedList(object[key], index, data);
                } else {
                    temp[key] = object[key];
                }
                data.push(temp);
            }
            return _.uniq(data);
        };
        this.slugify = function(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, ''); // Trim - from end of text
        };
    }]);