// var rm_TitleScreen = OS.R.Add("Default");
// var rm_Ocean = OS.R.Add("Ocean", {
var rm_Trade = OS.R.Add("Trade", {
	width: OS.camera.width,
	height: OS.camera.height,
	backgroundColor: "#D9BEA5"
});
var rm_Ocean = OS.R.Add("Default", {
	width: (64 * OS.S.pixelScale) * 50,	//50x50 map of 64x64 squares. This will allow a single pixel on the map to represent a 64x square and fit comfortably on screen.
	height: (64 * OS.S.pixelScale) * 50,
	backgroundColor: "#1b2632"
});

function loadRooms() {
    // OS.AddScript("rooms/titleScreen.js");
    OS.AddScript("rooms/oceanRoom.js");
    OS.AddScript("rooms/tradeRoom.js");
    
    // OS.SetRoom(rm_TitleScreen);
    OS.SetRoom(rm_Ocean);
}
