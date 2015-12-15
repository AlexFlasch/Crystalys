function useStrict() {'use strict';}

var crystalys = require('./Crystalys.js');
var Parameter = require('./Parameter.js');

module.export = class Endpoint {
	constructor(parent, name, url) {
		useStrict();

		this.parent = parent;
		this.name = name;
		this.url = url;

		this.parameters = {};
		this.paramFuncs = {};
	}

	///
	/// This method will add a parameter to Endpoint.parameters and
	/// dynamically create a function to define that parameter's value
	///
	/// params:
	///		name:     The name of the parameter as its used in Crystalys.
	///		url:      The string that will be used in the URL segment generated when making a request to the Steam WebAPI.
	///		required: True if the parameter is required for the request, false otherwise.
	///
	addParameter(name, url, required) {
		useStrict();

		var parameter = new Parameter(this, name, url, required);
		var that = this;

		// dynamically assign a new parameter to the parameters object at the key parameter.name
		Object.defineProperty(this.parameters, parameter.name, {
			enumerable: true,
			configurable: false,
			assignable: false,
			value: parameter
		});

		var paramFunc = function(value) {
			crystalys.log(that.parameters[parameter.name].value);
			that.parameters[parameter.name].value = value;
			crystalys.log(that.parameters[parameter.name].value);

			return that;
		};

		Object.defineProperty(this, parameter.name, {
			enumerable: true,
			configurable: false,
			assignable: false,
			value: paramFunc
		});
	}

	///
	/// This method will generate the url to send a request, but only for
	/// an endpoint that can accept no parameters. (i.e. GetMatchHistory)
	///
	/// params: none
	///
	/// returns: request-promise promise object
	sendRequest() {
		useStrict();

		var requestUrl = '';

		var baseUrl = 'https://api.steampowered.com/';
		var apiComponentUrl = this.parent.parent.url;
		var endpointUrl = this.parent.url;
		var apiKey = Crystalys.getApiKey();

		for(var parameter in this.parameters) {
			if(parameter.required) {
				Crystalys.log('the request was not sent due to a required parameter not being given a value.');
				return;
			}
		}

		requestUrl = baseUrl + apiComponentUrl + endpointUrl + '?key=' + apiKey;

		return rp(requestUrl);
	}
};
