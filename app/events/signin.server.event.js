'use strict';

var log = require('../../config/logger').logInfo,
    names = require('../controllers/chat.server.controller');

module.exports = function (Router) {
    var router = new Router('signin');

    router.add(function (name) {
        if (names.hasOwnProperty(name)) {
            this.emit('message', {name: 'SYS', msg: "This name is already in use."});
        } else {
            names[name] = true;
            log('User registered name: ' + name);
            this.session.name = name;

            this.emit('client-connected', name);
            this.emit('message', {name: 'SYS', msg: "You are now known as " + name});
            this.broadcast.emit('connection', name);
        }
    });
};