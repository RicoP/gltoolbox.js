(function(GLT) {
	"use strict"; 

	GLT.MOUSE.MouseListener = function (node) {
		if(!node) throw Error("Need node to listen to."); 
		
		var lastX = 0; 
		var lastY = 0; 
		var newX  = 0; 
		var newY  = 0; 
		var lastButtonState = 0; 
		var newButtonState = 0; 
		var mouseActive = false; 

		node.addEventListener("mousemove" , function(e) {
			var x = e.pageX - this.offsetLeft;
			var y = node.height - e.pageY - this.offsetTop;
			
			lastX = newX;
			lastY = mewY; 
			newX = x; 
			newY = y; 
		});

		node.addEventListener("mousedown" , function(e) {
			
		});

		var keysDown = new Uint8Array(SIZE); 
		var keysDownOld = new Uint8Array(SIZE); 

		function cleanKeys() {
			for(var i = 0; i !== SIZE; i++) {
				keysDownOld[i] = 0; 
				keysDown[i] = 0; 
			}
		}
		cleanKeys(); 

		document.addEventListener("keydown", function(e) {
			var k = e.keyCode; 
			if(k < SIZE) {
				keysDown[k] = 1; 
			}
		}, false); 

		document.addEventListener("keyup", function(e) {
			var k = e.keyCode; 
			if(k < SIZE) {
				keysDown[k] = 0; 
			}
		}, false); 

		window.addEventListener("blur", function() { 
			cleanKeys(); 	
		}, false);

	
	}
}(GLT));
