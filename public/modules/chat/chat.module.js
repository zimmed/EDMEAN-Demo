'use strict';

(function (ctrl) {

    ctrl.createModule('chat', [
        ctrl.getModuleName('config'),
        ctrl.getModuleName('core')
    ]);

})(window.AppCtrl);