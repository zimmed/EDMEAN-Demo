'use strict';

var log = require('../../config/logger').logInfo,
    names = require('../controllers/chat.server.controller');

module.exports = function (Router) {
    var router = new Router('signin');

    router.add(function (name) {
        if (names.hasOwnProperty(name)) {
            this.emit('message', {name: 'SYS', message: "This name is already in use."});
        } else {
            names[name] = createColor(25, Object.keys(names).length + 1);
            var users = Object.keys(names);
            log('User registered name: ' + name);
            this.session.name = name;

            this.emit('client-connected', {name: name, names: users});
            this.emit('message', {name: 'SYS', message: "You are now known as " + name});
            this.broadcast.emit('connection', {name: name, names: users});
        }
    });

    function createColor(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        var r, g, b;
        var h = step / numOfSteps;
        var i = ~~(h * 6);
        var f = h * 6 - i;
        var q = 1 - f;
        switch(i % 6){
            case 0: r = 1; g = f; b = 0; break;
            case 1: r = q; g = 1; b = 0; break;
            case 2: r = 0; g = 1; b = f; break;
            case 3: r = 0; g = q; b = 1; break;
            case 4: r = f; g = 0; b = 1; break;
            case 5: r = 1; g = 0; b = q; break;
        }
        var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
        return (c);
    }
};