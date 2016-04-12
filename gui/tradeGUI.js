function tradeGUI() {
	guiControl.trade = {
		screen: "main",	// "main", "buy", "sell", "gossip"
		cursorPosition: 0,
		show: false,

		island: null,

		padding: 2 * OS.S.pixelScale,
		leftBorder: 12 * OS.S.pixelScale,

		rowTop: function (rowNumber) {
			return (guiControl.trade.padding + (6 * OS.S.pixelScale) + (guiControl.trade.padding * 3)) + ((guiControl.iconSize + 3) * rowNumber * OS.S.pixelScale);
		}
	}
}

function drawTradeGUI() {
	if (guiControl.trade.show) {
		var tmp = Oversimplified.context.fillStyle;
	    Oversimplified.context.fillStyle = "#D9BEA5";
	    Oversimplified.context.fillRect(0, 0, Oversimplified.camera.width, Oversimplified.camera.height);
	    Oversimplified.context.fillStyle = tmp;

		if (ct_down().down) {
			guiControl.trade.cursorPosition++;
		}
		if (ct_up().down) {
			guiControl.trade.cursorPosition--;
		}
		
		if (guiControl.trade.screen == "main") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 0;
			}
			if (guiControl.trade.cursorPosition > 3) {
				guiControl.trade.cursorPosition = 3;
			}

			// Title
			guiControl.drawPixelText("On Island", (guiControl.trade.padding * 2), guiControl.trade.padding, 10, "black", 6);
			// Money icon
			// guiControl.drawIcon(7, 2, guiControl.trade.leftBorder, guiControl.trade.rowTop(0));
			guiControl.drawPixelText("Buy", guiControl.trade.leftBorder, guiControl.trade.rowTop(0) + OS.S.pixelScale, 8, "black", 6);
			// Supplies icon
			// guiControl.drawIcon(9, 2, guiControl.trade.leftBorder, guiControl.trade.rowTop(1));
			guiControl.drawPixelText("Sell", guiControl.trade.leftBorder, guiControl.trade.rowTop(1) + OS.S.pixelScale, 8, "black", 6);
			// Cargo icon
			// guiControl.drawIcon(1, 0, guiControl.trade.leftBorder, guiControl.trade.rowTop(2));
			guiControl.drawPixelText("Gossip", guiControl.trade.leftBorder, guiControl.trade.rowTop(2) + OS.S.pixelScale, 8, "black", 6);
			
			// Close Text
			guiControl.drawPixelText("Leave", guiControl.trade.leftBorder, guiControl.trade.rowTop(3) + OS.S.pixelScale, 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(guiControl.trade.cursorPosition));

			// Button Action
			if (ct_confirm().down) {
				switch (guiControl.trade.cursorPosition) {
					case 0:
						guiControl.trade.screen = "buy";
						break;
					case 1:
						guiControl.trade.screen = "sell";
						break;
					case 2:
						guiControl.trade.screen = "gossip";
						break;
					default:
						guiControl.trade.show = false;
						break;
				}

				guiControl.trade.cursorPosition = 0;
			}
		}
		else if (guiControl.trade.screen == "buy") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 0;
			}
			if (guiControl.trade.cursorPosition > 0) {
				guiControl.trade.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Buy", guiControl.trade.leftBorder - (2 * OS.S.pixelScale), guiControl.topOfBackground, 10, "black", 6);

			guiControl.drawPixelText("Actual Amt", guiControl.trade.leftBorder - (5 * OS.S.pixelScale), guiControl.trade.rowTop(0) + OS.S.pixelScale, 10, "black", 4);
			// Money icon
			guiControl.drawIcon(7, 2, guiControl.trade.leftBorder - (5 * OS.S.pixelScale), guiControl.trade.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.inventory.money.toString(), guiControl.trade.leftBorder - (5 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.trade.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 10, "black", 4);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(4) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.trade.screen = "main";
				guiControl.trade.cursorPosition = 0;
			}
		}
		else if (guiControl.trade.screen == "sell") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 0;
			}
			if (guiControl.trade.cursorPosition > 2) {
				guiControl.trade.cursorPosition = 2;
			}

			// Title
			guiControl.drawPixelText("Sell", guiControl.trade.leftBorder - (6 * OS.S.pixelScale), guiControl.topOfBackground, 10, "black", 6);

			guiControl.drawPixelText("Heal Crew?", guiControl.trade.leftBorder - (5 * OS.S.pixelScale), guiControl.trade.rowTop(0) + OS.S.pixelScale, 10, "black", 4);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.trade.leftBorder - (5 * OS.S.pixelScale), guiControl.trade.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.trade.leftBorder - (5 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.trade.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 2, "black", 4);
			// Illness icon
			guiControl.drawIcon(4, 1, guiControl.trade.leftBorder - (5 * OS.S.pixelScale) + (24 * OS.S.pixelScale), guiControl.trade.rowTop(1) - (3 * OS.S.pixelScale));
			guiControl.drawPixelText(G.stats.illness.toString(), guiControl.trade.leftBorder - (5 * OS.S.pixelScale) + (24 * OS.S.pixelScale) + ((guiControl.iconSize + 2) * OS.S.pixelScale), guiControl.trade.rowTop(1) + (2 * OS.S.pixelScale) - (3 * OS.S.pixelScale), 2, "black", 4);

			// Yes/No options
			guiControl.drawPixelText("No", guiControl.trade.leftBorder, guiControl.trade.rowTop(2) - (3 * OS.S.pixelScale), 3, "black", 6);
			guiControl.drawPixelText("Yes", guiControl.trade.leftBorder, guiControl.trade.rowTop(3) - (3 * OS.S.pixelScale), 3, "black", 6);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			guiControl.drawCursor(guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(guiControl.trade.cursorPosition + 2) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down) {
				switch (guiControl.trade.cursorPosition) {
					case 1:
						if (G.inventory.supplies > 0 && G.stats.illness > 0) {	//If cursor is over yes, heal illness with supplies.
							G.inventory.supplies--;
							G.stats.illness--;
						}
						break;
					default:
						guiControl.trade.screen = "main";
						guiControl.trade.cursorPosition = 1;	// The position where "Supplies" is on main screen.
						break;
				}
			}

			if (ct_cancel().down) {
				guiControl.trade.screen = "main";
				guiControl.trade.cursorPosition = 1;	// The position where "Supplies" is on main screen.
			}
		}
		else if (guiControl.trade.screen == "gossip") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 0;
			}
			if (guiControl.trade.cursorPosition > 0) {
				guiControl.trade.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Gossip", guiControl.trade.padding - (2 * OS.S.pixelScale), guiControl.topOfBackground, 10, "black", 6);

			// Cargo icons
			var cargo = G.inventory.CheckCargo();	// Contains the item ids that have more than 1 item
			for (var i = 0; i < cargo.length; i++) {
				guiControl.drawItem(cargo[i], guiControl.trade.leftBorder, guiControl.trade.rowTop(i));
				guiControl.drawPixelText(G.inventory.cargo[cargo[i]], guiControl.trade.leftBorder + ((guiControl.iconSize + 4) * OS.S.pixelScale), guiControl.trade.rowTop(i) + OS.S.pixelScale, 8, "black", 6);
			}

			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - (3 * OS.S.pixelScale), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(4) - (4 * OS.S.pixelScale));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.trade.screen = "main";
				guiControl.trade.cursorPosition = 2;
			}
		}
	}
}
