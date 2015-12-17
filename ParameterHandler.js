function useStrict() {'use strict';}

module.exports = class ParameterHandler {
	constructor(name, urlSegment, required) {
		useStrict();

		this.name = name;
		this.urlSegment = urlSegment;
		this.required = required;
	}

	getName() {
		return this.name;
	}

	getUrlSegment() {
		return this.urlSegment;
	}

	isRequired() {
		return this.required;
	}

	generateParameter(urlSegments) {
		return {
			name: this.name,
			urlSegments: urlSegments
		};
	}
};
