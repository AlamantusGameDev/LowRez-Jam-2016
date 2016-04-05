var ani_ocean = OS.A.Add("Ocean", 256, 256, {columns: 10, speed: 1/120});

function oceanTilePrefab() {}

var pr_ocean = OS.P.Add("Ocean Particle", {
	imageSrc: "images/ocean_sheet.png",
	animations: [ani_ocean],

	positionCheckStep: 30,
	positionCheckProgress: 30,
	doCheckPosition: false;
});

pr_ocean.Do = function () {
	if (this.doCheckPosition) {
		// If it's completely off the screen, then update position.
		if ((Math.abs(this.x - pr_ship.x) > (OS.camera.width + this.image.width)) ||
			(Math.abs(this.y - pr_ship.y) > (OS.camera.height + this.image.height)))
		{
			switch (pr_ship.direction) {
				case 0:
					// if (pr_ship.doTakeStep) pr_ship.x += OS.S.pixelScale;
					break;
				case 45:
					// if (pr_ship.doTakeStep) { pr_ship.x += OS.S.pixelScale; pr_ship.y -= OS.S.pixelScale; }
					break;
				case 90:
					// if (pr_ship.doTakeStep) pr_ship.y -= OS.S.pixelScale;
					break;
				case 135:
					// if (pr_ship.doTakeStep) { pr_ship.x -= OS.S.pixelScale; pr_ship.y -= OS.S.pixelScale; }
					break;
				case 180:
					// if (pr_ship.doTakeStep) pr_ship.x -= OS.S.pixelScale;
					break;
				case 225:
					// if (pr_ship.doTakeStep) { pr_ship.x -= OS.S.pixelScale; pr_ship.y += OS.S.pixelScale; }
					break;
				case 270:
					// if (pr_ship.doTakeStep) pr_ship.y -= OS.S.pixelScale;
					break;
				case 315:
					// if (pr_ship.doTakeStep) { pr_ship.x += OS.S.pixelScale; pr_ship.y += OS.S.pixelScale; }
					break;
				default:
					console.log("No valid direction");
					break;
			}
		}
	}
}