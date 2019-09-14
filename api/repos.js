const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use(express.json());

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

router.get('/', (req, res) => {
    fs.readdir(process.env.DIR, (err, items) => {
        if (err) {
            res.status(404).end();
        }

        const repos = items.filter((item) => {
            const dirPath = path.join(process.env.DIR, item);
            
            return isDirectory(dirPath) && fs.existsSync(path.join(dirPath, '.git')) 
                && isDirectory(path.join(dirPath, '.git'));
        });

        res.json(repos);
    });    
});

router.get('/:repositoryId/commits/:commitHash', (req, res) => {
    res.send('rep: ' + req.params.repositoryId + ' commit: ' + req.params.commitHash);
});

router.get('/:repositoryId/commits/:commitHash/diff', (req, res) => {
    res.send('rep: ' + req.params.repositoryId + ' commit: ' + req.params.commitHash +' diff ');
});

router.get(['/:repositoryId', '/:repositoryId/tree/:commitHash/:path([^/]*)'], (req, res) => {
    res.send('rrr' + req.params.repositoryId + ' commit: ' + req.params.commitHash + ' path: ' + req.params.path);
});

router.get('/:repositoryId/blob/:commitHash?/:pathToFile([^/]*)', (req, res) => {
    res.send('rrr: ' + req.params.repositoryId + ' commit: ' + req.params.commitHash + ' path: ' + req.params.pathToFile);
});

router.delete('/:repositoryId', (req, res) => {
    res.send('delete: ' + req.params.repositoryId);
});

router.post('/:repositoryId', (req, res) => {
    res.send('post: ' + JSON.stringify(req.body));
});

module.exports = router;
