GLT.loadmanager.loadstack({
	'files' : {
		'img/texture.png' : 'skytexture', 
		'model.json' : function(data, loadcontext) {
			loadcontext.add(data.texturePath, "texture"); 
			loadcontext.add(data.objfilePath, "modeldata"); 
			return 'myModel'; 
		}, 
		'level.json' : 'level1'
	}, 
	'update' : function(perc) {
		console.log('loaded:', 100 * perc, '%'); 
	},
	'error' : function(e) {
		console.error(e.message || e); 
	},
	'finished' : function(files) {
		glSkytexture   = createGlTexture(files.skytexture); 
		glModelTexture = createGlTexture(files.myModel.texture); 
		glModelData    = files.myModel.modeldata; 
		currentLevel   = files.level1; 
		startGame(); 
	}
});

GLT.loadmanager.Queue({ update : update, finished : finished, error : error})
	.$load({url : 'highscore.json', scope : 'highscore'})
	.$load({url : 'skyTexture.jpg', scope : 'texSky', transform : (image) => createGLTexture(image)})	
	.$load({url : 'game.json', append : (game, scope) => {
		scope
			.$load({ url : game.pathToCharObj, scope : 'character', append : (objtext, scope) => {
				var mesh = scope.mesh = GLT.obj.parse(objtext); 
				scope.$load({ url : mesh.material, scope : 'material', transform : (materialText) => GLT.obj.parseMTL(materialText) }); 
			}})
			.$load({ url : game.pathToCharTex, scope : 'character', append : (image, scope) => {
				scope.texture = createGLTexture(image); 
			}});
	}})


result:

{
	'highscore' : HIGHSCORE, 
	'texSky'    : SKYTEXTURE, 
	'character' : {
		mesh     : OBJ, 
		material : MATERIAL,
		texture  : TEXTURE
	}
}

