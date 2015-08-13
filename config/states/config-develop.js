'use strict';

module.exports = {
    secure: false,
    baseUrl: '//192.100.1.12',
    mongoUrl: '//localhost',
    mongoDBName: 'edmean-test',
    serverIP: '0.0.0.0',
    serverPort: '80',
    loggerVerboseLevel: 'ALL',
    loggerDieLevel: 'ERROR',
    morganFormat: 'dev',
    loggerMethod: console.log,
    favicon: null,

    sessionCookie: {secure: false, maxAge: 15 * 60 * 1000},

    locals: {title: 'EDMEAN.js Application | Dev'}
};
