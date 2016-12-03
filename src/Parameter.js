var rp = require('request-promise');
var Utils = require('./Utils');

module.exports = class Parameter {
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
		let requestUrl = '';

		const baseUrl = 'https://api.steampowered.com/';
		const apiComponentUrl = this.parent.parent.url;
		const apiKey = Utils.getApiKey();

		let endpointUrl = this.parent.url;
		let parameterStrings = [];

		for(const parameter in this.parent.parameters) {
			var parameterUrl = parameter.url;
			var parameterValue = parameter.value;

			if(parameterValue === null && parameter.required) {
				Utils.log('the request was not sent due to a required parameter not being given a value.');
				return;
			}
			else if(parameterValue === null) {
				continue;
			}

			var parameterString = '&' + parameterUrl + '=' + parameterValue.toString();
			parameterStrings.push(parameterString);
		}

		requestUrl = baseUrl + apiComponentUrl + endpointUrl + '?key=' + apiKey;

		for(let i = 0; i < parameterStrings.length; i++) {
			requestUrl += parameterStrings[i];
		}

		return generatePromise(requestUrl);
	}
};
