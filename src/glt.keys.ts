#ifndef GLT_KEYS_TS
#define GLT_KEYS_TS

module GLT.keys {
	"use strict"; 

	var SIZE = 256; 	
	var KeyArray = Uint8Array || Array; 

	var keysDown = new KeyArray(SIZE); 
	var keysDownOld = new KeyArray(SIZE); 

	function cleanKeys() {
		for(var i = 0; i !== SIZE; i++) {
			keysDownOld[i] = 0; 
			keysDown[i] = 0; 
		}
	}

	cleanKeys(); 

	document.addEventListener("keydown", function(e : KeyboardEvent) {
		var k = e.keyCode; 
		if(k < SIZE) {
			keysDown[k] = 1; 
		}
	}, false); 

	document.addEventListener("keyup", function(e : KeyboardEvent) {
		var k = e.keyCode; 
		if(k < SIZE) {
			keysDown[k] = 0; 
		}
	}, false); 

	window.addEventListener("blur", function() { 
		cleanKeys(); 	
	}, false);

	export var codes = {
		"backspace":8, "tab":9,     "enter":13, "shift":16,  "ctrl":17,     "alt":18, "pause":19, 
		"capslock":20, "escape":27, "space":32, "pageUp":33, "pageDown":34, "end":35, "home":36,

		"left":37, "up":38, "right":39, "down":40, 

		"insert":45, "delete":46,

		"num0":48, "num1":49, "num2":50, "num3":51, "num4":52, "num5":53, "num6":54, "num7":55, "num8":56, "num9":57,

		"a":65, "b":66, "c":67, "d":68, "e":69, "f":70, "g":71, "h":72, "i":73, "j":74, "k":75, "l":76, "m":77, 
		"n":78, "o":79, "p":80, "q":81, "r":82, "s":83, "t":84, "u":85, "v":86, "w":87, "x":88, "y":89, "z":90, 
		
		"windowKeyLeft":91, "windowKeyRight":92, "select":93,
		
		"numpad0":96,  "numpad1":97,  "numpad2":98,  "numpad3":99,  "numpad4":100, 
		"numpad5":101, "numpad6":102, "numpad7":103, "numpad8":104, "numpad9":105,
		
		"multiply":106, "add":107, "subtract":109, "decimalPoint":110, "divide":111,
		
		"f1":112, "f2":113, "f3":114, "f4":115, "f5":116, "f6":117,
		"f7":118, "f8":119, "f9":120, "f10":121, "f11":122, "f12":123,
		
		"numlock":144, "scrolllock":145, "semicolon":186, "equals":187, "comma":188,
		"dash":189, "period":190, "slash":191, "graveAccent":192, "openBracket":219,
		"backSlash":220, "closeBraket":221, "quote":222
	};

	export function update() {
		for(var i = 0; i !== SIZE; i++) {
			keysDownOld[i] = keysDown[i]; 
		}
	}

	export function isDown(key) {
		return keysDown[key] !== 0; 
	}

	export function isUp(key) {
		return keysDown[key] === 0; 
	}

	export function wasPressed(key) {
		return keysDown[key] !== 0 && keysDownOld[key] === 0;
	}

	export function wasReleased(key) {
		return keysDown[key] === 0 && keysDownOld[key] !== 0;
	}
}

#endif 
