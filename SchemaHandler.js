function useStrict() {'use strict';}

module.exports = class SchemaHandler {
	constructor(name, urlSegment) {
		useStrict();

		this.name = name;
		this.urlSegment = urlSegment;

		this.endpoints = [];
	}

	getName() {
		return this.name;
    }

    getEndpoints() {
        return this.endpoints;
    }

	getUrlSegment() {
		return this.urlSegment;
	}

	addEndpoint(endpointHandler) {
		this.endpoints.push(endpointHandler);

		return this; // allow chaining
    }

    addEndpoints(endpointHandlers) {
        for (var endpointIndex = 0; endpointIndex < endpointHandlers.length; endpointIndex++) {
            this.endpoints.push(endpointHandlers[endpointIndex]);
        }

        return this; // allow chaining
    }

	generateSchema(baseUrl) {
        var schema = {};
        schema.getUrlSegments = function() {
            return this.urlSegment;
        }

		var urlSegments = [baseUrl, this.urlSegment];

		for(var endpointIndex = 0; endpointIndex < this.endpoints.length; endpointIndex++) {
			schema[this.endpoints[endpointIndex].getName()] = this.endpoints[endpointIndex].generateEndpoint(urlSegments);
		}

		return schema;
	}
};
