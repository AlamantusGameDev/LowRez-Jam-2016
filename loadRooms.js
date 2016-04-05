var rm_TitleScreen = OS.R.Add("Default", OS.camera.width, OS.camera.height, "");
var rm_Ocean = OS.R.Add("Ocean", 64 * 1000 * OS.S.pixelScale, 64 * 1000 * OS.S.pixelScale, "");

function loadRooms() {
    OS.AddScript("rooms/titleScreen.js");
    OS.AddScript("rooms/oceanRoom.js");
    
    OS.SetRoom(rm_TitleScreen);
}
