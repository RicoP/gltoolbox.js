#!/bin/sh

echo "" > glt.js 

cat ../../src/pre.js >> glt.js
cat ../../src/glt.obj.js >> glt.js
echo "exports.obj = GLT.obj;" >> glt.js 
