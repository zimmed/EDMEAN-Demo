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

                $scope.setNameStyle = function (clr) {
                    return {
                        'font-style': 'italic',
                        'color': (clr === '#000' || clr === 'black') ? '#666' : clr
                    };
                };

                $scope.sendMessage = function () {
                    var msg = $scope.tMessage;
                    if (msg === '') return;
                    $scope.tMessage = '';
                    Socket.emit('chat', {message: msg});
                };

                Socket.on('message', function (data) {
                    if ($scope.user.connected) createMessage(data.name, data.message, data.color);
                });

                Socket.on('connection', function (data) {
                    if ($scope.user.connected) {
                        var name = data.name, names = data.names;
                        $scope.users = names;
                        createMessage('SYS', name + ' has joined the chat.', false, {
                            'color': '#666',
                            'font-style': 'italic'
                        });
                    }
                });

                Socket.on('disconnection', function (data) {
                    if ($scope.user.connected) {
                        var name = data.name, names = data.names;
                        $scope.users = names;
                        createMessage('SYS', name + ' has left the chat.', false, {
                            'color': '#666',
                            'font-style': 'italic'
                        });
                    }
                });

                Socket.on('client-connected', function (data) {
                    var name = data.name, names = data.names, ms = $scope.messages;
                    $scope.user.connected = true;
                    $scope.user.name = name;
                    $scope.users = names;
                    $scope.messages = [];
                    createMessages(data.messages);
                    $scope.messages = $scope.messages.concat(ms);
                });

                Socket.on('client-disconnected', function () {
                    $scope.user.connected = false;
                    $scope.user.name = '';
                    $scope.users = [];
                    $scope.messages = [];
                    createMessage('SYS', 'You have been disconnected.', '#000');
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

                function createMessages(datas) {
                    for (var i = 0, l = datas.length; i < l; i++) {
                        var data = datas[i];
                        createMessage(data.name, data.message, data.color);
                    }
                }

            }]
    );

})(window.AppCtrl);