'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function useStrict() {}

module.exports = (function () {
    function ApiHandler() {
        _classCallCheck(this, ApiHandler);

        useStrict();

        this.urlSegment = 'https://api.steampowered.com';

        this.schemas = [];
    }

    _createClass(ApiHandler, [{
        key: 'getRequestUrl',
        value: function getRequestUrl() {
            return this.urlSegment;
        }
    }, {
        key: 'getApi',
        value: function getApi() {
            return generateApi(this);
        }
    }, {
        key: 'getSchemas',
        value: function getSchemas() {
            return this.schemas;
        }
    }, {
        key: 'addSchema',
        value: function addSchema(schemaHandler) {
            this.schemas.push(schemaHandler);

            return this; // allow chaining
        }
    }, {
        key: 'addSchemas',
        value: function addSchemas(schemaHandlers) {
            for (var schemaIndex = 0; schemaIndex < schemaHandlers.length; schemaIndex++) {
                this.schemas.push(schemaHandlers[schemaIndex]);
            }

            return this; // allow chaining
        }
    }]);

    return ApiHandler;
})();

function generateApi(apiHandler) {
    useStrict();

    var api = {};
    var baseUrl = 'https://api.steampowered.com';
    api.getUrlSegments = function () {
        return baseUrl;
    };

    for (var schemaIndex = 0; schemaIndex < apiHandler.schemas.length; schemaIndex++) {
        api[apiHandler.schemas[schemaIndex].getName()] = apiHandler.schemas[schemaIndex].generateSchema(baseUrl);
    }

    return api;
}