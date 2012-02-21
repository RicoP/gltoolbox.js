var gl; 

(function() { 
"use strict"; 
//= gl-matrix.js 
//= util.js
//= ground.js  
//= cube.js 

// MAIN 
var projection = mat4.perspective(75, 4/3, 0.1, 10); 
var isRunning = true; 

function main() {
    gl = UTIL.createContext(640, 480); 
	var lastTime = Date.now(); 

    var cube = SHAPES.createCube(gl, projection); 
    var ground = SHAPES.createGround(gl, projection); 

    UTIL.requestAnimationFrame(function loop() {
		var currentTime = Date.now(); 
		var delta = currentTime - lastTime; 
        if(isRunning) { 			
			clear(gl); 
			cube.draw(); 
			cube.update(delta); 
            ground.draw();
            ground.update(delta); 
        }

		lastTime = currentTime; 

        UTIL.requestAnimationFrame(loop); 
    });
}

function clear(gl) {
    gl.viewport(0, 0, 640, 480); 
    gl.clearColor(97 / 256, 149 / 256, 237 / 256, 1); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
	gl.enable(gl.DEPTH_TEST); 
}

main(); 
}()); 
