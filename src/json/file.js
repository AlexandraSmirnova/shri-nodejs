const file = [
    "const express = require('express');",
    "const fs = require('fs');",
    "const path = require('path');",
    "var posthtml = require('express-posthtml');",
    "",
    "const repos = require('./api/repos');",
    "const app = express();",
    "",
    "if (process.argv.length <= 2 || !fs.existsSync(process.argv[2])) {",
    "   console.log('There is should be path of an existed directory in args');",
    "process.exit(-1);",
    "}"
]

module.exports = JSON.stringify(file);