const express = require('express');
const fs = require('fs');
const path = require('path');
var posthtml = require('express-posthtml');
var testFile = require('./json/file.js');
const repos = require('./api/repos');

const app = express();


if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {
    console.log("There is should be path of an existed directory in args");
    process.exit(-1);
}

process.env.DIR = process.argv[2];
console.log("Seted process.env.DIR: " + process.env.DIR);

const TEMPLATE_DIR = path.join(__dirname, '/views');
const plugins = [
    require('posthtml-extend')({ root: TEMPLATE_DIR }),
    require('posthtml-include')({ root: TEMPLATE_DIR }),
    require('posthtml-bem')(),
    require('posthtml-expressions')({
        locals: {
            pathArray: ['dir', 'dirr', 'filedir', 'file'],
        }
    }),
]
const options = {}

app.set('views', TEMPLATE_DIR);
app.set('view options', { plugins: plugins, options: options })

app.use('/static', express.static(__dirname + '/static'));
app.use('/api/repos', repos);

app.engine('html', posthtml)


app.get('/', function (req, res) {
    res.render('pages/index.html');
});

app.get('/branches', function (req, res) {
    res.render('pages/branches.html');
});

app.get('/commit', function (req, res) {
    res.render('pages/commit.html');
});

app.get('/history', function (req, res) {
    res.render('pages/history.html');
});

app.get('/file', function (req, res) {
    res.render('pages/file.html', {
        plugins: [
            ...plugins,
            require('posthtml-expressions')({
                locals: {
                    file: JSON.parse(testFile),
                }
            }),
        ]
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

