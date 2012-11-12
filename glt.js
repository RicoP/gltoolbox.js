var GLT;
(function (GLT) {
    "use strict";
    var names = [
        "experimental-webgl", 
        "webgl", 
        "moz-webgl", 
        "webkit-3d"
    ];
    function createContext(canvas) {
        var name;
        var gl;
        for(var i = 0; name = names[i++]; ) {
            gl = canvas.getContext(name, {
                alpha: false,
                preserveDrawingBuffer: true
            });
            if(gl) {
                return gl;
            }
        }
        return null;
    }
    GLT.createContext = createContext;
})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    (function (keys) {
        "use strict";
        var SIZE = 256;
        var KeyArray = Uint8Array || Array;
        var keysDown = new KeyArray(SIZE);
        var keysDownOld = new KeyArray(SIZE);
        function cleanKeys() {
            for(var i = 0; i !== SIZE; i++) {
                keysDownOld[i] = 0;
                keysDown[i] = 0;
            }
        }
        cleanKeys();
        document.addEventListener("keydown", function (e) {
            var k = e.keyCode;
            if(k < SIZE) {
                keysDown[k] = 1;
            }
        }, false);
        document.addEventListener("keyup", function (e) {
            var k = e.keyCode;
            if(k < SIZE) {
                keysDown[k] = 0;
            }
        }, false);
        window.addEventListener("blur", function () {
            cleanKeys();
        }, false);
        keys.codes = {
            "backspace": 8,
            "tab": 9,
            "enter": 13,
            "shift": 16,
            "ctrl": 17,
            "alt": 18,
            "pause": 19,
            "capslock": 20,
            "escape": 27,
            "space": 32,
            "pageUp": 33,
            "pageDown": 34,
            "end": 35,
            "home": 36,
            "left": 37,
            "up": 38,
            "right": 39,
            "down": 40,
            "insert": 45,
            "delete": 46,
            "num0": 48,
            "num1": 49,
            "num2": 50,
            "num3": 51,
            "num4": 52,
            "num5": 53,
            "num6": 54,
            "num7": 55,
            "num8": 56,
            "num9": 57,
            "a": 65,
            "b": 66,
            "c": 67,
            "d": 68,
            "e": 69,
            "f": 70,
            "g": 71,
            "h": 72,
            "i": 73,
            "j": 74,
            "k": 75,
            "l": 76,
            "m": 77,
            "n": 78,
            "o": 79,
            "p": 80,
            "q": 81,
            "r": 82,
            "s": 83,
            "t": 84,
            "u": 85,
            "v": 86,
            "w": 87,
            "x": 88,
            "y": 89,
            "z": 90,
            "windowKeyLeft": 91,
            "windowKeyRight": 92,
            "select": 93,
            "numpad0": 96,
            "numpad1": 97,
            "numpad2": 98,
            "numpad3": 99,
            "numpad4": 100,
            "numpad5": 101,
            "numpad6": 102,
            "numpad7": 103,
            "numpad8": 104,
            "numpad9": 105,
            "multiply": 106,
            "add": 107,
            "subtract": 109,
            "decimalPoint": 110,
            "divide": 111,
            "f1": 112,
            "f2": 113,
            "f3": 114,
            "f4": 115,
            "f5": 116,
            "f6": 117,
            "f7": 118,
            "f8": 119,
            "f9": 120,
            "f10": 121,
            "f11": 122,
            "f12": 123,
            "numlock": 144,
            "scrolllock": 145,
            "semicolon": 186,
            "equals": 187,
            "comma": 188,
            "dash": 189,
            "period": 190,
            "slash": 191,
            "graveAccent": 192,
            "openBracket": 219,
            "backSlash": 220,
            "closeBraket": 221,
            "quote": 222
        };
        function update() {
            for(var i = 0; i !== SIZE; i++) {
                keysDownOld[i] = keysDown[i];
            }
        }
        keys.update = update;
        function isDown(key) {
            return keysDown[key] !== 0;
        }
        keys.isDown = isDown;
        function isUp(key) {
            return keysDown[key] === 0;
        }
        keys.isUp = isUp;
        function wasPressed(key) {
            return keysDown[key] !== 0 && keysDownOld[key] === 0;
        }
        keys.wasPressed = wasPressed;
        function wasReleased(key) {
            return keysDown[key] === 0 && keysDownOld[key] !== 0;
        }
        keys.wasReleased = wasReleased;
    })(GLT.keys || (GLT.keys = {}));
    var keys = GLT.keys;

})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    "use strict";
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 16);
    };
    var perfnow = ((function () {
        return ((performance && performance.now) ? function () {
            return performance.now();
        } : (performance && performance.webkitNow) ? function () {
            return performance.webkitNow();
        } : (performance && performance.mozNow) ? function () {
            return performance.mozNow();
        } : (performance && performance.oNow) ? function () {
            return performance.oNow();
        } : (Date.now) ? function () {
            return Date.now();
        } : function () {
            return +new Date();
        });
    })());
    var GameTime = (function () {
        function GameTime() {
            this.total = 0;
            this.delta = 0;
            this.frame = 0;
            this.last = 0;
            this.last = perfnow() * 0.001;
        }
        GameTime.prototype.reset = function () {
            this.total = 0;
            this.delta = 0;
            this.frame = 0;
            this.last = perfnow() * 0.001;
        };
        return GameTime;
    })();
    GLT.GameTime = GameTime;    
    var Gameloop = (function () {
        function Gameloop(gl, callback) {
            this.gl = gl;
            this.callback = callback;
            this.rafid = -1;
            this.gametime = new GameTime();
        }
        Gameloop.prototype.innerCallback = function () {
            var now = perfnow() * 0.001;
            this.gametime.delta = now - this.gametime.last;
            this.gametime.total += this.gametime.delta;
            this.gametime.last = now;
            this.gametime.frame++;
            window.requestAnimationFrame(this.innerCallback, this.canvas);
            this.callback(this.gl, this.gametime);
            GLT.keys.update();
        };
        Gameloop.prototype.start = function () {
            if(this.rafid !== -1) {
                this.rafid = window.requestAnimationFrame(this.innerCallback, this.canvas);
            }
        };
        return Gameloop;
    })();
    GLT.Gameloop = Gameloop;    
})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    (function (obj) {
        "use strict";
        var SIZEOFFLOAT = 4;
        var rgxWhitespace = /[\t\r\n ]+/g;
        obj.SCHEMA_V = 0;
        obj.SCHEMA_VN = 1;
        obj.SCHEMA_VT = 2;
        obj.SCHEMA_VTN = obj.SCHEMA_VN | obj.SCHEMA_VT;
        function parse(text) {
            var lines = text.split("\n");
            var line = "";
            var linenum = 0;
            var vertice = [];
            var normals = [];
            var textureuv = [];
            var indiceV = [];
            var indiceN = [];
            var indiceT = [];
            var triangles = 0;
            var funcs = {
                "v": function (s) {
                    if(!s || s.length !== 3) {
                        throw new Error("Can't accept Vertic without 3 components. LINE:" + line);
                    }
                    var x = Number(s[0]);
                    var y = Number(s[1]);
                    var z = Number(s[2]);
                    vertice.push(x, y, z);
                },
                "vn": function (s) {
                    if(!s || s.length !== 3) {
                        throw new Error("Can't accept Normal without 3 components. LINE:" + linenum);
                    }
                    var x = Number(s[0]);
                    var y = Number(s[1]);
                    var z = Number(s[2]);
                    normals.push(x, y, z);
                },
                "vt": function (s) {
                    if(!s || s.length < 2) {
                        throw new Error("Can't accept Texture with less than 2 components. LINE:" + linenum);
                    }
                    var u = Number(s[0]);
                    var v = Number(s[1]);
                    textureuv.push(u, v);
                },
                "f": function pushFace(s) {
                    if(!s || s.length < 3) {
                        throw new Error("Can't accept Face with less than 3 components. LINE:" + linenum);
                    }
                    if(s.length > 3) {
                        for(var n = s.length - 1; n !== 1; n--) {
                            pushFace([
                                s[0], 
                                s[n - 1], 
                                s[n]
                            ]);
                        }
                        return;
                    }
                    triangles++;
                    for(var i = 0; i !== 3; i++) {
                        var vtn = s[i].split("/");
                        var v = parseInt(vtn[0], 10) - 1;
                        var t = parseInt(vtn[1], 10) - 1;
                        var n = parseInt(vtn[2], 10) - 1;
                        indiceV.push(v);
                        if(!isNaN(t)) {
                            indiceT.push(t);
                        }
                        if(!isNaN(n)) {
                            indiceN.push(n);
                        }
                    }
                }
            };
            for(linenum = 0; linenum !== lines.length; ) {
                line = lines[linenum++].trim();
                var elements = line.split(rgxWhitespace);
                var head = elements.shift();
                if(head in funcs) {
                    funcs[head](elements);
                }
            }
            var schema = obj.SCHEMA_V;
            if(textureuv.length !== 0 || indiceT.length !== 0) {
                schema |= obj.SCHEMA_VT;
                if(indiceV.length !== indiceT.length) {
                    throw new Error("Texture indice don't match Vertic indice.");
                }
            }
            if(normals.length !== 0 || indiceN.length !== 0) {
                schema |= obj.SCHEMA_VN;
                if(indiceV.length !== indiceN.length) {
                    throw new Error("Normal indice don't match Vertic indice.");
                }
            }
            var sizeArray = 0;
            var voffset = 0;
            var toffset = 0;
            var noffset = 0;
            var stride = 0;
            var packSize = 0;
            switch(schema) {
                case obj.SCHEMA_V: {
                    stride = 4;
                    break;

                }
                case obj.SCHEMA_VT: {
                    stride = 4 + 2;
                    toffset = 4 * SIZEOFFLOAT;
                    break;

                }
                case obj.SCHEMA_VN: {
                    stride = 4 + 4;
                    noffset = 4 * SIZEOFFLOAT;
                    break;

                }
                case obj.SCHEMA_VTN: {
                    stride = 4 + 2 + 4;
                    toffset = 4 * SIZEOFFLOAT;
                    noffset = 6 * SIZEOFFLOAT;
                    break;

                }
                default: {
                    throw new Error("Schema broken.");

                }
            }
            sizeArray = triangles * 3 * stride;
            var rawData = new Float32Array(sizeArray);
            var p = 0;
            var vi = 0;
            var ti = 0;
            var ni = 0;
            for(var i = 0; i !== indiceV.length; i++) {
                vi = 3 * indiceV[i];
                rawData[p++] = vertice[vi++];
                rawData[p++] = vertice[vi++];
                rawData[p++] = vertice[vi];
                rawData[p++] = 1;
                if(schema & obj.SCHEMA_VT) {
                    ti = 2 * indiceT[i];
                    rawData[p++] = textureuv[ti++];
                    rawData[p++] = textureuv[ti];
                }
                if(schema & obj.SCHEMA_VN) {
                    ni = 3 * indiceN[i];
                    rawData[p++] = normals[ni++];
                    rawData[p++] = normals[ni++];
                    rawData[p++] = normals[ni];
                    rawData[p++] = 0;
                }
            }
            return {
                "stride": stride * SIZEOFFLOAT,
                "schema": schema,
                "voffset": voffset,
                "toffset": toffset,
                "noffset": noffset,
                "rawData": rawData,
                "numVertices": triangles * 3
            };
        }
        obj.parse = parse;
    })(GLT.obj || (GLT.obj = {}));
    var obj = GLT.obj;

})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    (function (loadmanager) {
        "use strict";
        var MIME_TEXT = 1;
        var MIME_JSON = 2;
        var MIME_SCRIPT = 3;
        var MIME_XML = 4;
        var MIME_IMAGE = 5;
        var MIME_OBJ = 6;
        var MIME_HTML = 7;
        function mimeToType(mime) {
            mime = mime.toLowerCase();
            if(mime === "application/json") {
                return MIME_JSON;
            }
            if(mime === "text/html") {
                return MIME_HTML;
            }
            if(mime.indexOf("javascript") !== -1) {
                return MIME_SCRIPT;
            }
            if(mime.indexOf("xml") !== -1) {
                return MIME_XML;
            }
            if(mime.indexOf("image") !== -1) {
                return MIME_IMAGE;
            }
            return MIME_TEXT;
        }
        function simpleAjaxCall(key, file, success, error) {
            function onReadyState() {
                if(abort) {
                    return;
                }
                if(xhr.readyState === 2 || xhr.readyState === 3) {
                    mime = mimeToType(xhr.getResponseHeader("content-type"));
                    if(file.toLowerCase().lastIndexOf(".json") + 5 === file.length) {
                        mime = MIME_JSON;
                    } else {
                        if(file.toLowerCase().lastIndexOf(".obj") + 4 === file.length) {
                            mime = MIME_OBJ;
                        }
                    }
                    if(mime === MIME_IMAGE) {
                        abort = true;
                        xhr.abort();
                        var image = new Image();
                        image.onload = function () {
                            success(key, image);
                        };
                        image.onerror = function () {
                            error(file, "Loading image failed.");
                        };
                        image.src = file;
                        return;
                    }
                }
                if(xhr.readyState === 4) {
                    var s = xhr.status;
                    if(s >= 200 && s <= 299 || s === 304 || s === 0) {
                        if(mime === MIME_XML) {
                            success(key, xhr.responseXML);
                        } else {
                            if(mime === MIME_JSON) {
                                try  {
                                    success(key, JSON.parse(xhr.responseText));
                                } catch (e) {
                                    error(file, e);
                                }
                            } else {
                                if(mime === MIME_OBJ) {
                                    try  {
                                        success(key, GLT.obj.parse(xhr.responseText));
                                    } catch (e) {
                                        error(file, e);
                                    }
                                } else {
                                    success(key, xhr.responseText);
                                }
                            }
                        }
                    } else {
                        error(file, s || 0);
                    }
                }
            }
            var mime = 0;
            var abort = false;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = onReadyState;
            xhr.open('GET', file, true);
            xhr.send(null);
        }
        function nop() {
        }
        function loadFiles(options) {
            if(!options) {
                throw new Error("Passed nothing in loadFiles");
            }
            var files = options.files || {
            };
            var update = options.update || nop;
            var finished = options.finished || nop;
            var error = options.error || nop;
            var total = 0;
            var filesInLoadingQueue = 0;
            var result = Object.create(null);
            var fileLoaded = function (key, blob) {
                filesInLoadingQueue++;
                result[key] = blob;
                update(key, filesInLoadingQueue / total);
                if(filesInLoadingQueue === total) {
                    finished(result);
                }
            };
            var fileFailed = function (file, message) {
                fileLoaded = nop;
                fileFailed = nop;
                error(file, message);
            };
            if(files instanceof Array) {
                total = files.length;
                for(var i = 0, file; file = files[i++]; ) {
                    simpleAjaxCall(file, file, fileLoaded, fileFailed);
                }
            } else {
                var keys = Object.keys(files);
                total = keys.length;
                for(var i = 0, key; key = keys[i++]; ) {
                    if(files.hasOwnProperty(key)) {
                        simpleAjaxCall(key, files[key], fileLoaded, fileFailed);
                    }
                }
            }
        }
        loadmanager.loadFiles = loadFiles;
    })(GLT.loadmanager || (GLT.loadmanager = {}));
    var loadmanager = GLT.loadmanager;

})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    var MAX_STACK = 1024;
    var MATRIX_SIZE = 16;
    var identity = new Float32Array([
        1, 
        0, 
        0, 
        0, 
        0, 
        1, 
        0, 
        0, 
        0, 
        0, 
        1, 
        0, 
        0, 
        0, 
        0, 
        1
    ]);
    var zero = new Float32Array([
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0
    ]);
    var MatrixStack = (function () {
        function MatrixStack(size) {
            if (typeof size === "undefined") { size = MAX_STACK; }
            this.buffer = new Float32Array(MATRIX_SIZE * size);
            this.stack = [];
            this.pointer = 0;
            this.size = size;
            var j = 0;
            for(var i = 0; i < this.buffer.length; i += MATRIX_SIZE) {
                this.stack[j++] = this.buffer.subarray(i, i + MATRIX_SIZE);
            }
        }
        MatrixStack.prototype.push = function (copymat) {
            if(this.pointer === this.size - 1) {
                throw new Error("Overflow");
            }
            var p = this.pointer++;
            var mat = this.stack[p];
            if(typeof copymat !== "undefined") {
                mat[0] = copymat[0];
                mat[1] = copymat[1];
                mat[2] = copymat[2];
                mat[3] = copymat[3];
                mat[4] = copymat[4];
                mat[5] = copymat[5];
                mat[6] = copymat[6];
                mat[7] = copymat[7];
                mat[8] = copymat[8];
                mat[9] = copymat[9];
                mat[10] = copymat[10];
                mat[11] = copymat[11];
                mat[12] = copymat[12];
                mat[13] = copymat[13];
                mat[14] = copymat[14];
                mat[15] = copymat[15];
            }
            return mat;
        };
        MatrixStack.prototype.pop = function () {
            if(this.pointer === 0) {
                throw new Error("Underflow");
            }
            this.pointer--;
        };
        MatrixStack.prototype.pushIdentity = function () {
            return this.push(identity);
        };
        MatrixStack.prototype.pushZero = function () {
            return this.push(zero);
        };
        return MatrixStack;
    })();
    GLT.MatrixStack = MatrixStack;    
})(GLT || (GLT = {}));

var GLT;
(function (GLT) {
    (function (shader) {
        "use strict";
        function compileProgram(gl, programsource) {
            var defines = [
                "#define VERTEX\n", 
                "#define FRAGMENT\n"
            ];
            var line0 = "#line 0\n";
            var shader = [
                gl.createShader(gl.VERTEX_SHADER), 
                gl.createShader(gl.FRAGMENT_SHADER)
            ];
            var program = gl.createProgram();
            var s = null;
            var info = "";
            for(var i = 0; i != defines.length; i++) {
                s = shader[i];
                gl.shaderSource(s, defines[i] + line0 + programsource);
                gl.compileShader(s);
                if(info = gl.getShaderInfoLog(s)) {
                    throw new Error(info);
                }
                gl.attachShader(program, s);
            }
            gl.linkProgram(program);
            if(info = gl.getProgramInfoLog(program)) {
                console.error(info);
            }
            return program;
        }
        shader.compileProgram = compileProgram;
    })(GLT.shader || (GLT.shader = {}));
    var shader = GLT.shader;

})(GLT || (GLT = {}));

; ;
