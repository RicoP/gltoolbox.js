precision mediump float;
varying vec2 texcoord;
varying vec4 normal; 

uniform sampler2D texture; 
 
void main() {
	//vec4 color = texture2D(texture, texcoord); 
 
	gl_FragColor = normalize(normal);  
}
