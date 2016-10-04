var test = require("tape")
    , subsent = require("../../lib")
    ;

test("toJson", function (t) {
    subsent.toJson([`samples/demo.srt`], function (err) {
        console.log("OK !!!!")
        t.ok(!err);
        t.end();
    });

});