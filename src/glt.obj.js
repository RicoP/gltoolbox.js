(function(GLT) { 
	"use strict"; 

	var SIZEOFFLOAT = 4; 

	//enums
	var SCHEMA_V   = 0 // Only Vertice
	var SCHEMA_VT  = 1 // Vertice + Textures
	var SCHEMA_VN  = 2 // Vertice + Normals
	var SCHEMA_VTN = 3 // Vertice + Textures + Normals

	var rgxWhitespace = /[\t\r\n ]+/g; 

	function parse(text) {
		var lines = text.split("\n"); 
		var line = ""; 
		var linenum = 0; 
		
		var vertice = []; //[x1,y1,z1,1,x2,y2,z2,1,...]
		var normals = []; //[x1,y1,z1,0,x2,y2,z2,0,...]
		var textureuv = []; //[u1,v1,u2,v2,...] 	
		var indiceV = []; 
		var indiceN = []; 
		var indiceT = []; 
		var faces = 0; 
		
		var funcs = {
			"v" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Vertic without 3 components. LINE:" + line); 
				}

				var x = Number(s[0]);  
				var y = Number(s[1]);  
				var z = Number(s[2]);  

				vertice.push(x,y,z,1); 
			},
			"vn" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Normal without 3 components. LINE:" + linenum); 
				}
	
				var x = Number(s[0]);  
				var y = Number(s[1]);  
				var z = Number(s[2]);  	

				normals.push(x,y,z,0); 
			},
			"vt" : function(s) {
				if(!s || s.length != 2) {
					throw new Error("Can't accept Texture without 2 components. LINE:" + linenum); 
				}
		
				var u = Number(s[0]); 
				var v = Number(s[1]); 

				textureuv.push(u,v); 
			},
			"f" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Face without 3 components. LINE:" + linenum); 
				}	

				faces++; 				

				//Push indice
				for(var i=0; i != 3; i++) {
					var vtn = s[i].split("/"); 
					//Keep in mind that parseInt(undefined, 10) yields NaN and NaN - 1 = NaN. 
					var v = parseInt(vtn[0], 10) - 1; 
					var t = parseInt(vtn[1], 10) - 1;
					var n = parseInt(vtn[2], 10) - 1;
	
					console.log(v,t,n); 					

					indiceV.push(v); 
					if(t !== NaN) indiceT.push(t);
					if(n !== NaN) indiceN.push(n);
				}
			}

		};

		for(linenum = 0; linenum != lines.length;) {			
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
		console.log("schema", schema); 

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

		sizeArray = faces * 3 * stride;

		var rawData = new Float32Array(sizeArray); 

		for(var i = 0; i != indiceV.length; i++) {
			var s = i * stride; 
			rawData[s+0] = vertice[ 4*indiceV[i]+0 ]; 
			rawData[s+1] = vertice[ 4*indiceV[i]+1 ]; 
			rawData[s+2] = vertice[ 4*indiceV[i]+2 ]; 
			rawData[s+3] = vertice[ 4*indiceV[i]+3 ]; 
			
			if(schema === SCHEMA_VT) {
				rawData[s+4] = textureuv[ 2*indiceT[i]+0 ];
				rawData[s+5] = textureuv[ 2*indiceT[i]+1 ];
			}
			else if(schema === SCHEMA_VN) {
				rawData[s+4] = normals[ 4*indiceN[i]+0 ];
				rawData[s+5] = normals[ 4*indiceN[i]+1 ];
				rawData[s+6] = normals[ 4*indiceN[i]+2 ];
				rawData[s+7] = normals[ 4*indiceN[i]+3 ];

			}
			else if(schema === SCHEMA_VTN) {
				rawData[s+4] = textureuv[ 2*indiceT[i]+0 ];
				rawData[s+5] = textureuv[ 2*indiceT[i]+1 ];

				rawData[s+6] = normals[ 4*indiceN[i]+0 ];
				rawData[s+7] = normals[ 4*indiceN[i]+1 ];
				rawData[s+8] = normals[ 4*indiceN[i]+2 ];
				rawData[s+9] = normals[ 4*indiceN[i]+3 ];
			}
		}

		console.log("raw", rawData); 

		return {
			"stride" : stride * SIZEOFFLOAT, 
			"voffset" : voffset, 
			"toffset" : toffset, 
			"noffset" : noffset, 
			"rawData" : rawData, 
			"numVertices" : faces * 3
		};
	}	

	GLT.obj = {};
	GLT.obj.SCHEMA_V   = SCHEMA_V; 
	GLT.obj.SCHEMA_VN  = SCHEMA_VN; 
	GLT.obj.SCHEMA_VT  = SCHEMA_VT; 
	GLT.obj.SCHEMA_VTN = SCHEMA_VTN; 
	GLT.obj.parse      = parse; 
}(GLT)); 
