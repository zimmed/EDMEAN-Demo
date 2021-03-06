'use strict';

var log = require('../../config/logger').logInfo,
    names = require('../controllers/cache.server.controller').users;

module.exports = function (Router) {
    var router = new Router('disconnect');

    router.add(function () {
        var io = router.getIO();

        var name = (this.session.name) ? this.session.name : 'User';
        log(name + ' disconnected.');
        delete names[name];

        this.emit('client-disconnected');
        this.broadcast.emit('disconnection', {name: name, names: names});

        io.emit('connections-changed', io.sockets.sockets.length);
    });
};