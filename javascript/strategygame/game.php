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

	<div id='scaf' ><!--document.getElementById('scaf').innerHTML +=--></div>

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

	//create map
	for (row = 0; row < 40; row++) {
		document.getElementById('map').innerHTML += '<span class="terrain" id="row' + row + '">' + '_'.repeat(40) + '</span><br>';
	}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}



	class sprite {
		
		constructor(position) {
			//add sprite to map
			document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,position[1]) + 'A' + document.getElementById('row' + position[0]).innerHTML.substr(position[1] + 1,40);
			
			this.position = position;

			//expand later on this by having classes, health levels, etc
		}

		move(direct) {
			var position = this.position;
			//delete sprite in old position
			document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,position[1]) + '_' + document.getElementById('row' + position[0]).innerHTML.substr(position[1] + 1,40);

			if (direct == 'right' || direct == 'left') {
				if (direct == 'right') {
					var newPos = position[1] + 1;
				} else {
					var newPos = position[1] - 1;
				} 
				//create sprite in new position
				document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,newPos) + 'A' + document.getElementById('row' + position[0]).innerHTML.substr(newPos + 1,40);
				this.position = [position[0], newPos];
			} else {
				if (direct == 'up') {
					var newPos = position[0] - 1;
				} else {
					var newPos = position[0] + 1;
				} 
				document.getElementById('row' + newPos).innerHTML = document.getElementById('row' + newPos).innerHTML.substr(0,position[1]) + 'A' + document.getElementById('row' + newPos).innerHTML.substr(position[1] + 1,40);
				this.position = [newPos, position[1]];
			}
		}

	}

	sprites = [];
	sprites.push(new sprite([27,30]));
	sprites.push(new sprite([10,20]));




	function turns(current) {
		moves = 3;
		if (current >= sprites.length) {
			current = 0;
		}

		//updates moves and if out of moves goes to next sprite
		function moveUpdater(num) {
			moves -= 1;
			if (num == 0) {
				turns(current + 1);
			}
		}

		//runs when a key is pressed
		document.onkeypress = function(key) {
			//"or" statements are for other browsers
			key = key || window.event;
			charCode = key.keyCode || key.which;
			letter = String.fromCharCode(charCode);
			if (letter == 'w'  || letter == 'W') {
				sprites[current].move('up');
				moveUpdater(moves);
			} else if (letter == 'a' || letter == 'A') {
				sprites[current].move('left');
				moveUpdater(moves);
			} else if (letter == 's' || letter == 'S') {
				sprites[current].move('down');
				moveUpdater(moves);
			} else if (letter == 'd' || letter == 'D') {
				sprites[current].move('right');
				moveUpdater(moves);
			}
		};
	}

	turns(0);

</script>
</html>