const { join: joinPath } = require('node:path');
const formatter = require('./formatter.js');

function render(value) {
  return formatter(joinPath('pages', value));
}

module.exports = { render };
// This mutates the stale exports alias, not the final module export object.
exports.version = '1.0.0';
