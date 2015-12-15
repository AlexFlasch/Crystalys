function useStrict() {'use strict';}

var rp = require('request-promise');
var Crystalys = require('./Crystalys.js');

module.export = class Parameter {
	constructor(parent, name, url, required) {
		useStrict();

		this.parent = parent;
		this.name = name;
		this.value = null; // undefined until user specifies a value
		this.url = url;
		this.required = required;
	}

	///
	/// This method will generate the request URL for the API call that's been chained together,
	/// send the request, and return a promise object to the user to resolve when needed.
	///
	/// params: none
	///
	sendRequest() {
		useStrict();

		var requestUrl = '';

		var baseUrl = 'https://api.steampowered.com/';
		var apiComponentUrl = this.parent.parent.url;
		var endpointUrl = this.parent.url;
		var apiKey = Crystalys.getApiKey();
		var parameterStrings = [];

		for(var parameter in this.parent.parameters) {
			var parameterUrl = parameter.url;
			var parameterValue = parameter.value;

			if(parameterValue === null && parameter.required) {
				Crystalys.log('the request was not sent due to a required parameter not being given a value.');
				return;
			}
			else if(parameterValue === null) {
				continue;
			}

			var parameterString = '&' + parameterUrl + '=' + parameterValue.toString();
			parameterStrings.push(parameterString);
		}

		requestUrl = baseUrl + apiComponentUrl + endpointUrl + '?key=' + apiKey;

		for(var i = 0; i < parameterStrings.length; i++) {
			requestUrl += parameterStrings[i];
		}

		Crystalys.log(requestUrl);

		return rp(requestUrl);
	}
};
