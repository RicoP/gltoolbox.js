#ifndef GLT_REQUESTGAMEFRAME_JS
#define GLT_REQUESTGAMEFRAME_JS

#include "glt.js" 
#include "glt.keys.js"

(function(GLT) {
"use strict"; 
var win, raf, starttime, lasttime, time; 

win = window; 
raf = 
	win.requestAnimationFrame       || 
	win.webkitRequestAnimationFrame || 
	win.mozRequestAnimationFrame    || 
	win.oRequestAnimationFrame      || 
	win.msRequestAnimationFrame     || 
	function( callback ) {
		win.setTimeout(callback, 16);
	};


function reset() {
	starttime = -1;  
	time.total = 0; 
	time.frame = 0; 
}

starttime = -1; 
lasttime = 0;

time = {
	"total" : 0, 
	"delta" : 0, 
	"frame" : 0, 
	"reset" : reset 
};

function requestGameFrame(callback) { 
	function innerCall() {
		var now = Date.now(); 
		if(starttime === -1) {
			lasttime = now;
			starttime = now; 
			time.frame = 0; 
		}

		var delta = (now - lasttime) / 1000.0; 
		time.delta = delta; 
		time.total += delta; 
		callback(time); 
		time.frame++;
		lasttime = now; 

		GLT.keys.update(); 
	}

	raf(innerCall); 
} 

GLT.requestGameFrame = requestGameFrame; 
}(GLT)); 

#endif 
