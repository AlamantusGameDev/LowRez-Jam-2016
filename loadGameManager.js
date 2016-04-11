var Game = {};
G = Game;

G.player = {};	// Just a reference until G.player is created at rm_Ocean's load time.
G.oceanParticle = {};	// One ocean particle will exist at any time and move around the boat.
G.map = [];	// List of island objects, generated/loaded and saved at game start, loaded on room start.
G.currentScreen = "";	// For pause screen, stats screen, inventory screen
G.inventory = {
    money: 100,
	supplies: 20,	// How much stuff you have to maintain your crew's illness with.
	cargo:	[0, 0, 0, 0,		// Keeps track of how much of each item you have.
			 0, 0, 0, 0,		// Requires a check to make sure you can't buy more different kinds than you can hold.
			 0, 0, 0, 0,
			 0, 0, 0, 0],
	CheckCargo: function () {	// Returns an array of indices that have cargo
		var indicesWithCargo = [];
		for (var i = 0; i < G.inventory.cargo.length; i++) {
			if (G.inventory.cargo[i] > 0) {
				indicesWithCargo.push(i);
			}
		}
		return indicesWithCargo;
	},
	CargoTotal: function () {
		var cargo = G.inventory.CheckCargo();
		var cargoTotal = 0;
		for (var i = 0; i < cargo.length; i++) {
			cargoTotal += G.inventory.cargo[cargo[i]];
		}
		return cargoTotal;
	}
};
G.stats = {
    inventory: 3,   // Maximum number of different things the cargo can hold.
    hold: 20,		// Maximum number of each individual kind of thing in the inventory.
    speed: 1,		// How many pixels you move.
    hull: 3,		// Your HP, pretty much. How many times you can crash without exploding.
    maxHull: 3,		// How much your hull can refill to.
    popularity: 1,	// Haggle success rate in percentage.
    haggling: 10,	// How much you can increase the asking price by.
    crew: 2,		// How many crew members you have. Influences how fast your energy recovers.
    energy: 25,		// Drains rate determined by current speed. When drained, currentSpeed reduces until you have enough energy to continue.
    maxEnergy: 50,	// How much to refill your energy to. Can increase with upgrades.
    illness: 0		// Your crew's overall health. When this is low, your ship slows down.
};

G.economy = {	// Aww yea, supply and demand.
// Items are determined by their index, and their position on the sheet determines their index.
// So the second item on the top row is index 1, and to get its value, you get `G.economy.cargoItemWorth[1]`
	cargoItemWorth: 		[10, 20, 30, 30,	//Can be adjusted based on sales.
							 40, 20, 50, 80,
							 65, 20, 20, 30,
							 30, 60, 45, 70],
	cargoSold: 				[0, 0, 0, 0,		// The more you sell, the lower the price gets
							 0, 0, 0, 0,
							 0, 0, 0, 0,
							 0, 0, 0, 0],
	cargoBought:			[0, 0, 0, 0,		// The more you buy, the higher the price gets
							 0, 0, 0, 0,
							 0, 0, 0, 0,
							 0, 0, 0, 0],
	CheckEconomy: function () {
		for (var i = 0; i < this.cargoSold; i++) {
			var soldBoughtDifference = this.cargoBought[i] - this.cargoSold[i];

			if (Math.abs(soldBoughtDifference) > (this.cargoItemWorth[i] * 0.75)) {	// If the difference is greater than 75% of the worth,
				this.cargoItemWorth[i] += Math.round(soldBoughtDifference * 0.5);	// Adjust the worth by half of the difference.

				if (this.cargoItemWorth[i] < 1) {
					this.cargoItemWorth[i] = 1;		// Make worth never drop below 1.
				}
			}
		}
	}
};

function loadGameManager () {}
