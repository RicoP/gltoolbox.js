#ifndef GLT_CREATECONTEXT_JS
#define GLT_CREATECONTEXT_JS

#include "glt.js"

(function(GLT) {
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

function createSafeContext(canvas) {
	var gl = createContext(canvas); 
	return WebGLDebugUtils.makeDebugContext(gl).getSafeContext(); 
}

GLT.createContext = createContext; 
GLT.createSafeContext = createSafeContext; 
}(GLT));

#endif 
