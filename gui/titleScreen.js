function titleScreen () {}

guiControl.title = {
    screen: "main",
    show: true,
    cursorPosition: 0,
    activateDelay: 0,

    padding: pixel(2),
    leftBorder: pixel(12),

    rowTop: function (rowNumber) {
        return pixel(32) + pixel(2) + pixel((guiControl.iconSize + 2) * rowNumber);
    }
}

guiControl.title.Draw = function () {
    if (guiControl.title && guiControl.title.show) {
        guiControl.title.activateDelay -= (guiControl.title.activateDelay > 0) ? 1 : 0;

        if (guiControl.title.screen == "main") {
            if (ct_down().down) {
                snd_cursordown.Play();
                guiControl.title.cursorPosition++;
            }
            if (ct_up().down) {
                snd_cursordown.Play();
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
            guiControl.drawTitleImage();

            // New Game
            guiControl.drawPixelText("New Game", guiControl.title.leftBorder, guiControl.title.rowTop(0), 10, "white", 6);
            // Load Game
            guiControl.drawPixelText("Continue", guiControl.title.leftBorder, guiControl.title.rowTop(1), 10, (G.savedGameExists) ? "white" : "black", 6);
            // Options
            guiControl.drawPixelText("Options", guiControl.title.leftBorder, guiControl.title.rowTop(2) + pixel(), 8, (guiControl.optionsScreen) ? "white" : "black", 6);
            
            // Draw cursor
            guiControl.drawCursor(guiControl.title.leftBorder - (guiControl.iconScaled), guiControl.title.rowTop(guiControl.title.cursorPosition));

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

                if (ct_cancel().down) {
                    guiControl.title.screen = "credits";
                }
            }
        }
        else if (guiControl.title.screen == "credits") {
            guiControl.drawPixelText("Credits", guiControl.title.leftBorder - pixel(), pixel(2), 0, "white", 6);
            guiControl.drawPixelText("Music, Icons", pixel(), pixel(11), 0, "white", 4);
            guiControl.drawPixelText("Paws Menu", pixel(2), pixel(17), 0, "yellow", 6);
            guiControl.drawPixelText("paws.bandcamp.com", pixel(2), pixel(25), 0, "yellow", 4);
            guiControl.drawPixelText("Evrthng Else", pixel(), pixel(39), 0, "white", 4);
            guiControl.drawPixelText("Alamantus", pixel(2), pixel(45), 0, "yellow", 6);
            guiControl.drawPixelText("alamantus.com", pixel(2), pixel(53), 0, "yellow", 4);

            if (ct_confirm().down || ct_cancel().down || ct_esc.down) {
                guiControl.title.screen = "main";
            }
        }
    }
}
