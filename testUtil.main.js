//= lib/util/util.js  

var text = ""; 

window.onload = function() {
	var t = document.getElementById("textbox"); 
	var b = document.getElementById("button"); 

	b.onclick = function() {
		text = t.value; 
	};
}; 

