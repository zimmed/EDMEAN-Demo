'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller');

module.exports = function (Router) {
    var router = new Router('chat');

    router.add(function (message) {
        if (!this.session.name || !this.session.room) {
            this.emit('message', {name: "SYS", message: "You are not logged in."});
        } else {
            var nsp = cache.namespace(this.session.room),
                names = nsp.users,
                messages = nsp.messages,
                io = router.getIO(),
                m = {name: this.session.name, message: message, color: names[this.session.name]};
            messages.push(m);
            io.to(this.session.room).emit('message', m);
        }
    });
};