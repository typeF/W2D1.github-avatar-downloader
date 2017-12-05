var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require("./secrets.js");

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

getRepoContributors("jquery", "jquery", function(err, result) {
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

downloadImageByURL('https://avatars0.githubusercontent.com/u/1615?v=4', "avatars/test.jpg");
