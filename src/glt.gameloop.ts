#ifndef GLT_GAMELOOP_TS 
#define GLT_GAMELOOP_TS

#include "glt.keys.ts" 

module GLT {
	"use strict"; 

	window.requestAnimationFrame =
		window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ) {
			window.setTimeout(callback, 16);
		};

	var perfnow = (function() {
		return (
			(performance && performance.now)         ? function() { return performance.now();       }
			: (performance && performance.webkitNow) ? function() { return performance.webkitNow(); }
			: (performance && performance.mozNow)    ? function() { return performance.mozNow();    }
			: (performance && performance.oNow)      ? function() { return performance.oNow();      }
			: (Date.now)                             ? function() { return Date.now();              }
			: function() { return +new Date(); }
		)
	}());

	export class GameTime {
		public total : number = 0;
		public delta : number = 0;
		public frame : number = 0;
		public last  : number = 0;

		constructor() {
			this.last  = perfnow() * 0.001;
		}

		reset() {
			this.total = 0;
			this.delta = 0;
			this.frame = 0;
			this.last  = perfnow() * 0.001;
		}
	}

	export class Gameloop {
		private gametime : GameTime; 	
		private rafid    : number = -1;
		private canvas   : HTMLCanvasElement; 

		constructor(private gl : WebGLRenderingContext, private callback : (gl : WebGLRenderingContext, gametime : GameTime) => void) {
			this.gametime = new GameTime();
		}

		private innerCallback() {
			var now = perfnow() * 0.001; 
			this.gametime.delta = now - this.gametime.last; 
			this.gametime.total += this.gametime.delta; 
			this.gametime.last = now; 
			this.gametime.frame++; 		

			window.requestAnimationFrame(this.innerCallback, this.canvas); 
			this.callback(this.gl, this.gametime); 
			GLT.keys.update(); 
		}

		public start() {
			if(this.rafid !== -1) {
				this.rafid = window.requestAnimationFrame(this.innerCallback, this.canvas); 
			}
		}
	}
} 

#endif 
