var request = require('request');
var owner = process.argv[2];
var nameOfRepo = process.argv[3];
var engine = require('./download_avatars_helperFunctions');

if (owner && nameOfRepo) {
    console.log('Welcome to the GitHub Avatar Downloader');
    engine.gitHubOptions.url += (owner + "/" + nameOfRepo + "/contributors");
    request(engine.gitHubOptions, engine.downloadEngine);
  } else {
    console.log("ERROR. Owner and Repo name not provided");
    console.log("Usage: node download_avatars.js <owner> <repo>");
    }
