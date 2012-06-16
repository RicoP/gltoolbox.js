//= glt.context.hjs

(function() {
"use strict"; 

var names = ["experimental-webgl", "webgl", "moz-webgl", "webkit-3d"];

function createContext(canvas) { 	
		var i; 
		var name; 	
		var gl; 
		for(i = 0; name = names[i++];) {
			gl = canvas.getContext(name, {alpha : false, preserveDrawingBuffer : true}); 
			if(gl) {
				return gl;  
			}
		}

		return null; 
}

GLT.CONTEXT.create = createContext; 
}());
