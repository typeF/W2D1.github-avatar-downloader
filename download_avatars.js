var request = require('request');
var owner = process.argv[2];
var nameOfRepo = process.argv[3];
var extraArgument = process.argv[4];
var engine = require('./download_avatars_helperFunctions');

if (engine.errorCheck(owner, nameOfRepo, extraArgument) ) {
    engine.gitHubOptions.url += (owner + "/" + nameOfRepo + "/contributors");
    request(engine.gitHubOptions, engine.downloadEngine);
}

