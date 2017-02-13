class Building extends Entity
{
	constructor()
	{
		super();
		this.EntityTag = "Building";
		this.BC_Bark = 0;
		this.BC_Iron = 0;
		this.BC_Steel = 0;
		this.BC_Scrap = 0;
	}
}

class Building_CampFire extends Building
{
	constructor()
	{
		super();
		this.EntityTag = "CampFire";
		this.EntityWidth = 16;
		this.EntityHeight = 16;
		this.EntitySpr = document.getElementById("SprSheet_CampFire");
		this.ASSpecial = [new Point(0, 0), new Point(16, 0), new Point(32, 0), new Point(48, 0)];
		this.AnimationTimer = setInterval(this.doAnimation.bind(this), 80);
		this.AnimationSet = this.ASSpecial;
		this.BC_Bark = 2;
	}
}