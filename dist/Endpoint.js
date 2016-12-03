'use strict';

function useStrict() {}

var Utils = require('./Utils');

module.exports = function Endpoint() {
    // constructor
    useStrict();

    var urlSegments = [];
    var values = {};
    // end constructor

    // functions for each type of parameter will be dynamically added here.

    function generateRequestUrl(urlSegments) {
        var requestUrl = '';

        var apiKey = Utils.getApiKey();

        requestUrl += urlSegments[0]; // add baseUrl
        requestUrl += '/' + urlSegments[1]; // add schemaUrl
        requestUrl += '/' + urlSegments[2] + '/' + urlSegments[3]; // add endpointUrl and apiVersion
        requestUrl += '?key=' + apiKey; // add apiKey

        for (var i = 4; i < urlSegments.length; i++) {
            requestUrl += '&' + urlSegments[i] + '=' + values[urlSegments[i]];
        }

        return requestUrl;
    }

    // will generate the request URL and send the request via a promise, then return the promise obj.
    function sendRequest() {
        var requestUrl = generateRequestUrl(urlSegments);
        var promise = Utils.generatePromise(requestUrl);

        return promise;
    }
};