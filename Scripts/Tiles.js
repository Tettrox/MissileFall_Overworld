class TileSand extends MiniEntity
{
	constructor(newX, newY)
	{
		super();
		this.EntityTag = "TileSand";
		this.EntitySpr = document.getElementById("SprSand");
		this.XLoc = newX;
		this.YLoc = newY;
		this.EntityWidth = 16;
		this.EntityHeight = 16;
	}
}
class TileCactus extends MiniEntity
{
	constructor(newX, newY)
	{
		super();
		this.EntityTag = "TileCactus";
		this.EntitySpr = document.getElementById("SprCactus");
		this.XLoc = newX;
		this.YLoc = newY;
		this.EntityWidth = 16;
		this.EntityHeight = 16;
	}
}
class TileCowSkull extends MiniEntity
{
	constructor(newX, newY)
	{
		super();
		this.EntityTag = "TileCowSkull";
		this.EntitySpr = document.getElementById("SprTiles");
		this.XLoc = newX;
		this.YLoc = newY;
		this.EntityWidth = 16;
		this.EntityHeight = 16;
		this.ClipX = 16;
		this.ClipY = 0;
	}
}
class TileDune extends MiniEntity
{
	constructor(newX, newY)
	{
		super();
		this.EntityTag = "TileDune";
		this.EntitySpr = document.getElementById("SprTiles");
		this.XLoc = newX;
		this.YLoc = newY;
		this.EntityWidth = 16;
		this.EntityHeight = 16;
		this.ClipX = 0;
		this.ClipY = 0;
	}
}