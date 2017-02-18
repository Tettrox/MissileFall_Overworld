/*
    Copyright Brian James 'Tettrox' Van Craenenbroeck.
	Check Github for source.
	License: MIT.
	
	Load Order:
	1. Globals.js
	2. Entities.js
	3. Tiles.js
	4. Structures.js
	5. WorldMap.js
	6. GameScript.js
*/
var CameraArea = [20, 20];
var CameraPixelData = 0;

var GameState = 0;
var GameLoopTmr = 0;

//Temporarily moved from drawEntities to test for memory leaks.
var _LightSrc;

//Checks collision between all entities in the Entities array.
function checkEntityCollision()
{
	for (var E1 = 0; E1 < Entities.length; E1++)
	{
		for (var E2 = 0; E2 < Entities.length; E2++)
		{
			if (Entities[E1].XLoc < Entities[E2].XLoc + Entities[E2].EntityWidth && Entities[E1].XLoc + Entities[E1].EntityWidth > Entities[E2].XLoc && Entities[E1].YLoc < Entities[E2].YLoc + Entities[E2].EntityHeight && Entities[E1].YLoc + Entities[E1].EntityHeight > Entities[E2].YLoc)
			{
				
			}
		}
	}
}

//Checks collision between all entities and tiles.
function checkEntityTileCollision()
{
	for (var E1 = 0; E1 < Entities.length; E1++)
	{
		for (var E2 = 0; E2 < Tiles.length; E2++)
		{
			if (Entities[E1].XLoc < Tiles[E2].XLoc + Tiles[E2].EntityWidth && Entities[E1].XLoc + Entities[E1].EntityWidth > Tiles[E2].XLoc && Entities[E1].YLoc < Tiles[E2].YLoc + Tiles[E2].EntityHeight && Entities[E1].YLoc + Entities[E1].EntityHeight > Tiles[E2].YLoc)
			{
				console.log("Collision detected!");
			}
		}
	}
}

//Shorthand: checks all collision possibilities.
function checkGlobalCollision()
{
	checkEntityCollision();
	checkEntityTileCollision();
}

//Handles the movement of all entities in the array based on their velocity.
function moveEntities()
{
	for (var i = 0; i < Entities.length; i++)
	{
		Entities[i].XLoc += Entities[i].XVel;
		Entities[i].YLoc += Entities[i].YVel;
	}
	
	CameraArea[0] = Entities[findPlayer()].XLoc - 100;
	CameraArea[1] = Entities[findPlayer()].YLoc - 100;
}

//Draws all entities in Entity array to the screen.
function drawEntities()
{
	GameCanvasCtx.imageSmoothingEnabled = false;
	for (var i = 0; i < Entities.length; i++)
	{
		//Check if the entity should be emmitting light or not.
		if (Entities[i].LightingMod == "Light")
		{
			//GameCanvasCtx.globalCompositeOperation = "source-over";
			_LightSrc = GameCanvasCtx.createRadialGradient(Entities[i].XLoc, Entities[i].YLoc, 16, Entities[i].XLoc, Entities[i].YLoc, 24);
			_LightSrc.addColorStop(0.5, "yellow");
			GameCanvasCtx.globalAlpha = Math.random() * 0.8;
			GameCanvasCtx.beginPath();
			GameCanvasCtx.fillStyle = _LightSrc;
			GameCanvasCtx.arc(Entities[i].XLoc + (Entities[i].EntityWidth / 2), Entities[i].YLoc + Entities[i].EntityHeight, 32, 32, 64);
			GameCanvasCtx.fill();
			GameCanvasCtx.closePath();
			GameCanvasCtx.globalAlpha = 1.0;
		}
		//GameCanvasCtx.fillStyle = "#000000";
		GameCanvasCtx.drawImage(Entities[i].EntitySpr, Entities[i].ClipX, Entities[i].ClipY, Entities[i].EntityWidth, Entities[i].EntityHeight, Entities[i].XLoc, Entities[i].YLoc, Entities[i].EntityWidth, Entities[i].EntityHeight);
		//GameCanvasCtx.globalCompositeOperation = "normal";
	}
}

//Draw all tile data in the Tiles array.
function drawTiles()
{
	GameCanvasCtx.imageSmoothingEnabled = false;
	for (var i = 0; i < Tiles.length; i++)
	{
		GameCanvasCtx.drawImage(Tiles[i].EntitySpr, Tiles[i].ClipX, Tiles[i].ClipY, Tiles[i].EntityWidth, Tiles[i].EntityHeight, Tiles[i].XLoc, Tiles[i].YLoc, Tiles[i].EntityWidth, Tiles[i].EntityHeight);
	}
}

//Main game loop.
function GameLoop()
{
	CameraPixelData = GameCanvasCtx.getImageData(CameraArea[0], CameraArea[1], GameCanvas.width, GameCanvas.height);
	GameCanvasCtx.putImageData(CameraPixelData, 0, 0);
	
	var _Background = GameCanvasCtx.createPattern(document.getElementById("SprSand"), "repeat");
	GameCanvasCtx.fillStyle = _Background;
	GameCanvasCtx.fillRect(0, 0, 30000, 30000);
	
	GameCanvasCtx.fillStyle = "#000000";
	GameCanvasCtx.globalAlpha = 0.5;
	GameCanvasCtx.fillRect(0, 0, 40000, 40000);
	GameCanvasCtx.globalAlpha = 1.0;
	
	moveEntities();
	checkGlobalCollision();
	drawEntities();
	drawTiles();
	
	GameCanvasCtx.fillStyle = "#000000";
	GameCanvasCtx.globalAlpha = 0.5;
	GameCanvasCtx.fillRect(0, 0, 40000, 40000);
	GameCanvasCtx.globalAlpha = 1.0;
	
	CameraPixelData = GameCanvasCtx.getImageData(CameraArea[0], CameraArea[1], 400, 400);
	//GameCanvasCtx.putImageData(CameraPixelData, 0, 0);
	
	GameMirrorCtx.putImageData(CameraPixelData, 0, 0);
	GameMirrorCtx.fillStyle = "#000000";
	//Calculate FPS
	var thisDate = new Date;
	GameMirrorCtx.fillText("FPS: " + Math.floor(1000 / (thisDate - lastDate)), 0, 10);
	lastDate = thisDate;
}

//Main keydown handler.
function keydownInput(e)
{
	var _KeyCode = e.key;
	
	if (_KeyCode == "w")
	{ Entities[findPlayer()].YVel = -Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "s")
	{ Entities[findPlayer()].YVel = Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "a")
	{ Entities[findPlayer()].XVel = -Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "d")
	{ Entities[findPlayer()].XVel = Entities[findPlayer()].EntitySpeed; }
}

//Main keyup handler.
function keyupInput(e)
{
	var _KeyCode = e.key;
	
	if (_KeyCode == "w")
	{ Entities[findPlayer()].YVel += Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "s")
	{ Entities[findPlayer()].YVel -= Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "a")
	{ Entities[findPlayer()].XVel += Entities[findPlayer()].EntitySpeed; }

	if (_KeyCode == "d") 
	{ Entities[findPlayer()].XVel -= Entities[findPlayer()].EntitySpeed; }
}

function initGame()
{
	console.log("***LOADING***");
	GameLoopTmr = setInterval(GameLoop, 10);
	console.log("Loading finished. Hello, Lain.");
	document.addEventListener("keydown", keydownInput);
	document.addEventListener("keyup", keyupInput);
	Entities.push(new Player());
	
	GameMirror.addEventListener("mousemove", function (e)
	{
		MouseX = e.clientX - GameMirror.getBoundingClientRect().left;
		MouseY = e.clientY - GameMirror.getBoundingClientRect().top;
	});
	
	//Only for testing.
	shNewMap();
}