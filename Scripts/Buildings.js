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
		EntityTag = "CampFire";
		this.EntitySpr = document.getElementById("SprSheet_CampFire");
		this.AnimationFrames = [new Point(), new Point()];
		this.BC_Bark = 2;
	}
}