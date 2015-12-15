//var crystalys = require('./Crystalys.js');
var Endpoint = require('./Endpoint.js');

var endpoint = new Endpoint(undefined, 'test', 'test');

for(var prop in endpoint) {
	console.log(prop);
}

// crystalys.setApiKey('17205AAF215CAD06C29BA302971AD4F0');
//
// var promise = crystalys.Match.GetMatchHistory.sendRequest();
//
// promise.then(function(response) {
// 	console.log(response);
// });

// var rp = require('request-promise');
//
// rp('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=17205AAF215CAD06C29BA302971AD4F0')
// 	.then(function(response) {
// 		console.log(response);
// 	});
