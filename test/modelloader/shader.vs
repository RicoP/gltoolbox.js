#ifdef GL_ES
precision highp float;
#endif

attribute vec4 vPosition;
attribute vec2 vTextureCoord;
attribute vec4 vNormal;

uniform mat4 vModelView;
uniform mat4 vProjection; 

varying vec2 texcoord;
varying vec4 normal; 

void main(void) {
	texcoord = vTextureCoord;  
	//normal = vNormal; 
	normal = vProjection * vModelView * vNormal;
	gl_Position = vProjection * vModelView * vPosition;
}
