var fs = require("fs")
    , path = require("path")
    , async = require("async")
    , Subtitle = require("subtitle")
    , nodedir = process.cwd()
    , logger = console
    ;

exports.toText = function toText(files, callback) {

    var fileSrt = (files || []).filter(function getSrtFile(item) {
        return /.srt$/i.test(item);
    });

    async.eachSeries(fileSrt, function (item, callback) {

        var input = path.join(nodedir, item);
        var output = path.join(path.dirname(input), path.basename(input, ".srt") + ".txt");
        var stream = fs.createWriteStream(output, 'utf8');

        stream.once('open', function (fd) {
            var captions = new Subtitle();
            var srt = fs.readFileSync(input, 'utf8');

            logger.info("Preparing to process: ", input);
            captions.parse(srt);
            captions
                .getSubtitles()
                .forEach(function (e) {
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

exports.toTextDir = function toTextDir(dirName, callback) {
    var files = fs.readdirSync(dirName);
    return this.toText(files, callback);
};

exports.toJson = function (files, callback) {

    var fileSrt = (files || []).filter(function getSrtFile(item) {
        return /.srt$/i.test(item);
    });

    async.eachSeries(fileSrt, function (item, callback) {

        var captions = new Subtitle();
        var input = path.join(nodedir, item);
        var output = path.join(path.dirname(input), path.basename(input, ".srt") + ".json");
        var srt = fs.readFileSync(input, 'utf8');

        logger.info("Preparing to process: ", input);
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

exports.toJsonDir = function (dirName, callback) {
    var files = fs.readdirSync(dirName);
    return this.toJson(files, callback);
}