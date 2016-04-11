function inventoryGUI() {
	guiControl.inventory = {
		screen: "main",
		cursorPosition: 0,
		show: true,

		moneyDisplay: function () {
			var moneyString = "";
			if (G.inventory.money >= 1000000) {
				moneyString = G.inventory.money.toString().substr(0, 1);
				if (parseInt(G.inventory.money.toString().substr(1, 1)) > 0) {
					moneyString += "." + G.inventory.money.toString().substr(1, 1);
				}
			}
			if (G.inventory.money >= 1000000000000) {
				moneyString += "T";
			} else if (G.inventory.money >= 1000000000) {
				moneyString += "B";
			} else if (G.inventory.money >= 1000000) {
				moneyString += "M";
			} else {
				moneyString = G.inventory.money.toString();
			}

			return moneyString;
		}
	}
}

function drawInventoryGUI() {
	if (guiControl.inventory.show) {
		OS.context.drawImage(guiControl.background, 0, 0, 240, 240, 2 * OS.S.pixelScale, 2 * OS.S.pixelScale, 240, 240);

		if (ct_down().down) {
			guiControl.inventory.cursorPosition++;
		}
		if (ct_up().down) {
			guiControl.inventory.cursorPosition--;
		}
		
		if (guiControl.inventory.screen == "main") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 0;
			}
			if (guiControl.inventory.cursorPosition > 3) {
				guiControl.inventory.cursorPosition = 3;
			}

			// Title
			guiControl.drawPixelText("Storage", guiControl.leftBorder - (2 * OS.S.pixelScale), guiControl.topOfBackground, 8, "black", 6);
			// Money icon
			guiControl.drawIcon(7, 2, guiControl.leftBorder, guiControl.rowTop(0));
			guiControl.drawPixelText(guiControl.inventory.moneyDisplay(), guiControl.leftBorder + ((guiControl.iconSize + 4) * OS.S.pixelScale), guiControl.rowTop(0) + OS.S.pixelScale, 8, "black", 6);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.leftBorder, guiControl.rowTop(1));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.leftBorder + ((guiControl.iconSize + 4) * OS.S.pixelScale), guiControl.rowTop(1) + OS.S.pixelScale, 8, "black", 6);
			// Cargo icon
			guiControl.drawIcon(1, 0, guiControl.leftBorder, guiControl.rowTop(2));
			guiControl.drawPixelText(G.inventory.CargoTotal().toString(), guiControl.leftBorder + ((guiControl.iconSize + 4) * OS.S.pixelScale), guiControl.rowTop(2) + OS.S.pixelScale, 8, "black", 6);
			
			// Close Text
			guiControl.drawPixelText("Close", guiControl.leftBorder, guiControl.rowTop(3) + OS.S.pixelScale, 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(guiControl.inventory.cursorPosition));

			// Button Action
			if (ct_confirm().down) {
				switch (guiControl.inventory.cursorPosition) {
					case 0:
						guiControl.inventory.screen = "money";
						break;
					case 1:
						guiControl.inventory.screen = "supplies";
						break;
					case 2:
						guiControl.inventory.screen = "cargo";
						break;
					default:
						guiControl.inventory.show = false;
						break;
				}

				guiControl.inventory.cursorPosition = 0;
			}
		}
		else if (guiControl.inventory.screen == "money") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 0;
			}
			if (guiControl.inventory.cursorPosition > 0) {
				guiControl.inventory.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Money", guiControl.leftBorder - (2 * OS.S.pixelScale), guiControl.topOfBackground, 8, "black", 6);

			guiControl.drawPixelText("Actual Amt", guiControl.leftBorder - (5 * OS.S.pixelScale), guiControl.rowTop(0) + OS.S.pixelScale, 10, "black", 4);
			// Money icon
			guiControl.drawIcon(7, 2, guiControl.leftBorder - (5 * OS.S.pixelScale), guiControl.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.inventory.money.toString(), guiControl.leftBorder - (5 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 10, "black", 4);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(4) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.inventory.screen = "main";
				guiControl.inventory.cursorPosition = 0;
			}
		}
		else if (guiControl.inventory.screen == "supplies") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 0;
			}
			if (guiControl.inventory.cursorPosition > 2) {
				guiControl.inventory.cursorPosition = 2;
			}

			// Title
			guiControl.drawPixelText("Supplies", guiControl.leftBorder - (6 * OS.S.pixelScale), guiControl.topOfBackground, 8, "black", 6);

			guiControl.drawPixelText("Heal Crew?", guiControl.leftBorder - (5 * OS.S.pixelScale), guiControl.rowTop(0) + OS.S.pixelScale, 10, "black", 4);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.leftBorder - (5 * OS.S.pixelScale), guiControl.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.leftBorder - (5 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 2, "black", 4);
			// Illness icon
			guiControl.drawIcon(4, 1, guiControl.leftBorder - (5 * OS.S.pixelScale) + (24 * OS.S.pixelScale), guiControl.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.stats.illness.toString(), guiControl.leftBorder - (5 * OS.S.pixelScale) + (24 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 2, "black", 4);

			// Yes/No options
			guiControl.drawPixelText("No", guiControl.leftBorder, guiControl.rowTop(2) - (3 * OS.S.pixelScale), 3, "black", 6);
			guiControl.drawPixelText("Yes", guiControl.leftBorder, guiControl.rowTop(3) - (3 * OS.S.pixelScale), 3, "black", 6);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			guiControl.drawCursor(guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(guiControl.inventory.cursorPosition + 2) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down) {
				switch (guiControl.inventory.cursorPosition) {
					case 1:
						if (G.inventory.supplies > 0 && G.stats.illness > 0) {	//If cursor is over yes, heal illness with supplies.
							G.inventory.supplies--;
							G.stats.illness--;
						}
						break;
					default:
						guiControl.inventory.screen = "main";
						guiControl.inventory.cursorPosition = 1;	// The position where "Supplies" is on main screen.
						break;
				}
			}

			if (ct_cancel().down) {
				guiControl.inventory.screen = "main";
				guiControl.inventory.cursorPosition = 1;	// The position where "Supplies" is on main screen.
			}
		}
		else if (guiControl.inventory.screen == "cargo") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 0;
			}
			if (guiControl.inventory.cursorPosition > 0) {
				guiControl.inventory.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Cargo", guiControl.leftBorder - (2 * OS.S.pixelScale), guiControl.topOfBackground, 8, "black", 6);

			// Cargo icons
			var cargo = G.inventory.CheckCargo();	// Contains the item ids that have more than 1 item
			for (var i = 0; i < cargo.length; i++) {
				guiControl.drawItem(cargo[i], guiControl.leftBorder, guiControl.rowTop(i));
				guiControl.drawPixelText(G.inventory.cargo[cargo[i]], guiControl.leftBorder + ((guiControl.iconSize + 4) * OS.S.pixelScale), guiControl.rowTop(i) + OS.S.pixelScale, 8, "black", 6);
			}

			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(4) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.inventory.screen = "main";
				guiControl.inventory.cursorPosition = 2;
			}
		}
	}
}
