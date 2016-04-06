function oceanRoom () {
    // When room is loaded, explicitly set room to rm_Ocean, just in case "Default" doesn't work/is loaded too slowly
    OS.SetRoom(rm_Ocean);
}

rm_Ocean.DoFirst = function () {
    //Hide cursor when playing (only use if masking the cursor with another object)
    //OS.canvas.style.cursor = "none";
    
    // Create objects on room start. This is best practice unless you need persistent objects.
    G.player = this.AddObject(OS.P["Ship"]);
    G.player.x = ((rm_Ocean.width / OS.S.pixelScale) / 2) * OS.S.pixelScale;
    G.player.y = ((rm_Ocean.height / OS.S.pixelScale) / 2) * OS.S.pixelScale;

    G.oceanParticle = this.AddObject(OS.P["Ocean Particle"]);
    G.oceanParticle.x = G.player.x + randomSmidge();
    G.oceanParticle.y = G.player.y + randomSmidge();

    OS.S.SetCamera(64 * OS.S.pixelScale, 64 * OS.S.pixelScale, G.player, 24 * OS.S.pixelScale, 24 * OS.S.pixelScale);
}
rm_Ocean.Do = function () {
    // Move G.oceanParticle around based on player's movement.
    G.oceanParticle.CheckPosition(G.player.x, G.player.y);
}

rm_Ocean.DrawAbove = function () {
    // Draw the speed indicator in Bottom Left corner.
}

rm_Ocean.DoLast = function () {
    // Clear Objects on room exit. This is best practice unless you need persistent objects.
    rm_Ocean.objects = {};
}