precision mediump float;
varying vec2 texcoord;

uniform sampler2D texture; 
 
void main() {
	vec4 color = texture2D(texture, texcoord); 
 
	gl_FragColor = color;  
}
