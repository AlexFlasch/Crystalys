function useStrict() {'use strict';}

var chalk = require('chalk');

var Utils = require('./Utils.js');
var ApiComponent = require('./ApiComponent.js');
var Endpoint = require('./Endpoint.js');

class Crystalys {
	constructor() {
		useStrict();

		this.apiKey = '';
		this.apiKeyIsSet = false;

		this.api = {
			Match: new ApiComponent(
				'Match',
				'IDOTA2Match_570/'
			)
				.addEndpoint(new Endpoint(
					'GetMatchHistory',
					'GetMatchHistory/'
				))
					.addParameter(
						'heroID',
						'hero_id',
						false
					)
		};
	}

	static log(message) {
		useStrict();

		var prefix = chalk.bold.red('CRIT: ');
		console.log(prefix + message);
	}

	setApiKey(key) {
		useStrict();

		this.apiKey = key;
		this.apiKeyIsSet = true;
		Crystalys.log('API key set');
	}

	getApiKey(key) {
		useStrict();

		if(this.apiKeyIsSet) {
			return this.apiKey;
		} else {
			Crystalys.log('API key is not set');
			return null;
		}
	}
}

var exports = {};
var crystalys = new Crystalys();

// add the api directly to the exports obj
for(var apiComponent in crystalys.api) {
	Utils.addExport(apiComponent.name, apiComponent);
}

// add any additional functions/variables to the exports obj
Utils.addExport('setApiKey', crystalys.setApiKey);
Utils.addExport('log', crystalys.log);

module.exports = exports;
