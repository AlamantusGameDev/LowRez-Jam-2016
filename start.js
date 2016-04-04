OS.S.defaultStep = 1 / 120;
OS.S.SetCamera((window.innerWidth < 500) ? window.innerWidth - 10 : 500, (window.innerHeight < 800) ? window.innerHeight - 10 : 800);

function start()
{
    OS.AddScript("loadControls.js");
    OS.AddScript("loadGamemanager.js");
    OS.AddScript("loadPrefabs.js");
    OS.AddScript("loadRooms.js");
}
