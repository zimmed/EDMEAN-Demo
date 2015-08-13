'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller'),
    names = cache.users,
    messages = cache.messages;

module.exports = function (Router) {
    var router = new Router('chat');

    router.add(function (message) {
        var io = router.getIO();
        if (!this.session.name) {
            this.emit('message', {name: "SYS", message: "You are not logged in."});
        } else {
            var m = {name: this.session.name, message: message, color: names[this.session.name]};
            messages.push(m);
            io.emit('message', m);
        }
    });
};