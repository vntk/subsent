var test = require("tape");
var subsent = require("../../lib")
var nodedir = process.cwd();

test("toText", function (t) {
    subsent.toText([`${nodedir}/demo.srt.json`], function (err) {
        console.log("OK !!!!")
        t.ok(!err);
        t.end();
    });
});