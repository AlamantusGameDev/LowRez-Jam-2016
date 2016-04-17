function titleScreen () {
    guiControl.title = {
        show: true,
        cursorPosition: 0,
        activateDelay: 0,

        padding: pixel(2),
        leftBorder: pixel(12),

        rowTop: function (rowNumber) {
            return pixel(32) + pixel(2) + pixel((guiControl.iconSize + 2) * rowNumber);
        }
    }
}

function drawTitleScreen() {
    if (guiControl.title && guiControl.title.show) {
        guiControl.title.activateDelay -= (guiControl.title.activateDelay > 0) ? 1 : 0;

        if (ct_down().down) {
            snd_cursordown.Play();
            guiControl.title.cursorPosition++;
        }
        if (ct_up().down) {
            snd_cursorup.Play();
            guiControl.title.cursorPosition--;
        }
        
        // console.log(guiControl.title.screen);
        // Limit Cursor
        if (guiControl.title.cursorPosition < 0) {
            guiControl.title.cursorPosition = 2;
        }
        if (guiControl.title.cursorPosition > 2) {
            guiControl.title.cursorPosition = 0;
        }

        // Title
        OS.context.drawImage(guiControl.titleImage, 0, 0);

        // New Game
        guiControl.drawPixelText("New Game", guiControl.title.leftBorder, guiControl.title.rowTop(0), 10, "white", 6);
        // Load Game
        guiControl.drawPixelText("Continue", guiControl.title.leftBorder, guiControl.title.rowTop(1), 10, (G.savedGameExists) ? "white" : "black", 6);
        // Options
        guiControl.drawPixelText("Options", guiControl.title.leftBorder, guiControl.title.rowTop(2) + pixel(), 8, (guiControl.optionsScreen) ? "white" : "black", 6);
        
        // Draw cursor
        OS.context.drawImage(guiControl.cursor, guiControl.title.leftBorder - (guiControl.iconScaled), guiControl.title.rowTop(guiControl.title.cursorPosition));

        // Button Action
        if (guiControl.title.activateDelay <= 0) {
            if (ct_confirm().down) {
                switch (guiControl.title.cursorPosition) {
                    case 0:
                        snd_select.Play();
                        mus_title.Stop();
                        mus_sail.Play();
                        guiControl.title.show = false;
                        G.gameStarted = true;
                        G.SaveGame();
                        break;
                    case 1:
                        if (G.savedGameExists) {    // once loading is in, allow this.
                            G.LoadGame();
                            snd_select.Play();
                            mus_title.Stop();
                            mus_sail.Play();
                            // Run Load Data
                            guiControl.title.show = false;
                            G.gameStarted = true;
                        } else {
                            snd_cannotbuy.Play();
                        }
                        break;
                    case 2:
                        if (false) {    // once loading is in, allow this.
                            snd_select.Play();
                            guiControl.title.show = false;
                            guiControl.options.show = true;
                            break;
                        } else {
                            snd_cannotbuy.Play();
                        }
                }

                guiControl.title.cursorPosition = 0;
                // console.log(guiControl.title.screen);
            }
        }
    }
}
