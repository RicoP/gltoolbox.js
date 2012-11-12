#ifndef MATRIXSTACK_TS
#define MATRIXSTACK_TS

module GLT {
	var MAX_STACK = 1024
	var MATRIX_SIZE = 16;

	var identity = new Float32Array([
		1,0,0,0,
		0,1,0,0,
		0,0,1,0,
		0,0,0,1]);

	var zero = new Float32Array([
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0]);

	export class MatrixStack {
		private buffer  : Float32Array;
		private stack   : Float32Array[];
		private pointer : number;
		private size    : number;

		constructor(size : number = MAX_STACK) {
			this.buffer  = new Float32Array(MATRIX_SIZE * size);
			this.stack   = [];
			this.pointer = 0;
			this.size    = size;

			var j=0;
			for(var i = 0; i < this.buffer.length; i += MATRIX_SIZE) {
				this.stack[j++] = this.buffer.subarray(i, i+MATRIX_SIZE);
			}
		}

		public push(copymat) {
			if(this.pointer === this.size-1) {
				throw new Error("Overflow");
			}

			var p = this.pointer++;
			var mat = this.stack[p];

			if(typeof copymat !== "undefined") {
				mat[0] = copymat[0];   mat[1] = copymat[1];   mat[2] = copymat[2];   mat[3] = copymat[3]; 
				mat[4] = copymat[4];   mat[5] = copymat[5];   mat[6] = copymat[6];   mat[7] = copymat[7]; 
				mat[8] = copymat[8];   mat[9] = copymat[9];   mat[10] = copymat[10]; mat[11] = copymat[11]; 
				mat[12] = copymat[12]; mat[13] = copymat[13]; mat[14] = copymat[14]; mat[15] = copymat[15]; 
			}

			return mat; 
		}

		public pop() {
			if(this.pointer === 0) {
				throw new Error("Underflow");
			}

			this.pointer--;
		}

		public pushIdentity() {
			return this.push(identity);
		}

		public pushZero() {
			return this.push(zero);
		}
	}
}

#endif 
