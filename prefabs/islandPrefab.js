var ani_island_1 = OS.A.Add("Island 1", 256, 256, {});

function islandPrefab() {}

var pr_island = OS.P.Add("Island", {
	solid: true,
	imageSrc: "images/island.png",
	animations: [ani_island_1],
	depth: -50,

	mapX: 0,
	mapY: 0,
	mapWidth: 1,
	mapHeight: 1,
	mapColor: "#00AB00",

	canTrade: true,
	haggleAmount: 0,
	timesHaggledToday: 0,
	itemsSoldToday:		[0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0],
	itemsBoughtToday:	[0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0],
	
	money: 0,
	inventory:		[0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0],
	
	storageSpace:	[0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0],
	innPriceDifference: 0,
	innStays: 0,
	priceDifferences: 	[0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0],
	itemsSold: 		[0, 0, 0, 0,		// The more you sell, the lower the price gets
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0],
	itemsBought:	[0, 0, 0, 0,		// The more you buy, the higher the price gets
					 0, 0, 0, 0,
					 0, 0, 0, 0,
					 0, 0, 0, 0],

	storageFee: 10,
	storageFeeMultiplier: 0.1,
	storage: 			[0, 0, 0, 0,
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
		this.storageSpace[i] = Math.round(Math.randomRange(10, 25));

		if (this.storageSpace[i] > 20) {
			this.inventory[i] = Math.round(this.storageSpace[i] - Math.randomRange(0, 10));
		} else if (Math.randomRange(0, 100) < 25) {
			this.inventory[i] = Math.round(Math.randomRange(0, this.storageSpace[i]));
		}
	}
	// console.log(this.name + " stock: " + this.inventory);

	this.AdjustPrices();
	// console.log(this.name + " pricing: " + this.priceDifferences);

	if (this.CheckInventory().length < 4) {
		this.SetUp();
	} else {
		for (var i = 0; i < 16; i++) {
			// Generate the amount of money the shop has based on what it has.
			this.money += (G.economy.cargoItemWorth[i] + this.priceDifferences[i]) * this.inventory[i];
		}
		
		// Minimum amount of money is 100.
		if (this.money < 100) this.money = 100;
	}
}

pr_island.AdjustPrices = function () {
	for (var i = 0; i < 16; i++) {
		// Save the previous price difference so the change doesn't get above a certain thereshold.
		var previousPrice = newPriceDifference = this.priceDifferences[i];

		if (this.inventory[i] > (this.storageSpace[i] / 2)) {
			newPriceDifference -= Math.round(this.inventory[i] * Math.randomRange(1, 3));
		}
		else if (this.inventory[i] < (this.storageSpace[i] / 4)) {
			newPriceDifference += Math.round((this.storageSpace[i] - this.inventory[i]) * Math.randomRange(1, 3));
		}
		else {
			newPriceDifference += Math.round(Math.randomRange(-2, 2));
		}

		newPriceDifference = Math.round(newPriceDifference * ((this.itemsBought[i] + 1) / (this.itemsSold[i] + 1)));

		if (Math.abs(newPriceDifference) > Math.abs(previousPrice) + G.economy.maxPriceChange) {
			// Prevent price from changing more than the limit.
			newPriceDifference = previousPrice + ((previousPrice < 0) ? -G.economy.maxPriceChange : G.economy.maxPriceChange);
		}

		if (G.economy.cargoItemWorth[i] + newPriceDifference < 0) {
			newPriceDifference = -G.economy.cargoItemWorth[i] + 1;
		}

		this.priceDifferences[i] = newPriceDifference;
	}

	var priceDifferencesOrdered = this.priceDifferences.slice().sort(sortNumber);
	this.innPriceDifference += Math.round(Math.randomRange(priceDifferencesOrdered[0], priceDifferencesOrdered[priceDifferencesOrdered.length -1])) - Math.round(Math.randomRange(0, this.innStays));
}

pr_island.SimulateTrade = function () {
// This will be run on a timer that runs when not trading.
	for (var i = 0; i < 16; i++) {
		var amount = 0;
		if (this.inventory[i] > 0) {
			amount = Math.round(Math.randomRange(-this.storageSpace[i], this.storageSpace[i]));
			this.inventory[i] += amount;

			if (this.inventory[i] < 0) {
				this.inventory[i] = 0;
			}
			if (this.inventory[i] > this.storageSpace[i]) {
				this.inventory[i] = this.storageSpace[i];
			}
		} else {
			if (Math.randomRange(0, 100) < 15) {
				amount = Math.round(Math.randomRange(0, this.storageSpace[i]));
				this.inventory[i] = amount;
			}
		}
		// If the amount is positive, then subtract half the amount from the money (because they bought stuff)
		// Otherwise, add the negative amount (because they sold that much)
		this.money += (-amount * (G.economy.cargoItemWorth[i] + this.priceDifferences[i])) * ((amount > 0) ? 0.5 : 1);
	}

	if (this.money <= 0) this.money = 100;	// If they run out of money, give them some.

	this.AdjustPrices();
}

pr_island.NewDay = function () {
	this.haggleAmount = 0;
    this.timesHaggledToday = 0;
    this.itemsSoldToday =	[0, 0, 0, 0,
					 		 0, 0, 0, 0,
					 		 0, 0, 0, 0,
					 		 0, 0, 0, 0];
    this.itemsBoughtToday =	[0, 0, 0, 0,
					 		 0, 0, 0, 0,
					 		 0, 0, 0, 0,
					 		 0, 0, 0, 0];
    this.SimulateTrade();
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
	// console.log(this.inventory);
	mus_sail.Stop();
	mus_trade.Play();
	guiControl.trade.island = this;
	guiControl.trade.haggleAmount = 0;
	guiControl.trade.activateDelay = 5;
	guiControl.trade.show = true;
}

pr_island.CanSellTo = function (itemIndex, price) {
	if (this.inventory[itemIndex] < this.storageSpace[itemIndex] && price < this.money) {
			// If there's space in the inventory and there's enough money.
			return true;
	}
	return false;
}
pr_island.SellTo = function (itemIndex, price) {
	// Play Buy sound.
	this.inventory[itemIndex]++;
	this.itemsBought[itemIndex]++;
	this.money -= price;

	G.inventory.cargo[itemIndex]--;
	G.inventory.money += price;
	G.economy.cargoSold[itemIndex]++;
}

pr_island.CanBuyFrom = function (itemIndex, price) {
	if (this.inventory[itemIndex] > 0) {	// If there's enough of the item
			return true;
	}
	return false;
}
pr_island.BuyFrom = function (itemIndex, price) {
	// Play Sell sound.
	this.inventory[itemIndex]--;
	this.itemsSold[itemIndex]++;
	this.money += price;

	G.inventory.cargo[itemIndex]++;
	G.inventory.money -= price;
	G.economy.cargoBought[itemIndex]++;
}

pr_island.StayAtInn = function () {
	// Play Sell sound.
	this.innStays++;

	G.stats.illness--;
	G.inventory.money -= G.economy.innCost + this.innPriceDifference;
	G.economy.innStays++;
}
