var fs = require("fs");
var path = require("path");
var async = require("async");
var nodedir = process.cwd();
var Subtitle = require("subtitle");

function toJson(fileSrts, callback) {
  async.eachSeries(fileSrts, function (item, callback) {

    var captions = new Subtitle();
    var input = `${nodedir}/${item}`;
    var output = path.basename(input) + ".json";
    var srt = fs.readFileSync(input, 'utf8');

    captions.parse(srt);

    fs.writeFile(output, JSON.stringify(captions.getSubtitles()), function (err) {
      if (err) {
        callback(err);
      };
      
      console.log('Saved:', output);
      callback(null);
    });

  }, callback);
}

module.exports = toJson;