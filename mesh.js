module.createMesh = function (gl, props) { 
    var vPositionIndx = 0; 
    var vColorIndx = 1; 
    var vTransIndx = 2; 
	var modelview = mat4.identity();
	var alphax = 0; 
	var alphay = 0; 
	var position = [0,1,0]; 

    var vertices = props.vertices; 
	var indices = props.indices || []; 
    var program = props.program; 

    //Vertices
    var vertexBuffer = gl.createBuffer(); 
    var vertexBufferLength = vertices.length / 4; 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var indexBuffer = gl.createBuffer(); 	
	var indexBufferLength = indices.length; 
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); 		

    //Texture
    /*var texbuffer = gl.createBuffer(); 

    gl.bindBuffer(gl.ARRAY_BUFFER, texbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(1); 

    var texture = gl.createTexture(); 
    var image = new Image(); 
    image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    image.src = "tex.png"; 

    program.texture = texture; 
	*/

	return {
		"draw" : function(camera) {
			gl.useProgram(program); 

			mat4.identity(modelview); 

			mat4.multiply(modelview, camera);  

			mat4.translate(modelview, position); 
			mat4.rotateY(modelview, alphax); 
			mat4.rotateX(modelview, alphay); 
			var s = 1 / 40; 
			mat4.scale(modelview, [s,s,s]);  

			//!!! camera = mat4.lookAt(....); 
			//!!! mat4.multiply(modelview, camera); 
			//mat4.translate(modelview, [0,-0.5,-2]); 
			//mat4.scale(modelview, [20,1,20]); 
			//mat4.rotateY(modelview, alpha); 
					
			var vModelViewIndx = gl.getUniformLocation(program, "vModelView");
			gl.uniformMatrix4fv(vModelViewIndx, false, modelview);

			var vProjectionIndx = gl.getUniformLocation(program, "vProjection");
			gl.uniformMatrix4fv(vProjectionIndx, false, projection);

			//var vEyeIndx = gl.getUniformLocation(program, "vEye");
			//gl.uniformMatrix4fv(vEyeIndx, false, eye);
			//var fTexIndx = gl.getUniformLocation(program, "texture");

			//gl.activeTexture(gl.TEXTURE0);
			//gl.bindTexture(gl.TEXTURE_2D, program.texture);
			//gl.uniform1i(fTexIndx, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer); 
		    gl.vertexAttribPointer(vPositionIndx, 4, gl.FLOAT, false, 0, 0); 
    		gl.enableVertexAttribArray(vPositionIndx); 
	
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);        

        	gl.drawElements(gl.TRIANGLES, indexBuffer.num, gl.UNSIGNED_SHORT, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, null); 
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
			//gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
			//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
		}, 
		"update" : function(milis) {
			var a = milis * 2 * Math.PI / 1000;
			var step = milis / 1000; 

			if(UTIL.keyIsDown(UTIL.keys.a)) { 
				alphax += a; 
			}

			if(UTIL.keyIsDown(UTIL.keys.d)) { 
				alphax -= a; 
			}			

			if(UTIL.keyIsDown(UTIL.keys.w)) { 
				alphay += a; 
			}

			if(UTIL.keyIsDown(UTIL.keys.s)) { 
				alphay -= a; 
			}			

			if(UTIL.keyIsDown(UTIL.keys.k)) {
				position[2] = position[2] + step; 
			}

			if(UTIL.keyIsDown(UTIL.keys.j)) {
				position[2] = position[2] - step; 
			}

			if(UTIL.keyIsDown(UTIL.keys.h)) {
				position[0] = position[0] + step; 
			}

			if(UTIL.keyIsDown(UTIL.keys.l)) {
				position[0] = position[0] - step; 
			}

			alphax += milis * Math.PI * 2  * 0.2 / 1000; 
			alphay += milis * Math.PI * 2  * 0.1 / 1000; 
		}
	};	
}
