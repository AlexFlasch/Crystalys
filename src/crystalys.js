var util = require('util');

var Utils = require('./Utils');
var ApiHandler = require('./ApiHandler');
var SchemaHandler = require('./SchemaHandler');
var EndpointHandler = require('./EndpointHandler');
var ParameterHandler = require('./ParameterHandler');
var apiJson = require('./../data/api.json');

var steamWebApiVersion = 1;

class Crystalys {
	constructor() {
		this.api = this.generateApiStructure();
	}

	generateApiStructure() {
		const apiHandler = new ApiHandler(apiJson.urlSegment);

		const schemas = [];

		// schema-level generation
		for (let i = 0; i < apiJson.schemas.length; i++) {
			const schema = apiJson.schemas[i];

			const schemaObj = new SchemaHandler(
                                    schema.name,
                                    schema.urlSegment);

			const endpoints = [];

			// endpoint-level generation
			for (let j = 0; j < schema.endpoints.length; j++) {
				const endpoint = schema.endpoints[j];

				const endpointObj =
                    new EndpointHandler(
                            endpoint.name,
                            endpoint.urlSegment,
                            steamWebApiVersion,
                            endpoint.parameterRequired);

				const parameters = [];

				// parameter-level generation
				for (let k = 0; k < endpoint.parameters.length; k++) {
					const parameter = endpoint.parameters[k];

					const parameterObj = new ParameterHandler(
                                                parameter.name,
                                                parameter.urlSegment,
                                                parameter.required);

					parameters.push(parameterObj);
				}

				endpointObj.addParameters(parameters);
				endpoints.push(endpointObj);
			}

			schemaObj.addEndpoints(endpoints);
			schemas.push(schemaObj);
		}

		apiHandler.addSchemas(schemas);


		const temp = apiHandler.getApi();

		return temp;
	}

	setApiKey(apiKey) {
		Utils.setApiKey(apiKey);

		return this; // allow chaining
	}

	getApiKey() {
		return Utils.getApiKey();
	}
};

module.exports = new Crystalys();
