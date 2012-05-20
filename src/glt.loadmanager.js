(function(GLT) { 
"use strict"; 

var MTEXT = 1; 
var MJSON = 2; 
var MSCRIPT = 3; 
var MXML = 4; 
var MIMAGE = 5; 
var MOBJ = 6; 
var MHTML = 7;

function mimeToType(mime) {
	mime = mime.toLowerCase(); 

	if(mime === "application/json") {
		return MJSON; 
	}

	if(mime === "text/html") {
		return MHTML; 
	}

	//if(mime === "application/octet-stream") {
	//	return MOBJ; 
	//}

	if(mime.indexOf("javascript") !== -1) {
		return MSCRIPT; 
	}

	if(mime.indexOf("xml") !== -1) {
		return MXML; 
	}
	if(mime.indexOf("image") !== -1) {
		return MIMAGE; 
	}

	return MTEXT; 
}

function simpleAjaxCall(file, success, error) {
	var mime = 0; 
	var abort = false; 
	var xhr = new XMLHttpRequest(); 
	xhr.onreadystatechange = onReadyState; 
	xhr.open('GET', file, true);  
	xhr.send(null);
	
	function onReadyState() {
		if(!abort && (xhr.readyState === 2 || xhr.readyState === 3)){
			mime = mimeToType(xhr.getResponseHeader("content-type"));
			if(file.toLowerCase().lastIndexOf(".obj") + 4 === file.length) {
				mime = MOBJ; 
			}			

			if(mime === MIMAGE) {
				//We load a Image: Use Image class
				abort = true; 
				xhr.abort(); 

				var image = new Image(); 
				image.onload = function() {
					success(file, image); 
				};
				image.onerror = function() {
					error(file, "");
				}
				image.src = file; 
				return; 
			}
		}

		if(!abort && xhr.readyState === 4) {
			var s = xhr.status; 
			if(s >= 200 && s <= 299 || s === 304 || s ===0) {
				if(mime === MXML) {
					success(file, xhr.responseXML);
				}
				else if(mime === MJSON) {
					try {
						success(file, JSON.parse(xhr.responseText));
					}	
					catch(e) {
						error(file, e); 
					}
				}
				else if(mime === MOBJ) {
					try {
						success(file, GLT.obj.parse(xhr.responseText)); 
					}
					catch(e) {
						error(file, e); 
					}
				}
				else { 
					success(file, xhr.responseText);
				}
			}
			else {	
				error(file, s || 0); 
			}
		}
	}
}

function nop() {
	//Do Nothing 
} 

//options = {
// "files" = ["path1", "path2", ...]
// "update" = function (lastFileLoaded, percentage [0..1]
// "finished" = function ([{file:"file1",blob:"blob1"},{file:"file2",blob:"blob2"},...])
// "error" = function (file, error)
//}
function loadFiles(options) {
	if(!options) throw new Error("Passed nothing in loadFiles"); 

	var files    = options.files    || [];  
	var update   = options.update   || nop; 
	var finished = options.finished || nop; 
	var error    = options.error    || nop; 

	var total = files.length; 
	var filesInLoadingQueue = 0; 

	var result = Object.create(null);  

	var fileLoaded = function(file, blob) {
		filesInLoadingQueue++; 

		result[file] = blob; 

		update(file, filesInLoadingQueue/total); 

		if(filesInLoadingQueue === total) {
			finished(result); 
		}
	}; 

	var fileFailed = function(file, message) {
		fileLoaded = nop; 
		fileFailed = nop; 
		error(file, message); 
	}

	for(var i = 0, file; file = files[i++];) {
		(function(file) {
			simpleAjaxCall(file, fileLoaded, fileFailed); 
		}(file));
	}
}

GLT.loadmanager = {}; 
GLT.loadmanager.loadFiles = loadFiles; 
}(GLT)); 
