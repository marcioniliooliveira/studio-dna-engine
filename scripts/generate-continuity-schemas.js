'use strict';

const path = require('node:path');
const { generateContinuitySchemas } = require('../src/continuity/contracts');

const outputDirectory = path.resolve(__dirname, '..', 'schemas', 'v2');
const generated = generateContinuitySchemas(outputDirectory);
process.stdout.write(`${generated.join('\n')}\n`);
