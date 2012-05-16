#!/bin/sh

echo "" > glt.js 

cat lib/csg.js/csg.js >> glt.js
cat lib/glsafecontext.js/glsafecontext.js >> glt.js 
cat lib/webgl-debug.js >> glt.js 
cat lib/zepto/dist/zepto.js >> glt.js 

cat src/pre.js >> glt.js
cat src/glt.createcontext.js >> glt.js
cat src/glt.csg.js >> glt.js
cat src/glt.gamepads.js >> glt.js
cat src/glt.keys.js >> glt.js
cat src/glt.loadmanager.js >> glt.js
cat src/glt.objparser.js >> glt.js
cat src/glt.requestgameframe.js >> glt.js
cat src/glt.shapes.js >> glt.js


