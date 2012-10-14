#ifndef GLT_OBJ_TS
#define GLT_OBJ_TS 

module GLT.obj { 
	"use strict"; 

	var SIZEOFFLOAT = 4; 

	var rgxWhitespace = /[\t\r\n ]+/g; 

	export interface Mesh {
		stride : number; 
		schema : number; 
		voffset : number;  
		toffset : number;  
		noffset : number;  
		numVertices : number;
		rawData : Float32Array; 
	}

	export var SCHEMA_V   = 0;  
	export var SCHEMA_VN  = 1; 
	export var SCHEMA_VT  = 2; 
	export var SCHEMA_VTN = SCHEMA_VN | SCHEMA_VT; 

	export function parse(text : string) : Mesh {
		var lines = text.split("\n"); 
		var line = ""; 
		var linenum = 0; 
		
		var vertice   : number[] = []; //[x1,y1,z1,x2,y2,z2,...]
		var normals   : number[] = []; //[x1,y1,z1,x2,y2,z2,...]
		var textureuv : number[] = []; //[u1,v1,u2,v2,...] 	
		var indiceV   : number[] = []; 
		var indiceN   : number[] = []; 
		var indiceT   : number[] = []; 
		var triangles = 0; 
		
		var funcs = {
			"v" : function(s) {
				if(!s || s.length !== 3) {
					throw new Error("Can't accept Vertic without 3 components. LINE:" + line); 
				}

				var x = Number(s[0]);  
				var y = Number(s[1]);  
				var z = Number(s[2]);  

				vertice.push(x,y,z); 
			},
			"vn" : function(s) {
				if(!s || s.length !== 3) {
					throw new Error("Can't accept Normal without 3 components. LINE:" + linenum); 
				}
	
				var x = Number(s[0]);  
				var y = Number(s[1]);  
				var z = Number(s[2]);  	

				normals.push(x,y,z); 
			},
			"vt" : function(s) {
				if(!s || s.length < 2) {
					throw new Error("Can't accept Texture with less than 2 components. LINE:" + linenum); 
				}
		
				var u = Number(s[0]); 
				var v = Number(s[1]); 

				textureuv.push(u,v); 
			},
			"f" : function pushFace(s) {
				if(!s || s.length < 3) {
					throw new Error("Can't accept Face with less than 3 components. LINE:" + linenum); 
				}	

				if(s.length > 3) {
					//let's asume it's convex 
					for(var n = s.length - 1; n !== 1; n--) {
						pushFace([s[0], s[n-1], s[n]]); 
					}							
					return; 
				}

				triangles++; 				

				//Push indice
				for(var i=0; i !== 3; i++) {
					var vtn = s[i].split("/"); 
					//Keep in mind that parseInt(undefined, 10) yields NaN and NaN - 1 = NaN. 
					var v = parseInt(vtn[0], 10) - 1; 
					var t = parseInt(vtn[1], 10) - 1;
					var n = parseInt(vtn[2], 10) - 1;
	
					//console.log(v,t,n); 					
					indiceV.push(v); 
					if(!isNaN(t)) indiceT.push(t);
					if(!isNaN(n)) indiceN.push(n);
				}
			}

		};

		for(linenum = 0; linenum !== lines.length;) {			
			line = lines[linenum++].trim();
			var elements = line.split(rgxWhitespace);
			var head = elements.shift(); 
			if(head in funcs) {
				funcs[head](elements); 
			}
		}	

		var schema = SCHEMA_V; 

		//Test Integrety
		if(textureuv.length !== 0 || indiceT.length !== 0) {
			schema |= SCHEMA_VT; 
			if(indiceV.length !== indiceT.length) {
				throw new Error("Texture indice don't match Vertic indice."); 
			}
		}

		if(normals.length !== 0 || indiceN.length !== 0) {
			schema |= SCHEMA_VN; 
			if(indiceV.length !== indiceN.length) {
				throw new Error("Normal indice don't match Vertic indice."); 
			}
		}

		var sizeArray = 0; 
		var voffset = 0;
		var toffset = 0;
		var noffset = 0;
		var stride = 0; 
		var packSize = 0; 

		switch(schema) {
			case SCHEMA_V: 
			stride  = 4; 
			break; 

			case SCHEMA_VT: 
			stride  = 4+2; 
            toffset = 4*SIZEOFFLOAT;
			break; 

			case SCHEMA_VN: 
			stride  = 4+4; 
            noffset = 4*SIZEOFFLOAT;
			break; 

			case SCHEMA_VTN: 
			stride  = 4+2+4; 
            toffset = 4*SIZEOFFLOAT;
            noffset = 6*SIZEOFFLOAT;
			break; 

			default: 
			throw new Error("Schema broken."); 
		}

		sizeArray = triangles * 3 * stride;

		var rawData = new Float32Array(sizeArray); 
		var p = 0; 
		var vi = 0; 
		var ti = 0; 
		var ni = 0; 	

		for(var i = 0; i !== indiceV.length; i++) {
			vi = 3*indiceV[i];
			rawData[p++] = vertice[ vi++ ]; 
			rawData[p++] = vertice[ vi++ ]; 
			rawData[p++] = vertice[ vi ]; 
			rawData[p++] = 1.0; 
			
			if(schema & SCHEMA_VT) {
				ti = 2*indiceT[i]; 
				rawData[p++] = textureuv[ ti++ ];
				rawData[p++] = textureuv[ ti ];
			}

			if(schema & SCHEMA_VN) {
				ni = 3*indiceN[i];
				rawData[p++] = normals[ ni++ ];
				rawData[p++] = normals[ ni++ ];
				rawData[p++] = normals[ ni ];
				rawData[p++] = 0.0;
			}
		}

		return {
			"stride" : stride * SIZEOFFLOAT, //in Bytes 
			"schema" : schema, 
			"voffset" : voffset, 
			"toffset" : toffset, 
			"noffset" : noffset, 
			"rawData" : rawData, 
			"numVertices" : triangles * 3
		};
	}	
} 

#endif 
