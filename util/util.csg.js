var csghelper = (function() { 

//TODO: TESTME 

function addPolygonsToList(list, p) {
	for(var i = 0; i != p.length; i++) {
		var vertices = p[i].vertices;
		addVerticesToList(list, vertices);
	}
}

function addVerticesToList(list, vertices, endpoint) {
	if(!endpoint) {
		return addVerticesToList(list, vertices, vertices.length - 1);
	}

	//CSG Polygon ist Konvex und Koplanar. d. h. man kann die
	//Eckpunkte ganz einfach paarweise zuordnen.
	pushVerticePosition(list, vertices[0].pos);
	pushVerticePosition(list, vertices[endpoint - 1].pos);
	pushVerticePosition(list, vertices[endpoint].pos);

	if(endpoint > 2) {
		addVerticesToList(list, vertices, endpoint - 1);
	}
}

function pushVerticePosition(list, v) {
	list.push(v.x, v.y, v.z);
}

}()); 
