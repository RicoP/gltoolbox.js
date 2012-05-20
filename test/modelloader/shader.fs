#ifdef GL_ES
precision highp float;
#endif

varying vec2 texcoord;
varying vec4 normal; 

uniform sampler2D texture; 
 
void main(void) {
	//vec4 color = texture2D(texture, texcoord); 
 
	gl_FragColor = normalize(normal);  
}

