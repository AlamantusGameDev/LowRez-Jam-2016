var Game = {};
G = Game;

G.player = {};	// Just a reference until G.player is created at rm_Ocean's load time.
G.oceanParticle = {};	// One ocean particle will exist at any time and move around the boat.
G.map = [];	// List of island objects, generated/loaded and saved at game start, loaded on room start.
G.inventory = [];
G.stats = {
    money: 100,
    inventory: 5,   // Maximum number of different things the inventory can hold.
    speed: 1,
    hull: 1,
    popularity: 0,
    haggling: 1,
    crew: 1,
    energy: 10
}

function loadGameManager () {}
