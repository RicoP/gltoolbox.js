//= glsafecontext.js 
//= webgl-debug.js  

var UTIL = (function() {
"use strict"; 

var lastTime = -1; 

var raf = window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			  window.setTimeout(callback, 1000 / 60);
		  };

var keyfuncs = (function() {
	var keysDown = new Uint8Array(256); 
	var keysDownOld = new Uint8Array(256); 

	cleanKeys(); 

	document.addEventListener("keydown", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 1; 
		}
	}); 

	document.addEventListener("keyup", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 0; 
		}
	}); 

	window.addEventListener("blur", function() { 
		cleanKeys(); 	
	});

	function cleanKeys() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = 0; 
			keysDown[i] = 0; 
		}
	}

	function setOldKeyState() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = keysDown[i]; 
		}
	}

	var keys = {
		"backspace":8, "tab":9, "enter":13, "shift":16, "ctrl":17, "alt":18, "pause":19, "capslock":20,
		"escape":27, "space":32, "pageUp":33, "pageDown":34, "end":35, "home":36,
		"left":37, "up":38, "right":39, "down":40, 
		"insert":45, "delete":46,
		"num0":48, "num1":49, "num2":50, "num3":51, "num4":52, "num5":53, "num6":54, "num7":55, "num8":56, "num9":57,
		"a":65, "b":66, "c":67, "d":68, "e":69, "f":70, "g":71, "h":72, "i":73, "j":74, "k":75, "l":76, "m":77, 
		"n":78, "o":79, "p":80, "q":81, "r":82, "s":83, "t":84, "u":85, "v":86, "w":87, "x":88, "y":89, "z":90, 
		"windowKeyLeft":91, "windowKeyRight":92, "select":93,
		"numpad0":96, "numpad1":97, "numpad2":98, "numpad3":99, "numpad4":100, 
		"numpad5":101, "numpad6":102, "numpad7":103, "numpad8":104, "numpad9":105,
		"multiply":106, "add":107, "subtract":109, "decimalPoint":110, "divide":111,
		"f1":112, "f2":113, "f3":114, "f4":115, "f5":116, "f6":117,
		"f7":118, "f8":119, "f9":120, "f10":121, "f11":122, "f12":123,
		"numlock":144, "scrolllock":145, "semicolon":186, "equals":187, "comma":188,
		"dash":189, "period":190, "slash":191, "graveAccent":192, "openBracket":219,
		"backSlash":220, "closeBraket":221, "quote":222
	};

	return {
		"keyIsDown" : function (key) {
			return keysDown[key] !== 0; 
		}, 
		"keyIsUp" :  function (key) {
			return keysDown[key] === 0; 
		}, 
		"keyWasPressed" : function (key) {
			return keysDown[key] !== 0 && keysDownOld[key] === 0;
		},  
		"keyWasReleased" : function (key) {
			return keysDown[key] === 0 && keysDownOld[key] !== 0;
		}, 
		"keys" : keys, 
		"setOldKeyState" : setOldKeyState, 
		"keysDown" : keysDown, 
		"keysDownOld" : keysDownOld 
	};
}());


var joyfuncs = (function () {
	var gamepads = navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || [];
	var e = 0.2; 
	var edge0 = e; 
	var edge1 = 1 - e; 

	var NONE = {
		"axes" : [0,0,0,0], 
		"buttons" : [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], 
		"id" : "NONE", 
		"index" : -1 
	}; 

	function getFirstPad() {
		var axes = [0,0,0,0];
		
		for (var i = 0; i < gamepads.length; ++i) {
			var pad = gamepads[i];
			if(pad) {
				for(var a = 0; a < pad.axes.length; a++) { 
					if(pad.axes[a]) { 
						axes[a] = normalise(pad.axes[a]);
					}
				}

				return {
					"axes" : axes, 
					"buttons" : pad.buttons, 
					"id" : pad.id, 
					"index" : pad.index 
				};
			}
		}

		return NONE;  
	}

	function normalise(x) {
		if(x < 0) {
			return -normalise(-x); 
		}

		// like GLSL smoothstep(x, 0, 1); 
		var t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0))); 
		return t * t * (3.0 - 2.0 * t);
	}

	return {
		"getFirstPad" : getFirstPad  
	};
}());  

function createContext(width, height) { 
		var canvas = document.createElement("canvas"); 
		canvas.width = width; 
		canvas.height = height; 
		document.body.appendChild(canvas); 

		var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("experimental-webgl", {alpa : false, preserveDrawingBuffer : true}).getSafeContext()); 

		return gl; 
}

function getSource(id) {
    var node = document.getElementById(id); 
    return node.innerText; 
}

function createCube() {
	var vert = new Float32Array([
		-1, -1,  1, 1,
		 1, -1,  1, 1,
		 1,  1,  1, 1,
		-1,  1,  1, 1,
		-1, -1, -1, 1,
		 1, -1, -1, 1,
		 1,  1, -1, 1,
		-1,  1, -1, 1
	]); 

	var indx = new Uint16Array([
		0,1,2,
		0,2,3,
		1,5,6,
		1,6,2,
		5,4,7,
		5,7,6,
		4,0,3,
		4,3,7,
		3,2,6,
		3,6,7,
		4,5,1,
		4,1,0
	]);

	return { vertices : vert, indices : indx };
}

function createPlane(level) {
    var vert = [];
    var tex = [];  

    createTriangle(vert, tex, [1,0,1], [-1,0,1], [-1,0,-1], [1,1], [0,1], [0,0], level || 0); 
    createTriangle(vert, tex, [1,0,1], [-1,0,-1], [1,0,-1], [1,1], [0,0], [1,0], level || 0); 

    return { vertices : new Float32Array(vert), texCoords : new Float32Array(tex) }; 

    function createTriangle(vert, tex, v1, v2, v3, t1, t2, t3, n) { 
        if(n === 0) {
            vert.push(v1[0], v1[1], v1[2], 1.0); 
            vert.push(v2[0], v2[1], v2[2], 1.0); 
            vert.push(v3[0], v3[1], v3[2], 1.0); 

            tex.push(t1[0], t1[1]); 
            tex.push(t2[0], t2[1]); 
            tex.push(t3[0], t3[1]); 

            return; 
        }

        var v12 = middleVec(v1, v2); 
        var v23 = middleVec(v2, v3); 
        var v31 = middleVec(v3, v1); 

        var t12 = middleTex(t1, t2); 
        var t23 = middleTex(t2, t3); 
        var t31 = middleTex(t3, t1); 

        createTriangle(vert, tex, v1, v12, v31, t1, t12, t31, n-1); 
        createTriangle(vert, tex, v2, v23, v12, t2, t23, t12, n-1); 
        createTriangle(vert, tex, v3, v31, v23, t3, t31, t23, n-1); 
        createTriangle(vert, tex, v12, v23, v31, t12, t23, t31, n-1); 

        function middleVec(v1, v2) {
            var x1,y1,z1,x2,y2,z2; 
            x1 = v1[0]; 
            y1 = v1[1]; 
            z1 = v1[2]; 
            x2 = v2[0]; 
            y2 = v2[1]; 
            z2 = v2[2]; 

            return [ (x1 + x2) / 2,  (y1 + y2) / 2,  (z1 + z2) / 2 ]; 
        }

        function middleTex(t1, t2) {
            var x1,y1,x2,y2; 

            x1 = t1[0];
            y1 = t1[1]; 
            x2 = t2[0];
            y2 = t2[1]; 

            return [ (x1 + x2) / 2, (y1 + y2) / 2 ]; 
        }
    }
}

function parseObjData(data) {
	var lines = data.split("\n"); 

	var vertices = []; 
	var texcoord = []; 
	var normals = []; 
	var indices = []; 

	var line; 
	var operations = {
		"v" : function(numbers) {
			if(numbers.length !== 3) { 
				throw "vertice needs to be three elements big."; 
			}

			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
			
			vertices.push(a,b,c,1); 
		},
		"vn" : function(numbers) {
			if(numbers.length !== 3) { 
				throw "normals needs to be three elements big."; 
			}

			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
			
			normals.push(a,b,c,0); 
		},

		"f" : function processFace(vertices) {
			if(vertices.length < 3) {
				throw "Strange amount of vertices in face."; 
			}

			if(vertices.length > 3) {
				//let's asume it's convex 
				for(var n = vertices.length - 1; n !== 1; n--) {
					processFace([vertices[0], vertices[n-1], vertices[n]]); 
				}
				return; 
			}

			var fa,fb,fc;
			fa = vertices[0].split(/\//g);
			fb = vertices[1].split(/\//g);
			fc = vertices[2].split(/\//g);
			
			var fav,fat,fan, fbv,fbt,fbn, fcv,fct,fcn; 
			fav = fa[0]; 
			fbv = fb[0]; 
			fcv = fc[0]; 

			fav && indices.push(Number(fav) -1); 
			fbv && indices.push(Number(fbv) -1); 
			fcv && indices.push(Number(fcv) -1); 
		}
	};

	for(var i = 0; i < lines.length; i++) {
		line = lines[i].trim(); 
		var elements = line.split(/[\t\r\n ]+/g);
		var head = elements.shift(); 
		
		var opp = operations[head]; 

		if(opp) opp(elements); 
	}

	return {
		"vertices" : new Float32Array(vertices),	
		"texcoord" : new Float32Array(texcoord),
		"normals" : new Float32Array(normals), 
		"indices" : new Uint16Array(indices) 
	};
}

function requestGameFrame (callback) { 
	raf(function () {
		var now = Date.now(); 
		if(lastTime === -1) {
			now = lastTime = Date.now(); 
		}
		callback(now - lastTime); 
		keyfuncs.setOldKeyState(); 
		lastTime = now; 
	}); 
}

return {
	"requestGameFrame" : requestGameFrame, 
	"createContext" : createContext,
	"getSource" : getSource,  
	"createPlane" : createPlane,
	"createCube" : createCube, 
	"parseObjData" : parseObjData, 
	"keys" : keyfuncs.keys,
	"keyIsDown" : keyfuncs.keyIsDown, 
	"keyIsUp" : keyfuncs.keyIsUp, 
	"keyWasPressed" : keyfuncs.keyWasPressed, 
	"keyWasReleased" : keyfuncs.keyWasReleased, 
	"getFirstPad" : joyfuncs.getFirstPad 
}; 
}()); 
