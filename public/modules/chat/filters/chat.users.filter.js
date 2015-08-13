'use strict';

(function (ctrl) {

    ctrl.getModule('chat').filter('usersFilter', function () {
        return function (item, username) {
            if (item === username) return '<b>' + username + '</b>';
            if (item === 'SYS') return '';
            return item;
        };
    });

})(window.AppCtrl);