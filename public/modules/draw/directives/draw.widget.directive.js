'use strict';

(function (ctrl) {

    ctrl.getModule('draw').directive('drawWidget',
        ['drawConfig',
            function (config) {
                return  {
                    restrict: 'EA',
                    templateUrl: config.modulePath + config.partialsPath + 'draw.widget.partial.html',
                    controller: 'DrawController'
                };
            }]
    );

})(window.AppCtrl);