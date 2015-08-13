'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller');

module.exports = function (Router) {
    var router = new Router('draw');

    router.add(function (events) {
        if (!this.session.name || !this.session.room) return;
        var nsp = cache.namespace(this.session.room),
            names = nsp.users,
            datas = nsp.events,
            color = names[this.session.name],
            e = {events: events, color: color};
        datas.push(e);
        this.broadcast.to(this.session.room).emit('new-draw', e);
    });
};