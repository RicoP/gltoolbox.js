#ifndef GLT_SHADER_TS 
#define GLT_SHADER_TS 

/// <reference path="webgl.d.ts" />

module GLT.shader {
	"use strict"; 

	export function compileProgram(gl : WebGLRenderingContext, programsource : string) {
		var defines = ["#define VERTEX\n", "#define FRAGMENT\n"]; 
		var line0 = "#line 0\n"; 
		var shader = [gl.createShader(gl.VERTEX_SHADER), gl.createShader(gl.FRAGMENT_SHADER)]; 
		var program = gl.createProgram(); 
		var s : WebGLShader = null; 
		var info = ""; 

		for(var i = 0; i != defines.length; i++) {
			s = shader[i]; 
			gl.shaderSource(s, defines[i] + line0 + programsource); 
			gl.compileShader(s); 		
			
			if( info = gl.getShaderInfoLog(s) ) {
				throw new Error(info); 
			}

			gl.attachShader(program, s); 
		}

		gl.linkProgram(program); 
		if( info = gl.getProgramInfoLog(program) ) {
			console.error(info);
		} 
		
		return program; 
	}
}; 

#endif 
