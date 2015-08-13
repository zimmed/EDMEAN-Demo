'use strict';

(function (ctrl) {

    ctrl.getModule('draw').directive("drawingBoard", ['Socket',
        function (Socket) {
            return {
                restrict: "A",
                scope: {
                    connected: '=drawingBoard'
                },
                link: function(scope, element){
                    var ctx = element[0].getContext('2d');

                    // variable that decides if something should be drawn on mousemove
                    var drawing = false;
                    var color = '#000';
                    var events = [];

                    // the last coordinates before the current move
                    var lastX, lastY, currentX, currentY;

                    element.bind('mousedown', function(event){
                        if (scope.connected) {
                            if (typeof(event.offsetX) !== 'undefined') {
                                lastX = event.offsetX;
                                lastY = event.offsetY;
                            } else { // Firefox compatibility
                                lastX = event.layerX - event.currentTarget.offsetLeft;
                                lastY = event.layerY - event.currentTarget.offsetTop;
                            }

                            // begins new line
                            ctx.beginPath();

                            drawing = true;
                        }
                    });
                    element.bind('mousemove', function(event){
                        if(drawing){
                            // get current mouse position
                            if(typeof(event.offsetX) !== 'undefined'){
                                currentX = event.offsetX;
                                currentY = event.offsetY;
                            } else {
                                currentX = event.layerX - event.currentTarget.offsetLeft;
                                currentY = event.layerY - event.currentTarget.offsetTop;
                            }

                            draw(lastX, lastY, currentX, currentY, color, true);

                            // set current coordinates to last one
                            lastX = currentX;
                            lastY = currentY;
                        }

                    });
                    element.bind('mouseup', function(event){
                        // stop drawing
                        drawing = false;
                        sendDrawing();
                    });

                    Socket.on('new-draw', function (data) {
                        for (var i = 0, l = data.events.length; i < l; i++) {
                            var e = data.events[i];
                            draw(e.x1, e.y1, e.x2, e.y2, data.color);
                        }
                    });

                    function sendDrawing() {
                        Socket.emit('draw', {events: events});
                        events = [];
                    }

                    // canvas reset
                    function reset(){
                        element[0].width = element[0].width;
                    }

                    function draw(lX, lY, cX, cY, clr, orig){
                        // line from
                        ctx.moveTo(lX,lY);
                        // to
                        ctx.lineTo(cX,cY);
                        // color
                        ctx.strokeStyle = clr;
                        // draw it
                        ctx.stroke();

                        if (orig) {
                            events.push({x1: lX, y1: lY, x2: cX, y2: cY});
                        }
                    }
                }
            };
    }]);

})(window.AppCtrl);