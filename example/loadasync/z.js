UTIL.loadmanager.loadFiles({
	"files" : ["json.json", "sphere.obj", "link.gif"],
	"update" : function(file, p) {
		console.log("loaded file " + file + " " + ~~(p*100) + "%"); 
	},
	"finished" : function(files) {
		console.log("files : ", files);  
	},
	"error" : function(file, error) {
		console.log("ERROR at file " + file + " : " + error); 
	}
});



