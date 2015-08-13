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

                $scope.users = [];
                $scope.messages = [];

                createMessage('SYS', 'Enter a nickname to join the chat.', '#000');

                $scope.login = function () {
                    var name = $scope.tName;
                    if (name === '') return;
                    $scope.tName = '';
                    Socket.emit('signin', {name: name});
                };

                $scope.sendMessage = function () {
                    var msg = $scope.tMessage;
                    if (msg === '') return;
                    $scope.tMessage = '';
                    Socket.emit('chat', {message: msg});
                };

                Socket.on('message', function (data) {
                    createMessage(data.name, data.message, data.color);
                });

                Socket.on('connection', function (data) {
                    var name = data.name, names = data.names;
                    $scope.users = names;
                    createMessage('SYS', name + ' has joined the chat.', false, {'color':'#666','font-style':'italic'});
                });

                Socket.on('disconnection', function (data) {
                    var name = data.name, names = data.names;
                    $scope.users = names;
                    createMessage('SYS', name + ' has left the chat.', false, {'color':'#666','font-style':'italic'});
                });

                Socket.on('client-connected', function (data) {
                    var name = data.name, names = data.names;
                    $scope.user.connected = true;
                    $scope.user.name = name;
                    $scope.users = names;
                });

                Socket.on('client-disconnected', function () {
                    $scope.connected = false;
                    $scope.user.name = '';
                });

                function createMessage(name, message, color, style) {
                    name = (name === $scope.user.name) ? 'You:' :
                        (name === 'SYS') ? '' : name + ':';
                    var message = {
                        name: name,
                        color: (name === 'You:' || !color) ? {'color': '#000', 'text-shadow': 'none'} : {'color': color},
                        message: message,
                        style: style || ((name) ? null : {'font-weight': 'bold'})
                    };
                    console.log(message);
                    $scope.messages.push(message);
                }

            }]
    );

})(window.AppCtrl);