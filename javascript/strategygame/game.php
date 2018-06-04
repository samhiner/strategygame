<!DOCTYPE html>
<html>
<head>
	<link href="https://fonts.googleapis.com/css?family=Basic" rel="stylesheet">

	<style>
		@font-face {
			font-family: 'Square'; 
			src: url('square.ttf'); 
		}
		.terrain {
			background-color: green;
		}
		.map {
			font-family: 'Square', sans-serif;
			font-size: 20px;
		}
		.yourTerrain {
			background-color: red;
		}
	</style>
</head>
<body>

	<div id='map' class='map'></div>

	<div id='scaf'><!--document.getElementById('scaf').innerHTML +=--></div>

</body>
<script>

	/*myTerritory = {}

	myTerritory[0] =[3,6];
	myTerritory[1] = [7,3];
	myTerritory[2] = [2,5];
	myTerritory[3] = [7,3];
	myTerritory[4] = [2,4];

	for (row = 0; row < 40; row++) {
		for (col = 0; col < 40; col++) {
			//if nothing in row is defined or your col in the row isnt defined id becomes normal terrain. else id is your terrain
			if (myTerritory[row] == null || myTerritory[row].indexOf(col) == '-1') {
				terrainType = 'terrain';
			} else {
				terrainType = 'yourTerrain';
			}
			document.getElementById('map').innerHTML += "<span class='" + terrainType + "' id='" + row + "," + col + "'>_</span>";
		}
		document.getElementById('map').innerHTML += '<br>';
	}





	/*freeTerrain = document.getElementsByName('terrain');

	for (x = 0; x < freeTerrain.length; x++) {
		coords = freeTerrain[x].id.split(',');

	}*/


	for (row = 0; row < 40; row++) {
		document.getElementById('map').innerHTML += '<span class="terrain" id="row' + row + '">' + '_'.repeat(40) + '</span><br>';
	}

	//for (x = 0; x < 40; x++) {
	document.getElementById('row27').innerHTML = document.getElementById('row27').innerHTML.substr(0,30) + 'A' + document.getElementById('row27').innerHTML.substr(31,40);
	position = [27,30];

	function vertMove(direct) {
		if (direct == 'up') {
			newPos = position[0] - 1;
		} else {
			newPos = position[0] + 1;
		}

		//delete sprite in old position
		document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,position[1]) + '_' + document.getElementById('row' + position[0]).innerHTML.substr(position[1] + 1,40);
		//create sprite in new position
		document.getElementById('row' + newPos).innerHTML = document.getElementById('row' + newPos).innerHTML.substr(0,position[1]) + 'A' + document.getElementById('row' + newPos).innerHTML.substr(position[1] + 1,40);
		
		position = [newPos, position[1]];
	}

	function horiMove(direct) {
		if (direct == 'right') {
				newPos = position[1] + 1;
			} else {
				newPos = position[1] - 1;
			}

		//delete sprite in old position
		document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,position[1]) + '_' + document.getElementById('row' + position[0]).innerHTML.substr(position[1] + 1,40);
		//create sprite in new position
		document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,newPos) + 'A' + document.getElementById('row' + position[0]).innerHTML.substr(newPos + 1,40);

		position = [position[0], newPos]
	}

	//}
	document.onkeypress = function(key) {
		//"or" statements are for other browsers
	    key = key || window.event;
	    charCode = key.keyCode || key.which;
	    letter = String.fromCharCode(charCode);
    	if (letter == 'w'  || letter == 'W') {
    		vertMove('up');
    	} else if (letter == 'a' || letter == 'A') {
    		horiMove('left');
    	} else if (letter == 's' || letter == 'S') {
    		vertMove('down');
    	} else if (letter == 'd' || letter == 'D') {
    		horiMove('right');
    	}
    };

</script>
</html>