const { exec } = require('child_process');
const { getRepositoryPath } = require('./fsUtils');

const log = (repositoryId, commitHash, args, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    exec(`cd ${repositoryPath} && git log ${commitHash || ""} ${args}`, (err, out) => {
        if (err) {
            onError(err);
            return;
        }
       
        onSuccess(out);
    });
};

const diff = (repositoryId, args, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    exec(`cd ${repositoryPath} && git diff ${args}`, (err, out) => {
        if (err) {
            onError(err);
            return;
        }
       
        onSuccess(out);
    });
};

const showTree = (repositoryId, commitHash, path, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);
    const pathParams = commitHash && path ? `${commitHash} ${path}` : "master";

    exec(`cd ${repositoryPath} && git ls-tree --full-tree --name-only ${pathParams}`, (err, out) => {
        if (err) {
            onError(err);
            return;
        }
       
        onSuccess(out);
    });
};

const showFileContent = (repositoryId, commitHash, path, onError, onSuccess) => {
    const repositoryPath = getRepositoryPath(repositoryId);

    exec(`cd ${repositoryPath} && git show ${commitHash || "HEAD"}:${path}`, (err, out) => {
        if (err) {
            onError(err);
            return;
        }
       
        onSuccess(out);
    });
};

const clone = (url, repositoryId, onError, onSuccess) => {
    exec(`cd ${process.env.DIR} && git clone ${url} ${repositoryId || ""}`, (err, out) => {
        if (err) {
            onError(err);
            return;
        }
       
        onSuccess(out);
    });
}

module.exports = {
    log,
    diff,
    showTree,
    showFileContent,
    clone,
}
