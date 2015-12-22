function useStrict() { 'use strict'; }

var util = require('util');
var rp = require('request-promise');
var Utils = require('./Utils');

module.exports = class EndpointHandler {
	constructor(name, urlSegment, version, needsParams) {
		useStrict();

		this.name = name;
		this.urlSegment = urlSegment;
        this.version = 'v' + version;
	    this.needsParams = needsParams;
	    if (this.needsParams === undefined) this.needsParams = true; // default value

		this.parameters = [];
	}

	getName() {
		return this.name;
    }

    getParameters() {
        return this.parameters;
    }

	getUrlSegment() {
		return this.urlSegment;
    }

    getSteamWebApiVersion() {
        return this.version;
    }

	needsParameters() {
		return this.needsParameters;
	}

	addParameter(parameterHandler) {
		this.parameters.push(parameterHandler);

		return this; // allow chaining
    }

    addParameters(parameterHandlers) {
        for (var parameterIndex = 0; parameterIndex < parameterHandlers.length; parameterIndex++) {
            this.parameters.push(parameterHandlers[parameterIndex]);
        }

        return this; // allow chaining
    }

	generateEndpoint(urlSegments) {
		urlSegments.push(this.urlSegment);
		urlSegments.push(this.version);

        var endpoint = {};
	    endpoint.values = {};
	    endpoint.urlSegments = urlSegments;
        endpoint.sendRequest = function() {
            if (endpoint.requestable) {

            } else {
                Utils.log('Cannot make a request on this endpoint without parameters');
            }
        }
        endpoint.getUrlSegments = function() {
            return this.urlSegment;
        }

	    let parameterIndex = 0;
	    let parameter;
        let endpointParam;

	    if(this.needsParams) { // generate the endpoint with the parameters but no sendRequest function
            for (parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
                parameter = this.parameters[parameterIndex].generateParameter(urlSegments);
                endpoint[this.parameters[parameterIndex].getName()] = parameter;
                endpointParam = endpoint[this.parameters[parameterIndex].getName()];

                // immediately invoked function to save the proper references to the parameter function
                (function(param) {
                    endpoint[param.name] = function (value) {
                        endpoint.values[param.name] = value;

                        return this;
                    }

                    function sendRequest() {
                        const requestUrl = Utils.generateRequestUrl(endpoint.values);

                        const rpOptions = {
                            uri: requestUrl,
                            json: true
                        };

                        return rp(rpOptions);
                    }
                })(parameter);
            }

            endpoint.requestable = false;
		} else { // generate the endpoint with the parameters but also with a sendRequest function
			for(parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
			    parameter = this.parameters[parameterIndex].generateParameter(urlSegments);
                endpoint[this.parameters[parameterIndex].getName()] = parameter;
			    endpointParam = endpoint[this.parameters[parameterIndex].getName()];
			    endpoint.sendRequest = function() {
			        const requestUrl = Utils.generateEndpointRequestUrl(urlSegments);

			        const rpOptions = {
                        uri: requestUrl,
                        json: true
			        };

			        return rp(rpOptions);
			    };

                // immediately invoked function to save the proper references to the parameter function
                (function (param) {
                    endpoint[param.name] = function (value) {
                        endpoint.values[param.name] = value;

                        return this;
                    }

                    function sendRequest() {
                        const requestUrl = Utils.generateRequestUrl(endpoint.values);

                        const rpOptions = {
                            uri: requestUrl,
                            json: true
                        };

                        return rp(rpOptions);
                    }
                })(parameter);
			}

            endpoint.requestable = true;
		}

		return endpoint;
	}
};
