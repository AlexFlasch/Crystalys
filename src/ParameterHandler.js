module.exports = class ParameterHandler {
	constructor(name, urlSegment, required) {
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
			urlSegment: this.urlSegment,
			getUrlSegments() {
			    return this.urlSegment;
			}
		};
	}
};
