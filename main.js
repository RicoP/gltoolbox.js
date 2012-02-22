var gl; 

(function() { 
"use strict"; 
//= gl-matrix.js 
//= util.js
//= shapes.js  

// MAIN 
var projection = mat4.perspective(75, 4/3, 0.1, 10); 
var isRunning = true; 

function main() {
    gl = UTIL.createContext(640, 480); 
	var lastTime = Date.now(); 

	var camPos = vec3.create([0,1,2]);
	var camNormal = vec3.create([0,0,-1]); 
	var camDir = vec3.create([0,0,0]); 
	var camUp = vec3.create([0,1,0]); 

    var cube = SHAPES.createCube(gl, projection); 
    var ground = SHAPES.createGround(gl, projection); 

    UTIL.requestAnimationFrame(function loop() {
		var currentTime = Date.now(); 
		var delta = currentTime - lastTime; 

		var camera = calcCamera(delta, camPos, camNormal, camDir, camUp); 

        if(isRunning) { 			
			clear(gl); 
			cube.draw(camera); 
            ground.draw(camera);
			cube.update(delta); 
            ground.update(delta); 
        }

		lastTime = currentTime; 

        UTIL.requestAnimationFrame(loop); 
    });
}

function calcCamera(delta, camPos, camNormal, camDir, camUp) {
	var camera = mat4.lookAt(camPos, vec3.add(camPos, camNormal, camDir), camUp);
	var pad = UTIL.getFirstPad();  

	var padX1 = pad.axes[0] * delta / 1000; 
	var padY1 = pad.axes[1] * delta / 1000; 

	vec3.add(camPos, [-padY1 * camNormal[0], 0, -padY1 * camNormal[2]]); 

	var padX2 = pad.axes[2] * delta * 2 * Math.PI / 1000; 
	var padY2 = pad.axes[3] * delta * 2 * Math.PI / 1000; 

	var matRot = mat4.identity(); 
	mat4.rotateY(matRot, -padX2); 
	mat4.rotateX(matRot, -padY2); 
	mat4.multiplyVec3(matRot, camNormal); 

	return camera; 
}

function clear(gl) {
    gl.viewport(0, 0, 640, 480); 
    gl.clearColor(97 / 256, 149 / 256, 237 / 256, 1); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
	gl.enable(gl.DEPTH_TEST); 
}

window.onload = main; 
}()); 
