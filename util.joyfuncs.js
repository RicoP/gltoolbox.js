var joyfuncs = (function () {
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

	function getPirstPad() {
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

	return {
		"update" : update, 
		"getFirstPad" : getFirstPad  
	};
}());  

