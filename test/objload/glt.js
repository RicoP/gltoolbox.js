
var GLT = {}; 

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

				var x = Number(s[0], 10); 
				var y = Number(s[1], 10); 
				var z = Number(s[2], 10); 

				vertice.push(x,y,z,1); 
			},
			"vn" : function(s) {
				if(!s || s.length != 3) {
					throw new Error("Can't accept Normal without 3 components. LINE:" + linenum); 
				}
		
				var x = Number(s[0], 10); 
				var y = Number(s[1], 10); 
				var z = Number(s[2], 10); 

				normals.push(x,y,z,0); 
			},
			"vt" : function(s) {
				if(!s || s.length != 2) {
					throw new Error("Can't accept Texture without 2 components. LINE:" + linenum); 
				}
		
				var u = Number(s[0], 10); 
				var v = Number(s[1], 10); 

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
					//Keep in mind that Number(undefined, 10) yields NaN and NaN - 1 = NaN. 
					var v = Number(vtn[0], 10) - 1; 
					var t = Number(vtn[1], 10) - 1;
					var n = Number(vtn[2], 10) - 1;
	
					console.log(v,t,n); 					

					indiceV.push(v); 
					if(t) indiceT.push(t);
					if(n) indiceN.push(n);
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
		var offsetV = 0;
		var offsetT = 0;
		var offsetN = 0;

		switch(schema) {
			case SCHEMA_V: 
			sizeArray = faces * 3 * 4;
			offsetV = 0;			
            offsetT = 0;
            offsetN = 0;
			break; 

			case SCHEMA_VT: 
			sizeArray = faces * 3 * (4 + 2);
			offsetV = 0;			
            offsetT = 4;
            offsetN = 0;
			break; 

			case SCHEMA_VN: 
			sizeArray = faces * 3 * (4 + 4);
			offsetV = 0;			
            offsetT = 0;
            offsetN = 4;
			break; 

			case SCHEMA_VTN: 
			sizeArray = faces * 3 * (4 + 2 + 4);
			offsetV = 0;			
            offsetT = 4;
            offsetN = 6;
			break; 

			default: 
			throw new Error("Schema broken."); 
		}

		var dataArray = new Float32Array(sizeArray); 
		var indiceArray = new Float32Array(indiceV); 

		for(var ii=0, di=0, L=faces.lengthi*3; ii < L; ii++) {
			//Push Vertice			
			dataArray[di++] = vertice[indiceV[ii]+0]; 
			dataArray[di++] = vertice[indiceV[ii]+1]; 
			dataArray[di++] = vertice[indiceV[ii]+2]; 
			dataArray[di++] = vertice[indiceV[ii]+3]; 

			if(schema | SCHEMA_VT) {		
				//push Texture
				dataArray[di++] = vertice[indiceT[ii]+0]; 
				dataArray[di++] = vertice[indiceT[ii]+1]; 
			}

			if(schema | SCHEMA_VN) {
				//Push Normals
				dataArray[di++] = vertice[indiceN[ii]+0]; 
				dataArray[di++] = vertice[indiceN[ii]+1]; 
				dataArray[di++] = vertice[indiceN[ii]+2]; 
				dataArray[di++] = vertice[indiceN[ii]+3]; 
			}
		}

		console.log("data", dataArray); 
		console.log("index", indiceArray); 
	}	

	GLT.obj = {};
	GLT.SCHEMA_V = SCHEMA_V; 
	GLT.SCHEMA_VN = SCHEMA_VN; 
	GLT.SCHEMA_VT = SCHEMA_VT; 
	GLT.SCHEMA_VTN = SCHEMA_VTN; 
	GLT.obj.parse = parse; 
}(GLT)); 
exports.obj = GLT.obj;
