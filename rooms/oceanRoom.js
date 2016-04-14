function oceanRoom () {
    // Create objects on room creation for persistence.
    G.player = rm_Ocean.AddObject(OS.P["Ship"]);
    G.player.x = (pixel(64) * 25) - pixel(32) - G.player.xBound;
    G.player.y = pixel(64) * 25;
    console.log(G.player.name + " created at " + G.player.x + ", " + G.player.y);
    G.oceanParticle = rm_Ocean.AddObject(OS.P["Ocean Particle"]);
    G.oceanParticle.x = G.player.x + randomSmidge();
    G.oceanParticle.y = G.player.y + randomSmidge();

    rm_Ocean.GenerateMap();
    
    // When room is loaded, explicitly set room to rm_Ocean, just in case "Default" doesn't work/is loaded too slowly
    // to make sure DoFirst runs.
    OS.SetRoom(rm_Ocean);
}

rm_Ocean.waveTimer = Math.round(Math.randomRange(30, 150));
rm_Ocean.speedGaugeImg = new Image();
rm_Ocean.speedGaugeImg.src = "images/speed_gauge_sheet.png";


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
}
rm_Ocean.Do = function () {
    // Move G.oceanParticle around based on player's movement.
    if (G.oceanParticle.CheckPosition) G.oceanParticle.CheckPosition(G.player.x, G.player.y, G.player.direction);

    this.waveTimer--;
    if (this.waveTimer <= 0) {
        var wave = this.AddObject(OS.P["Wave Particle"]);
        wave.x = G.player.x + (randomSmidge() * 4);
        wave.y = G.player.y + (randomSmidge() * 4);

        this.waveTimer = Math.round(Math.randomRange(30, 150));
    }

    if (guiControl && guiControl.inventory && guiControl.trade) {   // Force it to wait until loaded.
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
    var barHeight = pixel(2);
    var maxBarWidth = 32;
    var barWidth = pixel(Math.round(maxBarWidth * percentage));

    var saveFillStyle = OS.context.fillStyle;
    OS.context.fillStyle = "#0055FF";
    OS.context.fillRect(64, OS.camera.height - barHeight - 16, barWidth, barHeight);
    OS.context.fillStyle = saveFillStyle;
}

rm_Ocean.GenerateMap = function () {
    var island1 = rm_Ocean.AddObject(OS.P["Island"], {
        x: pixel(64) * 25, //Exact center of map.
        y: pixel(64) * 25
    });
    
    console.log(island1.name + " created at " + island1.x + ", " + island1.y);
    G.map.push({
        island: island1
    });

    var usedXSquares = [];
    var usedYSquares = [];
    for (var i = 0; i < 5; i++) {
        var xSquare = Math.round(Math.randomRange(1, 49));
        while (usedXSquares.indexOf(xSquare) != -1 &&
               usedXSquares.indexOf(xSquare + 1) != -1 && usedXSquares.indexOf(xSquare - 1) != -1 &&
               usedXSquares.indexOf(xSquare + 2) != -1 && usedXSquares.indexOf(xSquare - 2) != -1)
        {
            xSquare = Math.round(Math.randomRange(1, 49));
        }
        usedXSquares.push(xSquare);

        var ySquare = Math.round(Math.randomRange(1, 49));
        while (usedYSquares.indexOf(ySquare) != -1 &&
               usedYSquares.indexOf(ySquare + 1) != -1 && usedYSquares.indexOf(ySquare - 1) != -1 &&
               usedYSquares.indexOf(ySquare + 2) != -1 && usedYSquares.indexOf(ySquare - 2) != -1)
        {
            ySquare = Math.round(Math.randomRange(1, 49));
        }
        usedYSquares.push(ySquare);

        var xPosition = pixel(64) * xSquare;
        var yPosition = pixel(64) * ySquare;
        
        G.map.push({
            island: rm_Ocean.AddObject(OS.P["Island"], {
                x: xPosition,
                y: yPosition
            }),
            drawX: xSquare,
            drawY: ySquare
        });
        console.log(G.map[i + 1].island.name + " created at " + G.map[i + 1].island.x + ", " + G.map[i + 1].island.y);
    }
}
