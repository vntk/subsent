var path = require('path');

/**
 * Import specs
 */
var dir = '../test/specs/';
[
  'toJson',
  'toText'
].forEach((script) => {
  require(path.join(dir, script));
});