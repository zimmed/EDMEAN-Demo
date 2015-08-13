'use strict';

var log = require('../../config/logger').logInfo,
    names = require('../controllers/chat.server.controller');

module.exports = function (Router) {
    var router = new Router('draw');

    router.add(function (events) {
        if (!this.session.name) return;
        var color = names[this.session.name];
        this.broadcast.emit('new-draw', {events: events, color: color});
    });
};