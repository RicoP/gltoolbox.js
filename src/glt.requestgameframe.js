#ifndef GLT_REQUESTGAMEFRAME_JS
#define GLT_REQUESTGAMEFRAME_JS

#include "glt.js" 

(function(GLT) {
"use strict"; 

var useKeys = !!GLT.keys; 

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

			//joyfuncs.update(); 

			callback(loopObject); 

			if(useKeys) {
				GLT.keys.update(); 
			}
			lasttime = now; 
			loopObject.frame++;
		}); 
	};
}()); 

GLT.requestGameFrame = requestGameFrame; 
}(GLT)); 

#endif 
