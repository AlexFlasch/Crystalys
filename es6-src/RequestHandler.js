function useStrict() { 'use strict'; }

var util = require('util');
var rp = require('request-promise');
var Utils = require('./Utils');
var Endpoint = require('./Endpoint');

module.exports = class RequestHandler {
	constructor(api) {
		useStrict();

		this.api = api;
	}

    static generateRequestFunctions(api) {
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

                        endpointObj[parameter.getName()] = function(value) {
                            endpointObj.urlSegments.push(parameterSegment);
                            endpointObj.values[parameter.getName()] = value;
                        }
                    })(endpointObj, parameter);
                }

                schemaObj[endpoint.getName()] = endpointObj;
            }

            api[schema.getName()] = schemaObj;
        }
    }
};
