function useStrict() {'use strict';}

var util = require('util');

var Utils = require('./Utils');
var Endpoint = require('./Endpoint');

module.exports = class ApiComponent {
	constructor(name, url) {
		useStrict();

		this.name = name;
		this.url = url;

		this.endpoints = {};
		this.endptFuncs = {};

		return this;
	}

	///
	/// This method will add an endpoint to ApiComponent.endpoints and
	/// dynamically create a function to define that endpoint's value
	/// (only if the endpoint accepts no parameters)
	///
	/// params:
	///		endpointName:		The name of the parameter as its used in Crystalys.
	///		endpointUrl:		The string that will be used in the URL segment generated when making a request to the Steam WebAPI.
	///		needsParameters: 	True if the endpoint requires at least one parameter, false otherwise.
	///
	addEndpoint(endpointName, endpointUrl, needsParameters) {
		useStrict();

		var endpoint = new Endpoint(this, endpointName, endpointUrl);

		// box in an object to pass by reference
		var that = {that: this};

		var clonedEndpoint = Utils.clone(endpoint);
		delete clonedEndpoint.parent.endpoints;

		console.log('\n\nclonedEndpoint: ' + util.inspect(clonedEndpoint, {showHidden: false, depth: null}));
		console.log('\n\nthis (in addEndpoint): ' + util.inspect(that.that, {showHidden: false, depth: null}));

		this[endpointName] = clonedEndpoint;

		// var editedApiComponent = Object.defineProperty(this, clonedEndpoint.name, {
		// 	enumerable: true,
		// 	configurable: false,
		// 	assignable: false,
		// 	value: clonedEndpoint
		// });

		if(!needsParameters) {
			var sendRequest = function() {
				useStrict();

				var requestUrl = '';

				var baseUrl = 'https://api.steampowered.com/';
				var apiComponentUrl = this.parent.parent.url;
				var endpointUrl = this.parent.url;
				var apiKey = Utils.getApiKey();

				for(var parameter in this.parameters) {
					if(parameter.required) {
						Utils.log('the request was not sent due to a required parameter not being given a value.');
						return;
					}
				}

				requestUrl = baseUrl + apiComponentUrl + endpointUrl + '?key=' + apiKey;

				return rp(requestUrl);
			};

			this[endpointName].sendRequest = sendRequest;

			// Object.defineProperty(editedApiComponent[clonedEndpoint.name], 'sendRequest', {
			// 	enumerable: true,
			// 	configurable: false,
			// 	assignable: false,
			// 	value: sendRequest
			// });

			// console.log('editedApiComponent: ' + util.inspect(editedApiComponent, {showHidden: false, depth: null}));
		}

		return endpoint;
	}
};
