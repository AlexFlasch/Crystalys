function useStrict() {'use strict';}

var chalk = require('chalk');

var apiKey = '';

module.exports = {
	log: function(message) {
		useStrict();

		var prefix = chalk.bold.red('CRIT: ');
		console.log(prefix + message);
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	setApiKey: function(key) {
		useStrict();

		apiKey = key;
	},

	getApiKey: function() {
		useStrict();

		if(apiKey !== '') {
			return apiKey;
		} else {
			this.log('API key is not set');
			return null;
		}
    },

    generateEndpointRequestUrl: function(urlSegments) {
        var apiKey = this.getApiKey();

        var requestUrl = urlSegments[0]; // baseUrl
        requestUrl += '/' + urlSegments[1]; // schemaUrl
        requestUrl += '/' + urlSegments[2]; // endpointUrl
        requestUrl += '/' + urlSegments[3]; // apiVersion
        requestUrl += '?key=' + apiKey; // add apiKey

        return requestUrl;
    },

    genereateRequestUrl: function(urlSegments, parameters) {
        var requestUrl = generateEndpointRequestUrl(urlSegments);

        var parameterNames = Object.keys(parameters);

        // append parameters as such: &<param_name>=<param_value>
        for (var i = 0; i < parameterNames.length; i++) {
            requestUrl += '&' + parameterNames[i] + '=' + parameters[parameterNames[i]];
        }

        return requestUrl;
    }
};
