'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller');

module.exports = function (Router) {
    var router = new Router('disconnect');

    router.add(function () {
        var io = router.getIO();
        if (this.session.room && this.session.room) {
            var nsp = cache.namespace(this.session.room),
                names = nsp.users,
                name = this.session.name;
            delete names[name];
            this.emit('client-disconnected');
            this.broadcast.to(this.session.room).emit('disconnection', {name: name, names: names});
            delete this.session.name;
            delete this.session.room;
        }
        log(this.session.room + '/User disconnected: ' + this.session.name);
        io.emit('connections-changed', io.sockets.sockets.length);
    });
};