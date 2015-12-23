'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function useStrict() {}

var util = require('util');
var rp = require('request-promise');
var Utils = require('./Utils');

module.exports = (function () {
    function EndpointHandler(name, urlSegment, version, needsParams) {
        _classCallCheck(this, EndpointHandler);

        useStrict();

        this.name = name;
        this.urlSegment = urlSegment;
        this.version = 'v' + version;
        this.needsParams = needsParams;
        if (this.needsParams === undefined) this.needsParams = true; // default value

        this.parameters = [];
    }

    _createClass(EndpointHandler, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'getParameters',
        value: function getParameters() {
            return this.parameters;
        }
    }, {
        key: 'getUrlSegment',
        value: function getUrlSegment() {
            return this.urlSegment;
        }
    }, {
        key: 'getSteamWebApiVersion',
        value: function getSteamWebApiVersion() {
            return this.version;
        }
    }, {
        key: 'needsParameters',
        value: function needsParameters() {
            return this.needsParameters;
        }
    }, {
        key: 'addParameter',
        value: function addParameter(parameterHandler) {
            this.parameters.push(parameterHandler);

            return this; // allow chaining
        }
    }, {
        key: 'addParameters',
        value: function addParameters(parameterHandlers) {
            for (var parameterIndex = 0; parameterIndex < parameterHandlers.length; parameterIndex++) {
                this.parameters.push(parameterHandlers[parameterIndex]);
            }

            return this; // allow chaining
        }
    }, {
        key: 'generateEndpoint',
        value: function generateEndpoint(urlSegments) {
            urlSegments.push(this.urlSegment);
            urlSegments.push(this.version);

            var endpoint = {};
            endpoint.values = {};
            endpoint.urlSegments = urlSegments;
            endpoint.getUrlSegments = function () {
                return this.urlSegment;
            };

            var parameterIndex = 0;
            var parameter = undefined;
            var endpointParam = undefined;

            if (this.needsParams) {
                // generate the endpoint with the parameters but no sendRequest function
                for (parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
                    parameter = this.parameters[parameterIndex].generateParameter(urlSegments);
                    endpoint[this.parameters[parameterIndex].getName()] = parameter;
                    endpointParam = endpoint[this.parameters[parameterIndex].getName()];

                    // immediately invoked function to save the proper references to the parameter function
                    (function (param) {
                        endpoint[param.name] = function (value) {
                            endpoint.values[param.name] = value;

                            return this;
                        };

                        function sendRequest() {
                            var requestUrl = Utils.generateRequestUrl(endpoint.values);

                            var rpOptions = {
                                uri: requestUrl,
                                json: true
                            };

                            return rp(rpOptions);
                        }
                    })(parameter);
                }

                endpoint.requestable = false;
            } else {
                // generate the endpoint with the parameters but also with a sendRequest function
                for (parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
                    parameter = this.parameters[parameterIndex].generateParameter(urlSegments);
                    endpoint[this.parameters[parameterIndex].getName()] = parameter;
                    endpointParam = endpoint[this.parameters[parameterIndex].getName()];
                    endpoint.sendRequest = function () {
                        var requestUrl = Utils.generateEndpointRequestUrl(urlSegments);

                        var rpOptions = {
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
                        };

                        function sendRequest() {
                            var requestUrl = Utils.generateRequestUrl(endpoint.values);

                            var rpOptions = {
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
    }]);

    return EndpointHandler;
})();