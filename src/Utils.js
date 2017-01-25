var chalk = require('chalk');

var apiKey = '';

module.exports = {
	log(message) {
		var prefix = chalk.bold.red('CRIT: ');
		console.log(prefix + message);
	},

	clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	setApiKey(key) {
		apiKey = key;
	},

	getApiKey() {
		if(apiKey !== '') {
			return apiKey;
		} else {
			this.log('API key is not set');
			return null;
		}
    },

    generateEndpointRequestUrl(urlSegments) {
        const apiKey = this.getApiKey();

		// urlSegments[0] = baseUrl
		// urlSegments[1] = schemaUrl
		// urlSegments[2] = endpointUrl
		// urlSegments[3] = apiVersion
        const requestUrl = `${urlSegments[0]}/${urlSegments[1]}/${urlSegments[2]}/${urlSegments[3]}?key=${apiKey}`;

        return requestUrl;
    },

    generateRequestUrl(urlSegments, parameters) {
        let requestUrl = this.generateEndpointRequestUrl(urlSegments);

        const parameterNames = Object.keys(parameters);

        // append parameters as such: &[param_name]=[param_value]
        for (var i = 0; i < parameterNames.length; i++) {
            requestUrl += `&${parameterNames[i]}=${parameters[parameterNames[i]]}`;
        }

        return requestUrl;
    },

	generatePromise(url) {
		// console.log(url.uri);

		// return new Promise((resolve, reject) => {
		// 	const lib = core.String.startsWith(url.uri, 'https') ? require('https') : require('http');
		//
		// 	const options = url.uri;
		//
    	// 	const request = lib.request(url, (response) => {
		// 		// handle http errors
		// 	    if (response.statusCode < 200 || response.statusCode > 299) {
		// 	    	reject(new Error('Failed to load page, status code: ' + response.statusCode));
		// 	    }
		//
		// 		// temporary data holder
		// 		const body = [];
		//
		// 		// on every content chunk, push it to the data array
		// 		response.on('data', (chunk) => body.push(chunk));
		//
		// 		// we are done, resolve promise with those joined chunks
		// 		response.on('end', () => resolve(body.join('')));
		//     });
		//
		//     // handle connection errors of the request
		//     request.on('error', (err) => reject(err))
	    // });

		return axios.get(url);
	}
};
