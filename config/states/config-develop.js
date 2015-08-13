'use strict';

module.exports = {
    secure: false,
    baseUrl: '//localhost',
    mongoUrl: '//localhost',
    serverIP: 'localhost',
    serverPort: '8080',
    loggerVerboseLevel: 'ALL',
    loggerDieLevel: 'ERROR',
    morganFormat: 'dev',
    loggerMethod: console.log,
    favicon: null,

    sessionCookie: {secure: false, maxAge: 15 * 60 * 1000},
};
