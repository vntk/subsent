#!/usr/bin/env node

/**
 * Module dependencies
 */
var _ = require("lodash")
    , async = require("async")
    , program = require("commander")
    , package = require("../package.json")
    , subsent = require("../lib")
    , logger = console
    ;

var NOOP = function () { };
var help = function () {
    // Allow us to display help(), but omit the wildcard (*) command.
    program.commands = _.reject(program.commands, {
        _name: '*'
    });
    program.help();
}

/**
 * Normalize version argument, i.e.
 * 
 * $ subsent -v
 * $ subsent -V
 * $ subsent --version
 * $ subsent version
 */
program.version(package.version, "-v, --version");

// make '-v' option case-insensitive
process.argv = _.map(process.argv, function (arg) {
    return (arg === '-V') ? '-v' : arg;
});

// $ subsent version (--version synonym)
program
    .command("version")
    .description("")
    .action(function () {
        program.emit("version");
    });

program
    .command("tojson [text...]")
    .alias("json")
    .description("Convert subtitle to json file")
    .option("-d, --directory", "input is directory")
    .action(function (text, options) {
        // check input
        var input = text + "";
        var isDirectory = !!options.directory;
        logger.info('input: %s', text);
        logger.info('isDirectory: %s', isDirectory);

        if (!input) {
            logger.log("input is required");
            this.emit("--help");
            return;
        }

        if (isDirectory) {
            text.forEach(function (dirname) {
                subsent.toJsonDir(dirname);
            });
        } else {
            subsent.toJson(text);
        }

    }).on("--help", function () {
        logger.log('  Examples:');
        logger.log();
        logger.log('    $ subsent json demo.srt');
        logger.log('    $ subsent json ./demo -d');
        logger.log();
    });

program
    .command("totext [text...]")
    .alias("text")
    .description("Convert subtitle to text file")
    .option("-d, --directory", "input is directory")
    .action(function (text, options) {
        // check input
        var input = text + "";
        var isDirectory = !!options.directory;
        logger.info('input: %s', text);
        logger.info('isDirectory: %s', isDirectory);

        if (!input) {
            logger.log("input is required");
            this.emit("--help");
            return;
        }

        if (isDirectory) {
            text.forEach(function (dirname) {
                subsent.toTextDir(dirname);
            });
        } else {
            subsent.toText(text);
        }

    }).on("--help", function () {
        logger.log('  Examples:');
        logger.log();
        logger.log('    $ subsent text demo.srt');
        logger.log('    $ subsent text ./demo -d');
        logger.log();
    });

program
    .command("*")
    .action(help);

/**
 * $ subsent
 */
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
    help();
}