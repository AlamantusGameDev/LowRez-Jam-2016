var Game = {};
G = Game;

G.player = {};	// Just a reference until G.player is created at rm_Ocean's load time.
G.oceanParticle = {};	// One ocean particle will exist at any time and move around the boat.
G.map = [];	// List of island objects, generated/loaded and saved at game start, loaded on room start.
G.inventory = [];
G.stats = {
    money: 100,
    inventory: 3,   // Maximum number of different things the inventory can hold.
    hold: 20,		// Maximum number of each individual kind of thing in the inventory.
    speed: 1,
    hull: 1,
    popularity: 0,
    haggling: 1,
    crew: 1,
    energy: 10
}
G.itemSheet = new Image();
G.itemSheet.src = "images/items_sheet.png";

function loadGameManager () {}
