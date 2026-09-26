'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { canonicalize } = require('../shared/canonical-json');

function writeTextAtomic(filename, value) {
  const absolute = path.resolve(filename);
  const temporary = absolute + '.' + process.pid + '.' + Date.now() + '.tmp';
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  try {
    fs.writeFileSync(temporary, String(value), 'utf8');
    fs.renameSync(temporary, absolute);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}

function writeJsonAtomic(filename, value) {
  writeTextAtomic(filename, canonicalize(value));
}

function readJsonFile(filename) {
  return JSON.parse(fs.readFileSync(path.resolve(filename), 'utf8'));
}

module.exports = { readJsonFile, writeJsonAtomic, writeTextAtomic };
