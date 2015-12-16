function useStrict() {'use strict';}

var chalk = require('chalk');

this.apiKey = '';

var that = this;

module.exports = exports = {
	log: function(message) {
		useStrict();

		var prefix = chalk.bold.red('CRIT: ');
		console.log(prefix + message);
	},

	clone: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	setApiKey: function(apiKey) {
		useStrict();

		that.apiKey = apiKey;
	},

	getApiKey: function() {
		useStrict();

		if(that.apiKey !== '') {
			return that.apiKey;
		} else {
			Utils.log('API key is not set');
			return null;
		}
	}
};
