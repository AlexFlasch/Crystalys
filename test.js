'use strict';

var Crystalys = require('./Crystalys').setApiKey('17205AAF215CAD06C29BA302971AD4F0');
var crystalys = new Crystalys();
var util = require('util');

console.log('crystalys.Match.GetMatchHistory: ' + util.inspect(crystalys.Match.GetMatchHistory));

var promise = crystalys.Match.GetMatchHistory.heroID(1).sendRequest();

promise.then(function(response) {
    console.log(util.inspect(response));
})