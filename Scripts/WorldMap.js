//Should be map width, map height, object width, object height.
var MapSize = [GameCanvas.width, GameCanvas.height, 16, 16];
var MapData = [];
var Mutations = ["DEBUGSQUARE"];
var TempMapData = [];


class TileScaffold
{
	constructor(newX, newY)
	{
		this.XLoc = newX;
		this.YLoc = newY;
		this.TargetTile = "NONE";
	}
}

//Uses data provided in MapSize to create data for a new map that can then be randomly mutated.
function newMap()
{
	console.log("system>Updating canvas width and height variables...");
	MapSize = [GameCanvas.width, GameCanvas.height, 16, 16];
	console.log("system>Creating new map...");
	
	if (MapData.length > 0)
	{
		console.log("system>Previous map detected, overwriting...");
		TempMapData = [];
		MapData = [];
	}
	
	for (var i = 0; i < Math.floor(GameCanvas.height / 16); i++)
	{
		for (var i2 = 0; i2 < Math.floor(GameCanvas.width / 16); i2++)
		{
			TempMapData.push(new TileScaffold(i2 * 16, i * 16));
		}
	}
	
	console.log("system>New map created successfully.");
}

//Adds various mutations to MapData using Mutations as a list of possible entities.
function mutateMap()
{
	//This is defined up here so we don't need to constantly re-declare it down below.
	var _DoMutate = 0;
	//Which object it will mutate into.
	/*
		1: Cactus
		2: Cow Skull
		3: Sand dune.
	*/
	var _MutateChoice = 0;
	//Chance to mutate. Lower numbers means a higher chance for mutation.
	var _MutateChanceMax = 36;
	
	for (var i = 0; i < TempMapData.length; i++)
	{
		_DoMutate = Math.floor(Math.random() * _MutateChanceMax);
		
		if (_DoMutate + 2 === _MutateChanceMax)
		{
			_MutateChoice = Math.floor(Math.random() * 100);
			
			//This should go from lowest to highest. If it does not operate as such, some elements will never spawn.
			if (_MutateChoice < 15)
			{
				Tiles.push(new TileCowSkull(TempMapData[i].XLoc, TempMapData[i].YLoc));
			} else if (_MutateChoice < 25) {
				Tiles.push(new TileDune(TempMapData[i].XLoc, TempMapData[i].YLoc));
			} else if (_MutateChoice < 70) {
				Tiles.push(new TileCactus(TempMapData[i].XLoc, TempMapData[i].YLoc));
			}
		}
	}
}

function loadMap()
{
	/*
	MapData.forEach(function(_Row)
	{
		_Row.forEach(function(_Col)
		{
			if (_Col == 1)
			{
				Tiles.push(new TileCactus((1 + _Row) * 16, (1 + _Col) * 16));
			}
		});
	});
	*/
	
	/*
	for (var row = 0; row < MapData.length; row++)
	{
		for (var col = 0; col < MapData[row].length; col++)
		{
			if (MapData[row][col] == 1)
			{
				Tiles.push(new TileCactus((1 + row) * 16, (1 + col) * 16));
				console.log(row + "" + col);
			} else if (MapData[row][col] == 0) {
				//Tiles.push(new TileSand((1 + row) * 16, (1 + col) * 16));
			}
		}
	}
	*/
}

//Shorthand function for generating a new map.
function shNewMap()
{
	newMap();
	mutateMap();
	loadMap();
}