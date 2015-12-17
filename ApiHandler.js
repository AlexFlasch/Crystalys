function useStrict() {'use strict';}

module.exports = class ApiHandler {
	constructor() {
		useStrict();

		this.schemas = [];
	}

	getApi() {
		return generateApi(this);
	}

	addSchema(schemaHandler) {
		this.schemas.push(schemaHandler);

		return this; // allow chaining
	}
};

function generateApi(apiHandler) {
	useStrict();

	var api = {};
	var baseUrl = 'https://api.steampowered.com';

	for(var schemaIndex = 0; schemaIndex < apiHandler.schemas.length; schemaIndex++) {
		api[apiHandler.schemas[schemaIndex].getName()] = apiHandler.schemas[schemaIndex].generateSchema(baseUrl);
	}

	return api;
}
