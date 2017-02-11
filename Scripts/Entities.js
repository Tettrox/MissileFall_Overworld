//Uses only bare-minimum variables needed to be an entity.
class MiniEntity
{
	constructor()
	{
		this.EntityTag = "MiniEntity";
		this.EntitySpr = "";
		this.EntityWidth = 0;
		this.EntityHeight = 0;
		this.EntitySpeed = 0;
		this.XLoc = 0;
		this.YLoc = 0;
		this.XVel = 0;
		this.YVel = 0;
		this.ClipX = 0;
		this.ClipY = 0;
	}
}

//Normal-sized entity with all the bases covered.
class Entity extends MiniEntity
{
	constructor()
	{
		super();
		this.EntityTag = "Entity";
		
		//For information related to animation variables, see docs. Search 'Animation Set Options'.
		this.MaxAnimationFrames = 0;
		this.AnimationFrame = 0;
		this.AnimationSet = 0;
		this.ASLeft = [];
		this.ASRight = [];
		this.ASUp = [];
		this.ASDown = [];
		
		//This will be set later if the entity needs it. Otherwise, it will be disabled so there is no possibility for an invalid animation to play.
		this.AnimationTimer = 0;
	}
	
	doAnimation()
	{
		//TODO: Try using a 2D array for this. Might work with the weird way JavaScript does arrays.
		if (this.AnimationFrame < this.ASRight.length)
		{
			this.ClipX = this.ASRight[this.AnimationFrame].XLoc;
			this.ClipY = this.ASRight[this.AnimationFrame].YLoc;
			this.AnimationFrame++;
		} else {
			this.AnimationFrame = 0;
		}
	}
	
}

class Player extends Entity
{
	constructor()
	{
		super();
		this.EntityTag = "Player";
		this.EntitySpr = document.getElementById("SprPlayer");
		this.EntityWidth = 16;
		this.EntityHeight = 16;
		this.EntitySpeed = 2;
		
		//Set all animation variables.
		this.AnimationSet = 2;
		this.ASLeft = [];
		this.ASRight = [new Point(19, 33), new Point(35, 32), new Point(50, 32)];
		this.ASUp = [];
		this.ASDown = [];
		this.AnimationTimer = setInterval(this.doAnimation.bind(this), 88);
		
		this.XLoc = document.getElementById("GameCanvas").width / 2 - this.EntityWidth;
		this.YLoc = document.getElementById("GameCanvas").height / 2 - this.EntityHeight;
	}
}

//Used as a placeholder for another entity. Just displays a copy of the first player frame.
class DEBUGSQUARE extends Entity
{
	constructor(newX, newY)
	{
		super();
		this.EntityTag = "DEBUGSQUARE";
		this.EntitySpr = document.getElementById("SprPlayer");
		this.EntityWidth = 16;
		this.EntityHeight = 16;
		this.XLoc = newX;
		this.YLoc = newY;
	}
}