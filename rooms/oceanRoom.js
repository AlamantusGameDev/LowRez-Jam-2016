function oceanRoom () {
    // Create objects on room creation for persistence.
    G.player = rm_Ocean.AddObject(OS.P["Ship"]);
    G.player.x = ((rm_Ocean.width / OS.S.pixelScale) / 2) * OS.S.pixelScale;
    G.player.y = ((rm_Ocean.height / OS.S.pixelScale) / 2) * OS.S.pixelScale;
    console.log(G.player.name + " created at " + G.player.x + ", " + G.player.y);
    G.oceanParticle = rm_Ocean.AddObject(OS.P["Ocean Particle"]);
    G.oceanParticle.x = G.player.x + randomSmidge();
    G.oceanParticle.y = G.player.y + randomSmidge();
    
    // When room is loaded, explicitly set room to rm_Ocean, just in case "Default" doesn't work/is loaded too slowly
    // to make sure DoFirst runs.
    OS.SetRoom(rm_Ocean);
}

rm_Ocean.waveTimer = Math.round(Math.randomRange(30, 150));
rm_Ocean.speedGaugeImg = new Image();
rm_Ocean.speedGaugeImg.src = "images/speed_gauge_sheet.png";

rm_Ocean.DoFirst = function () {
    //Hide cursor when playing (only use if masking the cursor with another object)
    //OS.canvas.style.cursor = "none";
    
    // Reset camera whenever room starts
    OS.SetCamera({
        x: G.player.x - (OS.camera.width / 2),
        y: G.player.y - (OS.camera.height / 2),
        objectToFollow: G.player
    });
}
rm_Ocean.Do = function () {
    // Move G.oceanParticle around based on player's movement.
    G.oceanParticle.CheckPosition(G.player.x, G.player.y, G.player.direction);

    this.waveTimer--;
    if (this.waveTimer <= 0) {
        var wave = this.AddObject(OS.P["Wave Particle"]);
        wave.x = G.player.x + (randomSmidge() * 4);
        wave.y = G.player.y + (randomSmidge() * 4);

        this.waveTimer = Math.round(Math.randomRange(30, 150));
    }
}

rm_Ocean.DrawAbove = function () {
    // Draw the speed indicator in Bottom Left corner.
    OS.context.drawImage(rm_Ocean.speedGaugeImg, G.player.currentSpeed * 32, 0, 32, 32, 16, OS.camera.height - 32 - 16, 32, 32);
}

rm_Ocean.DoLast = function () {
    // Clear Objects on room exit. This is best practice unless you need persistent objects.
    rm_Ocean.objects = {};
}