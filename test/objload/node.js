var glt = require("./glt.js"); 
var fs = require("fs"); 

var f = fs.readFileSync("house.obj"); 
var obj = f.toString(); 

glt.obj.parse(obj); 


