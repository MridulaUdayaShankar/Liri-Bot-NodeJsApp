require("dotenv").config();
// Include the request npm package
var request = require("request");
// Include the twitter npm package
var Twitter = require("twitter");
// Include the node-spotify-api npm package
var Spotify = require("node-spotify-api");
// import the keys.js file
var keys = require("./keys.js");

var userRequest = process.argv[2];
var fs = require("fs");

///////////////////////////////movie-this////////////////////////////////////////////////////////
function movie() {
  // Store all of the user input arguments in an array
  var nodeArgs = process.argv;
  // Create an empty variable for holding the movie name
  var movieName = "";

  // Loop through all the words in the node argument
  for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // Then run a request to the OMDB API with the movie specified
  request(queryUrl, function(error, response, body) {
    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
      // Then print out the imdbRating
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
  });
}
//////////////////////////////////////spotify-this-song/////////////////////////////////////////////////
function spotifyTrack() {
  spotify.search(
    { type: "track", query: userRequest, limit: 20 },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log(data.tracks);
    }
  );
}
  var spotify = new Spotify(keys.spotify);
  
//////////////////////////////////////my-tweets/////////////////////////////////////////////////
function tweets() {
  var params = { screen_name: "nodejs" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      console.log(tweets);
    }
  });
}
  var client = new Twitter(keys.twitter);
  

  if(userRequest === 'spotify-this-song'){
    spotifyTrack();
  } else if (userRequest === 'my-tweets'){
    tweets();
  } else if(userRequest === 'movie-this'){
    movie();
  } else if(userRequest === 'do-what-it-says'){
  ////////////////////////////////////read-file/do-what-it-says///////////////////////////////////////////////////
    
    fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
     if (error) {
      return console.log(error);
      }
    });
    spotifyTrack();
  }