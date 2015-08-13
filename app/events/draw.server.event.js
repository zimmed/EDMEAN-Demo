'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller'),
    names = cache.users,
    datas = cache.events;

module.exports = function (Router) {
    var router = new Router('draw');

    router.add(function (events) {
        if (!this.session.name) return;
        var color = names[this.session.name], e = {events: events, color: color};
        datas.push(e);
        this.broadcast.emit('new-draw', e);
    });
};