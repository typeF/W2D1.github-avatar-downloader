var request = require('request');
var fs = require('fs');
var dotenv = require('dotenv').config();

var gitHubOptions = {
    url: "https://api.github.com/repos/",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITOKEN
    }
}

function downloadEngine (err, response, body){
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

module.exports.gitHubOptions = gitHubOptions;
module.exports.downloadEngine = downloadEngine;