'use strict';

var log = require('../../config/logger').logInfo,
    cache = require('../controllers/cache.server.controller'),
    names = cache.users,
    messages = cache.messages,
    events = cache.events;

module.exports = function (Router) {
    var router = new Router('signin');
    var r = Math.floor(Math.random() * 18);

    router.add(function (name) {
        if (names.hasOwnProperty(name)) {
            this.emit('message', {name: 'SYS', color: names['SYS'], message: "This name is already in use."});
            log('User attempted to register name already in-use: ' + name)
        } else {
            names[name] = createColor();
            log('User registered name: ' + name);
            this.session.name = name;

            this.emit('client-connected', {name: name, color: names[name], names: names, messages: messages, events: events});
            this.emit('message', {name: 'SYS', message: "You are now known as " + name});
            this.broadcast.emit('connection', {name: name, names: names});
        }
    });

    function createColor() {
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
        return colors[r++ % colors.length];
    }
};