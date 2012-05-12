var objparse = (function() { 
	function parse(data) {
		var lines = data.split("\n"); 
	
		var vertices = []; 
		var texcoords = []; 
		var normals = []; 
		var indices = []; 

		var line; 
		var operations = {
			"v"  : v,
			"vn" : vn,
			"vt" : vt, 
			"f"  : f	
		};
	
		for(var i = 0; i < lines.length; i++) {
			line = lines[i].trim(); 
			var elements = line.split(/[\t\r\n ]+/g);
			var head = elements.shift(); 
		
			var opp = operations[head]; 
	
			if(opp) opp(elements); 
		}
	
		var ret = { vertices : new Float32Array(vertices) };
	
		if(texcoords.length !== 0) {
		if(texcoords.length * 2 !== vertices.length) {
				throw "Texture coordinates don't match vertices."; 
			}
			ret.textureCoordinates = new Float32Array(texcoords);
		}
	
		if(normals.length !== 0) {
			if(normals.length !== vertices.length) {
				throw "Normals don't match vertices."; 
			}
			ret.normals = new Float32Array(normals); 
		}
	
		if(indices.length !== 0) {
			ret.indices = new Uint16Array(indices); 
		}
	
		return ret; 
	
		function f(vertices) {
			if(vertices.length < 3) {
				throw "Strange amount of vertices in face."; 
			}

			if(vertices.length > 3) {
				//let's asume it's convex 
				for(var n = vertices.length - 1; n !== 1; n--) {
					f([vertices[0], vertices[n-1], vertices[n]]); 
				}
				return; 
			}
	
			var fa,fb,fc;
			fa = vertices[0].split(/\//g);
			fb = vertices[1].split(/\//g);
			fc = vertices[2].split(/\//g);
					
			var fav,fat,fan, fbv,fbt,fbn, fcv,fct,fcn; 
			fav = fa[0]; 
			fbv = fb[0]; 
			fcv = fc[0]; 
	
			fat = fa[1] || fav; 
			fbt = fb[1] || fbv; 
			fct = fc[1] || fcv; 
	
			fan = fa[2] || fav; 
			fbn = fb[2] || fbv; 
			fcn = fc[2] || fcv;
	
			if(!fav || !fbv || !fcv) {
				throw "wrong Face format"; 
			}
	
			if(fav !== fat || fav !== fan || 
			   fbv !== fbt || fbv !== fbn || 
			   fcv !== fct || fcv !== fcn) {
				throw "Texture and Normal Index must correspont with vertex."; 
			} 
				
			indices.push(Number(fav) -1); 
			indices.push(Number(fbv) -1); 
			indices.push(Number(fcv) -1); 
		}
	
		function v(numbers) {
			if(numbers.length !== 3) { 
				throw "vertice needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			vertices.push(a,b,c,1); 
		}

		function vn(numbers) {
			if(numbers.length !== 3) { 
				throw "normals needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			normals.push(a,b,c,0); 
		}

		function vt(uv) {
			if(uv.length !== 2) {
				throw "Texture coordinate needs two parameter."; 
			}

			var u,v; 
			u = Number(uv[0]);
			v = Number(uv[1]);
	
			texcoords.push(u,v); 
		}
	}	

	return {
		"parse" : parse 
	};
}()); 