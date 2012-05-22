#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureuv; 
varying vec4 vNormal; 

uniform sampler2D uTexture; 
 
void main(void) {
	vec3 n = normalize(vNormal.xyz);  

	gl_FragColor = vec4(n.x, n.y, n.z, 1.0); 
}

