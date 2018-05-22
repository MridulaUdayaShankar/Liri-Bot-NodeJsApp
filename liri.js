require("dotenv").config();
var fs = require("fs");
// Include the request npm package
var request = require("request");
// Include the twitter npm package
var Twitter = require("twitter");
// Include the node-spotify-api npm package
var Spotify = require("node-spotify-api");
// import the keys.js file
var keys = require("./keys");
// Store all of the user input arguments in an array
var userChoice = process.argv[2];
const nodeArgs = process.argv;
var userInputArr = nodeArgs.splice(3);
var userInput = userInputArr.join(" ");
console.log("userInput", userInput);

///////////////////////////////movie-this////////////////////////////////////////////////////////
function movie() {
  // Create an empty variable for holding the movie name
  var queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`;
  // Then run a request to the OMDB API with the movie specified
  request(queryUrl, function(error, response, body) {
    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
      // Then print out the imdbRating
      console.log(`The movie is: ${body}`);
    }
  });
}

//////////////////////////////////////spotify-this-song/////////////////////////////////////////////////
function spotifyTrack() {
  console.log(userInput, "@#$%^&*&^%$#@#$%^&*");
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: "track", query: userInput, limit: 1 })
    .then(function(data) {
      var temp = data.tracks.items[0];
      var artists = [];
      temp.artists.forEach(function(artist) {
        artists.push(artist.name);
      });

      var displayObj = {
        artists,
        name: temp.name,
        previewLink: temp.uri,
        album: temp.album.name
      };
      console.log(JSON.stringify(displayObj));
    })
    .catch(function(err) {
      console.log(err);
    });
}

//////////////////////////////////////my-tweets/////////////////////////////////////////////////
function tweets() {
  var arr = [];
  var params = { screen_name: "nodejs" };
  var client = new Twitter(keys.twitter);
  client.get("statuses/home_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (error) throw error;
    tweets.forEach(element => {
      if (element.text) {
        arr.push(element.text);
      }
      console.log(arr);
    });
  });
}

switch (userChoice) {
  case "spotify-this-song":
    spotifyTrack();
    break;

  case "my-tweets":
    tweets();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    ////////////////////////////////////read-file/do-what-it-says///////////////////////////////////////////////////

    fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
      userInput = data;
      spotifyTrack();
    });
    break;
  /*
    * Default case 
    */
  default:
    fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
      userInput = data;
      spotifyTrack();
    });
    break;
}
