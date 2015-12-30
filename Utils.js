'use strict';

function useStrict() {}

var chalk = require('chalk');

var apiKey = '';

module.exports = {
	log: function log(message) {
		useStrict();

		var prefix = chalk.bold.red('CRIT: ');
		console.log(prefix + message);
	},

	clone: function clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	setApiKey: function setApiKey(key) {
		useStrict();

		apiKey = key;
	},

	getApiKey: function getApiKey() {
		useStrict();

		if (apiKey !== '') {
			return apiKey;
		} else {
			this.log('API key is not set');
			return null;
		}
	},

	generateEndpointRequestUrl: function generateEndpointRequestUrl(urlSegments) {
		var apiKey = this.getApiKey();

		var requestUrl = urlSegments[0]; // baseUrl
		requestUrl += '/' + urlSegments[1]; // schemaUrl
		requestUrl += '/' + urlSegments[2]; // endpointUrl
		requestUrl += '/' + urlSegments[3]; // apiVersion
		requestUrl += '?key=' + apiKey; // add apiKey

		return requestUrl;
	},

	generateRequestUrl: function generateRequestUrl(urlSegments, parameters) {
		var requestUrl = this.generateEndpointRequestUrl(urlSegments);

		var parameterNames = Object.keys(parameters);

		// append parameters as such: &<param_name>=<param_value>
		for (var i = 0; i < parameterNames.length; i++) {
			requestUrl += '&' + parameterNames[i] + '=' + parameters[parameterNames[i]];
		}

		return requestUrl;
	}
};