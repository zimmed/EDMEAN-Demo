'use strict';

var log = require('../../config/logger').logInfo;

module.exports = function (Router) {
    var router = new Router('chat');

    router.add(function (message) {
        var io = router.getIO();
        if (!this.session.name) {
            this.emit('message', {name: "SYS", message: "You are not logged in."});
        } else {
            io.emit('message', {name: this.session.name, message: message});
        }
    });
};