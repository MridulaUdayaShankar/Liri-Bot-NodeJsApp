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
var nodeArgs = process.argv;
var command = process.argv[2];

var userInputArr = nodeArgs.splice(3);
var userInput = userInputArr.join(" ");
var defaultInput = {
  movie: "Mr.Nobody",
  spotify: "Not Afraid",
}
/*
 * movie-this
 */

  function movie() {
    if (!userInput) {
      userInput = defaultInput.movie;
    }
    var queryUrl = `http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=trilogy`;
    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function(error, response, body) {
      // If there were no errors and the response code was 200 (i.e. the request was successful)...
      if (!error && response.statusCode === 200) {
        // Then print out the imdbRating
        console.log("\nMovie Title: " + JSON.parse(body).Title + "\n");
        console.log("Release Year: " + JSON.parse(body).Year + "\n");
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating + "\n");
        console.log("Rotten Tomatoes Rating of the movie: " +JSON.parse(body).Ratings[1].Value+"\n");
        console.log("Country where the movie was produced: " +JSON.parse(body).Country +'\n');
        console.log("Language of the movie: " + JSON.parse(body).Language + "\n");
        console.log("Plot of the movie: " + JSON.parse(body).Plot + "\n");
        console.log("Actors in the movie: " + JSON.parse(body).Actors + "\n");
      }
    });
  }

/*
 * spotify-this-song
 */
function spotifyTrack() {
  if (!userInput) {
    userInput = defaultInput.spotify;
  }
  var spotify = new Spotify(keys.spotify);
    spotify
      .search({ type: "track", query: userInput, limit: 1 })
      .then(function(data) {
        // console.log(data);
        var temp = data.tracks.items[0];

        console.log("\nAlbum Name: " + JSON.stringify(temp.name));
        console.log(
          "\nSpotify Link to play the song: " +
            JSON.stringify(temp.external_urls.spotify)
        );
        console.log(
          "\nArtist Name: " + JSON.stringify(temp.artists[0].name) + "\n"
        );
      })
      .catch(function(err) {
        console.log(err);
      });
  }

/*
 * my-tweets
 */
function tweets() {
  var arr = [];
  var params = { screen_name: "nodejs" };
  var client = new Twitter(keys.twitter);
  client.get("statuses/home_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      throw error;
    } else {
    }
    tweets.forEach(element => {
      if (element.text) {
        arr.push(element.text);
      }
    });
    console.log("\n" + arr + "\n");
  });
}

//Switch case statement to call functions for corresponding commands
switch (command) {
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
    /*
    * read-file/do-what-it-says
    */
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