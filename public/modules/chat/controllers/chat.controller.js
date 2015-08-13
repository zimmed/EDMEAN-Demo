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
                    Socket.emit('signin', {name: name});
                };

                $scope.sendMessage = function () {
                    var msg = $scope.tMessage;
                    $scope.tMessage = '';
                    Socket.emit('chat', {message: msg});
                };

                $scope.messages = ['<strong>SYS: Pick a username to join the chat.</strong>'];

                Socket.on('message', function (data) {
                    var out = data.name + ': ' + data.message;
                    if (data.name === 'SYS') out = '<strong>' + out + '</strong>';
                    $scope.messages.push(out);
                });

                Socket.on('connection', function (name) {
                    $scope.messages.push('<em>' + name + ' has joined the chat.</em>');
                });

                Socket.on('disconnection', function (name) {
                    $scope.messages.push('<em>' + name + ' has left the chat.</em>');
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