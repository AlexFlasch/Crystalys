function useStrict() {'use strict';}

var Utils = require('./Utils');
var ApiComponent = require('./ApiComponent');
var Endpoint = require('./Endpoint');
var Parameter = require('./Parameter');

module.exports = class Crystalys {
	constructor() {
		useStrict();
		
		this.apiKeyIsSet = false;

		this.api = {
			Match: new ApiComponent(
				'Match',
				'IDOTA2Match_570/'
			)
				.addEndpoint(
					'GetMatchHistory',
					'GetMatchHistory/',
					false
				)
					.addParameter(
						'heroID',
						'hero_id',
						false
					)
		};

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
		useStrict();

		Utils.setApiKey(key);
		this.apiKeyIsSet = true;
	}
};
