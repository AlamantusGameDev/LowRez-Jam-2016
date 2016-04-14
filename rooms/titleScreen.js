function titleScreen () {
    // When room is loaded, explicitly set room to rm_TitleScreen, just in case "Default" doesn't work/is loaded too slowly
    OS.SetRoom(rm_TitleScreen);
}

rm_TitleScreen.Do = function () {
    // Menu options.
}
rm_TitleScreen.DrawBelow = function () {
    // Fill background color because I can't figure out how to make OversimplifiedJS change the bg color on room change!
    var tmp = Oversimplified.context.fillStyle;
    Oversimplified.context.fillStyle = "#D9BEA5";
    Oversimplified.context.fillRect(0, 0, Oversimplified.camera.width, Oversimplified.camera.height);
    Oversimplified.context.fillStyle = tmp;
}
rm_TitleScreen.DoLast = function () {
    // Clear Objects on room exit. This is best practice unless you need persistent objects.
    rm_TitleScreen.objects = {};
}