'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rp = require('request-promise');
var Utils = require('./Utils');

module.exports = function () {
	function Parameter(parent, name, url, required) {
		_classCallCheck(this, Parameter);

		useStrict();

		this.parent = parent;
		this.name = name;
		this.value = null; // undefined until user specifies a value
		this.url = url;
		this.required = required;
	}

	///
	/// This method will generate the request URL for the API call that's been chained together,
	/// send the request, and return a promise object to the user to resolve when needed.
	///
	/// params: none
	///


	_createClass(Parameter, [{
		key: 'sendRequest',
		value: function sendRequest() {
			var requestUrl = '';

			var baseUrl = 'https://api.steampowered.com/';
			var apiComponentUrl = this.parent.parent.url;
			var apiKey = Utils.getApiKey();

			var endpointUrl = this.parent.url;
			var parameterStrings = [];

			for (var parameter in this.parent.parameters) {
				var parameterUrl = parameter.url;
				var parameterValue = parameter.value;

				if (parameterValue === null && parameter.required) {
					Utils.log('the request was not sent due to a required parameter not being given a value.');
					return;
				} else if (parameterValue === null) {
					continue;
				}

				var parameterString = '&' + parameterUrl + '=' + parameterValue.toString();
				parameterStrings.push(parameterString);
			}

			requestUrl = baseUrl + apiComponentUrl + endpointUrl + '?key=' + apiKey;

			for (var i = 0; i < parameterStrings.length; i++) {
				requestUrl += parameterStrings[i];
			}

			return generatePromise(requestUrl);
		}
	}]);

	return Parameter;
}();