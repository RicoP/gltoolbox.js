var zepto = (function() { 

	var wZepto = window.Zepto; 
	var w$ = window.$; 

	//= ../zepto/src/zepto.js 
	//= ../zepto/src/ajax.js 

	//Reverse side effects. 
	window.Zepto = wZepto; 
	window.$ = w$; 

	return Zepto; 
}()); 
