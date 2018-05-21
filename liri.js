require("dotenv").config();
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Include the request npm package 
var request = require("request");
// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument

for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" +movieName+ "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {
    // Then print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});

// Created a series of questions
inquirer.prompt([

  {
    type: "input",
    name: "name",
    message: "Who are you???"
  },

  {
    type: "list",
    name: "doingWhat",
    message: "What are you doing in my house??",
    choices: ["I made you cookies!", "No lie dude. I'm here to rob you.", "Uh. This is my house... Who are YOU???"]
  },

  {
    type: "checkbox",
    name: "carryingWhat",
    message: "What are you carrying in your hands??",
    choices: ["TV", "Slice of Toast", "Butter Knife"]
  },

  {
    type: "confirm",
    name: "canLeave",
    message: "Can you leave now?"
  },

  {
    type: "password",
    name: "myPassword",
    message: "Okay fine. You can stay. But only if you say the magic password."
  }

]).then(function(user) {
});