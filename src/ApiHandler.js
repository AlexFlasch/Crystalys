module.exports = class ApiHandler {
	constructor() {
	    this.urlSegment = 'https://api.steampowered.com';

		this.schemas = [];
    }

    getRequestUrl() {
        return this.urlSegment;
    }

	getApi() {
		return generateApi(this);
    }

    getSchemas() {
        return this.schemas;
    }

	addSchema(schemaHandler) {
		this.schemas.push(schemaHandler);

		return this; // allow chaining
    }

    addSchemas(schemaHandlers) {
        for (var schemaIndex = 0; schemaIndex < schemaHandlers.length; schemaIndex++) {
            this.schemas.push(schemaHandlers[schemaIndex]);
        }

        return this; // allow chaining
    }
};

function generateApi(apiHandler) {
	var api = {};
    var baseUrl = 'https://api.steampowered.com';
    api.getUrlSegments = function() {
        return baseUrl;
    }

	for(var schemaIndex = 0; schemaIndex < apiHandler.schemas.length; schemaIndex++) {
		api[apiHandler.schemas[schemaIndex].getName()] = apiHandler.schemas[schemaIndex].generateSchema(baseUrl);
	}

	return api;
}
