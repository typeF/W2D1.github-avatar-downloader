var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();
var path = "/avatars";
var gitHubOptions = {
    url: "https://api.github.com/repos/",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITOKEN
    }
}

function downloadEngine (err, response, body){
  console.log('Welcome to the GitHub Avatar Downloader');
  if (err) {
  console.log("Errors:", err);
  }

  if (body){
    body.forEach(function (user){
    downloadImageByURL(user.avatar_url, "avatars/" + user.login + ".jpg");
    });
  }

  console.log("Downloads completed into /avatars");
}

function downloadImageByURL(url, filePath){
  request(url)
  .on('error', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

function errorCheck(owner, repo, extraArgument){
  // Checks if there is a 5th argument
  if (extraArgument !== undefined){
    console.log("Too many arguments");
    console.log("Usage: node download_avatars.js <owner> <repo>");
    return false;
  }
  // Checks that owner and repo argument provided
  if (owner === undefined || repo === undefined) {
    console.log("Owner and/or Repo name was not provided");
    console.log("Usage: node download_avatars.js <owner> <repo>");
    return false;
  }

  else {
    return true;
  }

}

module.exports.gitHubOptions = gitHubOptions;
module.exports.downloadEngine = downloadEngine;
module.exports.errorCheck = errorCheck;