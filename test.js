var Crystalys = require('./Crystalys.js');
var crystalys = new Crystalys();
var util = require('util');

crystalys.setApiKey('17205AAF215CAD06C29BA302971AD4F0');

console.log('\n\ncrystalys: ' + util.inspect(crystalys, {showHidden: false, depth: null}));

var promise = crystalys.Match.GetMatchHistory.sendRequest();

promise.then(function(response) {
	console.log(response);
});

// var rp = require('request-promise');
//
// rp('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1?key=17205AAF215CAD06C29BA302971AD4F0')
// 	.then(function(response) {
// 		console.log(response);
// 	});
