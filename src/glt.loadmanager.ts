#ifndef GLT_LOADMANAGER_TS 
#define GLT_LOADMANAGER_TS 

#include "glt.obj.ts"

module GLT.loadmanager { 
	"use strict"; 

	var MIME_TEXT   =1;
	var MIME_JSON   =2;
	var MIME_SCRIPT =3;
	var MIME_XML    =4;
	var MIME_IMAGE  =5;
	var MIME_OBJ    =6;
	var MIME_HTML   =7;

	function mimeToType(mime) {
		mime = mime.toLowerCase(); 

		if(mime === "application/json") {
			return MIME_JSON; 
		}

		if(mime === "text/html") {
			return MIME_HTML; 
		}

		if(mime.indexOf("javascript") !== -1) {
			return MIME_SCRIPT; 
		}

		if(mime.indexOf("xml") !== -1) {
			return MIME_XML; 
		}

		if(mime.indexOf("image") !== -1) {
			return MIME_IMAGE; 
		}

		return MIME_TEXT; 
	}

	function simpleAjaxCall(key, file, success, error) {
		function onReadyState() {
			if(abort) {
				return; 
			}

			if(xhr.readyState === 2 || xhr.readyState === 3){
				mime = mimeToType(xhr.getResponseHeader("content-type"));
				if(file.toLowerCase().lastIndexOf(".json") + 5 === file.length) {
					mime = MIME_JSON; 
				}			
				else if(file.toLowerCase().lastIndexOf(".obj") + 4 === file.length) {
					mime = MIME_OBJ; 
				}			


				if(mime === MIME_IMAGE) {
					//We load a Image: Use Image class
					abort = true; 
					xhr.abort(); 

					var image = new Image(); 
					image.onload = function() {
						success(key, image); 
					};
					image.onerror = function() {
						error(file, "Loading image failed.");
					}
					image.src = file; 
					return; 
				}
			}

			if(xhr.readyState === 4) {
				var s = xhr.status; 
				if(s >= 200 && s <= 299 || s === 304 || s === 0) {
					if(mime === MIME_XML) {
						success(key, xhr.responseXML);
					}
					else if(mime === MIME_JSON) {
						try {
							success(key, JSON.parse(xhr.responseText));
						}	
						catch(e) {
							error(file, e); 
						}
					}
					else if(mime === MIME_OBJ) {
						try {
							success(key, GLT.obj.parse(xhr.responseText)); 
						}
						catch(e) {
							error(file, e); 
						}
					}
					else { 
						success(key, xhr.responseText);
					}
				}
				else {	
					error(file, s || 0); 
				}
			}
		}

		var mime = 0; 
		var abort = false; 
		var xhr = new XMLHttpRequest(); 
		xhr.onreadystatechange = onReadyState; 
		xhr.open('GET', file, true);  
		xhr.send(null);	
	}

	function nop() {
		//Do Nothing 
	} 

	export interface Options {	 
		files : any; 
		update   ?: (file : string, p : number) => void; 
		error    ?: (file : string, message : string) => void;
		finished  : (data : any) => void;  
	}

	//options = {
	// "files" = ["path1", "path2", ...]
	// "update" = function (lastFileLoaded, percentage [0..1]
	// "finished" = function ([{file:"file1",blob:"blob1"},{file:"file2",blob:"blob2"},...])
	// "error" = function (file, error)
	//}
	export function loadFiles(options : Options) {
		if(!options) throw new Error("Passed nothing in loadFiles"); 

		var files    = options.files    || {};  
		var update   = options.update   || nop; 
		var finished = options.finished || nop; 
		var error    = options.error    || nop; 

		var total = 0; 
		var filesInLoadingQueue = 0; 

		var result = Object.create(null);  

		var fileLoaded = function(key, blob) {
			filesInLoadingQueue++; 

			result[key] = blob; 

			update(key, filesInLoadingQueue / total); 

			if(filesInLoadingQueue === total) {
				finished(result); 
			}
		}; 

		var fileFailed = function(file, message) {
			fileLoaded = nop; 
			fileFailed = nop; 
			error(file, message); 
		}

		if(files instanceof Array) {
			total = files.length; 
			for(var i = 0, file; file = files[i++];) {		 
				simpleAjaxCall(file, file, fileLoaded, fileFailed); 
			}
		}	
		else { 
			var keys = Object.keys(files); 
			total = keys.length; 
			for(var i = 0, key; key = keys[i++];) if(files.hasOwnProperty(key)) {		 
				simpleAjaxCall(key, files[key], fileLoaded, fileFailed); 
			}
		}
	}
} 

#endif 
