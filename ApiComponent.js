function useStrict() {'use strict';}

module.exports = class ApiComponent {
	constructor(name, url) {
		useStrict();

		this.name = name;
		this.url = url;

		this.endpoints = {};
	}

	addEndpoint(endpoint) {
		var that = this;

		Object.defineProperty(this.endpoints, endpoint.name, {
			enumerable: true,
			configurable: false,
			assignable: false,
			value: endpoint
		});

		return endpoint;
	}
};
