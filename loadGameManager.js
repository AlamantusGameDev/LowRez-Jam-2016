var Game = {};
G = Game;

G.player = {};	// Just a reference until G.player is created at rm_Ocean's load time.
G.oceanParticle = {};	// One ocean particle will exist at any time and move around the boat.
G.map = [];	// List of island objects, generated/loaded and saved at game start, loaded on room start.

function loadGameManager () {}
