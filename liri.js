var keys = require("./keys.js");

var request = require('request');

var Twitter = require('twitter');
 
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'dooosetrain'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

