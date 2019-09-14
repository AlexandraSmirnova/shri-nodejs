const express = require('express');
const fs = require('fs');

const app = express();
const repos = require('./api/repos');

if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {
  console.log("There is should be path of an existed directory in args");
  process.exit(-1);
}

process.env.DIR = process.argv[2];
console.log("Seted process.env.DIR: " + process.env.DIR);

app.use('/api/repos', repos);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

