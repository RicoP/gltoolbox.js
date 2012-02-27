module.createCube = function (gl, projection) { 
	var modelview = mat4.identity();
	var alphax = 0; 
	var alphay = 0; 
	var position = [0,1,0]; 

    var vShaderSrc = UTIL.getSource("shaderPhong.vs");
    var fShaderSrc = UTIL.getSource("shaderPhong.fs");

    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
    gl.shaderSource(vertexShader, vShaderSrc); 
    gl.compileShader(vertexShader); 

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
    gl.shaderSource(fragmentShader, fShaderSrc); 
    gl.compileShader(fragmentShader); 

    var program = gl.createProgram(); 

    gl.attachShader(program, vertexShader); 
    gl.attachShader(program, fragmentShader); 
    gl.linkProgram(program); 

	//Shader linked
	//Tauschen? 
    gl.useProgram(program); 

    //Vertices
	var objSource = UTIL.getSource("teapot.obj"); 
    //var obj = UTIL.parseObjData(objSource);  
    var obj = UTIL.createCube();  

	
    var vertices = obj.vertices; 
	var indices = obj.indices; 
	var normals = obj.normals; 

	//----
    var vertexBuffer = gl.createBuffer(); 
	var vertexElementSize = 4; 

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vertexBufferElements = vertices.length / vertexElementSize; 

	var aVertexIndex = gl.getAttribLocation(program, "aVertex"); 
	if(aVertexIndex === -1) {
		throw new Error("aVertex does not exist."); 
	}
    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
	//----

	//----
    var normalBuffer = gl.createBuffer(); 
	var normalElementSize = 4; 

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    var normalBufferSize = normals.length / normalElementSize; 

	var aNormalIndex = gl.getAttribLocation(program, "aNormal"); 
	if(aNormalIndex === -1) {
		throw new Error("aNormal does not exist."); 
	}
    gl.vertexAttribPointer(aNormalIndex, 4, gl.FLOAT, false, 0, 0); 
    //gl.enableVertexAttribArray(normalBufferIndex); 
	//----

	var indexBuffer = gl.createBuffer(); 	
	var indexBufferElements = indices.length; 

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); 		

	return {
		"draw" : function(camera) {
			//TEMPORARY VALUES 			
			var uCameraPosition = vec3.create([camera[3], camera[7], camera[11]]); 
			var uLightPosition = vec3.create([0,100,0]); 
			var uWorldIllum = 0.2; 
            var uMaterialIllum = 0.4; 
            var uMaterialDiffus = 0.3;   
            var uMaterialSpecular = 0.3; 
            var uLightStrength = 0.5;  		
			//----

			gl.useProgram(program); 

			//TEST 			
    		gl.enableVertexAttribArray(aVertexIndex); 
    		gl.enableVertexAttribArray(aNormalIndex); 

			mat4.identity(modelview); 

			mat4.multiply(modelview, camera); 

			mat4.translate(modelview, position); 
			mat4.rotateY(modelview, alphax); 
			mat4.rotateX(modelview, alphay); 
			//var s = 1 / 40; 
			//mat4.scale(modelview, [s,s,s]);  

			//!!! camera = mat4.lookAt(....); 
			//!!! mat4.multiply(modelview, camera); 
			//mat4.translate(modelview, [0,-0.5,-2]); 
			//mat4.scale(modelview, [20,1,20]); 
			//mat4.rotateY(modelview, alpha); 
			
			/*
uniform mat4 uProjection; 
uniform vec3 uCameraPosition; 
uniform vec3 uLightPosition; 

uniform float uWorldIllum; 
uniform float uMaterialIllum;
uniform float uMaterialDiffus;  
uniform float uMaterialSpecular; 
uniform float uLightStrength; 

uniform mat4 uModelview;
			*/
			
			var uProjectionIndex = gl.getUniformLocation(program, "uProjection") || throwError();
			gl.uniformMatrix4fv(uProjectionIndex, false, projection);
			
			var uCameraPositionIndex = gl.getUniformLocation(program, "uCameraPosition") || throwError();
			gl.uniform3fv(uCameraPositionIndex, uCameraPosition);

			var uLightPositionIndex = gl.getUniformLocation(program, "uLightPosition") || throwError();
			gl.uniform3fv(uLightPositionIndex, uLightPosition); 

			var uWorldIllumIndex = gl.getUniformLocation(program, "uWorldIllum") || throwError();
			gl.uniform1f(uWorldIllumIndex, uWorldIllum);

			var uMaterialIllumIndex = gl.getUniformLocation(program, "uMaterialIllum") || throwError();
			gl.uniform1f(uMaterialIllumIndex, uMaterialIllum);

			var uMaterialDiffusIndex = gl.getUniformLocation(program, "uMaterialDiffus") || throwError();
			gl.uniform1f(uMaterialDiffusIndex, uMaterialDiffus);

			var uMaterialSpecularIndex = gl.getUniformLocation(program, "uMaterialSpecular") || throwError();
			gl.uniform1f(uMaterialSpecularIndex, uMaterialSpecular); 

			var uLightStrengthIndex = gl.getUniformLocation(program, "uLightStrength") || throwError();
			gl.uniform1f(uLightStrengthIndex, uLightStrength); 
			
			var uModelViewIndex = gl.getUniformLocation(program, "uModelview") || throwError();
			gl.uniformMatrix4fv(uModelViewIndex, false, modelview);			

			//var vEyeIndx = gl.getUniformLocation(program, "vEye");
			//gl.uniformMatrix4fv(vEyeIndx, false, eye);
			//var fTexIndx = gl.getUniformLocation(program, "texture");

			//gl.activeTexture(gl.TEXTURE0);
			//gl.bindTexture(gl.TEXTURE_2D, program.texture);
			//gl.uniform1i(fTexIndx, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); 
		    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
    		gl.enableVertexAttribArray(aVertexIndex); 

			gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); 
		    gl.vertexAttribPointer(aNormalIndex, normalElementSize, gl.FLOAT, false, 0, 0); 
    		gl.enableVertexAttribArray(aNormalIndex); 
	
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);        

        	gl.drawElements(gl.TRIANGLES, indexBufferElements, gl.UNSIGNED_SHORT, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, null); 
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
			//gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
			//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
		}, 
		"update" : function(secs) {
			var a = secs * 2 * Math.PI;
			var step = secs; 

			if(UTIL.keyIsDown(UTIL.keys.j)) { 
				alphax += a; 
			}

			if(UTIL.keyIsDown(UTIL.keys.l)) { 
				alphax -= a; 
			}			

			if(UTIL.keyIsDown(UTIL.keys.i)) { 
				alphay += a; 
			}

			if(UTIL.keyIsDown(UTIL.keys.k)) { 
				alphay -= a; 
			}			

			alphax += secs * Math.PI * 2  * 0.2; 
			alphay += secs * Math.PI * 2  * 0.1; 
		}
	};	

	function throwError() {
		throw ":("; 
	}
}
