(function(GLT) {
"use strict"; 

var names = ["experimental-webgl", "webgl", "moz-webgl", "webkit-3d"];
function createContext(width, height, node) { 	
		var canvas;
		node = node || document.body;  
		canvas = document.createElement("canvas"); 
		canvas.width = width || 640; 
		canvas.height = height || 480; 
		node.appendChild(canvas); 

		var i; 
		var name; 	
		var gl; 
		for(i = 0; name = names[i++];) {
			gl = canvas.getContext(name, {alpha : false, preserveDrawingBuffer : true}); 
			if(gl) {
				break; 
			}
		}

		return gl; 
}

function createSafeContext(width, height, node) {
	var gl = createContext(width, height, node); 
	return WebGLDebugUtils.makeDebugContext(gl).getSafeContext(); 
}

GLT.createContext = createContext; 
}(GLT));
