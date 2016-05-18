var rm_Load = OS.R.Add("Default");
var rm_Ocean = OS.R.Add("Ocean Room", {
    // Putting my room "constants" here.
    width: pixel(64) * 50,  //50x45 map of 64x64 squares. This will allow a single pixel on the map to represent a 64x square and fit comfortably on screen.
    height: pixel(64) * 44,
    backgroundColor: "#1b2632",
    squaresX: 50,
    squaresY: 44,
    squareSize: pixel(64),
    numberOfIslands: 10,
    clockTimerCutoff: ((1 / OS.S.defaultStep) * 60) * 5 // 5 minute day.
});

function loadRooms() {
    OS.AddScript("rooms/oceanRoom.js");
    
    rm_Load.SetAsCurrentRoom();

    if (Oversimplified.DEBUG.showMessages) console.log("Ran loadRooms()");
}
