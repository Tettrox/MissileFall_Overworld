GameCanvas = document.getElementById("GameCanvas");
GameCanvasCtx = GameCanvas.getContext('2d');
GameMirror = document.getElementById("GameMirror");
GameMirrorCtx = document.getElementById("GameMirror").getContext('2d');
Entities = [];
Tiles = [];
Structures = [];
MouseX = 0;
MouseY = 0;

//Debug variables.
var lastDate = new Date;

//This will ultimatly be used throughout all files, so it is best to put it here to begin with. It only holds to variables, an X and a Y.
class Point
{
	constructor(newX = 0, newY = 0)
	{
		this.XLoc = newX;
		this.YLoc = newY;
	}
}

//This returns the players position inside Entities. It is in global because it is used for various AI functionality.
function findPlayer()
{
	for (var i = 0; i < Entities.length; i++)
	{
		if (Entities[i].EntityTag == "Player")
			return i;
	}
	console.log("**Warning**: Player not found. Defaulting to Entity position 0.");
	return 0;
}