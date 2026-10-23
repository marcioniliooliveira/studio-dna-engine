const fs = require('fs');
const path = require('path');

const main1Html = fs.readFileSync(path.join(__dirname, 'site', 'sections', '01_main-1.html'), 'utf8');
const lines = main1Html.split('\n');

const collectionLines = lines.slice(875, 1020);
console.log(collectionLines.join('\n'));
