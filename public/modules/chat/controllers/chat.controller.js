'use strict';

(function (ctrl) {

    ctrl.getModule('chat').controller('ChatController',
        ['Socket', '$scope',
            function (Socket, $scope) {

                $scope.user = {
                    name: '',
                    connected: false
                };
                $scope.tMessage = '';
                $scope.tName = '';

                $scope.login = function () {
                    var name = $scope.tName;
                    $scope.tName = '';
                    Socket.emit('signin', name);
                };

                $scope.sendMessage = function () {
                    var msg = $scope.tMessage;
                    $scope.tMessage = '';
                    Socket.emit('message', msg);
                };

                $scope.messages = ['SYS: Pick a username to join the chat.'];

                Socket.on('message', function (data) {
                    $scope.messages.push(data.name + ': ' + data.message);
                });

                Socket.on('connection', function (name) {
                    $scope.messages.push(name + ' has joined the chat.');
                });

                Socket.on('disconnection', function (name) {
                    $scope.messages.push(name + ' has left the chat.');
                });

                Socket.on('client-connected', function (name) {
                    $scope.user.connected = true;
                    $scope.user.name = name;
                });

                Socket.on('client-disconnected', function () {
                    $scope.connected = false;
                    $scope.user.name = '';
                });

            }]
    );

})(window.AppCtrl);