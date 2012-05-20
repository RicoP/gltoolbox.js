attribute vec4 vPosition;
attribute vec2 vTextureCoord;
attribute vec4 vNormal;

uniform mat4 vModelView;
uniform mat4 vProjection; 

varying vec2 texcoord;

void main() {
	texcoord = vTextureCoord;  
	gl_Position = vProjection * vModelView * vPosition;
}
