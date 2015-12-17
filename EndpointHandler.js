function useStrict() {'use strict';}

module.exports = class EndpointHandler {
	constructor(name, urlSegment, version, needsParams) {
		useStrict();

		this.name = name;
		this.urlSegment = urlSegment;
		this.version = 'v' + version;
		this.needsParams = needsParams || true; // default value

		this.parameters = [];
	}

	getName() {
		return this.name;
	}

	getUrlSegment() {
		return this.urlSegment;
	}

	needsParameters() {
		return this.needsParameters;
	}

	addParameter(parameterHandler) {
		this.parameters.push(parameterHandler);

		return this; // allow chaining
	}

	generateEndpoint(urlSegments) {
		urlSegments.push(this.urlSegment);
		urlSegments.push(this.version);

		var endpoint = {};

		var parameterIndex = 0;

		if(this.needsParams) { // generate the endpoint with the parameters but no sendRequest function
			for(parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
				endpoint[this.parameters[parameterIndex].getName()] = this.parameters[parameterIndex].generateParameter(urlSegments);
				endpoint.requestable = false;
				console.log('endpoint: ' + endpoint);
			}
		} else { // generate the endpoint with the parameters but also with a sendRequest function
			for(parameterIndex = 0; parameterIndex < this.parameters.length; parameterIndex++) {
				endpoint[this.parameters[parameterIndex].getName()] = this.parameters[parameterIndex].generateParameter(urlSegments);
				endpoint.requestable = true;
				console.log('endpoint: ' + endpoint);
			}
		}

		return endpoint;
	}
};
