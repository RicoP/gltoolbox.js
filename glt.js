var GLT = {}; 

(function(GLT) { 
	"use strict"; 

	var SIZEOFFLOAT = 4; 

	//enums
	var SCHEMA_V   = 0 // Only Vertice
	var SCHEMA_VT  = 1 // Vertice + Textures
	var SCHEMA_VN  = 2 // Vertice + Normals
	var SCHEMA_VTN = 3 // Vertice + Textures + Normals

	var rgxWhitespace = /[\t\r\n ]+/g; 

	function parse(text) {
		var lines = text.split("\n"); 
		var line = ""; 
		var linenum = 0; 
		
		var vertice = []; //[x1,y1,z1,1,x2,y2,z2,1,...]
		var normals = []; //[x1,y1,z1,0,x2,y2,z2,0,...]
		var textureuv = []; //[u1,v1,u2,v2,...] 	
		var indiceV = []; 
		var indiceN = []; 
		var indiceT = []; 
		var faces = 0; 
		
		var funcs = {
			"v" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Vertic without 3 components. LINE:" + line); 
				}

				var x = parseInt(s[0], 10); 
				var y = parseInt(s[1], 10); 
				var z = parseInt(s[2], 10); 

				vertice.push(x,y,z,1); 
			},
			"vn" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Normal without 3 components. LINE:" + linenum); 
				}
		
				var x = parseInt(s[0], 10); 
				var y = parseInt(s[1], 10); 
				var z = parseInt(s[2], 10); 

				normals.push(x,y,z,0); 
			},
			"vt" : function(s) {
				if(!s || s.length != 2) {
					throw new Error("Can't accept Texture without 2 components. LINE:" + linenum); 
				}
		
				var u = parseInt(s[0], 10); 
				var v = parseInt(s[1], 10); 

				textureuv.push(u,v); 
			},
			"f" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Face without 3 components. LINE:" + linenum); 
				}	

				faces++; 				

				//Push indice
				for(var i=0; i != 3; i++) {
					var vtn = s[i].split("/"); 
					//Keep in mind that parseInt(undefined, 10) yields NaN and NaN - 1 = NaN. 
					var v = parseInt(vtn[0], 10) - 1; 
					var t = parseInt(vtn[1], 10) - 1;
					var n = parseInt(vtn[2], 10) - 1;
	
					console.log(v,t,n); 					

					indiceV.push(v); 
					if(t) indiceT.push(t);
					if(n) indiceN.push(n);
				}
			}

		};

		for(linenum = 0; linenum != lines.length;) {			
			line = lines[linenum++].trim();
			var elements = line.split(rgxWhitespace);
			var head = elements.shift(); 
			if(head in funcs) {
				funcs[head](elements); 
			}
		}	

		var schema = SCHEMA_V; 

		//Test Integrety
		if(textureuv.length !== 0 || indiceT.length !== 0) {
			schema |= SCHEMA_VT; 
			if(indiceV.length !== indiceT.length) {
				throw new Error("Texture indice don't match Vertic indice."); 
			}
		}

		if(normals.length !== 0 || indiceN.length !== 0) {
			schema |= SCHEMA_VN; 
			if(indiceV.length !== indiceN.length) {
				throw new Error("Normal indice don't match Vertic indice."); 
			}
		}
		console.log("schema", schema); 

		var sizeArray = 0; 
		var offsetV = 0;
		var offsetT = 0;
		var offsetN = 0;

		switch(schema) {
			case SCHEMA_V: 
			sizeArray = faces * 3 * 4;
			offsetV = 0;			
            offsetT = 0;
            offsetN = 0;
			break; 

			case SCHEMA_VT: 
			sizeArray = faces * 3 * (4 + 2);
			offsetV = 0;			
            offsetT = 4;
            offsetN = 0;
			break; 

			case SCHEMA_VN: 
			sizeArray = faces * 3 * (4 + 4);
			offsetV = 0;			
            offsetT = 0;
            offsetN = 4;
			break; 

			case SCHEMA_VTN: 
			sizeArray = faces * 3 * (4 + 2 + 4);
			offsetV = 0;			
            offsetT = 4;
            offsetN = 6;
			break; 

			default: 
			throw new Error("Schema broken."); 
		}

		var dataArray = new Float32Array(sizeArray); 
		var indiceArray = new Float32Array(indiceV); 

		for(var ii=0, di=0, L=faces * 3; ii < L; ii++) {
			//Push Vertice			
			dataArray[di++] = vertice[indiceV[ii]+0]; 
			dataArray[di++] = vertice[indiceV[ii]+1]; 
			dataArray[di++] = vertice[indiceV[ii]+2]; 
			dataArray[di++] = vertice[indiceV[ii]+3]; 

			if(schema | SCHEMA_VT) {		
				//push Texture
				dataArray[di++] = vertice[indiceT[ii]+0]; 
				dataArray[di++] = vertice[indiceT[ii]+1]; 
			}

			if(schema | SCHEMA_VN) {
				//Push Normals
				dataArray[di++] = vertice[indiceN[ii]+0]; 
				dataArray[di++] = vertice[indiceN[ii]+1]; 
				dataArray[di++] = vertice[indiceN[ii]+2]; 
				dataArray[di++] = vertice[indiceN[ii]+3]; 
			}
		}

		console.log("data", dataArray); 
		console.log("index", indiceArray); 
	}	

	GLT.obj = {};
	GLT.SCHEMA_V = SCHEMA_V; 
	GLT.SCHEMA_VN = SCHEMA_VN; 
	GLT.SCHEMA_VT = SCHEMA_VT; 
	GLT.SCHEMA_VTN = SCHEMA_VTN; 
	GLT.obj.parse = parse; 
}(GLT)); 
(function(GLT) { 
"use strict"; 

var MTEXT = 1; 
var MJSON = 2; 
var MSCRIPT = 3; 
var MXML = 4; 
var MIMAGE = 5; 
var MOBJ = 6; 
var MHTML = 7;

function mimeToType(mime) {
	mime = mime.toLowerCase(); 

	if(mime === "application/json") {
		return MJSON; 
	}

	if(mime === "text/html") {
		return MHTML; 
	}

	if(mime === "application/octet-stream") {
		return MOBJ; 
	}

	if(mime.indexOf("javascript") !== -1) {
		return MSCRIPT; 
	}

	if(mime.indexOf("xml") !== -1) {
		return MXML; 
	}
	if(mime.indexOf("image") !== -1) {
		return MIMAGE; 
	}

	return MTEXT; 
}

function simpleAjaxCall(file, success, error) {
	var mime = 0; 
	var abort = false; 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = onReadyState; 
	xhr.open('GET', file, true);  
	xhr.send(null);
	
	function onReadyState() {
		if(!abort && (xhr.readyState === 2 || xhr.readyState === 3)){
			mime = mimeToType(xhr.getResponseHeader("content-type"));
			if(file.toLowerCase().lastIndexOf(".obj") + 4 === file.length) {
				mime = MOBJ; 
			}			

			if(mime === MIMAGE) {
				//We load a Image: Use Image class
				abort = true; 
				xhr.abort(); 

				var image = new Image(); 
				image.onload = function() {
					success(file, image); 
				};
				image.onerror = function() {
					error(file, "");
				}
				image.src = file; 
				return; 
			}
		}

		if(!abort && xhr.readyState === 4) {
			var s = xhr.status; 
			if(s >= 200 && s <= 299 || s === 304 || s ===0) {
				if(mime === MXML) {
					success(file, xhr.responseXML);
				}
				else if(mime === MJSON) {
					try {
						success(file, JSON.parse(xhr.responseText));
					}	
					catch(e) {
						error(file, e); 
					}
				}
				else { 
					success(file, xhr.responseText);
				}
			}
			else {	
				error(file, s || 0); 
			}
		}
	}
}

function nop() {
	//Do Nothing 
} 

//options = {
// "files" = ["path1", "path2", ...]
// "update" = function (lastFileLoaded, percentage [0..1]
// "finished" = function ([{file:"file1",blob:"blob1"},{file:"file2",blob:"blob2"},...])
// "error" = function (file, error)
//}
function loadFiles(options) {
	if(!options) throw new Error("Passed nothing in loadFiles"); 

	var files    = options.files    || [];  
	var update   = options.update   || nop; 
	var finished = options.finished || nop; 
	var error    = options.error    || nop; 

	var total = files.length; 
	var filesInLoadingQueue = 0; 

	var result = Object.create(null);  

	var fileLoaded = function(file, blob) {
		filesInLoadingQueue++; 

		result[file] = blob; 

		update(file, filesInLoadingQueue/total); 

		if(filesInLoadingQueue === total) {
			finished(result); 
		}
	}; 

	var fileFailed = function(file, message) {
		fileLoaded = nop; 
		fileFailed = nop; 
		error(file, message); 
	}

	for(var i = 0, file; file = files[i++];) {
		(function(file) {
			simpleAjaxCall(file, fileLoaded, fileFailed); 
		}(file));
	}
}

GLT.loadmanager = {}; 
GLT.loadmanager.loadFiles = loadFiles; 
}(GLT)); 
(function (GLT) {
	"use strict"; 

	var gamepads = navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || [];
	var e = 0.2; 
	var edge0 = e; 
	var edge1 = 1 - e; 

	var NONE = {
		"axes" : new Float32Array(6), 
		"buttons" : new Float32Array(24), 
		"id" : "NONE", 
		"index" : -1 
	}; 

	var pad = NONE; 

	function update() {
		pad = updateFirstPad(); 		
	}

	function updateFirstPad() {
		for (var i = 0; i < gamepads.length; ++i) {
			var pad = gamepads[i];
			if(pad) {
				var axes = new Float32Array(pad.axes.length); 
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

	function getFirstPad() {
		return pad; 
	}

	function normalise(x) {
		if(x < 0) {
			return -normalise(-x); 
		}

		// like GLSL smoothstep(x, 0, 1); 
		var t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0))); 
		return t * t * (3.0 - 2.0 * t);
	}

	GLT.gamepads = {}; 
	GLT.gamepads.first = getFirstPad; 
	GLT.gamepads.update = update; 
}(GLT));  

(function(GLT) {
	"use strict"; 

	var SIZE = 256; 	

	var keysDown = new Uint8Array(SIZE); 
	var keysDownOld = new Uint8Array(SIZE); 

	function cleanKeys() {
		for(var i = 0; i !== SIZE; i++) {
			keysDownOld[i] = 0; 
			keysDown[i] = 0; 
		}
	}

	function update() {
		for(var i = 0; i !== SIZE; i++) {
			keysDownOld[i] = keysDown[i]; 
		}
	}

	function isDown(key) {
		return keysDown[key] !== 0; 
	}

	function isUp (key) {
		return keysDown[key] === 0; 
	}

	function wasPressed (key) {
		return keysDown[key] !== 0 && keysDownOld[key] === 0;
	}

	function wasReleased (key) {
		return keysDown[key] === 0 && keysDownOld[key] !== 0;
	}

	cleanKeys(); 

	document.addEventListener("keydown", function(e) {
		var k = e.keyCode; 
		if(k < SIZE) {
			keysDown[k] = 1; 
		}
	}, false); 

	document.addEventListener("keyup", function(e) {
		var k = e.keyCode; 
		if(k < SIZE) {
			keysDown[k] = 0; 
		}
	}, false); 

	window.addEventListener("blur", function() { 
		cleanKeys(); 	
	}, false);

	var codes = {
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

	GLT.keys = {}; 
	GLT.keys.update = update; 
	GLT.keys.isDown = isDown; 
	GLT.keys.isUp = isUp; 
	GLT.keys.wasPressed = wasPressed; 
	GLT.keys.wasReleased = wasReleased;  
}(GLT));
(function(GLT){
"use strict"; 

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

	var n = 0.577350269; //sqrt(3) / 3

	var norm = new Float32Array([
		-n, -n,  n, 0,
		 n, -n,  n, 0,
		 n,  n,  n, 0,
		-n,  n,  n, 0,
		-n, -n, -n, 0,
		 n, -n, -n, 0,
		 n,  n, -n, 0,
		-n,  n, -n, 0
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

	return { vertices : vert, indices : indx, normals : norm };
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

GLT.shapes = {}; 
GLT.shapes.createCube = createCube; 
GLT.shapes.createPlane = createPlane; 
}(GLT));
(function(GLT) {
"use strict"; 

var requestAnimationFrame = 
	window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};

var requestGameFrame = (function() {
	var starttime = -1; 
	var lasttime = 0;

	var time = {
		"delta" : 0, 
		"total" : 0
	};

	var loopObject = {
		"time" : time, 
		"frame" : 0, 
		"reset" : reset 
	};
	
	function reset() {
		starttime = -1;  
	}

	return function (callback) { 
		requestAnimationFrame(function () {
			var now = Date.now(); 
			if(starttime === -1) {
				lasttime = now;
				starttime = now; 
				loopObject.frame = 0; 
			}

			time.delta = (now - lasttime) / 1000.0; 
			time.total = (now - starttime) / 1000.0; 

			joyfuncs.update(); 

			callback(loopObject); 

			keyfuncs.setOldKeyState(); 
			lasttime = now; 
			loopObject.frame++;
		}); 
	};
}()); 

GLT.requestGameFrame = requestGameFrame; 
}(GLT)); 
