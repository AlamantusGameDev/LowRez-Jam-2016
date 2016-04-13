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
	for (var i = 0; i < 16; i++) {
		if (Math.randomRange(0, 100) < 25) {
			this.inventory[i] = Math.round(Math.randomRange(0, 20));
		}
	}

	this.AdjustPrices();

	if (this.CheckInventory().length < 4) {
		this.SetUp();
	}
}

pr_island.AdjustPrices = function () {
	for (var i = 0; i < 16; i++) {
		if (this.inventory[i] > 10) {
			this.priceDifferences[i] = -Math.round(this.inventory[i] * Math.randomRange(1, 3));
		} else if (this.inventory[i] < 5) {
			this.priceDifferences[i] = Math.round(this.inventory[i] * Math.randomRange(1, 3));
		} else {
			this.priceDifferences[i] = 0;
		}

		if (G.economy.cargoItemWorth[i] + this.priceDifferences[i] < 0) {
			this.priceDifferences[i] = -G.economy.cargoItemWorth[i] + 1;
		}
	}
}

pr_island.SimulateTrade = function () {
// This will be run on a timer that runs when not trading.
	for (var i = 0; i < 16; i++) {
		if (this.inventory[i] > 0) {
			this.inventory[i] += Math.round(Math.randomRange(-5, 5));
			if (this.inventory[i] < 0) {
				this.inventory[i] = 0;
			}
		} else {
			if (Math.randomRange(0, 100) < 15) {
				this.inventory[i] = Math.round(Math.randomRange(0, 5));
			}
		}
	}

	this.AdjustPrices();
}

pr_island.CheckInventory = function () {	// Returns an array of indices that have cargo
	var indicesWithCargo = [];
	for (var i = 0; i < this.inventory.length; i++) {
		if (this.inventory[i] > 0) {
			indicesWithCargo.push(i);
		}
	}
	return indicesWithCargo;
}

pr_island.TradeWith = function () {
	// Change music to Trade.
	guiControl.trade.island = this.self;
	guiControl.trade.haggleAmount = 0;
	guiControl.trade.activateDelay = 5;
	guiControl.trade.show = true;
}

pr_island.SellTo = function (itemIndex, price) {
	// Play Buy sound.
	this.inventory[itemIndex]++;
	this.itemsBought[itemIndex]++;

	G.inventory.cargo[itemIndex]--;
	G.inventory.money += price;
}

pr_island.BuyFrom = function (itemIndex, price) {
	// Play Sell sound.
	this.inventory[itemIndex]--;
	this.itemsBought[itemIndex]++;

	G.inventory.cargo[itemIndex]++;
	G.inventory.money -= price;
}
