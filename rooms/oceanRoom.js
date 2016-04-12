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

var island1 = rm_Ocean.AddObject(OS.P["Island"]);
island1.x = (((rm_Ocean.width / OS.S.pixelScale) / 2) + 64) * OS.S.pixelScale;
island1.y = ((rm_Ocean.height / OS.S.pixelScale) / 2) * OS.S.pixelScale;

rm_Ocean.DoFirst = function () {
    // Reset camera whenever room starts
    OS.SetCamera({
        x: G.player.x - (OS.camera.width / 2),
        y: G.player.y - (OS.camera.height / 2),
        objectToFollow: G.player
    });

    this.mapLeftTrigger = OS.camera.hBorder;
    this.mapLeftTriggerTarget = this.width - (OS.camera.width - OS.camera.hBorder);
    this.mapRightTrigger = this.width - OS.camera.hBorder;
    this.mapRightTriggerTarget = OS.camera.width - OS.camera.hBorder;
    this.mapUpTrigger = OS.camera.vBorder;
    this.mapUpTriggerTarget = this.height - (OS.camera.height - OS.camera.vBorder);
    this.mapDownTrigger = this.height - OS.camera.vBorder;
    this.mapDownTriggerTarget = OS.camera.height - OS.camera.vBorder;

    // THIS IS JUST FOR MAKING TRADE ROOM TESTING EASIER. DO NOT SHIP LIKE THIS!!!!
    // OS.SetRoom(rm_Trade);
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

    if (!guiControl.inventory.show && !guiControl.trade.show) {
        if (ct_cancel().down) {
            guiControl.inventory.show = true;
        }
        if (ct_esc.down) {
            guiControl.trade.show = true;
            G.player.speed = 0;
        }
    }
}

rm_Ocean.DrawAbove = function () {
    // Draw the speed indicator in Bottom Left corner.
    OS.context.drawImage(rm_Ocean.speedGaugeImg, G.player.currentSpeed * 32, 0, 32, 32, 16, OS.camera.height - 32 - 16, 32, 32);

    // Draw Energy Bar
    this.DrawEnergyBar();

    // drawPixelText("Testing 1 2 3!", 0, 0, 0, "white", 4);
    // drawPixelText("Testing 1 2 3!", 0, 64, 0, "white", 6);
    drawInventoryGUI();
    drawTradeGUI();
}

rm_Ocean.DoLast = function () {
    // Clear Objects on room exit. This is best practice unless you need persistent objects.
    //rm_Ocean.objects = {};
}

rm_Ocean.DrawEnergyBar = function () {
    var percentage = G.stats.energy / G.stats.maxEnergy;
    var barHeight = 2 * OS.S.pixelScale;
    var maxBarWidth = 32;
    var barWidth = Math.round(maxBarWidth * percentage) * OS.S.pixelScale;

    var saveFillStyle = OS.context.fillStyle;
    OS.context.fillStyle = "#0055FF";
    OS.context.fillRect(64, OS.camera.height - barHeight - 16, barWidth, barHeight);
    OS.context.fillStyle = saveFillStyle;
}
