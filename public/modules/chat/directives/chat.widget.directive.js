'use strict';

(function (ctrl) {

    ctrl.getModule('chat').directive('chatWidget',
        ['chatConfig',
            function (config) {
                return  {
                    restrict: 'EA',
                    templateUrl: config.modulePath + config.partialsPath + 'chat.widget.partial.html',
                    controller: 'ChatController'
                };
            }]
    );

})(window.AppCtrl);