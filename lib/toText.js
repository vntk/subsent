var fs = require("fs");
var path = require("path");
var async = require("async");
var nodedir = process.cwd();


function toText(fileJson, callback) {
    async.eachSeries(fileJson, function (item, callback) {

        var input = `${nodedir}/${item}`;
        var output = path.basename(input) + ".txt";
        var stream = fs.createWriteStream(output);

        stream.once('open', function (fd) {
            require(input).forEach(function (e) {
                if (e.text) {
                    var newline = e.text.replace(/[\r\n]+/g, " ");
                    stream.write(newline);
                    stream.write("\n");
                }
            }, this);
            stream.end();
            console.log('Saved!', output);
            callback(null);
        });

    }, callback);
}

module.exports = toText;