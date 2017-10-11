var keys = require("./keys.js");

var Twitter = require('twitter');

var spotify = require('spotify');

var Spotify = require('node-spotify-api');

var request = require('request');



//-------Twitter-------//

var getMyTweets = function() {
	var client = new Twitter(keys.twitterKeys); 
	var params = {screen_name: "dooosetrain"};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text)
	    }
	  }
	}); 
}
 
//---------Spotify---------//
var getArtistNames = function(artist) {
	return artist.name;
}

var getSpotify = function(songName) {
	var spotify = new Spotify(keys.spotifyKeys);

	spotify.search({ type: 'track', query: songName  }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  var songs = data.tracks.items;
	  for (var i = 0; i < songs.length; i++) {
	  	console.log(i);
	  	console.log('artist(s): ' + songs[i].artists.map(
	  		getArtistNames));
	  	console.log('song name: ' + songs[i].name);
	  	console.log('preview song: ' + songs[i].preview_url);
	  	console.log('album: ' + songs[i].album.name);
	  	console.log('--------------------------------------');
	  }
	});	
}




//----------Request--------//

// Note: Not Working - A constant theme on this project was not getting my 
//Console.Logs to pull what I initially want without a thousand trial and errors
//Creating the API KEY seems to be the right answer and I think my syntax is correct
//but it still doesnt show.
//the remaining PSeudo Code would be to turn this request into a GetMovie function that would be called by movie-this.

request('http://www.omdbapi.com/?apikey=40e9cece&?t=pulp+fiction', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

//-------Liri FUnction------//

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break;
		case 'spotify-this-song' :
			getSpotify(functionData);
			break;
		case 'movie-this' :
			getMovie();

		default:
		console.log('Liri dont know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]); // process.argv2 will take the "my-tweets, getspotify" commands and argv3 will be the next most specific search
 




