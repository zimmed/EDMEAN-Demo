'use strict';

var nsps = {};

module.exports = {
    namespace: function (nsp) {
        if (nsps.hasOwnProperty(nsp)) return nsps[nsp];
        var obj = {
            users: {
                'SYS': '#000'
            },
            messages: [],
            events: []
        };
        nsps[nsp] = obj;
        return obj;
    }
};