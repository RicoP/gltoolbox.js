var loadmanager = (function() { 
	function nop() {
	} 

	var loadFilesDefault = {
		//list of files with schema ["path1", "path2", ...]
		"files" : [], 
		//function (lastFileLoaded, percentage [0..1])
		"update" : nop, 
		//function ([{file:"file1",blob:"blob1"},{file:"file2",blob:"blob2"},...])
		"finished" : nop, 
		//function (file, error)
		"error" : nop
	};

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

	function loadFiles(options) {
		if(!options) throw new Error("Passed nothing in loadFiles"); 

		var files    = options.files    || loadFilesDefault.files; 
		var update   = options.update   || loadFilesDefault.update; 
		var finished = options.finished || loadFilesDefault.finished; 
		var error    = options.error    || loadFilesDefault.error; 

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
				fileIsPicture(file, function(picture) {
					if(picture) {
						var image = new Image(); 
						image.onload = function() {
							fileLoaded(file, image); 
						}; 
						image.onerror = function() {
							fileFailed(file, ""); 
						};
						image.src = file; 				
					}
					else {
						Zepto.ajax({
							"url" : file, 
							"success" : function(data, stat, xhr) {
								fileLoaded(file, data); 
							},
							"error" : function(xhr, errorType, error) {
								fileFailed(file, error || errorType); 
							}
						}); 
					}
				});
			}(file));
		}
	}

	return {
		"loadFiles" : loadFiles 
	}; 
}()); 
