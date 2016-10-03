var test = require("tape");
var subsent = require("../../lib");
var nodedir = process.cwd();

test("toJson", function (t) {
    subsent.toJson([`${nodedir}/demo.srt`], function (err) {
        console.log("OK !!!!")
        t.ok(!err);
        t.end();
    });

});