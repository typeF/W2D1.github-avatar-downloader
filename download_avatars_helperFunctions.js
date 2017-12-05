var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();
// Download folder path
var path = "avatars/";

var gitHubOptions = {
  url: "https://api.github.com/repos/",
  json: true,
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + process.env.GITOKEN
  }
};

// Error Checking Function
function errorCheck(owner, repo, extraArgument){
  // Checks if there is a 5th argument
  if (extraArgument !== undefined){
    console.log("--------ERROR--------");
    console.log("Too many arguments");
    console.log("Usage: node download_avatars.js <owner> <repo>");
    return false;
  }
  // Checks that owner and repo argument provided
  if (owner === undefined || repo === undefined) {
    console.log("--------ERROR--------");
    console.log("Owner and/or Repo name was not provided");
    console.log("Usage: node download_avatars.js <owner> <repo>");
    return false;
  }
  // Checks if token file in .env is present/valid
  if (process.env.GITOKEN === undefined){
    console.log("--------ERROR--------");
    console.log(".env File is missing.");
    return false;
  }
  if (process.env.GITOKEN.length !== 40){
    console.log("--------ERROR--------");
    console.log(".env token is not valid. Please check again.");
    return false;
  }
  // Checks if folder exists
  if (fs.existsSync("./" + path) === false){
    console.log("--------ERROR--------");
    console.log("Save folder " + path + " does not exist");
    return false;
  } else {
    return true;
  }
}

// Downloads images from specified url to path
function downloadImageByURL(user){
  url = user.avatar_url;
  jpegPath = path + user.login + ".jpg";
  request(url)
    .on('error', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(jpegPath));
}

// Provides urls for each user in github repo to downloadImageByURL function
function downloadEngine (err, response, body){
  console.log('Welcome to the GitHub Avatar Downloader');
  if (err) {
    console.log("Errors:", err);
  }
  if (body["message"] !== "Not Found"){
    body.forEach(function (user){
      downloadImageByURL(user);
    });
    console.log("Downloads completed into /" + path);
  } else {
    console.log("--------ERROR--------");
    console.log("Invalid user/repo name provided.");
    console.log("Please input check again.");
    return false;
  }
}

module.exports.gitHubOptions = gitHubOptions;
module.exports.downloadEngine = downloadEngine;
module.exports.errorCheck = errorCheck;