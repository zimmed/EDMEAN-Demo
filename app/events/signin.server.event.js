'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('connection');

    router.add(function (name) {
        var io = router.getIO();

        log('User registered name: ' + name);

        this.emit('client-connected');

        io.emit('connections-changed', io.sockets.sockets.length);
    });
};