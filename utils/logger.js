const logger = require('morgan');
const rt = require('file-stream-rotator');
const fs = require('fs');
const express = require('express');
const app = express();


const enableLogs = () => {
    var logDir = '../logs';
    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir);
    }
    var accessLogStream = rt.getStream({filename:'../logs/access.log', frequency:'daily', verbose: true});
    return logger('combined', { stream: accessLogStream });
}

module.exports = enableLogs;

