#ifndef GLT_LOADMANAGER_TS 
#define GLT_LOADMANAGER_TS 

#include "glt.obj.ts"

module GLT.loadmanager { 
	"use strict"; 

	export interface Options {	 
		files     : any; 
		finished  : (data : any) => void;  
		update   ?: (file : string, p : number) => void; 
		error    ?: (file : string, message : string) => void;
	}

	export interface LoadContext {
		add : (data : any, propertyName : string) => void;
	} 

	export interface IQueueCallbacks {	 
		finished  : (data : any) => void;  
		update   ?: (file : string, p : number) => void; 
		error    ?: (file : string, error : any) => void;
	}

	export interface IScopeCallbacks {	 
		done   : () => void;  
		update : (file : string, p : number) => void; 
		error  : (file : string, error : any) => void;
	}

	export interface IScope {
		$load : (options : ILoadOptions) => IScope; 
	}

	export interface ILoadOptions {
		url : string;
		scope ?: string; 
		transform ?: (from : any) => any; 
		append ?: (data : any, scope : IScope) => void; 
	}

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
			console.log('onreadystate', file, xhr.readyState); 

			if(abort) {
				return; 
			}

			if(xhr.readyState === 2 || xhr.readyState === 3){
				if(file.toLowerCase().lastIndexOf(".json") + 5 === file.length) {
					mime = MIME_JSON; 
				}			
				else if(file.toLowerCase().lastIndexOf(".obj") + 4 === file.length) {
					mime = MIME_OBJ; 
				}			
				else {
					mime = mimeToType(xhr.getResponseHeader("content-type"));				
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
				//abort = true; //HACK: 

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

	function yieldError(message) {
		throw new Error(message); 
	}

	function newObj() {
		return Object.create(null); 
	}

	var identity = x => x; 

	class Scope implements IScope {		
		private onUpdate : any;
		private onError  : any;
		private onDone   : any; 
		private children : Scope[];
		private totalDownloads    : number; 
		private finishedDownloads : number; 

		constructor(private mother : any, private name : string, private callbacks : IScopeCallbacks) {
			this.onUpdate   = callbacks.update || nop; 
			this.onError    = callbacks.error  || nop; 
			this.onDone     = callbacks.done   || yieldError('must define a finished callback.'); 
			this.children   = [];

			if(!mother[name]) {			
				mother[name] = newObj(); 
			}

			this.totalDownloads    = 0;
			this.finishedDownloads = 0;
		}

		setBodyData(scope : string, data : any) : void {
			if(typeof scope === 'string') { 
				this.mother[this.name][scope] = data;
			}
		}

		isDone() : bool {
			//TODO: consider subscope and such 
			return this.finishedDownloads === this.totalDownloads; 
		} 

		public calculatePercentage() : number {
			//TODO: consider subscope and such 
			return this.finishedDownloads / this.totalDownloads; 
		}
		
		public $load(options : ILoadOptions) : IScope {		
			var url = options.url; 
			var transform = options.transform || identity;
			var scopeName = options.scope;

			var loaded = (data) => {
				var result = transform(data); 
				this.setBodyData(scopeName, result); 
				this.finishedDownloads++; 

				this.onUpdate(url, this.calculatePercentage()); 
				if(this.isDone()) {
					this.onDone();     
				}
			}; 
	
			this.totalDownloads++; 
			simpleAjaxCall(url, loaded, this.onError); 

			return this; 
		}
	}

	export function Queue(options : IQueueCallbacks) : IScope {
		var publicUpdate   = options.update   || nop; 
		var publicError    = options.error    || nop; 
		var publicFinished = options.finished || yieldError('must define a finished callback.'); 

		var motherObj = {
			MOTHER : null
		}; 

		var callbacks : IScopeCallbacks = {
			update : (f,p) => publicUpdate(f,p), 
			error  : (url, error) => publicError(url, error), 
			done   : () => publicFinished(motherObj.MOTHER)
		};

		var motherScope = new Scope(motherObj, 'MOTHER', callbacks); 
		return motherScope; 
	}
} 

#endif 
