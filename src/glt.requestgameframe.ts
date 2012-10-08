#ifndef GLT_REQUESTGAMEFRAME_TS 
#define GLT_REQUESTGAMEFRAME_TS 

module GLT {
	"use strict"; 
	
	var starttime, lasttime, time; 

	window.requestAnimationFrame =
		window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ) {
			window.setTimeout(callback, 16);
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

	export function requestGameFrame(callback) { 
		function innerCall() {
			try { 
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
			catch(e) {
				var m = e.message || e; 
				document.body.innerHTML = m+""; 
				alert(m); 
			}
		}

		window.requestAnimationFrame(innerCall); 
	} 
} 

#endif 
