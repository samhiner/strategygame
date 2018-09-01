//create map
for (row = 0; row < 40; row++) {
	document.getElementById('map').innerHTML += '<span class="terrain" id="row' + row + '">' + '_'.repeat(40) + '</span><br>';
}

//function which finds out how many characters that come before your sprite in a row are HTML tags so it can adjust the position so that it will place the sprite accordingly
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

class sprite {
	
	constructor(position) {
		//add sprite to map
		replaceTile(position,'A');
		
		this.position = position;
		spriteCollisionList.push(position);

		//expand later on this by having classes, health levels, etc
	}

	move(direct) {
		var position = this.position;

		//change position based on what button was pressed
		if (direct == 'right') {
			var newPos = [position[0],position[1] + 1];
		} else if (direct == 'left'){
			var newPos = [position[0],position[1] - 1];
		} else if (direct == 'up') {
			var newPos = [position[0] - 1,position[1]];
		} else {
			var newPos = [position[0] + 1,position[1]];
		} 
		
		if (coordListCheck(blacklist, newPos) !== false) {
			return true;
		}

		//TODO: make collision check function
		const spriteListIndex = coordListCheck(spriteCollisionList, newPos);
		if (spriteListIndex !== false) {
			if (confirm('Battle that sprite?')) {
				if (Math.random() > 0.5) {
					alert('You win!');

					const oldIndex = sprites.indexOf(this);

					replaceTile(newPos,'_');
					const foreignSpriteIndex = coordListCheck(sprites, newPos, true)
					killSprite(foreignSpriteIndex, spriteCollisionList.indexOf(spriteListIndex))

					//if the index of the current sprite in the sprites list was after the sprite that was removed that index is now different
					//indexDisrupted tells the turns function this and lets it adjust so it is still moving the proper sprite
					if (oldIndex < foreignSpriteIndex) {
						return 'kill-nominal';
					} else {
						return 'kill-indexDisrupted';
					}
				} else {
					alert('You lose.')
					replaceTile(position,'_');
					killSprite(sprites.indexOf(this), spriteCollisionList.indexOf(position))
					return 'dead';
				}
			} else {
				return true;
			}
		}
		
		//physically delete sprite in old position
		replaceTile(position,'_');
		//find sprite's old position in blacklist and remove it from blacklist
		var spriteCollisionListIndex = spriteCollisionList.indexOf(position)
		spriteCollisionList.splice(spriteCollisionListIndex, 1);
		
		//create sprite in new position
		replaceTile(newPos,'A');
		spriteCollisionList.push(newPos);
		//change sprites logged position to the new position
		this.position = newPos;
		
		return false;
	}

}

//TODO: doesnt have to be in here i think
//return true if a coordinate position is on the blacklist
function coordListCheck(list, position, spriteList = false) {
	let current = []
	for (var x = 0; x < list.length; x++) {
		//if you are querying the list of sprites look at the coordinate attribute
		if (spriteList) {
			current = list[x].position
		} else {
			current = list[x]
		}

		if (current[0] == position[0]) {
			if (current[1] == position[1]) {
				//this can be 0 so make sure you use === when checking truth of this function
				return x;
			}
		}
	}
	return false;
}



function killSprite(spriteIndex, collIndex) {
	sprites.splice(spriteIndex, 1)
	spriteCollisionList.splice(collIndex, 1)
}

// TERRAIN CREATION

var blacklist = [];

blacklist.push([10, 10]);
blacklist.push([30,30]);
replaceTile(blacklist[0],'<span style="background-color: red;">_</span>');

// SPRITE CREATION

var spriteCollisionList = [];
var sprites = []; //ISSUE CHECK IF ADDING VAR MAKES NOT GLOBAL
sprites.push(new sprite([27,30]));
sprites.push(new sprite([27,29]));

// TURN MANAGEMENT

function turns(current) {
	moves = 3;
	if (current >= sprites.length) {
		current = 0;
	}

	//updates moves and if out of moves goes to next sprite
	function turnUpdater(redo) {
		//if redo was not requested remove one "move"
		if (redo == false || redo == 'kill-nominal') {
			moves -= 1;
		} else if (redo == 'dead') {
			moves = 0
		} else if (redo == 'kill-indexDisrupted') {
			moves -= 1;
			current -= 1;
		}

		if (moves <= 0) {
			turns(current + 1);
		}
	}

	//runs when a key is pressed
	document.onkeypress = function(key) {
		//"or" statements are for non-Google browsers
		key = key || window.event;
		charCode = key.keyCode || key.which;
		letter = String.fromCharCode(charCode);
		if (letter == 'w'  || letter == 'W') {
			var redo = sprites[current].move('up');
			turnUpdater(redo);
		} else if (letter == 'a' || letter == 'A') {
			var redo = sprites[current].move('left');
			turnUpdater(redo);
		} else if (letter == 's' || letter == 'S') {
			var redo = sprites[current].move('down');
			turnUpdater(redo);
		} else if (letter == 'd' || letter == 'D') {
			var redo = sprites[current].move('right');
			turnUpdater(redo);
		} else if (letter == 'r' || letter == 'R') {
			statsDisplay = document.getElementById('stats').style.display
			mapDisplay = document.getElementById('map').style.display
			if (document.getElementById('stats').style.display == 'none') {
				document.getElementById('stats').style.display = 'block';
				document.getElementById('map').style.display = 'none';
			} else {
				document.getElementById('stats').style.display = 'none';
				document.getElementById('map').style.display = 'block';
			}
		}
	};
}

turns(0);

