'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller');

module.exports = function (Router) {
    var router = new Router('signin');

    router.add(function (name, room) {
        var nsp = cache.namespace(room),
            names = nsp.users,
            messages = nsp.messages,
            events = nsp.events,
            io = router.getIO();
        if (names.hasOwnProperty(name)) {
            this.emit('message', {name: 'SYS', color: names['SYS'], message: "This name is already in use."});
            log(room + '/User attempted to register name already in-use: ' + name)
        } else {
            names[name] = createColor(nsp);
            log(room + '/User registered name: ' + name);
            this.session.name = name;
            this.session.room = room;

            this.join(room);
            io.to(room).emit('client-connected', {name: name, color: names[name], names: names, messages: messages, events: events});
            this.emit('message', {name: 'SYS', message: "You are now known as " + name});
            this.broadcast.to(room).emit('connection', {name: name, names: names});
        }
    });

    function createColor(nsp) {
        if (!nsp.hasOwnProperty('r')) nsp.r = Math.floor(Math.random() * 18);
        var colors = [
            'blue',
            'forestgreen',
            'brown',
            'cadetblue',
            'green',
            'cornflowerblue',
            'crimson',
            'cyan',
            'blueviolet',
            'darkcyan',
            'darkgoldenrod',
            'darkmagenta',
            'darkgreen',
            'darkblue',
            'maroon',
            'darkslategray',
            'darkred',
            'darkviolet',
            'lightcoral'
        ];
        return colors[nsp.r++ % colors.length];
    }
};