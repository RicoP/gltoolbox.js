(function(GLT) { 
"use strict"; 

var TEXT = 1; 
var MJSON = 2; 
var SCRIPT = 3; 
var XML = 4; 
var IMAGE = 5; 
var OBJ = 6; 
var HTML = 7;

function mimeToType(mime) {
	mime = mime.toLowerCase(); 

	if(mime === "application/json") {
		return MJSON; 
	}

	if(mime === "text/html") {
		return HTML; 
	}

	if(mime === "application/octet-stream") {
		return OBJ; 
	}

	if(mime.indexOf("javascript") !== -1) {
		return SCRIPT; 
	}

	if(mime.indexOf("xml") !== -1) {
		return XML; 
	}
	if(mime.indexOf("image") !== -1) {
		return IMAGE; 
	}

	return TEXT; 
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
				mime = OBJ; 
			}			

			if(mime === IMAGE) {
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
				if(mime === XML) {
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
} 

function fileIsPicture(name, callback) {
	var pictureSuffixe = [".jpg", ".jpeg", ".png", ".gif"]; 

	for(var i = 0, suffix; suffix = pictureSuffixe[i++];) {
		if((name.lastIndexOf(suffix) + suffix.length) === name.length) {
			callback(true); 
			return; 
		}			
	}
	callback(false); 
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
