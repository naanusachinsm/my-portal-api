const chalk = require('chalk');
const log = console.log;


const logError = (data) => {
    log(chalk.bgRed.bold('ERROR') + ' ' + chalk.red.dim(data));
}

const logWarning = (data) => {
    log(chalk.bgYellow.bold('WARNING') + ' ' + chalk.yellow.dim(data));
}

const logSuccess = (data) => {
    log(chalk.bgGreen.bold('SUCCESS') + ' ' + chalk.green.dim(data));
}

const logInfo = (data) => {
    log(chalk.bgMagenta.bold('INFO') + ' ' + chalk.magenta.dim(data));
}


module.exports = {
    logError,
    logWarning,
    logSuccess,
    logInfo
}
