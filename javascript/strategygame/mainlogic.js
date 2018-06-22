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

//function which finds out how many characters in a row before your sprite are HTML tags so it can adjust the position that it will place the sprite accordingly
	//targetPos = where the sprite will move, foundInTag = how many chars found inside HTML tags, foundOutTag = num of chars found outside of HTML tags, nowInTag = are you in a tag now, x = where you are currenty in string.
function checkTerrain(targetPos,foundInTag,foundOutTag,nowInTag,x) {
	if (nowInTag == true) {
		foundInTag += 1;
		if (document.getElementById('row' + targetPos[0]).innerHTML[x] == '>') {
			nowInTag = false;
		}
	} else if (document.getElementById('row' + targetPos[0]).innerHTML[x] == '<') {
		foundInTag += 1;
		nowInTag = true;
	} else {
		foundOutTag += 1;
	}

	if (foundOutTag == targetPos[1]) {
		var end = foundInTag;
		return foundInTag;
	} else {
		return checkTerrain(targetPos,foundInTag,foundOutTag,nowInTag,x + 1);
	}
}



//replace the tile at given position with given letter
function replaceTile(position, newChar) {
	var space = checkTerrain([position[0],position[1] + 1],0,0,false,0);
	document.getElementById('row' + position[0]).innerHTML = document.getElementById('row' + position[0]).innerHTML.substr(0,position[1] + space) + newChar + document.getElementById('row' + position[0]).innerHTML.substr(position[1] + 1 + space,document.getElementById('row' + position[0]).innerHTML.length);
}

var blacklist = [];
blacklist.push([10, 10]);
blacklist.push([30,30]);
replaceTile(blacklist[0],'<span style="background-color: red;">_</span>');

class sprite {
	
	constructor(position) {
		//add sprite to map
		replaceTile(position,'A');
		
		this.position = position;

		//expand later on this by having classes, health levels, etc
	}

	move(direct) {
		var position = this.position;

		//change position based on what button was pressed
		if (direct == 'right' || direct == 'left') {
			if (direct == 'right') {
				var newPos = [position[0],position[1] + 1];
			} else {
				var newPos = [position[0],position[1] - 1];
			} 
		} else {
			if (direct == 'up') {
				var newPos = [position[0] - 1,position[1]];
			} else {
				var newPos = [position[0] + 1,position[1]];
			} 
		}

		var onBlackList = false;
		console.log(newPos);
		for (var x = 0; x < blacklist.length; x++) {
			console.log(blacklist[x]);
			if (blacklist[x][0] == newPos[0]) {
				if (blacklist[x][1] == newPos[1]) {
					onBlackList = true;
					break;
				}
			}
		}

		if (onBlackList == true) {
			alert('danger zone');
			return;
		}

		//delete sprite in old position
		replaceTile(position,'_');
		//create sprite in new position
		replaceTile(newPos,'A');
		//change sprites logged position to the new position
		this.position = newPos;
	}

}

sprites = [];
sprites.push(new sprite([27,30]));
sprites.push(new sprite([11,20]));




function turns(current) {
	moves = 3;
	if (current >= sprites.length) {
		current = 0;
	}

	//updates moves and if out of moves goes to next sprite
	function turnUpdater() {
		moves -= 1;
		if (moves == 0) {
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
			turnUpdater();
		} else if (letter == 'a' || letter == 'A') {
			sprites[current].move('left');
			turnUpdater();
		} else if (letter == 's' || letter == 'S') {
			sprites[current].move('down');
			turnUpdater();
		} else if (letter == 'd' || letter == 'D') {
			sprites[current].move('right');
			turnUpdater();
		}
	};
}

turns(0);