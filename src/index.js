const express = require('express');
const fs = require('fs');
const path = require('path');
var posthtml = require('express-posthtml');

const repos = require('./api/repos');

const app = express();


if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {
  console.log("There is should be path of an existed directory in args");
  process.exit(-1);
}

process.env.DIR = process.argv[2];
console.log("Seted process.env.DIR: " + process.env.DIR);

const plugins = [
  require('posthtml-include')({ root: path.join(__dirname , '/views')}),
  require('posthtml-bem')(),
  require('posthtml-expressions')({ locals: { 
    title: 'ala', 
    pathArray: ['dir', 'dirr', 'filedir', 'file']
  }}),
]
const options = {}

app.set('views', path.join(__dirname , '/views'));
app.set('view options', { plugins: plugins, options: options })

app.use('/static', express.static(__dirname + '/static'));
app.use('/api/repos', repos);

app.engine('html', posthtml)


app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

