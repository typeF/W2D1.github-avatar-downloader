var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require("./secrets.js");
var owner = process.argv[2];
var nameOfRepo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader');

function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + GITHUB_TOKEN.token
    }
  };

  request(options, function(err, res, body) {
    callback(err, body);
  });
}

var owner = process.argv[2];
var nameOfRepo = process.argv[3];

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