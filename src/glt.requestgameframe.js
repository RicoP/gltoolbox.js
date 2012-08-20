#ifndef GLT_REQUESTGAMEFRAME_JS
#define GLT_REQUESTGAMEFRAME_JS

#include "glt.js" 
#include "glt.keys.js"

(function(GLT) {
"use strict"; 

function reset() {
	starttime = -1;  
}

var requestAnimationFrame = 
	window.requestAnimationFrame       || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};

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

function requestGameFrame(callback) { 
	function innerCall() {
		var now = Date.now(); 
		if(starttime === -1) {
			lasttime = now;
			starttime = now; 
			loopObject.frame = 0; 
		}

		time.delta = (now - lasttime) / 1000.0; 
		time.total = (now - starttime) / 1000.0; 

		callback(loopObject); 

		GLT.keys.update(); 

		lasttime = now; 
		loopObject.frame++;
	}

	requestAnimationFrame(innerCall); 
} 

GLT.requestGameFrame = requestGameFrame; 
}(GLT)); 

#endif 
