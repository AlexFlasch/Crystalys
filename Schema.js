'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function useStrict() {}

var util = require('util');

var Utils = require('./Utils');
var Endpoint = require('./Endpoint');

module.exports = (function () {
	function Schema(name, url) {
		_classCallCheck(this, Schema);

		useStrict();

		this.name = name;
		this.url = url;

		this.endpoints = {};
		this.endptFuncs = {};

		return this;
	}

	///
	/// This method will add an endpoint to Schema.endpoints and
	/// dynamically create a function to define that endpoint's value
	/// (only if the endpoint accepts no parameters)
	///
	/// params:
	///		endpointName:		The name of the parameter as its used in Crystalys.
	///		endpointUrl:		The string that will be used in the URL segment generated when making a request to the Steam WebAPI.
	///		needsParameters: 	True if the endpoint requires at least one parameter, false otherwise.
	///

	_createClass(Schema, [{
		key: 'addEndpoint',
		value: function addEndpoint(endpointName, endpointUrl, needsParameters) {
			useStrict();

			var endpoint = new Endpoint(this, endpointName, endpointUrl);

			if (!needsParameters) {
				var sendRequest = function sendRequest() {
					useStrict();

					var requestUrl = '';

					var baseUrl = 'https://api.steampowered.com/';
					var schemaUrl = this.parent.parent.url;
					var endpointUrl = this.parent.url;
					var apiKey = Utils.getApiKey();

					for (var parameter in this.parameters) {
						if (parameter.required) {
							Utils.log('the request was not sent due to a required parameter not being given a value.');
							return;
						}
					}

					requestUrl = baseUrl + schemaUrl + endpointUrl + '?key=' + apiKey;

					return rp(requestUrl);
				};

				this[endpointName].sendRequest = sendRequest;
			}

			return endpoint;
		}
	}]);

	return Schema;
})();