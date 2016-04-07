// var rm_TitleScreen = OS.R.Add("Default");
// var rm_Ocean = OS.R.Add("Ocean", {
var rm_Ocean = OS.R.Add("Default", {
	width: (64 * OS.S.pixelScale) * 64,	//32 64x64 squares for the map.
	height: (64 * OS.S.pixelScale) * 64,
	backgroundColor: "#1b2632"
});

function loadRooms() {
    // OS.AddScript("rooms/titleScreen.js");
    OS.AddScript("rooms/oceanRoom.js");
    
    // OS.SetRoom(rm_TitleScreen);
    OS.SetRoom(rm_Ocean);
}
