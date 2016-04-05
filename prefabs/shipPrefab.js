var ani_ship_r = OS.A.Add("Ship Right", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 4});
var ani_ship_ur = OS.A.Add("Ship Up-Right", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 7});
var ani_ship_u = OS.A.Add("Ship Up", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 5});
var ani_ship_ul = OS.A.Add("Ship Up-Left", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 6});
var ani_ship_l = OS.A.Add("Ship Left", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 3});
var ani_ship_dl = OS.A.Add("Ship Down-Left", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 1});
var ani_ship_d = OS.A.Add("Ship Down", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 0});
var ani_ship_dr = OS.A.Add("Ship Down-Right", 64, 64, {columns: 2, speed: 1/60, yOffset: 64 * 2});

function shipPrefab() {}

var pr_ship = OS.P.Add("Ship", {
	solid: true,
	imageSrc: "images/ship_sheet.png",
	maskImageSrc: "images/ship_mask.png",
	animations: [ani_ship_r, ani_ship_ur, ani_ship_u, ani_ship_ul, ani_ship_l, ani_ship_dl, ani_ship_d, ani_ship_dr],
	
	direction: 0,
	currentSpeed: 0,
	moveStepSize: 3,
	moveStepAmount: 5 * Oversimplified.R[Oversimplified.R.currentRoom].stepSpeed,
	moveStepProgress: 0,
	doTakeStep: false,

	// Ship stats.
	speedStat: 1
});

pr_ship.Do = function () {
	if (ct_left().down) {
		this.direction += 45;
	} else if (ct_right().down) {
		this.direction -= 45;
	}
	this.direction = Math.clampAngle(this.direction);

	if (ct_up().down) {
		this.currentSpeed++;
	} else if (ct_down().down) {
		this.currentSpeed--;
	}
	this.currentSpeed = Math.clamp(this.currentSpeed, 0, 4);

	this.moveStepProgress += this.currentSpeed * this.moveStepAmount;
	if (this.moveStepProgress >= this.moveStepSize) {
		this.moveStepProgress -= this.moveStepSize;
		this.doTakeStep = true;
	} else {
		this.doTakeStep = false;
	}
}

pr_ship.AfterDo = function () {
	switch (this.direction) {
		case 0:
			if (this.image.currentAnimation != "Ship Right") this.SetAnimation("Ship Right");
			if (this.doTakeStep) this.x += (this.speedStat + this.currentSpeed) * OS.S.pixelScale;
			break;
		case 45:
			if (this.image.currentAnimation != "Ship Up-Right") this.SetAnimation("Ship Up-Right");
			if (this.doTakeStep) { this.x += (this.speedStat + this.currentSpeed) * OS.S.pixelScale; this.y -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale; }
			break;
		case 90:
			if (this.image.currentAnimation != "Ship Up") this.SetAnimation("Ship Up");
			if (this.doTakeStep) this.y -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale;
			break;
		case 135:
			if (this.image.currentAnimation != "Ship Up-Left") this.SetAnimation("Ship Up-Left");
			if (this.doTakeStep) { this.x -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale; this.y -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale; }
			break;
		case 180:
			if (this.image.currentAnimation != "Ship Left") this.SetAnimation("Ship Left");
			if (this.doTakeStep) this.x -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale;
			break;
		case 225:
			if (this.image.currentAnimation != "Ship Down-Left") this.SetAnimation("Ship Down-Left");
			if (this.doTakeStep) { this.x -= (this.speedStat + this.currentSpeed) * OS.S.pixelScale; this.y += (this.speedStat + this.currentSpeed) * OS.S.pixelScale; }
			break;
		case 270:
			if (this.image.currentAnimation != "Ship Down") this.SetAnimation("Ship Down");
			if (this.doTakeStep) this.y += (this.speedStat + this.currentSpeed) * OS.S.pixelScale;
			break;
		case 315:
			if (this.image.currentAnimation != "Ship Down-Right") this.SetAnimation("Ship Down-Right");
			if (this.doTakeStep) { this.x += (this.speedStat + this.currentSpeed) * OS.S.pixelScale; this.y += (this.speedStat + this.currentSpeed) * OS.S.pixelScale; }
			break;
		default:
			console.log("No valid direction");
			break;
	}
}
