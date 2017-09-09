// Useful Functions 
function testAlert(alert) {
    $('#for_testing').css('display', 'block');
    $('#for_testing').append(alert);
}
function tapEvent (id, startFunc, moveFunc, endFunc) {
    
    var coord = null;
    
    function start (e) {
//        e.preventDefault();
        coord = {x: e.touches[0].pageX, y: e.touches[0].pageY};
        
        if (startFunc != null) {
            startFunc();
        }
        
        return true;
    }; 
    
    function move (e) {
//        e.preventDefault();
        if (coord != null) {
            var tolerance = 10.0;
            if (Math.abs(e.touches[0].pageX-coord.x) > tolerance || Math.abs(e.touches[0].pageY-coord.y) > tolerance){
                // moved too far, cancels event for this touch
                coord = null;
            }
        }
        
        if (moveFunc != null) {
            moveFunc();
        }
        
        return true;
    };
    
    function end (e) {
        if (coord != null){
            // Execute Code
            
            if (endFunc!=null) {
                endFunc();
            }
            
            return true;
        }
    };
    
    function addListeners () {
        
        var ele = document.getElementById(id);
        
        ele.addEventListener('touchstart', start);
        ele.addEventListener('touchmove', move);
        ele.addEventListener('touchend', end);
        
    }
    
    addListeners();
    
}
function cap(string) {
    var split = string.split(' '),
        str = '';
    
    for (var i = 0; i < split.length; i++) {
        
        split[i].charAt(0).toUpperCase();
        str += split[i];
        
        if (i != split.length-1) {
            str += ' '; 
        }
        
    }
    
    return str;
}
function cloneReplace (element) {
    
    var el = document.getElementById(element),
        clone = el.cloneNode(true);
    
    el.parentNode.replaceChild(clone, el);
    
}
function centerElement (id, width, height) {
    
    $('#'+id).css({height: height+'px', width: width+'px', marginLeft: (-width/2)+'px', marginTop: (-height/2)+'px', position: 'absolute', left: '50%', top: '50%'});
    
}
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] == value) {
            return i;
        }
    }
    return -1;
}
function findWithAttrArray(array, attr, value) {
    var ar = [];
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] == value) {
            ar.push(array[i]);
        }
    }
    
    return ar;   
}
function isColliding(a, b) {
    if (
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    ) {
        return false;   
    } else {
        return true;   
    }
}
function circleCollision (circle1, circle2) {
    var a = circle1.radius + circle2.radius;
    var x = circle1.centerX - circle2.centerX;
    var y = circle1.centerY - circle2.centerY;

    if ( a > Math.sqrt( (x*x) + (y*y) ) ) {
        return true;
    } else {
        return false;
    }   
}
function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {
    var x=((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y=((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (x1 != x2) {
            if (x1>x2) {
                if (!(x2<x&&x<x1)) {return false;}
            } else {
                if (!(x1<x&&x<x2)) {return false;}
            }
        }
        if (y1 != y2) {
            if (y1>y2) {
                if (!(y2<y&&y<y1)) {return false;}
            } else {
                if (!(y1<y&&y<y2)) {return false;}
            }
        }
        if (x3 != x4) {
            if (x3>x4) {
                if (!(x4<x&&x<x3)) {return false;}
            } else {
                if (!(x3<x&&x<x4)) {return false;}
            }
        }
        if (y3 != y4) {
            if (y3>y4) {
                if (!(y4<y&&y<y3)) {return false;}
            } else {
                if (!(y3<y&&y<y4)) {return false;}
            }
        }
    }
    return {x: x, y: y};
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
function addCommas (num) {
    
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
}
function lineDistance (point1, point2) {
    
    var xs = 0,
        ys = 0;
    
    xs = Math.pow(point2.x - point1.x, 2);
    ys = Math.pow(point2.y - point1.y, 2);
    
    return Math.sqrt(xs + ys);
    
}
function replaceSpace (text) {
 
    var newText = text.replace(' ', '_');
    
    return newText;
    
}
var ease = {
        
    outElastic: function (t, b, c, d) {

        var ts=(t/=d)*t;
        var tc=ts*t;

        return b+c*(44.995*tc*ts + -139.3825*ts*ts + 159.28*tc + -80.89*ts + 16.9975*t);
    },

    outExpo: function (currentIteration, startValue, changeInValue, totalIterations) {

        return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;

    },

    linear: function (t, b, c, d) {

        t/=d;
        return b+c*(t);

    },

    outQuartic: function (t, b, c, d) {

        var ts=(t/=d)*t;
        var tc=ts*t;
        return b+c*(-1*ts*ts + 4*tc + -6*ts + 4*t);

    },

    halfSine: function (t, b, c, d) {

        var ts=(t/=d)*t;
        var tc=ts*t;
        return b+c*(64.4975*tc*ts + -195.7925*ts*ts + 214.995*tc + -102.7*ts + 20*t);

    },
    
    inOutExpo: function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
        t--;
        return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    },
    
    inOutQuad: function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

}
function getHighestNum (arr) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > num || i == 0) num = arr[i];   
    }
    return num;
}
function getLowestNum (arr) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < num || i == 0) num = arr[i];   
    }
    return num;
}
function zeroOneLimit(num) {
 
    if (num < 0) return 0;
    else if (num > 1) return 1;
    else return num;
    
}
function freeFloat (totalWidth, minWidth, marginPer, minColumn, maxColumn) {
           
    var columns = maxColumn,
        width = minWidth,
        margin;

    for (var i = columns; i >= minColumn; i--) {

        width = (totalWidth-((minWidth*marginPer)*(i*2))) / i;
        columns = i;

        if (width > minWidth || i == minColumn) {
            margin = ((totalWidth/i)*marginPer)/2;
            width = (totalWidth-(margin*(i*2))) / i;
            break;   
        }

    }

    return {width: width, columns: columns, margin: margin, totalWidth: ((width*columns)+(margin*columns*2))};

}
function numToWord (number) {
    
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    function inWords (num) {
        
        var digits = (""+num).split(""),
            str = '';
        
        if (num < 20) {
            str = a[num];
        } else if (num >= 20 && num < 100) {
            if (digits[1] == 0) {
                str = b[digits[0]];
            } else {
                str = b[digits[0]] + '-' + a[digits[1]];  
            }
        } else {
            str = ''+num;   
        }
         
        return str;
    }
    
    return inWords(number);
    
}
function romanize (num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}
var fps = {
    time: new Date().getTime(),
    get: function () {
        var fps,
            t = new Date().getTime();
        
        fps = (1 / ((t - this.time) / 16.666666667)) * 60;
        fps = parseInt(fps * 10) / 10;
        this.time = t;
        return fps;
        
    }
}
function getTransform(el) {
    var results = $(el).css('-webkit-transform').match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)

    if(!results) return [0, 0, 0];
    if(results[1] == '3d') return results.slice(2,5);

    results.push(0);
    return results.slice(5, 8);
}
function removeCommas (string) {
    var s = string.replace(/,/g, '');
    return s;
}