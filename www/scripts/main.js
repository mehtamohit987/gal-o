'use strict';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

function gameLoop () {
    universe.focus.update();
    window.requestAnimationFrame(gameLoop);
}


function generateRandomUniverse (numOfSystems) {
    var systemData = [],
        planetData = [];

    for (var i = 0; i < numOfSystems; i++) {
        var newSystem = {},
            numOfPlanets = getRandomInt(1, 5);
        var x, y, name;

        do {
            var collision = false;

            if (systemData.length == 0) {
                x = 0;
                y = 0;
            } else {
                x = getRandomInt(-200, 200) / 200;
                y = getRandomInt(-200, 200) / 200;
            }

            for (var j = 0; j < systemData.length; j++) {
                if ( lineDistance( {x: x, y: y}, {x: systemData[j].coordX, y: systemData[j].coordY} ) < .3 ) {
                    collision = true;
                }
            }
        } while (collision == true);

        newSystem.coordX = x;
        newSystem.coordY = y;
        newSystem.radius = getRandomInt(300, 700) / 10000;

        systemData.push(newSystem);

        var orbitDirection = getRandomInt(1, 2),
            orbits = [ 1, 2, 3, 4];
        
        for (var j = 0; j < numOfPlanets; j++) {
            var newPlanet = {},
                speed, rotation;
            if (orbitDirection == 1) {
                speed = getRandomInt(-50, -10);
                rotation = getRandomInt(-180, -1);
            } else {
                speed = getRandomInt(10, 50);
                rotation = getRandomInt(1, 180);
            }
            var randorbitIndex = getRandomInt(0, orbits.length - 1);
            orbits.splice(randorbitIndex, 1);

            newPlanet.orbit = randorbitIndex;
            newPlanet.orbitSpeed = speed / 100;
            newPlanet.rotation = rotation;
            newPlanet.orbitSpeed = Math.round(getRandomInt(15, 21)) / 1000;
            planetData.push(newPlanet);

        }
    }
    return systemData;    
}

var game = {
    init: function () {
        var w = window.innerWidth,
            h = window.innerHeight;
        $('#universe').css({width: w + 'px', height: h + 'px'});
        $('#systems').css('-webkit-transform', 'translate3d(' + w/2 + 'px, ' + h/2 + 'px, 0px)');
        $('#systems').css('transform', 'translate3d(' + w/2 + 'px, ' + h/2 + 'px, 0px)');

        var systems = generateRandomUniverse(30);
        universe.render(systems);

        gameLoop();
    }
}


var universe = {
    systems: [],
    render: function (data) {
        var w = window.innerWidth ;
        for (var i = 0; i < data.length; i++) {
            var system = {};
            system.coords = { x: data[i].coordX * w, y: data[i].coordY * w };
            system.radius = data[i].radius * w;
            system.realTimeCoords = { x: data[i].coordX * w, y: data[i].coordY * w };
            system.endCoords = { x: data[i].coordX * w, y: data[i].coordY * w };
            universe.systems.push(system);
        }
        universe.draw();
    },
    draw: function () {
        for (var i = 0; i < universe.systems.length; i++) {
            var s = universe.systems[i];
            $('#systems').append('<div id="system_' + i +'" class="system" \
                style="width:' + s.radius * 2 + 'px; height:' + s.radius * 2 + 'px; \
                -webkit-transform: translate3d(' + (s.coords.x - s.radius) + 'px, ' + (s.coords.y - s.radius) +'px, 0px); \
                transform: translate3d(' + (s.coords.x - s.radius) + 'px, ' + (s.coords.y - s.radius) +'px, 0px);"></div>');
        }
        var u = document.getElementById('systems');
        u.addEventListener('touchstart', universe.touchStart, false);
        u.addEventListener('touchend', universe.touchEnd, false);
        u.addEventListener('touchmove', universe.touchMove, false);    
    },
    touchCoord: null,
    touchStart: function (e) {
      var touch = e.touches[0];

      if (e.touches.length == 1) {
          universe.touchCoord = { x: touch.pageX, y: touch.pageY, id: touch.identifier };
          universe.focus.frame = universe.focus.frames;
      }

    },
    touchMove: function (e) {
        e.preventDefault();

        for (var i=0; i < e.touches.length; i++) {
            if (e.touches[i].identifier === universe.touchCoord.id) {
                var touch = e.touches[0],
                    moveCoords = {x: touch.pageX, y: touch.pageY},
                    dif = {moveX: moveCoords.x - universe.touchCoord.x, moveY: moveCoords.y - universe.touchCoord.y};
                
                for (var i = 0; i < universe.systems.length; i++) {
                    var x = parseInt((dif.moveX + universe.systems[i].coords.x)*10)/10,
                        y = parseInt((dif.moveY + universe.systems[i].coords.y)*10)/10,
                        r = universe.systems[i].radius;

                    universe.systems[i].realTimeCoords.x = x; 
                    universe.systems[i].realTimeCoords.y = y;

                    $('#system_' + i).css('-webkit-transform', 'translate3d(' + (x-r) + 'px, ' + (y-r) + 'px, 0px)');
                    $('#system_' + i).css('transform', 'translate3d(' + (x-r) + 'px, ' + (y-r) + 'px, 0px)');
                }
            }
        }
    },
    touchEnd: function (e) {
        console.log('end',e);
        
        for (var i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === universe.touchCoord.id) {
                var endCoords = { x: e.changedTouches[i].pageX, y: e.changedTouches[i].pageY },
                    dif = { moveX: endCoords.x - universe.touchCoord.x, moveY: endCoords.y - universe.touchCoord.y };
                var focus,
                    dist = 0;
                for (var i=0; i< universe.systems.length; i++) {
                    var line;
                    var x = dif.moveX + universe.systems[i].coords.x,
                        y = dif.moveY + universe.systems[i].coords.y,

                    line = lineDistance({ x: 0, y: 0 }, { x: x, y: y });//{ x: 0, y: 0 },  { x: window.innerWidth/2, y: window.innerHeight/2 }

                    if ( line < dist || i == 0) {
                        dist = line;
                        focus = universe.systems[i];
                    }
                    universe.systems[i].endCoords = { x: x, y: y };
                }
                universe.focus.init(focus);
            }
        }   
    },
    focus: {
        frame: 30,
        frames: 30,
        change: {},
        init: function (f) {
            var moveX = -f.endCoords.x;
            var moveY = -f.endCoords.y;
            universe.focus.change.x = moveX;
            universe.focus.change.y = moveY;
            universe.focus.frame = 0;

        },
        update: function () {
            var u = universe.focus;
            if(u.frame < u.frames) {
                u.frame++;
                for (var i = 0; i < universe.systems.length; i++) {
                    var left =  ease.outExpo(u.frame, universe.systems[i].endCoords.x, u.change.x, u.frames),
                        top = ease.outExpo(u.frame, universe.systems[i].endCoords.y, u.change.y, u.frames),
                        radius = universe.systems[i].radius;
                    universe.systems[i].realTimeCoords = { x: left, y: top };
                    $('#system_' + i).css('-webkit-transform', 'translate3d(' + (left-radius) + 'px, ' + (top-radius) + 'px, 0px)');
                    $('#system_' + i).css('-transform', 'translate3d(' + (left-radius) + 'px, ' + (top-radius) + 'px, 0px)');

                }
            }
        }
    }
}
