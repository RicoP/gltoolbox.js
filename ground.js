var SHAPES = SHAPES || {}; 
 
SHAPES.createGround = function (gl, projection) { 
    var vPositionIndx = 0; 
    var vColorIndx = 1; 
    var vTransIndx = 2; 
	var modelview = mat4.identity();
	var alpha = 0; 

    var vShaderSrc = UTIL.getSource("shader.vs");
    var fShaderSrc = UTIL.getSource("shader.fs");

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

    gl.bindAttribLocation(program, vPositionIndx, "vPosition"); 

    gl.useProgram(program); 

    //Vertices
    var plane = UTIL.createPlane(); 
    var vertices = plane.vertices; 
    var texCoords = plane.texCoords; 

	for(var i=0; i < texCoords.length; i+=2) {
		texCoords[i] = texCoords[i] * 8.; 
		texCoords[i+1] = texCoords[i+1] * 8.; 
	}

    program.numVertices = vertices.length / 4; 

    var posbuffer = gl.createBuffer(); 

    gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(0); 

    //Texture
    var texbuffer = gl.createBuffer(); 

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
    image.src = "TxUBCUdirt.png"; 

    program.texture = texture; 

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	return {
		"draw" : function() {
			gl.useProgram(program); 

			//TEST 			
    		gl.enableVertexAttribArray(0); 
 		    gl.enableVertexAttribArray(1); 

			mat4.identity(modelview); 

			mat4.translate(modelview, [0,-0.5,-2]); 
			mat4.scale(modelview, [20,1,20]); 
			mat4.rotateY(modelview, alpha); 
					
			//var proj = mat4.identity(); 
			//mat4.inverse(eye, proj); 
			//mat4.multiply(eye, projection, proj); 

			var vModelViewIndx = gl.getUniformLocation(program, "vModelView");
			gl.uniformMatrix4fv(vModelViewIndx, false, modelview);

			var vProjectionIndx = gl.getUniformLocation(program, "vProjection");
			gl.uniformMatrix4fv(vProjectionIndx, false, projection);

			//var vEyeIndx = gl.getUniformLocation(program, "vEye");
			//gl.uniformMatrix4fv(vEyeIndx, false, eye);
			var fTexIndx = gl.getUniformLocation(program, "texture");

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, program.texture);
			gl.uniform1i(fTexIndx, 0);

			gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
		}, 
		"update" : function(milis) {
			var a = milis * 2 * Math.PI / 1000;

			if(UTIL.keyIsDown(UTIL.keys.q)) { 
				alpha += a; 
			}

			if(UTIL.keyIsDown(UTIL.keys.e)) { 
				alpha -= a; 
			}
		}
	};	
}

