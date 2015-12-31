# Crystalys
A wrapper for Valve's DOTA2 WebAPI that uses promises and ES6 techniques!

**_Before you use Crystalys, please note:_** Crystalys is still being developed and does not yet have a stable release.

## Installing

To install Crystalys install it using npm just as you would for any other npm package
`npm install crystalys`

## Using Crystalys

In order to use Crystalys you **must** have a Steam API key which you can grab from [here](https://steamcommunity.com/dev/apikey).
Also note that if you don't have a Steam account, you will need one in order to retrieve an API key.

Once you've got your very own API key, you can start to actually use Crystalys!

```javascript
var Crystalys = require('crystalys');
var crystalys = new Crystalys();

crystalys.setApiKey('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
var api = crystalys.getApi();

var promise = api.Match.GetMatchHistory.sendRequest();

promise.then(function(response) {
    var data = response.result;
    // do things with your retrieved data!
});
```

In order to pass parameters you can tack function calls on the endpoint before the sendRequest call like so:
```javascript
var promise = api.Match.GetMatchHistory.heroID(1).matchesRequested(300).sendRequest()
```

This will grab the most 300 matches with Antimage in them (heroID 1) A JSON file with KV pairs for Hero name to HeroID will likely be
added in a future update.

For a good reference on the current Steam API I recommend [this](http://steamwebapi.azurewebsites.net/) site over the
official documentation on the TF2 wiki.

You may have noticed that currently the parameter functions follow a different naming scheme from what the actual API uses.
This may change in the future to match the API's naming scheme, but personally I prefer heroID() to hero_id(), and other
underline delimited parameter names, plus using a sort of camelCase naming scheme seems to be more consistent than the API's
due to some being camelCase and some being underline_delimited.

If the community feels strongly one way or another it could definitely influence the naming scheme in Crystalys.

If you have any questions or issues with Crystalys feel free to post an issue here on GitHub or shoot me an email at flascherdev@gmail.com
