var ani_island_1 = OS.A.Add("Island 1", 256, 256, {});

function islandPrefab() {}

var pr_island = OS.P.Add("Island", {
	solid: true,
	imageSrc: "images/island.png",
	animations: [ani_island_1],

	mapX: 0,
	mapY: 0,
	mapWidth: 1,
	mapHeight: 1,
	mapColor: "#00AB00",

	canTrade: true,

	inventory:		[],
	priceDifferences: [],
	itemsSold: 		[0, 0, 0, 0,		// The more you sell, the lower the price gets
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0],
	itemsBought:	[0, 0, 0, 0,		// The more you buy, the higher the price gets
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0]
});

pr_island.DoFirst = function () {
	this.GetMapPosition();
	this.SetUp();
}

pr_island.GetMapPosition = function () {
	this.mapX = (this.x / OS.S.pixelScale) / (OS.camera.width / OS.S.pixelScale);
	this.mapY = (this.y / OS.S.pixelScale) / (OS.camera.height / OS.S.pixelScale);
}

pr_island.SetUp = function () {
	for (var i = 0; i < 15; i++) {
		this.inventory[i] = Math.round(Math.randomRange(0, 20));
		this.priceDifferences[i] = Math.round(Math.randomRange(-50, 50));
		if (G.economy.cargoItemWorth[i] + this.priceDifferences[i]) {
			this.priceDifferences[i] = -G.economy.cargoItemWorth[i] + 1;
		}
	}
}

pr_island.AdjustPrices = function () {
	for (var i = 0; i < 15; i++) {
		var saleDifference = this.itemsSold[i] - this.itemsBought[i];
		if (saleDifference = 0) {
			this.priceDifferences[i] += Math.round(Math.randomRange(-1, 1)) * 5;
		} else {
			this.priceDifferences[i] += saleDifference * 5;
		}
	}
}

pr_island.CheckInventory = function () {	// Returns an array of indices that have cargo
	var indicesWithCargo = [];
	for (var i = 0; i < G.inventory.cargo.length; i++) {
		if (this.inventory[i] > 0) {
			indicesWithCargo.push(i);
		}
	}
	return indicesWithCargo;
}

pr_island.TradeWith = function () {
	guiControl.trade.island = this.self;
	guiControl.trade.activateDelay = 5;
	guiControl.trade.show = true;
}

pr_island.SellTo = function (itemIndex, amount) {
	this.inventory[itemIndex] += amount;
	this.itemsBought[itemIndex] += amount;
}

pr_island.BuyFrom = function (itemIndex, amount) {
	this.inventory[itemIndex] += amount;
	this.itemsSold[itemIndex] += amount;
}
