var prefabsLoaded = 0;
var prefabsToLoad = 4;
function loadPrefabs() {
    OS.AddScript("prefabs/shipPrefab.js");
    OS.AddScript("prefabs/islandPrefab.js");
    OS.AddScript("prefabs/oceanTilePrefab.js");
	OS.AddScript("prefabs/wavePrefab.js");

    // Delay switching to Ocean room until everything is loaded.
    WaitForPrefabsToLoad();

    if (Oversimplified.DEBUG.showMessages) console.log("Ran loadPrefabs()");
}

// Callback function that prevents Ocean room from loading before everything it references is loaded.
WaitForPrefabsToLoad = function () {
    console.log("waiting for " + (prefabsToLoad - prefabsLoaded).toString() + " prefabs to load");
    if (prefabsLoaded < prefabsToLoad || !window["oceanRoom"])
    {
        setTimeout(function(){WaitForPrefabsToLoad()}, 0.1);
    } else {
        // Create player and ocean objects in rm_Ocean.
        G.player = rm_Ocean.AddObject(OS.P["Ship"]);
        G.oceanParticle = rm_Ocean.AddObject(OS.P["Ocean Particle"]);
        
        if (G.player.xBound) {  // Force rm_Ocean to wait until G.player is completely loaded!
            // Load the rooms only after the prefabs are loaded.
            rm_Ocean.SetAsCurrentRoom();
        } else {
            setTimeout(function(){WaitForPrefabsToLoad()}, 0.1);
        }
    }
}
