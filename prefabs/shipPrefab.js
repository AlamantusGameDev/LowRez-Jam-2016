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
	pointInFront : {x: 0, y: 0 },
	moveStepSize: 3,
	moveStepAmount: 5 * Oversimplified.R[Oversimplified.R.currentRoom].stepSpeed,
	moveStepProgress: 0,
	doTakeStep: false,

	energyRefillTimer: 0
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
	if (this.currentSpeed > 1 && G.stats.maxEnergy / G.stats.energy > this.currentSpeed + G.stats.crew) {
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

	this.SeamlessScroll();
	// console.log(G.player.name + " created at " + G.player.x + ", " + G.player.y);
}

pr_ship.AfterDo = function () {
	this.CheckMovement();
	this.UpdateEnergy();
}

pr_ship.CheckInteraction = function () {

}

pr_ship.CheckMovement = function () {
	var moveAmount = (G.stats.speed + this.currentSpeed) * OS.S.pixelScale;
	var movedSuccessfully = false;
	switch (this.direction) {
		case 0:
			if (this.image.currentAnimation != "Ship Right") this.SetAnimation("Ship Right");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(moveAmount, 0, true, 8);
			this.pointInFront.x = this.x + this.xBound + (OS.S.pixelScale * 2) + moveAmount;
			this.pointInFront.y = this.y;
			break;
		case 45:
			if (this.image.currentAnimation != "Ship Up-Right") this.SetAnimation("Ship Up-Right");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(moveAmount, -moveAmount, true, 8);
			this.pointInFront.x = this.x + this.xBound + (OS.S.pixelScale * 2) + moveAmount;
			this.pointInFront.y = this.y - this.yBound - (OS.S.pixelScale * 2) - moveAmount;
			break;
		case 90:
			if (this.image.currentAnimation != "Ship Up") this.SetAnimation("Ship Up");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(0, -moveAmount, true, 8);
			this.pointInFront.x = this.x;
			this.pointInFront.y = this.y - this.yBound - (OS.S.pixelScale * 2) - moveAmount;
			break;
		case 135:
			if (this.image.currentAnimation != "Ship Up-Left") this.SetAnimation("Ship Up-Left");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(-moveAmount, -moveAmount, true, 8);
			this.pointInFront.x = this.x - this.xBound - (OS.S.pixelScale * 2) - moveAmount;
			this.pointInFront.y = this.y - this.yBound - (OS.S.pixelScale * 2) - moveAmount;
			break;
		case 180:
			if (this.image.currentAnimation != "Ship Left") this.SetAnimation("Ship Left");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(-moveAmount, 0, true, 8);
			this.pointInFront.x = this.x - this.xBound - (OS.S.pixelScale * 2) - moveAmount;
			this.pointInFront.y = this.y;
			break;
		case 225:
			if (this.image.currentAnimation != "Ship Down-Left") this.SetAnimation("Ship Down-Left");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(-moveAmount, moveAmount, true, 8);
			this.pointInFront.x = this.x - this.xBound - (OS.S.pixelScale * 2) - moveAmount;
			this.pointInFront.y = this.y + this.yBound + (OS.S.pixelScale * 2) + moveAmount;
			break;
		case 270:
			if (this.image.currentAnimation != "Ship Down") this.SetAnimation("Ship Down");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(0, moveAmount, true, 8);
			this.pointInFront.x = this.x;
			this.pointInFront.y = this.y + this.yBound + (OS.S.pixelScale * 2) + moveAmount;
			break;
		case 315:
			if (this.image.currentAnimation != "Ship Down-Right") this.SetAnimation("Ship Down-Right");
			if (this.doTakeStep) movedSuccessfully = this.SimpleMove(moveAmount, moveAmount, true, 8);
			this.pointInFront.x = this.x + this.xBound + (OS.S.pixelScale * 2) + moveAmount;
			this.pointInFront.y = this.y + this.yBound + (OS.S.pixelScale * 2) + moveAmount;
			break;
		default:
			console.log("No valid direction");
			break;
	}

	if (this.doTakeStep && !movedSuccessfully) {
		this.currentSpeed = 0;
	}
}

pr_ship.UpdateEnergy = function () {
	this.energyRefillTimer++;

	if (this.doTakeStep) {
		G.stats.energy -= ((this.currentSpeed / G.stats.speed) + ((G.stats.hunger + G.stats.thirst) * 0.1)) * 0.25;

		if (this.energyRefillTimer >= (100 / G.stats.crew) + ((G.stats.hunger + G.stats.thirst) * 10)) {
			G.stats.energy += G.stats.crew;
			this.energyRefillTimer = 0;
		}

		if (G.stats.energy < 0) G.stats.energy = 0;
		if (G.stats.energy > G.stats.maxEnergy) G.stats.energy = G.stats.maxEnergy;
	}
}

pr_ship.SeamlessScroll = function () {
	if (this.x <= rm_Ocean.mapLeftTrigger) {
		this.x = rm_Ocean.mapLeftTriggerTarget;
		OS.SetCamera({x: rm_Ocean.width});
	}
	else if (this.x >= rm_Ocean.mapRightTrigger) {
		this.x = rm_Ocean.mapRightTriggerTarget;
		OS.SetCamera({x: 0});
	}
	else if (this.y <= rm_Ocean.mapUpTrigger) {
		this.y = rm_Ocean.mapUpTriggerTarget;
		OS.SetCamera({y: rm_Ocean.height});
	}
	else if (this.y >= rm_Ocean.mapDownTrigger) {
		this.y = rm_Ocean.mapDownTriggerTarget;
		OS.SetCamera({y: 0});
	}
}
