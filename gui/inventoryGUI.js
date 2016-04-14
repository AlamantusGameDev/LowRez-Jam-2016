function inventoryGUI() {
	guiControl.inventory = {
		screen: "main",
		cursorPosition: 0,
		show: false
	}
}

function drawInventoryGUI() {
	if (guiControl.inventory && guiControl.inventory.show) {
		OS.context.drawImage(guiControl.background, 0, 0, 240, 240, pixel(2), pixel(2), 240, 240);

		if (ct_down().down) {
			guiControl.inventory.cursorPosition++;
		}
		if (ct_up().down) {
			guiControl.inventory.cursorPosition--;
		}
		
		if (guiControl.inventory.screen == "main") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 3;
			}
			if (guiControl.inventory.cursorPosition > 3) {
				guiControl.inventory.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Storage", guiControl.leftBorder - pixel(2), guiControl.topOfBackground, 8, "black", 6);
			// Money icon
			guiControl.drawIcon(7, 2, guiControl.leftBorder, guiControl.rowTop(0));
			guiControl.drawPixelText(G.inventory.moneyDisplay(), guiControl.leftBorder + pixel(guiControl.iconSize + 4), guiControl.rowTop(0) + pixel(), 8, "black", 6);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.leftBorder, guiControl.rowTop(1));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.leftBorder + pixel(guiControl.iconSize + 4), guiControl.rowTop(1) + pixel(), 8, "black", 6);
			// Cargo icon
			guiControl.drawIcon(1, 0, guiControl.leftBorder, guiControl.rowTop(2));
			guiControl.drawPixelText(G.inventory.CargoTotal().toString(), guiControl.leftBorder + pixel(guiControl.iconSize + 4), guiControl.rowTop(2) + pixel(), 8, "black", 6);
			
			// Close Text
			guiControl.drawPixelText("Close", guiControl.leftBorder, guiControl.rowTop(3) + pixel(), 8, "black", 6);
			
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
			guiControl.drawPixelText("Money", guiControl.leftBorder - pixel(2), guiControl.topOfBackground, 8, "black", 6);

			guiControl.drawPixelText("Actual Amt", guiControl.leftBorder - pixel(5), guiControl.rowTop(0) + pixel(), 10, "black", 4);
			// Money icon
			guiControl.drawIcon(7, 2, guiControl.leftBorder - pixel(5), guiControl.rowTop(1) - pixel(3));
			guiControl.drawPixelText(G.inventory.money.toString(), guiControl.leftBorder - pixel(5) + pixel(guiControl.iconSize + 2), guiControl.rowTop(1) + pixel(2) - pixel(3), 10, "black", 4);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(4) - pixel(4));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.inventory.screen = "main";
				guiControl.inventory.cursorPosition = 0;
			}
		}
		else if (guiControl.inventory.screen == "supplies") {
			// Limit Cursor
			if (guiControl.inventory.cursorPosition < 0) {
				guiControl.inventory.cursorPosition = 2;
			}
			if (guiControl.inventory.cursorPosition > 2) {
				guiControl.inventory.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Supplies", guiControl.leftBorder - pixel(6), guiControl.topOfBackground, 8, "black", 6);

			guiControl.drawPixelText("Heal Crew?", guiControl.leftBorder - pixel(5), guiControl.rowTop(0) + pixel(), 10, "black", 4);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.leftBorder - pixel(5), guiControl.rowTop(1) - pixel(3));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.leftBorder - pixel(5) + pixel(guiControl.iconSize + 2), guiControl.rowTop(1) + pixel(2) - pixel(3), 2, "black", 4);
			// Illness icon
			guiControl.drawIcon(4, 1, guiControl.leftBorder - pixel(5) + pixel(24), guiControl.rowTop(1) - pixel(3));
			guiControl.drawPixelText(G.stats.illness.toString(), guiControl.leftBorder - pixel(5) + pixel(24) + pixel(guiControl.iconSize + 2), guiControl.rowTop(1) + pixel(2) - pixel(3), 2, "black", 4);

			// Yes/No options
			guiControl.drawPixelText("No", guiControl.leftBorder, guiControl.rowTop(2) - pixel(3), 3, "black", 6);
			guiControl.drawPixelText("Yes", guiControl.leftBorder, guiControl.rowTop(3) - pixel(3), 3, "black", 6);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			guiControl.drawCursor(guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(guiControl.inventory.cursorPosition + 2) - pixel(4));

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
			guiControl.drawPixelText("Cargo", guiControl.leftBorder - pixel(2), guiControl.topOfBackground, 8, "black", 6);

			// Cargo icons
			var cargo = G.inventory.CheckCargo();	// Contains the item ids that have more than 1 item
			for (var i = 0; i < cargo.length; i++) {
				guiControl.drawItem(cargo[i], guiControl.leftBorder, guiControl.rowTop(i));
				guiControl.drawPixelText(G.inventory.cargo[cargo[i]], guiControl.leftBorder + pixel(guiControl.iconSize + 4), guiControl.rowTop(i) + pixel(), 8, "black", 6);
			}

			// Back Text
			guiControl.drawPixelText("Back", guiControl.leftBorder, guiControl.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.leftBorder - (guiControl.iconScaled), guiControl.rowTop(4) - pixel(4));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.inventory.screen = "main";
				guiControl.inventory.cursorPosition = 2;
			}
		}
	}
}
