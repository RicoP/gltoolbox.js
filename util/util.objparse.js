var objparse = (function() { 
	var SIZEOFFLOAT = 4; 
	var defT = [0,0, 1,0, 0,1]
	var defN = [1,0,0,0, 0,1,0,0, 0,0,1,0]	

	function parse(text) {
		var lines = text.split("\n"); 
		var line = ""; 
		var linenum = 0; 
		
		var vertice = []; //[x1,y1,z1,1,x2,y2,z2,1,...]
		var normals = []; //[x1,y1,z1,0,x2,y2,z2,0,...]
		var textureuv = []; //[u1,v1,u2,v2,...] 	
		var indice = []; 
		
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

				//TODO				
			}
		};

		var rgx = /[\t\r\n ]+/g; 

		for(linenum = 0; linenum != lines.length;) {			
			line = lines[linenum++].trim();
			var elements = line.split(rgx);
			var head = elements.shift(); 
			if(head in funcs) {
				funcs[head](elements); 
			}
		}	

		//TODO
		console.log(vertice, textureuv, normals); 
	}	

	return {
		"parse" : parse 
	};
}()); 
