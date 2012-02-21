(function() { 
"use strict"; 

//= gl-matrix.js 
//= util.js
//= ground.js  
//= cube.js 

var projection = mat4.perspective(75, 4/3, 0.1, 10); 
var isRunning = true; 

function main() {
    var gl = UTIL.createContext(640, 480); 
	var lastTime = Date.now(); 

    var ground = SHAPES.createGround(gl, projection); 
    //var cube = SHAPES.createCube(gl, projection); 

    UTIL.requestAnimationFrame(function loop() {
		var currentTime = Date.now(); 
		var delta = currentTime - lastTime; 
        if(isRunning) { 			
			clear(gl); 
            ground.draw();
            ground.update(delta); 
			//cube.draw(); 
			//cube.update(delta); 
        }

		lastTime = currentTime; 

        UTIL.requestAnimationFrame(loop); 
    });
}

function clear(gl) {
    gl.viewport(0, 0, 640, 480); 
    gl.clearColor(97 / 256, 149 / 256, 237 / 256, 1); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
}

main(); 
}()); 
