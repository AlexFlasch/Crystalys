function useStrict() { 'use strict'; }

var util = require('util');

var Utils = require('./Utils');
var ApiHandler = require('./ApiHandler');
var SchemaHandler = require('./SchemaHandler');
var EndpointHandler = require('./EndpointHandler');
var ParameterHandler = require('./ParameterHandler');
var RequestHandler = require('./RequestHandler');

var steamWebApiVersion = 1;

module.exports = class Crystalys {
	constructor() {
		useStrict();

		this.apiKeyIsSet = false;

	    this.apiStructure = new ApiHandler().addSchemas([
	        new SchemaHandler('Match', 'IDOTA2Match_205790').addEndpoints([
	            new EndpointHandler('GetMatchHistory', 'GetMatchHistory', steamWebApiVersion, false).addParameters([
	                new ParameterHandler('heroID', 'hero_id', false),
	                new ParameterHandler('gameMode', 'game_mode', false),
	                new ParameterHandler('skill', 'skill', false),
	                new ParameterHandler('minPlayers', 'min_players', false),
	                new ParameterHandler('accountID', 'account_id', false),
	                new ParameterHandler('leagueID', 'league_id', false),
	                new ParameterHandler('startAtMatchID', 'start_at_match_id', false),
	                new ParameterHandler('matchesRequested', 'matches_requested', false),
	                new ParameterHandler('tournamentGamesOnly', 'tournament_games_only', false)
	            ]),
	            new EndpointHandler('GetMatchDetails', 'GetMatchDetails', steamWebApiVersion).addParameter(
	                new ParameterHandler('matchID', 'match_id', true)
	            ),
	            new EndpointHandler('GetLeagueListing', 'GetLeagueListing', steamWebApiVersion, false),
	            new EndpointHandler('GetLiveLeagueGames', 'GetLiveLeagueGames', steamWebApiVersion, false).addParameters([
	                new ParameterHandler('leagueID', 'league_id', false),
	                new ParameterHandler('matchID', 'match_id', false)
	            ]),
	        ]),
        ]);

	    var exports = this.apiStructure.getApi();
	    
        

        exports.setApiKey = this.setApiKey;

	    return exports;
	}

	static setApiKey(key) {
		Utils.setApiKey(key);
        this.apiKeyIsSet = true;

        return this; // return the class so it can still be instantiated
	}
};
