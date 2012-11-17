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

	function simpleAjaxCall(file, success, error) {
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
						success(image); 
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
						success(xhr.responseXML);
					}
					else if(mime === MIME_JSON) {
						try {
							success(JSON.parse(xhr.responseText));
						}	
						catch(e) {
							error(file, e); 
						}
					}
					else if(mime === MIME_OBJ) {
						try {
							success(GLT.obj.parse(xhr.responseText)); 
						}
						catch(e) {
							error(file, e); 
						}
					}
					else { 
						success(xhr.responseText);
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
		files     : any; 
		finished  : (data : any) => void;  
		update   ?: (file : string, p : number) => void; 
		error    ?: (file : string, message : string) => void;
	}

	export interface LoadContext {
		add : (data : any, propertyName : string) => void
	} 

	function yieldError(message) {
		throw new Error(message); 
	}

	function newObj() {
		return Object.create(null); 
	}

	export interface IQueueOptions {	 
		finished  : (data : any) => void;  
		update   ?: (file : string, p : number) => void; 
		error    ?: (file : string, error : any) => void;
	}

	export interface IScope {
		$load : (options : ILoadOptions) => Scope; 
	}

	export interface ILoadOptions {
		url : string;
		scope ?: string; 
		transform ?: (from : any) => any; 
		append ?: (data : any, scope : Scope) => void; 
	}

	class Scope implements IScope {		
		constructor(private host : any, private name : string) {
		
		}
		
		public $load(options : ILoadOptions) {
			return this; 
		}
	}

	export function Queue(options : IQueueOptions) {
		var publicUpdate   = options.update   || nop; 
		var publicError    = options.error    || nop; 
		var publicFinished = options.finished || yieldError('must define a finished callback.'); 

	}

	export function createQueue(options : Options) {
		var update   = options.update   || nop; 
		var error    = options.error    || nop; 
		var files    = options.files    || yieldError('must define a files property.');  
		var finished = options.finished || yieldError('must define a finsihed property.'); 

		var totalDownloads    = 0; 
		var finishedDownloads = 0; 
		var resultFiles       = newObj(); 

		var updateQueue = (file) => {
			update(finishedDownloads / totalDownloads, file); 

			if(totalDownloads === finishedDownloads) {
				finished(resultFiles); 
			}
		};

		var fileError = (url, error) => {
			//deactivate any updates
			updateQueue = nop; 
			fileError = nop; 

			error(url, error); 
		};

		var addToCurrentQueue = (url : string, action : any, obj : any) => {
			totalDownload++; 

			var executeAction : (data : any) => void; 
			if(typeof action === 'string') { 
				executeAction = (data) => {obj[action] = data};
			}
			else if(typeof action === 'function') {
				executeAction = (data) => {
					var subObj = newObj(); 
					var context : LoadContext = {
						add : (url, property) => addToCurrentQueue(url, property, subObj) 
					};

					var prop = action(data, context) || yieldError('action must return a string.'); 
					obj[prop] = subobj; 
				};
			}
			else { 
				yieldError('the action must be either be a string or a callback.');
			}

			var fileLoaded = (data) => {
				try { 
					executeAction(); 
					finishedDownloads++; 
					updateQueue(url); 
				}
				catch(e) {
					fileError(url, e); 
				}
			};

			simpleAjaxCall(url, fileLoaded, fileError); 
		}; 

		var keys = Object.keys(files).filter(key => files.hasOwnProperty(key)); 

		if(keys.length === 0 || files instanceof Array) {
			yieldError('files must be a JSON.'); 
		}

		for(var i = 0; i !== keys.length; i++) {
			var url    = keys[i]; 
			var action = files[url]; 
			addToCurrentQueue(url, action, resultFiles);  
		}		
	}
} 

#endif 
