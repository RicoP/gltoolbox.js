#ifdef GL_ES
precision highp float;
#endif

varying vec2 texcoord;
varying vec4 normal; 

uniform sampler2D texture; 
 
void main(void) {
	//vec4 color = texture2D(texture, texcoord); 
 
	vec4 n = normalize(normal);  

	gl_FragColor = vec4(sin(n.x), cos(n.x), sin(n.z),  1.0); 
}

