/**
 * Subsent.js
 * 
 * Copyright (C) 2016 VNTK Project
 * Author: Nhu Bao Vu <nhubaovu@gmail.com>
 * Homepage: https://vntk.github.io/
 */

;[
    "toJson",
    "toText"
].forEach(function (feature) {
    exports[feature] = require("./" + feature);
});