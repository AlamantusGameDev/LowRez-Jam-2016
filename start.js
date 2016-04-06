OS.S.defaultStep = 1 / 120;
OS.S.pixelScale = 4;
OS.S.SetCamera(64 * OS.S.pixelScale, 64 * OS.S.pixelScale);

function start()
{
    OS.AddScript("loadControls.js");
    OS.AddScript("loadGameManager.js");
    OS.AddScript("loadPrefabs.js");
    OS.AddScript("loadRooms.js");
}

function randomSmidge() {
// Return a random amount between -10 and 10 on the pixel scale.
	return (Math.round(Math.randomRange(-10, 10)) * OS.S.pixelScale);
}
