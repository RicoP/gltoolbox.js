#ifdef GL_ES
precision highp float;
#endif

attribute vec4 aVertex;   
attribute vec2 aTextureuv;   
attribute vec4 aNormal;

uniform mat4 uModelview;
uniform mat4 uProjection; 

varying vec2 vTextureuv; 
varying vec4 vNormal; 

void main(void) {
	vTextureuv = aTextureuv; 
	vNormal = uProjection * uModelview * aNormal;
	gl_Position = uProjection * uModelview * aVertex; 
}
