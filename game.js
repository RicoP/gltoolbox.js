var gl; 

(function() { 
"use strict"; 
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
 * @author Brandon Jones
 * @version 1.2.3
 */

/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

"use strict";

// Type declarations
(function() {
    // account for CommonJS environments
    var _global = (typeof(exports) != 'undefined') ? global : window;
    _global.glMatrixArrayType = _global.MatrixArray = null;

    /**
     * @class 3 Dimensional Vector
     * @name vec3
     */
    _global.vec3 = {};

    /**
     * @class 3x3 Matrix
     * @name mat3
     */
    _global.mat3 = {};

    /**
     * @class 4x4 Matrix
     * @name mat4
     */
    _global.mat4 = {};

    /**
     * @class Quaternion
     * @name quat4
     */
    _global.quat4 = {};

    // explicitly sets and returns the type of array to use within glMatrix
    _global.setMatrixArrayType = function(type) {
        return glMatrixArrayType = MatrixArray = type;
    };

    // auto-detects and returns the best type of array to use within glMatrix, falling
    // back to Array if typed arrays are unsupported
    _global.determineMatrixArrayType = function() {
        return setMatrixArrayType((typeof Float32Array !== 'undefined') ? Float32Array : Array);
    };

    determineMatrixArrayType();
})();

/*
 * vec3
 */
 
/**
 * Creates a new instance of a vec3 using the default array type
 * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
 *
 * @param {vec3} [vec] vec3 containing values to initialize with
 *
 * @returns {vec3} New vec3
 */
vec3.create = function (vec) {
    var dest = new MatrixArray(3);

    if (vec) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        dest[2] = vec[2];
    } else {
        dest[0] = dest[1] = dest[2] = 0;
    }

    return dest;
};

/**
 * Copies the values of one vec3 to another
 *
 * @param {vec3} vec vec3 containing values to copy
 * @param {vec3} dest vec3 receiving copied values
 *
 * @returns {vec3} dest
 */
vec3.set = function (vec, dest) {
    dest[0] = vec[0];
    dest[1] = vec[1];
    dest[2] = vec[2];

    return dest;
};

/**
 * Performs a vector addition
 *
 * @param {vec3} vec First operand
 * @param {vec3} vec2 Second operand
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.add = function (vec, vec2, dest) {
    if (!dest || vec === dest) {
        vec[0] += vec2[0];
        vec[1] += vec2[1];
        vec[2] += vec2[2];
        return vec;
    }

    dest[0] = vec[0] + vec2[0];
    dest[1] = vec[1] + vec2[1];
    dest[2] = vec[2] + vec2[2];
    return dest;
};

/**
 * Performs a vector subtraction
 *
 * @param {vec3} vec First operand
 * @param {vec3} vec2 Second operand
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.subtract = function (vec, vec2, dest) {
    if (!dest || vec === dest) {
        vec[0] -= vec2[0];
        vec[1] -= vec2[1];
        vec[2] -= vec2[2];
        return vec;
    }

    dest[0] = vec[0] - vec2[0];
    dest[1] = vec[1] - vec2[1];
    dest[2] = vec[2] - vec2[2];
    return dest;
};

/**
 * Performs a vector multiplication
 *
 * @param {vec3} vec First operand
 * @param {vec3} vec2 Second operand
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.multiply = function (vec, vec2, dest) {
    if (!dest || vec === dest) {
        vec[0] *= vec2[0];
        vec[1] *= vec2[1];
        vec[2] *= vec2[2];
        return vec;
    }

    dest[0] = vec[0] * vec2[0];
    dest[1] = vec[1] * vec2[1];
    dest[2] = vec[2] * vec2[2];
    return dest;
};

/**
 * Negates the components of a vec3
 *
 * @param {vec3} vec vec3 to negate
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.negate = function (vec, dest) {
    if (!dest) { dest = vec; }

    dest[0] = -vec[0];
    dest[1] = -vec[1];
    dest[2] = -vec[2];
    return dest;
};

/**
 * Multiplies the components of a vec3 by a scalar value
 *
 * @param {vec3} vec vec3 to scale
 * @param {number} val Value to scale by
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.scale = function (vec, val, dest) {
    if (!dest || vec === dest) {
        vec[0] *= val;
        vec[1] *= val;
        vec[2] *= val;
        return vec;
    }

    dest[0] = vec[0] * val;
    dest[1] = vec[1] * val;
    dest[2] = vec[2] * val;
    return dest;
};

/**
 * Generates a unit vector of the same direction as the provided vec3
 * If vector length is 0, returns [0, 0, 0]
 *
 * @param {vec3} vec vec3 to normalize
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.normalize = function (vec, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2],
        len = Math.sqrt(x * x + y * y + z * z);

    if (!len) {
        dest[0] = 0;
        dest[1] = 0;
        dest[2] = 0;
        return dest;
    } else if (len === 1) {
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        return dest;
    }

    len = 1 / len;
    dest[0] = x * len;
    dest[1] = y * len;
    dest[2] = z * len;
    return dest;
};

/**
 * Generates the cross product of two vec3s
 *
 * @param {vec3} vec First operand
 * @param {vec3} vec2 Second operand
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.cross = function (vec, vec2, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2],
        x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];

    dest[0] = y * z2 - z * y2;
    dest[1] = z * x2 - x * z2;
    dest[2] = x * y2 - y * x2;
    return dest;
};

/**
 * Caclulates the length of a vec3
 *
 * @param {vec3} vec vec3 to calculate length of
 *
 * @returns {number} Length of vec
 */
vec3.length = function (vec) {
    var x = vec[0], y = vec[1], z = vec[2];
    return Math.sqrt(x * x + y * y + z * z);
};

/**
 * Caclulates the dot product of two vec3s
 *
 * @param {vec3} vec First operand
 * @param {vec3} vec2 Second operand
 *
 * @returns {number} Dot product of vec and vec2
 */
vec3.dot = function (vec, vec2) {
    return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
};

/**
 * Generates a unit vector pointing from one vector to another
 *
 * @param {vec3} vec Origin vec3
 * @param {vec3} vec2 vec3 to point to
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.direction = function (vec, vec2, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0] - vec2[0],
        y = vec[1] - vec2[1],
        z = vec[2] - vec2[2],
        len = Math.sqrt(x * x + y * y + z * z);

    if (!len) {
        dest[0] = 0;
        dest[1] = 0;
        dest[2] = 0;
        return dest;
    }

    len = 1 / len;
    dest[0] = x * len;
    dest[1] = y * len;
    dest[2] = z * len;
    return dest;
};

/**
 * Performs a linear interpolation between two vec3
 *
 * @param {vec3} vec First vector
 * @param {vec3} vec2 Second vector
 * @param {number} lerp Interpolation amount between the two inputs
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.lerp = function (vec, vec2, lerp, dest) {
    if (!dest) { dest = vec; }

    dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
    dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
    dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);

    return dest;
};

/**
 * Calculates the euclidian distance between two vec3
 *
 * Params:
 * @param {vec3} vec First vector
 * @param {vec3} vec2 Second vector
 *
 * @returns {number} Distance between vec and vec2
 */
vec3.dist = function (vec, vec2) {
    var x = vec2[0] - vec[0],
        y = vec2[1] - vec[1],
        z = vec2[2] - vec[2];
        
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Projects the specified vec3 from screen space into object space
 * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
 *
 * @param {vec3} vec Screen-space vector to project
 * @param {mat4} view View matrix
 * @param {mat4} proj Projection matrix
 * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
 * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
vec3.unproject = function (vec, view, proj, viewport, dest) {
    if (!dest) { dest = vec; }

    var m = mat4.create();
    var v = new MatrixArray(4);
    
    v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
    v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
    v[2] = 2.0 * vec[2] - 1.0;
    v[3] = 1.0;
    
    mat4.multiply(proj, view, m);
    if(!mat4.inverse(m)) { return null; }
    
    mat4.multiplyVec4(m, v);
    if(v[3] === 0.0) { return null; }

    dest[0] = v[0] / v[3];
    dest[1] = v[1] / v[3];
    dest[2] = v[2] / v[3];
    
    return dest;
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec Vector to represent as a string
 *
 * @returns {string} String representation of vec
 */
vec3.str = function (vec) {
    return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
};

/*
 * mat3
 */

/**
 * Creates a new instance of a mat3 using the default array type
 * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
 *
 * @param {mat3} [mat] mat3 containing values to initialize with
 *
 * @returns {mat3} New mat3
 */
mat3.create = function (mat) {
    var dest = new MatrixArray(9);

    if (mat) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
    }

    return dest;
};

/**
 * Copies the values of one mat3 to another
 *
 * @param {mat3} mat mat3 containing values to copy
 * @param {mat3} dest mat3 receiving copied values
 *
 * @returns {mat3} dest
 */
mat3.set = function (mat, dest) {
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    dest[8] = mat[8];
    return dest;
};

/**
 * Sets a mat3 to an identity matrix
 *
 * @param {mat3} dest mat3 to set
 *
 * @returns dest if specified, otherwise a new mat3
 */
mat3.identity = function (dest) {
    if (!dest) { dest = mat3.create(); }
    dest[0] = 1;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 1;
    dest[5] = 0;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 1;
    return dest;
};

/**
 * Transposes a mat3 (flips the values over the diagonal)
 *
 * Params:
 * @param {mat3} mat mat3 to transpose
 * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
 *
 * @returns {mat3} dest is specified, mat otherwise
 */
mat3.transpose = function (mat, dest) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!dest || mat === dest) {
        var a01 = mat[1], a02 = mat[2],
            a12 = mat[5];

        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
        return mat;
    }

    dest[0] = mat[0];
    dest[1] = mat[3];
    dest[2] = mat[6];
    dest[3] = mat[1];
    dest[4] = mat[4];
    dest[5] = mat[7];
    dest[6] = mat[2];
    dest[7] = mat[5];
    dest[8] = mat[8];
    return dest;
};

/**
 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
 *
 * @param {mat3} mat mat3 containing values to copy
 * @param {mat4} [dest] mat4 receiving copied values
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat3.toMat4 = function (mat, dest) {
    if (!dest) { dest = mat4.create(); }

    dest[15] = 1;
    dest[14] = 0;
    dest[13] = 0;
    dest[12] = 0;

    dest[11] = 0;
    dest[10] = mat[8];
    dest[9] = mat[7];
    dest[8] = mat[6];

    dest[7] = 0;
    dest[6] = mat[5];
    dest[5] = mat[4];
    dest[4] = mat[3];

    dest[3] = 0;
    dest[2] = mat[2];
    dest[1] = mat[1];
    dest[0] = mat[0];

    return dest;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat mat3 to represent as a string
 *
 * @param {string} String representation of mat
 */
mat3.str = function (mat) {
    return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] +
        ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] +
        ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
};

/*
 * mat4
 */

/**
 * Creates a new instance of a mat4 using the default array type
 * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
 *
 * @param {mat4} [mat] mat4 containing values to initialize with
 *
 * @returns {mat4} New mat4
 */
mat4.create = function (mat) {
    var dest = new MatrixArray(16);

    if (mat) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
    }

    return dest;
};

/**
 * Copies the values of one mat4 to another
 *
 * @param {mat4} mat mat4 containing values to copy
 * @param {mat4} dest mat4 receiving copied values
 *
 * @returns {mat4} dest
 */
mat4.set = function (mat, dest) {
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    dest[8] = mat[8];
    dest[9] = mat[9];
    dest[10] = mat[10];
    dest[11] = mat[11];
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
    return dest;
};

/**
 * Sets a mat4 to an identity matrix
 *
 * @param {mat4} dest mat4 to set
 *
 * @returns {mat4} dest
 */
mat4.identity = function (dest) {
    if (!dest) { dest = mat4.create(); }
    dest[0] = 1;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = 1;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = 1;
    dest[11] = 0;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;
    return dest;
};

/**
 * Transposes a mat4 (flips the values over the diagonal)
 *
 * @param {mat4} mat mat4 to transpose
 * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
 *
 * @param {mat4} dest is specified, mat otherwise
 */
mat4.transpose = function (mat, dest) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!dest || mat === dest) {
        var a01 = mat[1], a02 = mat[2], a03 = mat[3],
            a12 = mat[6], a13 = mat[7],
            a23 = mat[11];

        mat[1] = mat[4];
        mat[2] = mat[8];
        mat[3] = mat[12];
        mat[4] = a01;
        mat[6] = mat[9];
        mat[7] = mat[13];
        mat[8] = a02;
        mat[9] = a12;
        mat[11] = mat[14];
        mat[12] = a03;
        mat[13] = a13;
        mat[14] = a23;
        return mat;
    }

    dest[0] = mat[0];
    dest[1] = mat[4];
    dest[2] = mat[8];
    dest[3] = mat[12];
    dest[4] = mat[1];
    dest[5] = mat[5];
    dest[6] = mat[9];
    dest[7] = mat[13];
    dest[8] = mat[2];
    dest[9] = mat[6];
    dest[10] = mat[10];
    dest[11] = mat[14];
    dest[12] = mat[3];
    dest[13] = mat[7];
    dest[14] = mat[11];
    dest[15] = mat[15];
    return dest;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} mat mat4 to calculate determinant of
 *
 * @returns {number} determinant of mat
 */
mat4.determinant = function (mat) {
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

    return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
            a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
            a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
            a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
            a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
            a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
};

/**
 * Calculates the inverse matrix of a mat4
 *
 * @param {mat4} mat mat4 to calculate inverse of
 * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
 *
 * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
 */
mat4.inverse = function (mat, dest) {
    if (!dest) { dest = mat; }

    // Cache the matrix values (makes for huge speed increases!)
    var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
        invDet;

        // Calculate the determinant
        if (!d) { return null; }
        invDet = 1 / d;

    dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
    dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
    dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
    dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
    dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
    dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
    dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
    dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
    dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
    dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
    dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
    dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
    dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
    dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
    dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
    dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

    return dest;
};

/**
 * Copies the upper 3x3 elements of a mat4 into another mat4
 *
 * @param {mat4} mat mat4 containing values to copy
 * @param {mat4} [dest] mat4 receiving copied values
 *
 * @returns {mat4} dest is specified, a new mat4 otherwise
 */
mat4.toRotationMat = function (mat, dest) {
    if (!dest) { dest = mat4.create(); }

    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    dest[8] = mat[8];
    dest[9] = mat[9];
    dest[10] = mat[10];
    dest[11] = mat[11];
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;

    return dest;
};

/**
 * Copies the upper 3x3 elements of a mat4 into a mat3
 *
 * @param {mat4} mat mat4 containing values to copy
 * @param {mat3} [dest] mat3 receiving copied values
 *
 * @returns {mat3} dest is specified, a new mat3 otherwise
 */
mat4.toMat3 = function (mat, dest) {
    if (!dest) { dest = mat3.create(); }

    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[4];
    dest[4] = mat[5];
    dest[5] = mat[6];
    dest[6] = mat[8];
    dest[7] = mat[9];
    dest[8] = mat[10];

    return dest;
};

/**
 * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
 * The resulting matrix is useful for calculating transformed normals
 *
 * Params:
 * @param {mat4} mat mat4 containing values to invert and copy
 * @param {mat3} [dest] mat3 receiving values
 *
 * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
 */
mat4.toInverseMat3 = function (mat, dest) {
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = mat[0], a01 = mat[1], a02 = mat[2],
        a10 = mat[4], a11 = mat[5], a12 = mat[6],
        a20 = mat[8], a21 = mat[9], a22 = mat[10],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        d = a00 * b01 + a01 * b11 + a02 * b21,
        id;

    if (!d) { return null; }
    id = 1 / d;

    if (!dest) { dest = mat3.create(); }

    dest[0] = b01 * id;
    dest[1] = (-a22 * a01 + a02 * a21) * id;
    dest[2] = (a12 * a01 - a02 * a11) * id;
    dest[3] = b11 * id;
    dest[4] = (a22 * a00 - a02 * a20) * id;
    dest[5] = (-a12 * a00 + a02 * a10) * id;
    dest[6] = b21 * id;
    dest[7] = (-a21 * a00 + a01 * a20) * id;
    dest[8] = (a11 * a00 - a01 * a10) * id;

    return dest;
};

/**
 * Performs a matrix multiplication
 *
 * @param {mat4} mat First operand
 * @param {mat4} mat2 Second operand
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.multiply = function (mat, mat2, dest) {
    if (!dest) { dest = mat; }

    // Cache the matrix values (makes for huge speed increases!)
    var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
        a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
        a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
        a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

        b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3],
        b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7],
        b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11],
        b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];

    dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

    return dest;
};

/**
 * Transforms a vec3 with the given matrix
 * 4th vector component is implicitly '1'
 *
 * @param {mat4} mat mat4 to transform the vector with
 * @param {vec3} vec vec3 to transform
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec3} dest if specified, vec otherwise
 */
mat4.multiplyVec3 = function (mat, vec, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2];

    dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
    dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
    dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];

    return dest;
};

/**
 * Transforms a vec4 with the given matrix
 *
 * @param {mat4} mat mat4 to transform the vector with
 * @param {vec4} vec vec4 to transform
 * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
 *
 * @returns {vec4} dest if specified, vec otherwise
 */
mat4.multiplyVec4 = function (mat, vec, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2], w = vec[3];

    dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
    dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
    dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
    dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;

    return dest;
};

/**
 * Translates a matrix by the given vector
 *
 * @param {mat4} mat mat4 to translate
 * @param {vec3} vec vec3 specifying the translation
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.translate = function (mat, vec, dest) {
    var x = vec[0], y = vec[1], z = vec[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (!dest || mat === dest) {
        mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
        mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
        return mat;
    }

    a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
    a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
    a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

    dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
    dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
    dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;

    dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
    dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
    dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
    dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
    return dest;
};

/**
 * Scales a matrix by the given vector
 *
 * @param {mat4} mat mat4 to scale
 * @param {vec3} vec vec3 specifying the scale for each axis
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @param {mat4} dest if specified, mat otherwise
 */
mat4.scale = function (mat, vec, dest) {
    var x = vec[0], y = vec[1], z = vec[2];

    if (!dest || mat === dest) {
        mat[0] *= x;
        mat[1] *= x;
        mat[2] *= x;
        mat[3] *= x;
        mat[4] *= y;
        mat[5] *= y;
        mat[6] *= y;
        mat[7] *= y;
        mat[8] *= z;
        mat[9] *= z;
        mat[10] *= z;
        mat[11] *= z;
        return mat;
    }

    dest[0] = mat[0] * x;
    dest[1] = mat[1] * x;
    dest[2] = mat[2] * x;
    dest[3] = mat[3] * x;
    dest[4] = mat[4] * y;
    dest[5] = mat[5] * y;
    dest[6] = mat[6] * y;
    dest[7] = mat[7] * y;
    dest[8] = mat[8] * z;
    dest[9] = mat[9] * z;
    dest[10] = mat[10] * z;
    dest[11] = mat[11] * z;
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
    return dest;
};

/**
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {vec3} axis vec3 representing the axis to rotate around 
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.rotate = function (mat, angle, axis, dest) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (!len) { return null; }
    if (len !== 1) {
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
    }

    s = Math.sin(angle);
    c = Math.cos(angle);
    t = 1 - c;

    a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
    a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
    a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    if (!dest) {
        dest = mat;
    } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
    }

    // Perform rotation-specific matrix multiplication
    dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
    dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
    dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
    dest[3] = a03 * b00 + a13 * b01 + a23 * b02;

    dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
    dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
    dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
    dest[7] = a03 * b10 + a13 * b11 + a23 * b12;

    dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
    dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
    dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
    dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
    return dest;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.rotateX = function (mat, angle, dest) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a10 = mat[4],
        a11 = mat[5],
        a12 = mat[6],
        a13 = mat[7],
        a20 = mat[8],
        a21 = mat[9],
        a22 = mat[10],
        a23 = mat[11];

    if (!dest) {
        dest = mat;
    } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];

        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
    }

    // Perform axis-specific matrix multiplication
    dest[4] = a10 * c + a20 * s;
    dest[5] = a11 * c + a21 * s;
    dest[6] = a12 * c + a22 * s;
    dest[7] = a13 * c + a23 * s;

    dest[8] = a10 * -s + a20 * c;
    dest[9] = a11 * -s + a21 * c;
    dest[10] = a12 * -s + a22 * c;
    dest[11] = a13 * -s + a23 * c;
    return dest;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.rotateY = function (mat, angle, dest) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a00 = mat[0],
        a01 = mat[1],
        a02 = mat[2],
        a03 = mat[3],
        a20 = mat[8],
        a21 = mat[9],
        a22 = mat[10],
        a23 = mat[11];

    if (!dest) {
        dest = mat;
    } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];

        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
    }

    // Perform axis-specific matrix multiplication
    dest[0] = a00 * c + a20 * -s;
    dest[1] = a01 * c + a21 * -s;
    dest[2] = a02 * c + a22 * -s;
    dest[3] = a03 * c + a23 * -s;

    dest[8] = a00 * s + a20 * c;
    dest[9] = a01 * s + a21 * c;
    dest[10] = a02 * s + a22 * c;
    dest[11] = a03 * s + a23 * c;
    return dest;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} mat mat4 to rotate
 * @param {number} angle Angle (in radians) to rotate
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
 *
 * @returns {mat4} dest if specified, mat otherwise
 */
mat4.rotateZ = function (mat, angle, dest) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a00 = mat[0],
        a01 = mat[1],
        a02 = mat[2],
        a03 = mat[3],
        a10 = mat[4],
        a11 = mat[5],
        a12 = mat[6],
        a13 = mat[7];

    if (!dest) {
        dest = mat;
    } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];

        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
    }

    // Perform axis-specific matrix multiplication
    dest[0] = a00 * c + a10 * s;
    dest[1] = a01 * c + a11 * s;
    dest[2] = a02 * c + a12 * s;
    dest[3] = a03 * c + a13 * s;

    dest[4] = a00 * -s + a10 * c;
    dest[5] = a01 * -s + a11 * c;
    dest[6] = a02 * -s + a12 * c;
    dest[7] = a03 * -s + a13 * c;

    return dest;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @param {mat4} [dest] mat4 frustum matrix will be written into
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat4.frustum = function (left, right, bottom, top, near, far, dest) {
    if (!dest) { dest = mat4.create(); }
    var rl = (right - left),
        tb = (top - bottom),
        fn = (far - near);
    dest[0] = (near * 2) / rl;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = (near * 2) / tb;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = (right + left) / rl;
    dest[9] = (top + bottom) / tb;
    dest[10] = -(far + near) / fn;
    dest[11] = -1;
    dest[12] = 0;
    dest[13] = 0;
    dest[14] = -(far * near * 2) / fn;
    dest[15] = 0;
    return dest;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {number} fovy Vertical field of view
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @param {mat4} [dest] mat4 frustum matrix will be written into
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat4.perspective = function (fovy, aspect, near, far, dest) {
    var top = near * Math.tan(fovy * Math.PI / 360.0),
        right = top * aspect;
    return mat4.frustum(-right, right, -top, top, near, far, dest);
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @param {mat4} [dest] mat4 frustum matrix will be written into
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat4.ortho = function (left, right, bottom, top, near, far, dest) {
    if (!dest) { dest = mat4.create(); }
    var rl = (right - left),
        tb = (top - bottom),
        fn = (far - near);
    dest[0] = 2 / rl;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    dest[4] = 0;
    dest[5] = 2 / tb;
    dest[6] = 0;
    dest[7] = 0;
    dest[8] = 0;
    dest[9] = 0;
    dest[10] = -2 / fn;
    dest[11] = 0;
    dest[12] = -(left + right) / rl;
    dest[13] = -(top + bottom) / tb;
    dest[14] = -(far + near) / fn;
    dest[15] = 1;
    return dest;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing "up"
 * @param {mat4} [dest] mat4 frustum matrix will be written into
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat4.lookAt = function (eye, center, up, dest) {
    if (!dest) { dest = mat4.create(); }

    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (eyex === centerx && eyey === centery && eyez === centerz) {
        return mat4.identity(dest);
    }

    //vec3.direction(eye, center, z);
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    // normalize (no check needed for 0 because of early return)
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    //vec3.normalize(vec3.cross(up, z, x));
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    //vec3.normalize(vec3.cross(z, x, y));
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    dest[0] = x0;
    dest[1] = y0;
    dest[2] = z0;
    dest[3] = 0;
    dest[4] = x1;
    dest[5] = y1;
    dest[6] = z1;
    dest[7] = 0;
    dest[8] = x2;
    dest[9] = y2;
    dest[10] = z2;
    dest[11] = 0;
    dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    dest[15] = 1;

    return dest;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {quat4} quat Rotation quaternion
 * @param {vec3} vec Translation vector
 * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
mat4.fromRotationTranslation = function (quat, vec, dest) {
    if (!dest) { dest = mat4.create(); }

    // Quaternion math
    var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    dest[0] = 1 - (yy + zz);
    dest[1] = xy + wz;
    dest[2] = xz - wy;
    dest[3] = 0;
    dest[4] = xy - wz;
    dest[5] = 1 - (xx + zz);
    dest[6] = yz + wx;
    dest[7] = 0;
    dest[8] = xz + wy;
    dest[9] = yz - wx;
    dest[10] = 1 - (xx + yy);
    dest[11] = 0;
    dest[12] = vec[0];
    dest[13] = vec[1];
    dest[14] = vec[2];
    dest[15] = 1;
    
    return dest;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat mat4 to represent as a string
 *
 * @returns {string} String representation of mat
 */
mat4.str = function (mat) {
    return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
        ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
        ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
        ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
};

/*
 * quat4
 */

/**
 * Creates a new instance of a quat4 using the default array type
 * Any javascript array containing at least 4 numeric elements can serve as a quat4
 *
 * @param {quat4} [quat] quat4 containing values to initialize with
 *
 * @returns {quat4} New quat4
 */
quat4.create = function (quat) {
    var dest = new MatrixArray(4);

    if (quat) {
        dest[0] = quat[0];
        dest[1] = quat[1];
        dest[2] = quat[2];
        dest[3] = quat[3];
    }

    return dest;
};

/**
 * Copies the values of one quat4 to another
 *
 * @param {quat4} quat quat4 containing values to copy
 * @param {quat4} dest quat4 receiving copied values
 *
 * @returns {quat4} dest
 */
quat4.set = function (quat, dest) {
    dest[0] = quat[0];
    dest[1] = quat[1];
    dest[2] = quat[2];
    dest[3] = quat[3];

    return dest;
};

/**
 * Calculates the W component of a quat4 from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length. 
 * Any existing W component will be ignored. 
 *
 * @param {quat4} quat quat4 to calculate W component of
 * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.calculateW = function (quat, dest) {
    var x = quat[0], y = quat[1], z = quat[2];

    if (!dest || quat === dest) {
        quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return quat;
    }
    dest[0] = x;
    dest[1] = y;
    dest[2] = z;
    dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return dest;
};

/**
 * Calculates the dot product of two quaternions
 *
 * @param {quat4} quat First operand
 * @param {quat4} quat2 Second operand
 *
 * @return {number} Dot product of quat and quat2
 */
quat4.dot = function(quat, quat2){
    return quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
};

/**
 * Calculates the inverse of a quat4
 *
 * @param {quat4} quat quat4 to calculate inverse of
 * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.inverse = function(quat, dest) {
    var q0 = quat[0], q1 = quat[1], q2 = quat[2], q3 = quat[3],
        dot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
    
    if(!dest || quat === dest) {
        quat[0] *= -invDot;
        quat[1] *= -invDot;
        quat[2] *= -invDot;
        quat[3] *= invDot;
        return quat;
    }
    dest[0] = -quat[0]*invDot;
    dest[1] = -quat[1]*invDot;
    dest[2] = -quat[2]*invDot;
    dest[3] = quat[3]*invDot;
    return dest;
};


/**
 * Calculates the conjugate of a quat4
 * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
 *
 * @param {quat4} quat quat4 to calculate conjugate of
 * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.conjugate = function (quat, dest) {
    if (!dest || quat === dest) {
        quat[0] *= -1;
        quat[1] *= -1;
        quat[2] *= -1;
        return quat;
    }
    dest[0] = -quat[0];
    dest[1] = -quat[1];
    dest[2] = -quat[2];
    dest[3] = quat[3];
    return dest;
};

/**
 * Calculates the length of a quat4
 *
 * Params:
 * @param {quat4} quat quat4 to calculate length of
 *
 * @returns Length of quat
 */
quat4.length = function (quat) {
    var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
};

/**
 * Generates a unit quaternion of the same direction as the provided quat4
 * If quaternion length is 0, returns [0, 0, 0, 0]
 *
 * @param {quat4} quat quat4 to normalize
 * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.normalize = function (quat, dest) {
    if (!dest) { dest = quat; }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
        len = Math.sqrt(x * x + y * y + z * z + w * w);
    if (len === 0) {
        dest[0] = 0;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        return dest;
    }
    len = 1 / len;
    dest[0] = x * len;
    dest[1] = y * len;
    dest[2] = z * len;
    dest[3] = w * len;

    return dest;
};

/**
 * Performs a quaternion multiplication
 *
 * @param {quat4} quat First operand
 * @param {quat4} quat2 Second operand
 * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.multiply = function (quat, quat2, dest) {
    if (!dest) { dest = quat; }

    var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
        qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];

    dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    return dest;
};

/**
 * Transforms a vec3 with the given quaternion
 *
 * @param {quat4} quat quat4 to transform the vector with
 * @param {vec3} vec vec3 to transform
 * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
 *
 * @returns dest if specified, vec otherwise
 */
quat4.multiplyVec3 = function (quat, vec, dest) {
    if (!dest) { dest = vec; }

    var x = vec[0], y = vec[1], z = vec[2],
        qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return dest;
};

/**
 * Calculates a 3x3 matrix from the given quat4
 *
 * @param {quat4} quat quat4 to create matrix from
 * @param {mat3} [dest] mat3 receiving operation result
 *
 * @returns {mat3} dest if specified, a new mat3 otherwise
 */
quat4.toMat3 = function (quat, dest) {
    if (!dest) { dest = mat3.create(); }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    dest[0] = 1 - (yy + zz);
    dest[1] = xy + wz;
    dest[2] = xz - wy;

    dest[3] = xy - wz;
    dest[4] = 1 - (xx + zz);
    dest[5] = yz + wx;

    dest[6] = xz + wy;
    dest[7] = yz - wx;
    dest[8] = 1 - (xx + yy);

    return dest;
};

/**
 * Calculates a 4x4 matrix from the given quat4
 *
 * @param {quat4} quat quat4 to create matrix from
 * @param {mat4} [dest] mat4 receiving operation result
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
quat4.toMat4 = function (quat, dest) {
    if (!dest) { dest = mat4.create(); }

    var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    dest[0] = 1 - (yy + zz);
    dest[1] = xy + wz;
    dest[2] = xz - wy;
    dest[3] = 0;

    dest[4] = xy - wz;
    dest[5] = 1 - (xx + zz);
    dest[6] = yz + wx;
    dest[7] = 0;

    dest[8] = xz + wy;
    dest[9] = yz - wx;
    dest[10] = 1 - (xx + yy);
    dest[11] = 0;

    dest[12] = 0;
    dest[13] = 0;
    dest[14] = 0;
    dest[15] = 1;

    return dest;
};

/**
 * Performs a spherical linear interpolation between two quat4
 *
 * @param {quat4} quat First quaternion
 * @param {quat4} quat2 Second quaternion
 * @param {number} slerp Interpolation amount between the two inputs
 * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
 *
 * @returns {quat4} dest if specified, quat otherwise
 */
quat4.slerp = function (quat, quat2, slerp, dest) {
    if (!dest) { dest = quat; }

    var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
        halfTheta,
        sinHalfTheta,
        ratioA,
        ratioB;

    if (Math.abs(cosHalfTheta) >= 1.0) {
        if (dest !== quat) {
            dest[0] = quat[0];
            dest[1] = quat[1];
            dest[2] = quat[2];
            dest[3] = quat[3];
        }
        return dest;
    }

    halfTheta = Math.acos(cosHalfTheta);
    sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
        dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
        dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
        dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
        dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
        return dest;
    }

    ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
    ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;

    dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
    dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
    dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
    dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);

    return dest;
};

/**
 * Returns a string representation of a quaternion
 *
 * @param {quat4} quat quat4 to represent as a string
 *
 * @returns {string} String representation of quat
 */
quat4.str = function (quat) {
    return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
};



/*
Copyright (c) 2012 Rico Possienka 

This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:

 - The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
 - Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
 - This notice may not be removed or altered from any source distribution.
*/
if(window["WebGLRenderingContext"]) {
	window["WebGLRenderingContext"]["prototype"]["getSafeContext"] = 
	(function (){
		"use strict"; 
		
		// var METHODS ... 
		/* this is autogenerated. Don't edit by hand! */ 
		var METHODS = 
		{"releaseShaderCompiler":[{"args":[]}],"getContextAttributes":[{"args":[]}],"isContextLost":[{"args":[]}],"getSupportedExtensions":[{"args":[]}],"getExtension":[{"args":[{"name":"name","type":"DOMString"}]}],"activeTexture":[{"args":[{"name":"texture","type":"GLenum"}]}],"attachShader":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"shader","type":"WebGLShader"}]}],"bindAttribLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"},{"name":"name","type":"DOMString"}]}],"bindBuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"buffer","type":"WebGLBuffer"}]}],"bindFramebuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"bindRenderbuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"bindTexture":[{"args":[{"name":"target","type":"GLenum"},{"name":"texture","type":"WebGLTexture"}]}],"blendColor":[{"args":[{"name":"red","type":"GLclampf"},{"name":"green","type":"GLclampf"},{"name":"blue","type":"GLclampf"},{"name":"alpha","type":"GLclampf"}]}],"blendEquation":[{"args":[{"name":"mode","type":"GLenum"}]}],"blendEquationSeparate":[{"args":[{"name":"modeRGB","type":"GLenum"},{"name":"modeAlpha","type":"GLenum"}]}],"blendFunc":[{"args":[{"name":"sfactor","type":"GLenum"},{"name":"dfactor","type":"GLenum"}]}],"blendFuncSeparate":[{"args":[{"name":"srcRGB","type":"GLenum"},{"name":"dstRGB","type":"GLenum"},{"name":"srcAlpha","type":"GLenum"},{"name":"dstAlpha","type":"GLenum"}]}],"bufferData":[{"args":[{"name":"target","type":"GLenum"},{"name":"size","type":"GLsizeiptr"},{"name":"usage","type":"GLenum"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"data","type":"ArrayBufferView"},{"name":"usage","type":"GLenum"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"data","type":"ArrayBuffer"},{"name":"usage","type":"GLenum"}]}],"bufferSubData":[{"args":[{"name":"target","type":"GLenum"},{"name":"offset","type":"GLintptr"},{"name":"data","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"offset","type":"GLintptr"},{"name":"data","type":"ArrayBuffer"}]}],"checkFramebufferStatus":[{"args":[{"name":"target","type":"GLenum"}]}],"clear":[{"args":[{"name":"mask","type":"GLbitfield"}]}],"clearColor":[{"args":[{"name":"red","type":"GLclampf"},{"name":"green","type":"GLclampf"},{"name":"blue","type":"GLclampf"},{"name":"alpha","type":"GLclampf"}]}],"clearDepth":[{"args":[{"name":"depth","type":"GLclampf"}]}],"clearStencil":[{"args":[{"name":"s","type":"GLint"}]}],"colorMask":[{"args":[{"name":"red","type":"GLboolean"},{"name":"green","type":"GLboolean"},{"name":"blue","type":"GLboolean"},{"name":"alpha","type":"GLboolean"}]}],"compileShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"copyTexImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"border","type":"GLint"}]}],"copyTexSubImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"createBuffer":[{"args":[]}],"createFramebuffer":[{"args":[]}],"createProgram":[{"args":[]}],"createRenderbuffer":[{"args":[]}],"createShader":[{"args":[{"name":"type","type":"GLenum"}]}],"createTexture":[{"args":[]}],"cullFace":[{"args":[{"name":"mode","type":"GLenum"}]}],"deleteBuffer":[{"args":[{"name":"buffer","type":"WebGLBuffer"}]}],"deleteFramebuffer":[{"args":[{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"deleteProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"deleteRenderbuffer":[{"args":[{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"deleteShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"deleteTexture":[{"args":[{"name":"texture","type":"WebGLTexture"}]}],"depthFunc":[{"args":[{"name":"func","type":"GLenum"}]}],"depthMask":[{"args":[{"name":"flag","type":"GLboolean"}]}],"depthRange":[{"args":[{"name":"zNear","type":"GLclampf"},{"name":"zFar","type":"GLclampf"}]}],"detachShader":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"shader","type":"WebGLShader"}]}],"disable":[{"args":[{"name":"cap","type":"GLenum"}]}],"disableVertexAttribArray":[{"args":[{"name":"index","type":"GLuint"}]}],"drawArrays":[{"args":[{"name":"mode","type":"GLenum"},{"name":"first","type":"GLint"},{"name":"count","type":"GLsizei"}]}],"drawElements":[{"args":[{"name":"mode","type":"GLenum"},{"name":"count","type":"GLsizei"},{"name":"type","type":"GLenum"},{"name":"offset","type":"GLintptr"}]}],"enable":[{"args":[{"name":"cap","type":"GLenum"}]}],"enableVertexAttribArray":[{"args":[{"name":"index","type":"GLuint"}]}],"finish":[{"args":[]}],"flush":[{"args":[]}],"framebufferRenderbuffer":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"renderbuffertarget","type":"GLenum"},{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"framebufferTexture2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"textarget","type":"GLenum"},{"name":"texture","type":"WebGLTexture"},{"name":"level","type":"GLint"}]}],"frontFace":[{"args":[{"name":"mode","type":"GLenum"}]}],"generateMipmap":[{"args":[{"name":"target","type":"GLenum"}]}],"getActiveAttrib":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"}]}],"getActiveUniform":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"index","type":"GLuint"}]}],"getAttachedShaders":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"getAttribLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"name","type":"DOMString"}]}],"getParameter":[{"args":[{"name":"pname","type":"GLenum"}]}],"getBufferParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getError":[{"args":[]}],"getFramebufferAttachmentParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"attachment","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getProgramParameter":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"pname","type":"GLenum"}]}],"getProgramInfoLog":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"getRenderbufferParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getShaderParameter":[{"args":[{"name":"shader","type":"WebGLShader"},{"name":"pname","type":"GLenum"}]}],"getShaderInfoLog":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"getShaderSource":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"getTexParameter":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"}]}],"getUniform":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"location","type":"WebGLUniformLocation"}]}],"getUniformLocation":[{"args":[{"name":"program","type":"WebGLProgram"},{"name":"name","type":"DOMString"}]}],"getVertexAttrib":[{"args":[{"name":"index","type":"GLuint"},{"name":"pname","type":"GLenum"}]}],"getVertexAttribOffset":[{"args":[{"name":"index","type":"GLuint"},{"name":"pname","type":"GLenum"}]}],"hint":[{"args":[{"name":"target","type":"GLenum"},{"name":"mode","type":"GLenum"}]}],"isBuffer":[{"args":[{"name":"buffer","type":"WebGLBuffer"}]}],"isEnabled":[{"args":[{"name":"cap","type":"GLenum"}]}],"isFramebuffer":[{"args":[{"name":"framebuffer","type":"WebGLFramebuffer"}]}],"isProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"isRenderbuffer":[{"args":[{"name":"renderbuffer","type":"WebGLRenderbuffer"}]}],"isShader":[{"args":[{"name":"shader","type":"WebGLShader"}]}],"isTexture":[{"args":[{"name":"texture","type":"WebGLTexture"}]}],"lineWidth":[{"args":[{"name":"width","type":"GLfloat"}]}],"linkProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"pixelStorei":[{"args":[{"name":"pname","type":"GLenum"},{"name":"param","type":"GLint"}]}],"polygonOffset":[{"args":[{"name":"factor","type":"GLfloat"},{"name":"units","type":"GLfloat"}]}],"readPixels":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]}],"renderbufferStorage":[{"args":[{"name":"target","type":"GLenum"},{"name":"internalformat","type":"GLenum"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"sampleCoverage":[{"args":[{"name":"value","type":"GLclampf"},{"name":"invert","type":"GLboolean"}]}],"scissor":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}],"shaderSource":[{"args":[{"name":"shader","type":"WebGLShader"},{"name":"source","type":"DOMString"}]}],"stencilFunc":[{"args":[{"name":"func","type":"GLenum"},{"name":"ref","type":"GLint"},{"name":"mask","type":"GLuint"}]}],"stencilFuncSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"func","type":"GLenum"},{"name":"ref","type":"GLint"},{"name":"mask","type":"GLuint"}]}],"stencilMask":[{"args":[{"name":"mask","type":"GLuint"}]}],"stencilMaskSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"mask","type":"GLuint"}]}],"stencilOp":[{"args":[{"name":"fail","type":"GLenum"},{"name":"zfail","type":"GLenum"},{"name":"zpass","type":"GLenum"}]}],"stencilOpSeparate":[{"args":[{"name":"face","type":"GLenum"},{"name":"fail","type":"GLenum"},{"name":"zfail","type":"GLenum"},{"name":"zpass","type":"GLenum"}]}],"texImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"border","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ImageData"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"image","type":"HTMLImageElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"canvas","type":"HTMLCanvasElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"internalformat","type":"GLenum"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"video","type":"HTMLVideoElement"}]}],"texParameterf":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"},{"name":"param","type":"GLfloat"}]}],"texParameteri":[{"args":[{"name":"target","type":"GLenum"},{"name":"pname","type":"GLenum"},{"name":"param","type":"GLint"}]}],"texSubImage2D":[{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ArrayBufferView"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"pixels","type":"ImageData"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"image","type":"HTMLImageElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"canvas","type":"HTMLCanvasElement"}]},{"args":[{"name":"target","type":"GLenum"},{"name":"level","type":"GLint"},{"name":"xoffset","type":"GLint"},{"name":"yoffset","type":"GLint"},{"name":"format","type":"GLenum"},{"name":"type","type":"GLenum"},{"name":"video","type":"HTMLVideoElement"}]}],"uniform1f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"}]}],"uniform1fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform1i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"}]}],"uniform1iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform2f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"}]}],"uniform2fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform2i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"}]}],"uniform2iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform3f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"}]}],"uniform3fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform3i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"z","type":"GLint"}]}],"uniform3iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniform4f":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"},{"name":"w","type":"GLfloat"}]}],"uniform4fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"FloatArray"}]}],"uniform4i":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"z","type":"GLint"},{"name":"w","type":"GLint"}]}],"uniform4iv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"v","type":"Int32Array"}]}],"uniformMatrix2fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"uniformMatrix3fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"uniformMatrix4fv":[{"args":[{"name":"location","type":"WebGLUniformLocation"},{"name":"transpose","type":"GLboolean"},{"name":"value","type":"FloatArray"}]}],"useProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"validateProgram":[{"args":[{"name":"program","type":"WebGLProgram"}]}],"vertexAttrib1f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"}]}],"vertexAttrib1fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib2f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"}]}],"vertexAttrib2fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib3f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"}]}],"vertexAttrib3fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttrib4f":[{"args":[{"name":"indx","type":"GLuint"},{"name":"x","type":"GLfloat"},{"name":"y","type":"GLfloat"},{"name":"z","type":"GLfloat"},{"name":"w","type":"GLfloat"}]}],"vertexAttrib4fv":[{"args":[{"name":"indx","type":"GLuint"},{"name":"values","type":"FloatArray"}]}],"vertexAttribPointer":[{"args":[{"name":"indx","type":"GLuint"},{"name":"size","type":"GLint"},{"name":"type","type":"GLenum"},{"name":"normalized","type":"GLboolean"},{"name":"stride","type":"GLsizei"},{"name":"offset","type":"GLintptr"}]}],"viewport":[{"args":[{"name":"x","type":"GLint"},{"name":"y","type":"GLint"},{"name":"width","type":"GLsizei"},{"name":"height","type":"GLsizei"}]}]}
		;
		
		
		
		var checkType = {
			//OpenGL Type                      JS Types 
			"ArrayBuffer"          : checkType("null", "ArrayBuffer", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "Array"), 
			"ArrayBufferView"      : checkType("null", "ArrayBuffer", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "Array"), 
			"DOMString"            : checkType("null", "string"), 
			"FloatArray"           : checkType("null", "Float32Array", "Array"), 
			"GLbitfield"           : checkType("number"), 
			"GLboolean"            : checkType("boolean"),  
			"GLclampf"             : checkType("number"), 
			"GLenum"               : checkType("number"), 
			"GLfloat"              : checkType("number"), 
			"GLint"                : checkType("number"), 
			"GLintptr"             : checkType("number"), 
			"GLsizei"              : checkType("number"), 
			"GLsizeiptr"           : checkType("number"), 
			"GLuint"               : checkType("number"),
			"HTMLCanvasElement"    : checkType("null", "HTMLCanvasElement"),
			"HTMLImageElement"     : checkType("null", "HTMLImageElement"), 
			"HTMLVideoElement"     : checkType("null", "HTMLVideoElement"), 
			"ImageData"            : checkType("null", "ImageData"), 
			"Int32Array"           : checkType("null", "Int32Array", "Array"), 
			"WebGLBuffer"          : checkType("null", "WebGLBuffer"), 
			"WebGLFrameBuffer"     : checkType("null", "WebGLFrameBuffer"), 
			"WebGLProgram"         : checkType("null", "WebGLProgram"), 
			"WebGLRenderbuffer"    : checkType("null", "WebGLRenderbuffer"), 
			"WebGLShader"          : checkType("null", "WebGLShader"), 
			"WebGLTexture"         : checkType("null", "WebGLTexture"), 
			"WebGLUniformLocation" : checkType("null", "WebGLUniformLocation"), 
			"float"                : checkType("number"), 
			"long"                 : checkType("number") 
		};
		
		var checkValue = {
			//OpenGL Type            Way to check the correct value 
			"ArrayBuffer"          : checkFloatArray,
			"ArrayBufferView"      : checkFloatArray,
			"DOMString"            : ok, 
			"FloatArray"           : checkFloatArray, 
			"GLbitfield"           : isInt, 
			"GLboolean"            : isBool, 
			"GLclampf"             : isClampf, 
			"GLenum"               : isInt, 
			"GLfloat"              : ok, 
			"GLint"                : isInt, 
			"GLintptr"             : isInt, 
			"GLsizei"              : isInt, 
			"GLsizeiptr"           : isInt, 
			"GLuint"               : isInt, 
			"HTMLCanvasElement"    : ok, 
			"HTMLImageElement"     : ok, 
			"HTMLVideoElement"     : ok, 
			"ImageData"            : ok, 
			"Int32Array"           : checkIntArray, 
			"WebGLBuffer"          : ok, 
			"WebGLFrameBuffer"     : ok, 
			"WebGLProgram"         : ok, 
			"WebGLRenderbuffer"    : ok, 
			"WebGLShader"          : ok, 
			"WebGLTexture"         : ok, 
			"WebGLUniformLocation" : ok, 
			"float"                : ok, 
			"long"                 : isInt
		};
		
		function safeContext (gl, opt) { 
			var key, value, i, pair, safegl, map, keys, error; 	
		
			if(typeof opt === "string") {
				if(opt === "error") {
					error = throwError; 
				}
				else if(opt === "warn") {
					error = showWarning; 
				}
				else {
					throw new Error("can't process the option '" + opt + "!"); 
				}
			} 
			else if(typeof opt === "function") {
				error = opt; 
			}
			else {
				error = showWarning; 
			}
		
			keys = []; 
		
			for	(key in gl) {
				if(key === "getSafeContext") {
					continue; //ignore myself
				}
				keys.push(key); 
			}
		
			map = keys.map(function(key) {
				var val, type; 
				val = gl[key]; 
				type = typeof val; 
		
				if(type === "function") {
					return [key, createSafeCaller(gl, val, key, error)]; 
				}
			
				return [key]; 
			});
		
			safegl = { "isSafeContext" : true }; 
		
			//Add static properties. 
			for(i = 0; i != map.length; i++) {
				pair = map[i]; 
				key = pair[0]; 
				value = pair[1]; 
			
				if(value) {
					//override behaviour with my own function 
					safegl[key] = value; 
				} else {
					(function(key) { 
						//same behaviour as the original gl context. 
						Object.defineProperty(safegl, key, {
							get : function() { return gl[key]; }, 
							set : function(v) { gl[key] = v; }, 
							enumerable : true 
						}); 
					}(key)); 
				}
			}
		
			return safegl; 
		}
		
		function createSafeCaller (gl, func, funcname, error) {
			var glMethods = METHODS[funcname]; 
			if( !glMethods ) {
				console.warn("couldn't find reference definition for method " + funcname + "."); 
				//default behaviour
				return function() {
					return func.apply(gl, arguments); 	
				};
			}
		
			return function() {
				var funcDef = getFunctionDef(argumentsToArray(arguments), glMethods); 
		
				if(!funcDef) {
					error("couldn't apply arguments (" 
						+ argumentsToArray(arguments).join(", ") 
						+ ") to any of the possible schemas:\n" 
						+ glMethods.map(function(m) { 
							return "(" + m.args.map(function(arg) { return arg.type; }).join(", ") + ")" 
						  }).join("\n,") 
					); 
				}
				else {
					testArgumentValues(argumentsToArray(arguments), funcDef, funcname, error);
					//call original function 
					return func.apply(gl, arguments); 
				}
				
				return func.apply(gl, arguments); 
			};
		}
		
		function argumentsToArray(args) {
			return Array.prototype.slice.call(args); 
		}
		
		function testArgumentValues(args, funcDef, funcname, error) {
			var arg, type, name, i; 
			//check Arguments 
			//check if type is correct
			for( i=0; i != args.length; i++) {
				arg = args[i]; 
				type = funcDef.args[i].type; 
				name = funcDef.args[i].name; 
		
				if(!checkValue[type](arg)) {
					error("Argument '" + name + "' in function '" + funcname + "' was expected to be of type '" + type + "' but instead was called with value: " + arg); 
					return; 
				}
			}
		}
		
		function getFunctionDef(args, glMethods) {
				return glMethods.filter(function(glMethod) {				
					if(glMethod.args.length !== args.length) { 
						return false; 
					} 
		
					var i = 0; 
					return glMethod.args.every(function(glarg) {
						var ret = checkType[glarg.type](args[i++]); 
						return ret; 
					});
				})[0]; //undefined for no matches 
		}
		
		function throwError(text) {
			throw new Error(text); 
		}
		
		function showWarning(text) {
			console.warn(text); 
		}
		
		// ~~~ Type checking methods ~~~  
		function checkType() {
			var possibleTypes = argumentsToArray(arguments).map(function(type) { return type.toLowerCase(); });
			return function(value) {
				var valueType = toType(value); 
				return possibleTypes.some(function(type) { return valueType === type; }); 
			}
		}
		
		function ok() {
			//Value allready passed the typecheck and so the value is also correct. 
			return true; 
		}
		
		function checkFloatArray(v) {
			var type = toType(v); 
		
			if(type === "array") {
				for(var i = 0; i != v.length; i++) {
					if(!isFloat(v[i])) {
						return false; 
					}
				}
			}
		
			return true; 
		}
		
		function checkIntArray(v) {
			var type = toType(v); 
		
			if(type === "array") {
				for(var i = 0; i != v.length; i++) {
					if(!isInt(v[i])) {
						return false; 
					}
				}
			}
		
			return true; 
		}
		
		function isString(v) {
			return v === null || typeof v === "string"; 
		}
		
		function isFloat(v) {
			return typeof v === "number"; 
		}
		
		function isInt(v) {
			return typeof v === "number" && v === ~~v; 
		}
		
		function isBool(v) {
			return v === true || v === false; 
		}
		
		function isClampf(v) {
			return isFloat(v) && v >= 0 && v <= 1; 
		}
		
		//Fixing typeof http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/ 
		function toType (obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z0-9]+)/)[1].toLowerCase();
		}
		

		return function(option) { return safeContext(this, option); }; 
	}()); 
}



//Copyright (c) 2009 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.

// Various functions for helping debug WebGL apps.

var WebGLDebugUtils = function() {

/**
 * Wrapped logging function.
 * @param {string} msg Message to log.
 */
var log = function(msg) {
  if (window.console && window.console.log) {
	throw msg; 
    window.console.log(msg);
  }
};

/**
 * Which arguements are enums.
 * @type {!Object.<number, string>}
 */
var glValidEnumContexts = {

  // Generic setters and getters

  'enable': { 0:true },
  'disable': { 0:true },
  'getParameter': { 0:true },

  // Rendering

  'drawArrays': { 0:true },
  'drawElements': { 0:true, 2:true },

  // Shaders

  'createShader': { 0:true },
  'getShaderParameter': { 1:true },
  'getProgramParameter': { 1:true },

  // Vertex attributes

  'getVertexAttrib': { 1:true },
  'vertexAttribPointer': { 2:true },

  // Textures

  'bindTexture': { 0:true },
  'activeTexture': { 0:true },
  'getTexParameter': { 0:true, 1:true },
  'texParameterf': { 0:true, 1:true },
  'texParameteri': { 0:true, 1:true, 2:true },
  'texImage2D': { 0:true, 2:true, 6:true, 7:true },
  'texSubImage2D': { 0:true, 6:true, 7:true },
  'copyTexImage2D': { 0:true, 2:true },
  'copyTexSubImage2D': { 0:true },
  'generateMipmap': { 0:true },

  // Buffer objects

  'bindBuffer': { 0:true },
  'bufferData': { 0:true, 2:true },
  'bufferSubData': { 0:true },
  'getBufferParameter': { 0:true, 1:true },

  // Renderbuffers and framebuffers

  'pixelStorei': { 0:true, 1:true },
  'readPixels': { 4:true, 5:true },
  'bindRenderbuffer': { 0:true },
  'bindFramebuffer': { 0:true },
  'checkFramebufferStatus': { 0:true },
  'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
  'framebufferTexture2D': { 0:true, 1:true, 2:true },
  'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
  'getRenderbufferParameter': { 0:true, 1:true },
  'renderbufferStorage': { 0:true, 1:true },

  // Frame buffer operations (clear, blend, depth test, stencil)

  'clear': { 0:true },
  'depthFunc': { 0:true },
  'blendFunc': { 0:true, 1:true },
  'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
  'blendEquation': { 0:true },
  'blendEquationSeparate': { 0:true, 1:true },
  'stencilFunc': { 0:true },
  'stencilFuncSeparate': { 0:true, 1:true },
  'stencilMaskSeparate': { 0:true },
  'stencilOp': { 0:true, 1:true, 2:true },
  'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

  // Culling

  'cullFace': { 0:true },
  'frontFace': { 0:true },
};

/**
 * Map of numbers to names.
 * @type {Object}
 */
var glEnums = null;

/**
 * Initializes this module. Safe to call more than once.
 * @param {!WebGLRenderingContext} ctx A WebGL context. If
 *    you have more than one context it doesn't matter which one
 *    you pass in, it is only used to pull out constants.
 */
function init(ctx) {
  if (glEnums == null) {
    glEnums = { };
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'number') {
        glEnums[ctx[propertyName]] = propertyName;
      }
    }
  }
}

/**
 * Checks the utils have been initialized.
 */
function checkInit() {
  if (glEnums == null) {
    throw 'WebGLDebugUtils.init(ctx) not called';
  }
}

/**
 * Returns true or false if value matches any WebGL enum
 * @param {*} value Value to check if it might be an enum.
 * @return {boolean} True if value matches one of the WebGL defined enums
 */
function mightBeEnum(value) {
  checkInit();
  return (glEnums[value] !== undefined);
}

/**
 * Gets an string version of an WebGL enum.
 *
 * Example:
 *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
 *
 * @param {number} value Value to return an enum for
 * @return {string} The string version of the enum.
 */
function glEnumToString(value) {
  checkInit();
  var name = glEnums[value];
  return (name !== undefined) ? name :
      ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
}

/**
 * Returns the string version of a WebGL argument.
 * Attempts to convert enum arguments to strings.
 * @param {string} functionName the name of the WebGL function.
 * @param {number} argumentIndx the index of the argument.
 * @param {*} value The value of the argument.
 * @return {string} The value as a string.
 */
function glFunctionArgToString(functionName, argumentIndex, value) {
  var funcInfo = glValidEnumContexts[functionName];
  if (funcInfo !== undefined) {
    if (funcInfo[argumentIndex]) {
      return glEnumToString(value);
    }
  }
  return value.toString();
}

function makePropertyWrapper(wrapper, original, propertyName) {
  //log("wrap prop: " + propertyName);
  wrapper.__defineGetter__(propertyName, function() {
    return original[propertyName];
  });
  // TODO(gmane): this needs to handle properties that take more than
  // one value?
  wrapper.__defineSetter__(propertyName, function(value) {
    //log("set: " + propertyName);
    original[propertyName] = value;
  });
}

// Makes a function that calls a function on another object.
function makeFunctionWrapper(original, functionName) {
  //log("wrap fn: " + functionName);
  var f = original[functionName];
  return function() {
    //log("call: " + functionName);
    var result = f.apply(original, arguments);
    return result;
  };
}

/**
 * Given a WebGL context returns a wrapped context that calls
 * gl.getError after every command and calls a function if the
 * result is not gl.NO_ERROR.
 *
 * @param {!WebGLRenderingContext} ctx The webgl context to
 *        wrap.
 * @param {!function(err, funcName, args): void} opt_onErrorFunc
 *        The function to call when gl.getError returns an
 *        error. If not specified the default function calls
 *        console.log with a message.
 */
function makeDebugContext(ctx, opt_onErrorFunc) {
  init(ctx);
  opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
        // apparently we can't do args.join(",");
        var argStr = "";
        for (var ii = 0; ii < args.length; ++ii) {
          argStr += ((ii == 0) ? '' : ', ') +
              glFunctionArgToString(functionName, ii, args[ii]);
        }
        log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
            "(" + argStr + ")");
      };

  // Holds booleans for each GL error so after we get the error ourselves
  // we can still return it to the client app.
  var glErrorShadow = { };

  // Makes a function that calls a WebGL function and then calls getError.
  function makeErrorWrapper(ctx, functionName) {
    return function() {
      var result = ctx[functionName].apply(ctx, arguments);
      var err = ctx.getError();
      if (err != 0) {
        glErrorShadow[err] = true;
        opt_onErrorFunc(err, functionName, arguments);
      }
      return result;
    };
  }

  // Make a an object that has a copy of every property of the WebGL context
  // but wraps all functions.
  var wrapper = {};
  for (var propertyName in ctx) {
    if (typeof ctx[propertyName] == 'function') {
       wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
     } else {
       makePropertyWrapper(wrapper, ctx, propertyName);
     }
  }

  // Override the getError function with one that returns our saved results.
  wrapper.getError = function() {
    for (var err in glErrorShadow) {
      if (glErrorShadow.hasOwnProperty(err)) {
        if (glErrorShadow[err]) {
          glErrorShadow[err] = false;
          return err;
        }
      }
    }
    return ctx.NO_ERROR;
  };

  return wrapper;
}

function resetToInitialState(ctx) {
  var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
  var tmp = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
  for (var ii = 0; ii < numAttribs; ++ii) {
    ctx.disableVertexAttribArray(ii);
    ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
    ctx.vertexAttrib1f(ii, 0);
  }
  ctx.deleteBuffer(tmp);

  var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    ctx.activeTexture(ctx.TEXTURE0 + ii);
    ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
    ctx.bindTexture(ctx.TEXTURE_2D, null);
  }

  ctx.activeTexture(ctx.TEXTURE0);
  ctx.useProgram(null);
  ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
  ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
  ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
  ctx.disable(ctx.BLEND);
  ctx.disable(ctx.CULL_FACE);
  ctx.disable(ctx.DEPTH_TEST);
  ctx.disable(ctx.DITHER);
  ctx.disable(ctx.SCISSOR_TEST);
  ctx.blendColor(0, 0, 0, 0);
  ctx.blendEquation(ctx.FUNC_ADD);
  ctx.blendFunc(ctx.ONE, ctx.ZERO);
  ctx.clearColor(0, 0, 0, 0);
  ctx.clearDepth(1);
  ctx.clearStencil(-1);
  ctx.colorMask(true, true, true, true);
  ctx.cullFace(ctx.BACK);
  ctx.depthFunc(ctx.LESS);
  ctx.depthMask(true);
  ctx.depthRange(0, 1);
  ctx.frontFace(ctx.CCW);
  ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
  ctx.lineWidth(1);
  ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
  ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
  ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  // TODO: Delete this IF.
  if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
    ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
  }
  ctx.polygonOffset(0, 0);
  ctx.sampleCoverage(1, false);
  ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
  ctx.stencilMask(0xFFFFFFFF);
  ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
  ctx.viewport(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

  // TODO: This should NOT be needed but Firefox fails with 'hint'
  while(ctx.getError());
}

function makeLostContextSimulatingCanvas(canvas) {
  var unwrappedContext_;
  var wrappedContext_;
  var onLost_ = [];
  var onRestored_ = [];
  var wrappedContext_ = {};
  var contextId_ = 1;
  var contextLost_ = false;
  var resourceId_ = 0;
  var resourceDb_ = [];
  var numCallsToLoseContext_ = 0;
  var numCalls_ = 0;
  var canRestore_ = false;
  var restoreTimeout_ = 0;

  // Holds booleans for each GL error so can simulate errors.
  var glErrorShadow_ = { };

  canvas.getContext = function(f) {
    return function() {
      var ctx = f.apply(canvas, arguments);
      // Did we get a context and is it a WebGL context?
      if (ctx instanceof WebGLRenderingContext) {
        if (ctx != unwrappedContext_) {
          if (unwrappedContext_) {
            throw "got different context"
          }
          unwrappedContext_ = ctx;
          wrappedContext_ = makeLostContextSimulatingContext(unwrappedContext_);
        }
        return wrappedContext_;
      }
      return ctx;
    }
  }(canvas.getContext);

  function wrapEvent(listener) {
    if (typeof(listener) == "function") {
      return listener;
    } else {
      return function(info) {
        listener.handleEvent(info);
      }
    }
  }

  var addOnContextLostListener = function(listener) {
    onLost_.push(wrapEvent(listener));
  };

  var addOnContextRestoredListener = function(listener) {
    onRestored_.push(wrapEvent(listener));
  };


  function wrapAddEventListener(canvas) {
    var f = canvas.addEventListener;
    canvas.addEventListener = function(type, listener, bubble) {
      switch (type) {
        case 'webglcontextlost':
          addOnContextLostListener(listener);
          break;
        case 'webglcontextrestored':
          addOnContextRestoredListener(listener);
          break;
        default:
          f.apply(canvas, arguments);
      }
    };
  }

  wrapAddEventListener(canvas);

  canvas.loseContext = function() {
    if (!contextLost_) {
      contextLost_ = true;
      numCallsToLoseContext_ = 0;
      ++contextId_;
      while (unwrappedContext_.getError());
      clearErrors();
      glErrorShadow_[unwrappedContext_.CONTEXT_LOST_WEBGL] = true;
      var event = makeWebGLContextEvent("context lost");
      var callbacks = onLost_.slice();
      setTimeout(function() {
          //log("numCallbacks:" + callbacks.length);
          for (var ii = 0; ii < callbacks.length; ++ii) {
            //log("calling callback:" + ii);
            callbacks[ii](event);
          }
          if (restoreTimeout_ >= 0) {
            setTimeout(function() {
                canvas.restoreContext();
              }, restoreTimeout_);
          }
        }, 0);
    }
  };

  canvas.restoreContext = function() {
    if (contextLost_) {
      if (onRestored_.length) {
        setTimeout(function() {
            if (!canRestore_) {
              throw "can not restore. webglcontestlost listener did not call event.preventDefault";
            }
            freeResources();
            resetToInitialState(unwrappedContext_);
            contextLost_ = false;
            numCalls_ = 0;
            canRestore_ = false;
            var callbacks = onRestored_.slice();
            var event = makeWebGLContextEvent("context restored");
            for (var ii = 0; ii < callbacks.length; ++ii) {
              callbacks[ii](event);
            }
          }, 0);
      }
    }
  };

  canvas.loseContextInNCalls = function(numCalls) {
    if (contextLost_) {
      throw "You can not ask a lost contet to be lost";
    }
    numCallsToLoseContext_ = numCalls_ + numCalls;
  };

  canvas.getNumCalls = function() {
    return numCalls_;
  };

  canvas.setRestoreTimeout = function(timeout) {
    restoreTimeout_ = timeout;
  };

  function isWebGLObject(obj) {
    //return false;
    return (obj instanceof WebGLBuffer ||
            obj instanceof WebGLFramebuffer ||
            obj instanceof WebGLProgram ||
            obj instanceof WebGLRenderbuffer ||
            obj instanceof WebGLShader ||
            obj instanceof WebGLTexture);
  }

  function checkResources(args) {
    for (var ii = 0; ii < args.length; ++ii) {
      var arg = args[ii];
      if (isWebGLObject(arg)) {
        return arg.__webglDebugContextLostId__ == contextId_;
      }
    }
    return true;
  }

  function clearErrors() {
    var k = Object.keys(glErrorShadow_);
    for (var ii = 0; ii < k.length; ++ii) {
      delete glErrorShadow_[k];
    }
  }

  function loseContextIfTime() {
    ++numCalls_;
    if (!contextLost_) {
      if (numCallsToLoseContext_ == numCalls_) {
        canvas.loseContext();
      }
    }
  }

  // Makes a function that simulates WebGL when out of context.
  function makeLostContextFunctionWrapper(ctx, functionName) {
    var f = ctx[functionName];
    return function() {
      // log("calling:" + functionName);
      // Only call the functions if the context is not lost.
      loseContextIfTime();
      if (!contextLost_) {
        //if (!checkResources(arguments)) {
        //  glErrorShadow_[wrappedContext_.INVALID_OPERATION] = true;
        //  return;
        //}
        var result = f.apply(ctx, arguments);
        return result;
      }
    };
  }

  function freeResources() {
    for (var ii = 0; ii < resourceDb_.length; ++ii) {
      var resource = resourceDb_[ii];
      if (resource instanceof WebGLBuffer) {
        unwrappedContext_.deleteBuffer(resource);
      } else if (resource instanceof WebGLFramebuffer) {
        unwrappedContext_.deleteFramebuffer(resource);
      } else if (resource instanceof WebGLProgram) {
        unwrappedContext_.deleteProgram(resource);
      } else if (resource instanceof WebGLRenderbuffer) {
        unwrappedContext_.deleteRenderbuffer(resource);
      } else if (resource instanceof WebGLShader) {
        unwrappedContext_.deleteShader(resource);
      } else if (resource instanceof WebGLTexture) {
        unwrappedContext_.deleteTexture(resource);
      }
    }
  }

  function makeWebGLContextEvent(statusMessage) {
    return {
      statusMessage: statusMessage,
      preventDefault: function() {
          canRestore_ = true;
        }
    };
  }

  return canvas;

  function makeLostContextSimulatingContext(ctx) {
    // copy all functions and properties to wrapper
    for (var propertyName in ctx) {
      if (typeof ctx[propertyName] == 'function') {
         wrappedContext_[propertyName] = makeLostContextFunctionWrapper(
             ctx, propertyName);
       } else {
         makePropertyWrapper(wrappedContext_, ctx, propertyName);
       }
    }

    // Wrap a few functions specially.
    wrappedContext_.getError = function() {
      loseContextIfTime();
      if (!contextLost_) {
        var err;
        while (err = unwrappedContext_.getError()) {
          glErrorShadow_[err] = true;
        }
      }
      for (var err in glErrorShadow_) {
        if (glErrorShadow_[err]) {
          delete glErrorShadow_[err];
          return err;
        }
      }
      return wrappedContext_.NO_ERROR;
    };

    var creationFunctions = [
      "createBuffer",
      "createFramebuffer",
      "createProgram",
      "createRenderbuffer",
      "createShader",
      "createTexture"
    ];
    for (var ii = 0; ii < creationFunctions.length; ++ii) {
      var functionName = creationFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          var obj = f.apply(ctx, arguments);
          obj.__webglDebugContextLostId__ = contextId_;
          resourceDb_.push(obj);
          return obj;
        };
      }(ctx[functionName]);
    }

    var functionsThatShouldReturnNull = [
      "getActiveAttrib",
      "getActiveUniform",
      "getBufferParameter",
      "getContextAttributes",
      "getAttachedShaders",
      "getFramebufferAttachmentParameter",
      "getParameter",
      "getProgramParameter",
      "getProgramInfoLog",
      "getRenderbufferParameter",
      "getShaderParameter",
      "getShaderInfoLog",
      "getShaderSource",
      "getTexParameter",
      "getUniform",
      "getUniformLocation",
      "getVertexAttrib"
    ];
    for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
      var functionName = functionsThatShouldReturnNull[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return null;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    var isFunctions = [
      "isBuffer",
      "isEnabled",
      "isFramebuffer",
      "isProgram",
      "isRenderbuffer",
      "isShader",
      "isTexture"
    ];
    for (var ii = 0; ii < isFunctions.length; ++ii) {
      var functionName = isFunctions[ii];
      wrappedContext_[functionName] = function(f) {
        return function() {
          loseContextIfTime();
          if (contextLost_) {
            return false;
          }
          return f.apply(ctx, arguments);
        }
      }(wrappedContext_[functionName]);
    }

    wrappedContext_.checkFramebufferStatus = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return wrappedContext_.FRAMEBUFFER_UNSUPPORTED;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.checkFramebufferStatus);

    wrappedContext_.getAttribLocation = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return -1;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getAttribLocation);

    wrappedContext_.getVertexAttribOffset = function(f) {
      return function() {
        loseContextIfTime();
        if (contextLost_) {
          return 0;
        }
        return f.apply(ctx, arguments);
      };
    }(wrappedContext_.getVertexAttribOffset);

    wrappedContext_.isContextLost = function() {
      return contextLost_;
    };

    return wrappedContext_;
  }
}

return {
    /**
     * Initializes this module. Safe to call more than once.
     * @param {!WebGLRenderingContext} ctx A WebGL context. If
    }
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  'init': init,

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  'mightBeEnum': mightBeEnum,

  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  'glEnumToString': glEnumToString,

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  'glFunctionArgToString': glFunctionArgToString,

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) +
   *            " was caused by call to " + funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
   * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   */
  'makeDebugContext': makeDebugContext,

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  'makeLostContextSimulatingCanvas': makeLostContextSimulatingCanvas,

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} ctx The webgl context to
   *     reset.
   */
  'resetToInitialState': resetToInitialState
};

}();




var UTIL = (function() {
"use strict"; 

var lastTime = -1; 

var raf = window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			  window.setTimeout(callback, 1000 / 60);
		  };

var keyfuncs = (function() {
	var keysDown = new Uint8Array(256); 
	var keysDownOld = new Uint8Array(256); 

	cleanKeys(); 

	document.addEventListener("keydown", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 1; 
		}
	}); 

	document.addEventListener("keyup", function(e) {
		var k = e.keyCode; 
		if(k < 256) {
			keysDown[k] = 0; 
		}
	}); 

	window.addEventListener("blur", function() { 
		cleanKeys(); 	
	});

	function cleanKeys() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = 0; 
			keysDown[i] = 0; 
		}
	}

	function setOldKeyState() {
		for(var i = 0; i !== 256; i++) {
			keysDownOld[i] = keysDown[i]; 
		}
	}

	var keys = {
		"backspace":8, "tab":9, "enter":13, "shift":16, "ctrl":17, "alt":18, "pause":19, "capslock":20,
		"escape":27, "space":32, "pageUp":33, "pageDown":34, "end":35, "home":36,
		"left":37, "up":38, "right":39, "down":40, 
		"insert":45, "delete":46,
		"num0":48, "num1":49, "num2":50, "num3":51, "num4":52, "num5":53, "num6":54, "num7":55, "num8":56, "num9":57,
		"a":65, "b":66, "c":67, "d":68, "e":69, "f":70, "g":71, "h":72, "i":73, "j":74, "k":75, "l":76, "m":77, 
		"n":78, "o":79, "p":80, "q":81, "r":82, "s":83, "t":84, "u":85, "v":86, "w":87, "x":88, "y":89, "z":90, 
		"windowKeyLeft":91, "windowKeyRight":92, "select":93,
		"numpad0":96, "numpad1":97, "numpad2":98, "numpad3":99, "numpad4":100, 
		"numpad5":101, "numpad6":102, "numpad7":103, "numpad8":104, "numpad9":105,
		"multiply":106, "add":107, "subtract":109, "decimalPoint":110, "divide":111,
		"f1":112, "f2":113, "f3":114, "f4":115, "f5":116, "f6":117,
		"f7":118, "f8":119, "f9":120, "f10":121, "f11":122, "f12":123,
		"numlock":144, "scrolllock":145, "semicolon":186, "equals":187, "comma":188,
		"dash":189, "period":190, "slash":191, "graveAccent":192, "openBracket":219,
		"backSlash":220, "closeBraket":221, "quote":222
	};

	return {
		"keyIsDown" : function (key) {
			return keysDown[key] !== 0; 
		}, 
		"keyIsUp" :  function (key) {
			return keysDown[key] === 0; 
		}, 
		"keyWasPressed" : function (key) {
			return keysDown[key] !== 0 && keysDownOld[key] === 0;
		},  
		"keyWasReleased" : function (key) {
			return keysDown[key] === 0 && keysDownOld[key] !== 0;
		}, 
		"keys" : keys, 
		"setOldKeyState" : setOldKeyState, 
		"keysDown" : keysDown, 
		"keysDownOld" : keysDownOld 
	};
}());


var joyfuncs = (function () {
	var gamepads = navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || [];
	var e = 0.2; 
	var edge0 = e; 
	var edge1 = 1 - e; 

	var NONE = {
		"axes" : [0,0,0,0], 
		"buttons" : [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], 
		"id" : "NONE", 
		"index" : -1 
	}; 

	function getFirstPad() {
		var axes = [0,0,0,0];
		
		for (var i = 0; i < gamepads.length; ++i) {
			var pad = gamepads[i];
			if(pad) {
				for(var a = 0; a < pad.axes.length; a++) { 
					if(pad.axes[a]) { 
						axes[a] = normalise(pad.axes[a]);
					}
				}

				return {
					"axes" : axes, 
					"buttons" : pad.buttons, 
					"id" : pad.id, 
					"index" : pad.index 
				};
			}
		}

		return NONE;  
	}

	function normalise(x) {
		if(x < 0) {
			return -normalise(-x); 
		}

		// like GLSL smoothstep(x, 0, 1); 
		var t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0))); 
		return t * t * (3.0 - 2.0 * t);
	}

	return {
		"getFirstPad" : getFirstPad  
	};
}());  

function createContext(width, height) { 
		var canvas = document.createElement("canvas"); 
		canvas.width = width; 
		canvas.height = height; 
		document.body.appendChild(canvas); 

		var gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("experimental-webgl", {alpa : false, preserveDrawingBuffer : true}).getSafeContext()); 

		return gl; 
}

function getSource(id) {
    var node = document.getElementById(id); 
    return node.innerText; 
}

function createCube() {
	var vert = new Float32Array([
		-1, -1,  1, 1,
		 1, -1,  1, 1,
		 1,  1,  1, 1,
		-1,  1,  1, 1,
		-1, -1, -1, 1,
		 1, -1, -1, 1,
		 1,  1, -1, 1,
		-1,  1, -1, 1
	]); 

	var n = 0.577350269; //sqrt(3) / 3

	var norm = new Float32Array([
		-n, -n,  n, 0,
		 n, -n,  n, 0,
		 n,  n,  n, 0,
		-n,  n,  n, 0,
		-n, -n, -n, 0,
		 n, -n, -n, 0,
		 n,  n, -n, 0,
		-n,  n, -n, 0
	]); 

	var indx = new Uint16Array([
		0,1,2,
		0,2,3,
		1,5,6,
		1,6,2,
		5,4,7,
		5,7,6,
		4,0,3,
		4,3,7,
		3,2,6,
		3,6,7,
		4,5,1,
		4,1,0
	]);

	return { vertices : vert, indices : indx, normals : norm };
}

function createPlane(level) {
    var vert = [];
    var tex = [];  

    createTriangle(vert, tex, [1,0,1], [-1,0,1], [-1,0,-1], [1,1], [0,1], [0,0], level || 0); 
    createTriangle(vert, tex, [1,0,1], [-1,0,-1], [1,0,-1], [1,1], [0,0], [1,0], level || 0); 

    return { vertices : new Float32Array(vert), texCoords : new Float32Array(tex) }; 

    function createTriangle(vert, tex, v1, v2, v3, t1, t2, t3, n) { 
        if(n === 0) {
            vert.push(v1[0], v1[1], v1[2], 1.0); 
            vert.push(v2[0], v2[1], v2[2], 1.0); 
            vert.push(v3[0], v3[1], v3[2], 1.0); 

            tex.push(t1[0], t1[1]); 
            tex.push(t2[0], t2[1]); 
            tex.push(t3[0], t3[1]); 

            return; 
        }

        var v12 = middleVec(v1, v2); 
        var v23 = middleVec(v2, v3); 
        var v31 = middleVec(v3, v1); 

        var t12 = middleTex(t1, t2); 
        var t23 = middleTex(t2, t3); 
        var t31 = middleTex(t3, t1); 

        createTriangle(vert, tex, v1, v12, v31, t1, t12, t31, n-1); 
        createTriangle(vert, tex, v2, v23, v12, t2, t23, t12, n-1); 
        createTriangle(vert, tex, v3, v31, v23, t3, t31, t23, n-1); 
        createTriangle(vert, tex, v12, v23, v31, t12, t23, t31, n-1); 

        function middleVec(v1, v2) {
            var x1,y1,z1,x2,y2,z2; 
            x1 = v1[0]; 
            y1 = v1[1]; 
            z1 = v1[2]; 
            x2 = v2[0]; 
            y2 = v2[1]; 
            z2 = v2[2]; 

            return [ (x1 + x2) / 2,  (y1 + y2) / 2,  (z1 + z2) / 2 ]; 
        }

        function middleTex(t1, t2) {
            var x1,y1,x2,y2; 

            x1 = t1[0];
            y1 = t1[1]; 
            x2 = t2[0];
            y2 = t2[1]; 

            return [ (x1 + x2) / 2, (y1 + y2) / 2 ]; 
        }
    }
}

function parseObjData(data) {
	var lines = data.split("\n"); 

	var vertices = []; 
	var texcoord = []; 
	var normals = []; 
	var indices = []; 

	var line; 
	var operations = {
		"v" : function(numbers) {
			if(numbers.length !== 3) { 
				throw "vertice needs to be three elements big."; 
			}

			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
			
			vertices.push(a,b,c,1); 
		},
		"vn" : function(numbers) {
			if(numbers.length !== 3) { 
				throw "normals needs to be three elements big."; 
			}

			var a,b,c;
			a = Number(numbers[0]);
			b = Number(numbers[1]);
			c = Number(numbers[2]);
			
			normals.push(a,b,c,0); 
		},

		"f" : function processFace(vertices) {
			if(vertices.length < 3) {
				throw "Strange amount of vertices in face."; 
			}

			if(vertices.length > 3) {
				//let's asume it's convex 
				for(var n = vertices.length - 1; n !== 1; n--) {
					processFace([vertices[0], vertices[n-1], vertices[n]]); 
				}
				return; 
			}

			var fa,fb,fc;
			fa = vertices[0].split(/\//g);
			fb = vertices[1].split(/\//g);
			fc = vertices[2].split(/\//g);
			
			var fav,fat,fan, fbv,fbt,fbn, fcv,fct,fcn; 
			fav = fa[0]; 
			fbv = fb[0]; 
			fcv = fc[0]; 

			fav && indices.push(Number(fav) -1); 
			fbv && indices.push(Number(fbv) -1); 
			fcv && indices.push(Number(fcv) -1); 
		}
	};

	for(var i = 0; i < lines.length; i++) {
		line = lines[i].trim(); 
		var elements = line.split(/[\t\r\n ]+/g);
		var head = elements.shift(); 
		
		var opp = operations[head]; 

		if(opp) opp(elements); 
	}

	return {
		"vertices" : new Float32Array(vertices),	
		"texcoord" : new Float32Array(texcoord),
		"normals" : new Float32Array(normals), 
		"indices" : new Uint16Array(indices) 
	};
}

function requestGameFrame (callback) { 
	raf(function () {
		var now = Date.now(); 
		if(lastTime === -1) {
			now = lastTime = Date.now(); 
		}
		callback((now - lastTime) / 1000.0); 
		keyfuncs.setOldKeyState(); 
		lastTime = now; 
	}); 
}

return {
	"requestGameFrame" : requestGameFrame, 
	"createContext"    : createContext,
	"getSource"        : getSource,  
	"createPlane"      : createPlane,
	"createCube"       : createCube, 
	"parseObjData"     : parseObjData, 
	"keys"             : keyfuncs.keys,
	"keyIsDown"        : keyfuncs.keyIsDown, 
	"keyIsUp"          : keyfuncs.keyIsUp, 
	"keyWasPressed"    : keyfuncs.keyWasPressed, 
	"keyWasReleased"   : keyfuncs.keyWasReleased, 
	"getFirstPad"      : joyfuncs.getFirstPad 
}; 
}()); 


var SHAPES = (function() {
	var module = {}; 

	module.createGround = function (gl, projection) { 
	    var vPositionIndx = 0; 
	    var vColorIndx = 1; 
	    var vTransIndx = 2; 
		var modelview = mat4.identity();
		var alpha = 0; 
	
	    var vShaderSrc = UTIL.getSource("shader.vs");
	    var fShaderSrc = UTIL.getSource("shader.fs");
	
	    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	    gl.shaderSource(vertexShader, vShaderSrc); 
	    gl.compileShader(vertexShader); 
	
	    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
	    gl.shaderSource(fragmentShader, fShaderSrc); 
	    gl.compileShader(fragmentShader); 
	
	    var program = gl.createProgram(); 
	
	    gl.attachShader(program, vertexShader); 
	    gl.attachShader(program, fragmentShader); 
	    gl.linkProgram(program); 
	
	    gl.bindAttribLocation(program, vPositionIndx, "vPosition"); 
	
	    gl.useProgram(program); 
	
	    //Vertices
	    var plane = UTIL.createPlane(2); 
	    var vertices = plane.vertices; 
	    var texCoords = plane.texCoords; 
	
		for(var i=0; i < texCoords.length; i+=2) {
			texCoords[i] = texCoords[i] * 8.; 
			texCoords[i+1] = texCoords[i+1] * 8.; 
		}
	
	    program.numVertices = vertices.length / 4; 
	
	    var posbuffer = gl.createBuffer(); 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0); 
	    gl.enableVertexAttribArray(0); 
	
	    //Texture
	    var texbuffer = gl.createBuffer(); 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, texbuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
	
	    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0); 
	    gl.enableVertexAttribArray(1); 
	
	    var texture = gl.createTexture(); 
	    var image = new Image(); 
	    image.onload = function() {
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	    };
	    image.src = "TxUBCUdirt.png"; 
	
	    program.texture = texture; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	
		return {
			"draw" : function(camera) {
				gl.useProgram(program); 
	
				//TEST 			
	    		gl.enableVertexAttribArray(0); 
	 		    gl.enableVertexAttribArray(1); 
	
				mat4.identity(modelview); 
	
				mat4.multiply(modelview, camera); 
				mat4.scale(modelview, [10,1,10]); 
				mat4.rotateY(modelview, alpha); 
						
				//var proj = mat4.identity(); 
				//mat4.inverse(eye, proj); 
				//mat4.multiply(eye, projection, proj); 
	
				var vModelViewIndx = gl.getUniformLocation(program, "vModelView");
				gl.uniformMatrix4fv(vModelViewIndx, false, modelview);
	
				var vProjectionIndx = gl.getUniformLocation(program, "vProjection");
				gl.uniformMatrix4fv(vProjectionIndx, false, projection);
	
				//var vEyeIndx = gl.getUniformLocation(program, "vEye");
				//gl.uniformMatrix4fv(vEyeIndx, false, eye);
				var fTexIndx = gl.getUniformLocation(program, "texture");
	
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, program.texture);
				gl.uniform1i(fTexIndx, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, posbuffer); 
				gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(0); 
	
				gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
	
			    gl.bindBuffer(gl.ARRAY_BUFFER, null);
			}, 
			"update" : function(milis) {
				var a = milis * 2 * Math.PI / 1000;
	
				if(UTIL.keyIsDown(UTIL.keys.q)) { 
					alpha += a; 
				}
	
				if(UTIL.keyIsDown(UTIL.keys.e)) { 
					alpha -= a; 
				}
			}
		};	
	}
	
	

	module.createCube = function (gl, projection) { 
		var modelview = mat4.identity();
		var alphax = 0; 
		var alphay = 0; 
		var position = [0,1,0]; 
	
	    var vShaderSrc = UTIL.getSource("shaderPhong.vs");
	    var fShaderSrc = UTIL.getSource("shaderPhong.fs");
	
	    var vertexShader = gl.createShader(gl.VERTEX_SHADER); 
	    gl.shaderSource(vertexShader, vShaderSrc); 
	    gl.compileShader(vertexShader); 
	
	    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 
	    gl.shaderSource(fragmentShader, fShaderSrc); 
	    gl.compileShader(fragmentShader); 
	
	    var program = gl.createProgram(); 
	
	    gl.attachShader(program, vertexShader); 
	    gl.attachShader(program, fragmentShader); 
	    gl.linkProgram(program); 
	
		//Shader linked
		//Tauschen? 
	    gl.useProgram(program); 
	
	    //Vertices
		var objSource = UTIL.getSource("teapot.obj"); 
	    //var obj = UTIL.parseObjData(objSource);  
	    var obj = UTIL.createCube();  
	
		
	    var vertices = obj.vertices; 
		var indices = obj.indices; 
		var normals = obj.normals; 
	
		//----
	    var vertexBuffer = gl.createBuffer(); 
		var vertexElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	
	    var vertexBufferElements = vertices.length / vertexElementSize; 
	
		var aVertexIndex = gl.getAttribLocation(program, "aVertex"); 
		if(aVertexIndex === -1) {
			throw new Error("aVertex does not exist."); 
		}
	    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
		//----
	
		//----
	    var normalBuffer = gl.createBuffer(); 
		var normalElementSize = 4; 
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
	
	    var normalBufferSize = normals.length / normalElementSize; 
	
		var aNormalIndex = gl.getAttribLocation(program, "aNormal"); 
		if(aNormalIndex === -1) {
			throw new Error("aNormal does not exist."); 
		}
	    gl.vertexAttribPointer(aNormalIndex, 4, gl.FLOAT, false, 0, 0); 
	    //gl.enableVertexAttribArray(normalBufferIndex); 
		//----
	
		var indexBuffer = gl.createBuffer(); 	
		var indexBufferElements = indices.length; 
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); 		
	
		return {
			"draw" : function(camera) {
				//TEMPORARY VALUES 			
				var uCameraPosition = vec3.create([camera[3], camera[7], camera[11]]); 
				var uLightPosition = vec3.create([0,100,0]); 
				var uWorldIllum = 0.2; 
	            var uMaterialIllum = 0.4; 
	            var uMaterialDiffus = 0.3;   
	            var uMaterialSpecular = 0.3; 
	            var uLightStrength = 0.5;  		
				//----
	
				gl.useProgram(program); 
	
				//TEST 			
	    		gl.enableVertexAttribArray(aVertexIndex); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
	
				mat4.identity(modelview); 
	
				mat4.multiply(modelview, camera); 
	
				mat4.translate(modelview, position); 
				mat4.rotateY(modelview, alphax); 
				mat4.rotateX(modelview, alphay); 
				//var s = 1 / 40; 
				//mat4.scale(modelview, [s,s,s]);  
	
				//!!! camera = mat4.lookAt(....); 
				//!!! mat4.multiply(modelview, camera); 
				//mat4.translate(modelview, [0,-0.5,-2]); 
				//mat4.scale(modelview, [20,1,20]); 
				//mat4.rotateY(modelview, alpha); 
				
				/*
	uniform mat4 uProjection; 
	uniform vec3 uCameraPosition; 
	uniform vec3 uLightPosition; 
	
	uniform float uWorldIllum; 
	uniform float uMaterialIllum;
	uniform float uMaterialDiffus;  
	uniform float uMaterialSpecular; 
	uniform float uLightStrength; 
	
	uniform mat4 uModelview;
				*/
				
				var uProjectionIndex = gl.getUniformLocation(program, "uProjection") || throwError();
				gl.uniformMatrix4fv(uProjectionIndex, false, projection);
				
				var uCameraPositionIndex = gl.getUniformLocation(program, "uCameraPosition") || throwError();
				gl.uniform3fv(uCameraPositionIndex, uCameraPosition);
	
				var uLightPositionIndex = gl.getUniformLocation(program, "uLightPosition") || throwError();
				gl.uniform3fv(uLightPositionIndex, uLightPosition); 
	
				var uWorldIllumIndex = gl.getUniformLocation(program, "uWorldIllum") || throwError();
				gl.uniform1f(uWorldIllumIndex, uWorldIllum);
	
				var uMaterialIllumIndex = gl.getUniformLocation(program, "uMaterialIllum") || throwError();
				gl.uniform1f(uMaterialIllumIndex, uMaterialIllum);
	
				var uMaterialDiffusIndex = gl.getUniformLocation(program, "uMaterialDiffus") || throwError();
				gl.uniform1f(uMaterialDiffusIndex, uMaterialDiffus);
	
				var uMaterialSpecularIndex = gl.getUniformLocation(program, "uMaterialSpecular") || throwError();
				gl.uniform1f(uMaterialSpecularIndex, uMaterialSpecular); 
	
				var uLightStrengthIndex = gl.getUniformLocation(program, "uLightStrength") || throwError();
				gl.uniform1f(uLightStrengthIndex, uLightStrength); 
				
				var uModelViewIndex = gl.getUniformLocation(program, "uModelview") || throwError();
				gl.uniformMatrix4fv(uModelViewIndex, false, modelview);			
	
				//var vEyeIndx = gl.getUniformLocation(program, "vEye");
				//gl.uniformMatrix4fv(vEyeIndx, false, eye);
				//var fTexIndx = gl.getUniformLocation(program, "texture");
	
				//gl.activeTexture(gl.TEXTURE0);
				//gl.bindTexture(gl.TEXTURE_2D, program.texture);
				//gl.uniform1i(fTexIndx, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); 
			    gl.vertexAttribPointer(aVertexIndex, vertexElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aVertexIndex); 
	
				gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer); 
			    gl.vertexAttribPointer(aNormalIndex, normalElementSize, gl.FLOAT, false, 0, 0); 
	    		gl.enableVertexAttribArray(aNormalIndex); 
		
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);        
	
	        	gl.drawElements(gl.TRIANGLES, indexBufferElements, gl.UNSIGNED_SHORT, 0);
	
				gl.bindBuffer(gl.ARRAY_BUFFER, null); 
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
				//gl.drawArrays(gl.TRIANGLES, 0, program.numVertices); 
				//gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);        
			}, 
			"update" : function(secs) {
				var a = secs * 2 * Math.PI;
				var step = secs; 
	
				if(UTIL.keyIsDown(UTIL.keys.j)) { 
					alphax += a; 
				}
	
				if(UTIL.keyIsDown(UTIL.keys.l)) { 
					alphax -= a; 
				}			
	
				if(UTIL.keyIsDown(UTIL.keys.i)) { 
					alphay += a; 
				}
	
				if(UTIL.keyIsDown(UTIL.keys.k)) { 
					alphay -= a; 
				}			
	
				alphax += secs * Math.PI * 2  * 0.2; 
				alphay += secs * Math.PI * 2  * 0.1; 
			}
		};	
	
		function throwError() {
			throw ":("; 
		}
	}
	


	return module; 
}());



// MAIN 
var projection = mat4.perspective(75, 4/3, 0.1, 10); 
var isRunning = true; 

function main() {
    gl = UTIL.createContext(640, 480); 
	var lastTime = Date.now(); 

	var camPos = vec3.create([0,1,2]);
	var camNormal = vec3.create([0,0,-1]); 
	var camDir = vec3.create([0,0,0]); 
	var camUp = vec3.create([0,1,0]); 

    var cube = SHAPES.createCube(gl, projection); 
    //var ground = SHAPES.createGround(gl, projection); 

    UTIL.requestGameFrame(function gameloop(delta) {
		var camera = calcCamera(delta, camPos, camNormal, camDir, camUp); 

        if(isRunning) { 			
			clear(gl); 
            //ground.draw(camera);
			cube.draw(camera); 
            //ground.update(delta); 
			cube.update(delta); 
        }
		
		if(UTIL.keyWasReleased(UTIL.keys.p)) {
			isRunning = !isRunning; 
		}

        UTIL.requestGameFrame(gameloop); 
    });
}

function calcCamera(delta, camPos, camNormal, camDir, camUp) {
	var d = delta; 

	if(UTIL.keyIsDown(UTIL.keys.shift)) {
		d *= 3; 
	}

	var camera = mat4.lookAt(camPos, vec3.add(camPos, camNormal, camDir), camUp);
	var pad = UTIL.getFirstPad();  

	var padX1 = pad.axes[0]; 
	var padY1 = pad.axes[1];
	var padX2 = pad.axes[2];
	var padY2 = pad.axes[3];

	var forward = padY1 * d; 
	var spin = padX2 * d * 2 * Math.PI; 

	forward += UTIL.keyIsDown(UTIL.keys.w) ? d : 0; 
	forward -= UTIL.keyIsDown(UTIL.keys.s) ? d : 0; 
	spin += UTIL.keyIsDown(UTIL.keys.a) ? 2 * Math.PI * d : 0; 
	spin -= UTIL.keyIsDown(UTIL.keys.d) ? 2 * Math.PI * d : 0; 

	vec3.add(camPos, [forward * camNormal[0], 0, forward * camNormal[2]]); 

	var matRot = mat4.identity(); 
	mat4.rotateY(matRot, spin); 
	mat4.rotateX(matRot, padY2); 
	mat4.multiplyVec3(matRot, camNormal); 

	return camera; 
}

function clear(gl) {
    gl.viewport(0, 0, 640, 480); 
    gl.clearColor(97 / 256, 149 / 256, 237 / 256, 1); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
	gl.enable(gl.DEPTH_TEST); 
}

window.onload = main; 
}()); 

