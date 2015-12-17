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

	getUrlSegment() {
		return this.urlSegment;
	}

	addEndpoint(endpointHandler) {
		this.endpoints.push(endpointHandler);

		return this;
	}

	generateSchema(baseUrl) {
		var schema = {};

		var urlSegments = [baseUrl, this.url];

		for(var endpointIndex = 0; endpointIndex < this.endpoints.length; endpointIndex++) {
			schema[this.endpoints[endpointIndex].getName()] = this.endpoints[endpointIndex].generateEndpoint(urlSegments);
		}

		return schema;
	}
};
