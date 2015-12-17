function useStrict() {'use strict';}

var Utils = require('./Utils');
var ApiHandler = require('./ApiHandler');
var SchemaHandler = require('./SchemaHandler');
var EndpointHandler = require('./EndpointHandler');
var ParameterHandler = require('./ParameterHandler');

var steamWebApiVersion = 1;

module.exports = class Crystalys {
	constructor() {
		useStrict();

		this.apiKeyIsSet = false;

		this.api = new ApiHandler().addSchema(
			new SchemaHandler('Match', 'IDOTA2Match_205790').addEndpoint(
				new EndpointHandler('GetMatchHistory', 'GetMatchHistory', steamWebApiVersion, false)
			)
		).getApi();

		for(var apiComponent in this.api) {
			Object.defineProperty(this, apiComponent, {
				enumerable: true,
				configurable: false,
				assignable: false,
				value: this.api[apiComponent]
			});
		}
		delete this.api;
	}

	setApiKey(key) {
		Utils.setApiKey(key);
		this.apiKeyIsSet = true;
	}
};
