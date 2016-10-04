var test = require("tape")
    , subsent = require("../../lib")
    ;

test("toText", function (t) {
    subsent.toText([`samples/demo.srt`], function (err) {
        console.log("OK !!!!")
        t.ok(!err);
        t.end();
    });
});