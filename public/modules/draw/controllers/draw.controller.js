'use strict';

(function (ctrl) {

    ctrl.getModule('draw').controller('DrawController',
        ['Socket', '$scope',
            function (Socket, $scope) {

                $scope.connected = false;

                Socket.on('client-connected', function (name) {
                    $scope.connected = true;
                });

                Socket.on('client-disconnected', function () {
                    $scope.connected = false;
                });

            }]
    );

})(window.AppCtrl);