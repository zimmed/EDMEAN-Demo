'use strict';

(function (ctrl) {

    ctrl.createModule('draw', [
        ctrl.getModuleName('config'),
        ctrl.getModuleName('core')
    ]);

})(window.AppCtrl);