var objparse = (function() { 
	function parse(data) {
		var lines = data.split("\n"); 
	
		var vertices = []; 
		var texcoords = []; 
		var normals = [];
 
		var indiceVertice = []; 
		var indiceTexcoords = []; 
		var indiceNormals = []; 

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

		var fVertices = new Float32Array(4 * indiceVertice); 
		var fNormals = null; 
		var fTextureCoordinates = null; 

		if(indeceNormals.length !== 0) {
			fNormals = new Float32Array(4 * indiceNormals);
		}

		if(indeceNormals.length !== 0) {
			fNormals = new Float32Array(2 * indiceNormals); 
		}

		for(var vi = 0; vi !== indiceVertice.length; vi++) {
	
			//???? 
			fVertice[4*vi+0] = vertices[indiceVertice[3*vi+0]]; 
			fVertice[4*vi+1] = vertices[indiceVertice[3*vi+1]]; 
			fVertice[4*vi+2] = vertices[indiceVertice[3*vi+2]]; 
			fVertice[4*vi+3] = 1; 

			if(fNormals) {
				fNormals[4*vi+0] = normals[indiceVertice[
			}
		}
	
		var ret = { vertices : new Float32Array(vertices) };

		if(texcoords.length !== 0) {
			if(indiceVertice.length !== indiceTexcoords.length) {
				throw Error("indece Vertex and Texcoords don't match"); 
			}
			ret.textureCoordinates = makeFlat(indiceVertice, indiceTexcoords, texcoords, 2); 
		}
	
		if(normals.length !== 0) {
			if(indiceVertice.length !== indiceNormals.length) {
				throw Error("indece Vertex and Texcoords don't match"); 
			}
			ret.normals = makeFlat(indiceVertice, indiceNormals, normals, 4); 
		}
	
		if(indiceVertice.length !== 0) {
			ret.indices = new Uint16Array(indiceVertice); 
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
	
			fat = fa[1]; 
			fbt = fb[1]; 
			fct = fc[1]; 
	
			fan = fa[2]; 
			fbn = fb[2]; 
			fcn = fc[2];
	
			if(!fav || !fbv || !fcv) {
				throw "wrong Face format"; 
			}
				
			indiceVertice.push(Number(fav) -1); 
			indiceVertice.push(Number(fbv) -1); 
			indiceVertice.push(Number(fcv) -1); 

			if(fat && fbt && fct) {
				indiceTexcoords.push(Number(fat) -1); 
				indiceTexcoords.push(Number(fbt) -1); 
				indiceTexcoords.push(Number(fct) -1); 
			}

			if(fan && fbn && fcn) {
				indiceNormals.push(Number(fan) -1); 
				indiceNormals.push(Number(fbn) -1); 
				indiceNormals.push(Number(fcn) -1); 
			}
		}
	
		function v(numbers) {
			if(numbers.length !== 3) { 
				throw "vertice needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			vertices.push(a,b,c); 
		}

		function vn(numbers) {
			if(numbers.length !== 3) { 
				throw "normals needs to be three elements big."; 
			}
	
			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
				
			normals.push(a,b,c); 
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

	function makeFlat(indiceFace, indeceOriginBuffer, originBuffer, elementSize) {
		var newBuffer = new Float32Array(indiceFace.length * elementSize); 
		for(var iFace = 0; iFace !== indiceFace.length; iFace++) {			
			var posOriginBuffer = indeceOriginBuffer[indiceFace[iFace]];
			for(var iElement = 0; iElement !== elementSize; iElement++) {
				newBuffer[iFace + iElement] = originBuffer[posOriginBuffer + iElement]; 
			}
		}

		return newBuffer; 
	}
}()); 
