'use strict';

module.exports = {
    secure: true,
    baseUrl: '//localhost',
    mongoUrl: '//localhost',
    mongoDBName: 'edmean-main',
    serverIP: '0.0.0.0',
    serverPort: '443',
    loggerVerboseLevel: 'INFO',
    loggerDieLevel: 'ERROR',
    morganFormat: 'tiny',
    loggerMethod: console.log,
    favicon: null,

    sessionCookie: {secure: true}
};