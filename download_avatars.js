var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();
var owner = process.argv[2];
var nameOfRepo = process.argv[3];

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITOKEN
    }
  };

  if (owner && nameOfRepo) {
    console.log('Welcome to the GitHub Avatar Downloader');
    request(options, function(err, res, body) {
      callback(err, body);
    });
  } else{
    console.log("ERROR. Owner and Repo name not provided");
    console.log("Usage: node download_avatars.js <owner> <repo>");
  }
}

getRepoContributors(owner, nameOfRepo, function(err, result) {
  console.log("Errors:", err);
  if (result){
    result.forEach(function (user){
    downloadImageByURL(user.avatar_url, "avatars/" + user.login + ".jpg");
    });
  }
  console.log("Downloads completed into /avatars");

});

function downloadImageByURL(url, filePath){
  request(url)
  .on('error', function(err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}