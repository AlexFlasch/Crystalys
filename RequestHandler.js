'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function useStrict() {}

var util = require('util');
var rp = require('request-promise');
var Utils = require('./Utils');
var Endpoint = require('./Endpoint');

module.exports = (function () {
    function RequestHandler(api) {
        _classCallCheck(this, RequestHandler);

        useStrict();

        this.api = api;
    }

    _createClass(RequestHandler, null, [{
        key: 'generateRequestFunctions',
        value: function generateRequestFunctions(api) {
            var baseUrl = api.urlSegment;
            var schemas = api.getSchemas();

            for (var schemaIndex = 0; schemaIndex < schemas.length; schemaIndex++) {
                var schema = schemas[schemaIndex];
                var schemaSegment = schema.getUrlSegment();
                var schemaObj = {};
                var endpoints = schema.getEndpoints();

                for (var endpointIndex = 0; endpointIndex < endpoints.length; endpointIndex++) {
                    var endpoint = endpoints[endpointIndex];
                    var endpointSegment = endpoint.getUrlSegment();
                    var endpointVersion = endpoint.getSteamWebApiVersion();
                    var endpointObj = new Endpoint();
                    endpointObj.urlSegments = [baseUrl, schemaSegment, endpointSegment, endpointVersion];

                    var parameters = endpoint.getParameters();

                    for (var parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
                        var parameter = parameters[parameterIndex];

                        (function (endpointObj, parameter) {
                            var parameterSegment = parameter.urlSegment;

                            endpointObj[parameter.getName()] = function (value) {
                                endpointObj.urlSegments.push(parameterSegment);
                                endpointObj.values[parameter.getName()] = value;
                            };
                        })(endpointObj, parameter);
                    }

                    schemaObj[endpoint.getName()] = endpointObj;
                }

                api[schema.getName()] = schemaObj;
            }
        }
    }]);

    return RequestHandler;
})();