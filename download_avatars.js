var request = require('request');
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
  // console.log("Result:", result);
  if (result){
    result.forEach(function (user){
      console.log(user.avatar_url);
    });
  }
});