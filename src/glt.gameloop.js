#ifndef GLT_GAMELOOP_JS
#define GLT_GAMELOOP_JS 

#include "glt.js" 
#include "glt.keys.js"

#define FPS_UPDATE 0.5

(function(GLT) {
"use strict"; 

window.requestAnimationFrame =
	window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function( callback ) {
		window.setTimeout(callback, 16);
	};

function Gameloop(callback) {
	function reset() {
		starttime = -1;  
		time.total = 0; 
		time.frame = 0; 
	}

	var lasttime = 0;
	var framesSinceLastUpdate = 0; 
	var timeSinceLastUpdate = 0; 

	var time = {
		"total" : 0, 
		"delta" : 0, 
		"frame" : 0, 
		"fps"   : 0,
		"reset" : reset 
	};

	var gltkeys = GLT.keys; 

	function innerCall() {		
		var now = Date.now(); 
		if(lasttime === 0) {
			lasttime = now;
			time.frame = 0; 
		}

		var delta = (now - lasttime) / 1000.0; 
		time.delta = delta; 
		time.total += delta; 
		callback(time); 


		framesSinceLastUpdate++; 
		timeSinceLastUpdate += delta; 
		if(timeSinceLastUpdate >= FPS_UPDATE) {
			time.fps = framesSinceLastUpdate * (1/FPS_UPDATE);
			timeSinceLastUpdate -= FPS_UPDATE; 
			frameSinceLastUpdate = 0; 
		}

		time.frame++;
		lasttime = now; 

		gltkeys.update(); 
		window.requestAnimationFrame(innerCall); 
	}

	this.start = function() {
		window.requestAnimationFrame(innerCall); 
	};
}

GLT.Gameloop = Gameloop;
}(GLT)); 

#undef FPS_UPDATE 
#endif 
