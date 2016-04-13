function tradeGUI() {
	guiControl.trade = {
		screen: "main",	// "main", "buy", "sell", "gossip"
		cursorPosition: 0,
		page: 0,		// horizontal page on item lists.
		show: false,
		activateDelay: 0,

		island: null,

		padding: pixel(2),
		leftBorder: pixel(12),

		rowTop: function (rowNumber) {
			return (guiControl.trade.padding + pixel(6) + (guiControl.trade.padding * 3)) + pixel((guiControl.iconSize + 3) * rowNumber);
		}
	}
}

function drawTradeGUI() {
	if (guiControl.trade.show) {
		guiControl.trade.activateDelay -= (guiControl.trade.activateDelay > 0) ? 1 : 0;
		var tmp = Oversimplified.context.fillStyle;
	    Oversimplified.context.fillStyle = "#D9BEA5";
	    Oversimplified.context.fillRect(0, 0, Oversimplified.camera.width, Oversimplified.camera.height);
	    Oversimplified.context.fillStyle = tmp;

		if (ct_down().down) {
			// Play Move_Cursor sound.
			guiControl.trade.cursorPosition++;
		}
		if (ct_up().down) {
			// Play Move_Cursor_Up sound.
			guiControl.trade.cursorPosition--;
		}
		
		if (guiControl.trade.screen == "main") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 3;
			}
			if (guiControl.trade.cursorPosition > 3) {
				guiControl.trade.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("On Island", (guiControl.trade.padding * 2), guiControl.trade.padding, 10, "black", 6);
			// Money icon
			// guiControl.drawIcon(7, 2, guiControl.trade.leftBorder, guiControl.trade.rowTop(0));
			guiControl.drawPixelText("Buy", guiControl.trade.leftBorder, guiControl.trade.rowTop(0) + pixel(), 8, "black", 6);
			// Supplies icon
			// guiControl.drawIcon(9, 2, guiControl.trade.leftBorder, guiControl.trade.rowTop(1));
			guiControl.drawPixelText("Sell", guiControl.trade.leftBorder, guiControl.trade.rowTop(1) + pixel(), 8, "black", 6);
			// Cargo icon
			// guiControl.drawIcon(1, 0, guiControl.trade.leftBorder, guiControl.trade.rowTop(2));
			guiControl.drawPixelText("Gossip", guiControl.trade.leftBorder, guiControl.trade.rowTop(2) + pixel(), 8, "black", 6);
			
			// Close Text
			guiControl.drawPixelText("Leave", guiControl.trade.leftBorder, guiControl.trade.rowTop(3) + pixel(), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(guiControl.trade.cursorPosition));

			// Button Action
			if (guiControl.trade.activateDelay <= 0 && ct_confirm().down) {
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
						// Change music to Sail.
						guiControl.trade.show = false;
						break;
				}

				// Play Select sound.
				guiControl.trade.cursorPosition = 0;
				guiControl.trade.page = 0;
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
			guiControl.drawPixelText("Buy", guiControl.trade.leftBorder - pixel(2), guiControl.topOfBackground, 10, "black", 6);

			// Money icon
			guiControl.drawIcon(7, 2, guiControl.trade.leftBorder - pixel(5), guiControl.trade.rowTop(0) - pixel(3));
			guiControl.drawPixelText(G.inventory.moneyDisplay(), guiControl.trade.leftBorder - pixel(5) + pixel(guiControl.iconSize + 2), guiControl.trade.rowTop(0) + pixel(2) - pixel(3), 10, "black", 4);
			
			// Cargo icons
			var cargo = guiControl.trade.island.CheckInventory();	// Contains the item ids that have more than 1 item
			for (var i = 0; i < cargo.length; i++) {
				guiControl.drawItem(cargo[i], guiControl.trade.leftBorder, guiControl.trade.rowTop(i + 1));
				var itemPrice = G.economy.cargoItemWorth[cargo[i]] + guiControl.trade.island.priceDifferences[cargo[i]];
				var itemPriceDisplay = itemPrice.toString() + " c";
				guiControl.drawPixelText(itemPriceDisplay, guiControl.trade.leftBorder + pixel(guiControl.iconSize + 4), guiControl.trade.rowTop(i + 1) + pixel(2), 8, "black", 4);
				// guiControl.drawPixelText(guiControl.trade.island.inventory[cargo[i]], guiControl.trade.leftBorder + pixel(guiControl.iconSize + 4), guiControl.trade.rowTop(i + 1) + pixel(), 8, "black", 6);
			}

			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(4) - pixel(4));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				// Play Select sound.
				guiControl.trade.screen = "main";
				guiControl.trade.cursorPosition = 0;
			}
		}
		else if (guiControl.trade.screen == "sell") {
			// Limit Cursor
			if (guiControl.trade.cursorPosition < 0) {
				guiControl.trade.cursorPosition = 2;
			}
			if (guiControl.trade.cursorPosition > 2) {
				guiControl.trade.cursorPosition = 0;
			}

			// Title
			guiControl.drawPixelText("Sell", guiControl.trade.leftBorder - pixel(6), guiControl.topOfBackground, 10, "black", 6);

			guiControl.drawPixelText("Heal Crew?", guiControl.trade.leftBorder - pixel(5), guiControl.trade.rowTop(0) + pixel(), 10, "black", 4);
			// Supplies icon
			guiControl.drawIcon(9, 2, guiControl.trade.leftBorder - pixel(5), guiControl.trade.rowTop(1) - pixel(3));
			guiControl.drawPixelText(G.inventory.supplies.toString(), guiControl.trade.leftBorder - pixel(5) + pixel(guiControl.iconSize + 2), guiControl.trade.rowTop(1) + pixel(2) - pixel(3), 2, "black", 4);
			// Illness icon
			guiControl.drawIcon(4, 1, guiControl.trade.leftBorder - pixel(5) + pixel(24), guiControl.trade.rowTop(1) - pixel(3));
			guiControl.drawPixelText(G.stats.illness.toString(), guiControl.trade.leftBorder - pixel(5) + pixel(24) + pixel(guiControl.iconSize + 2), guiControl.trade.rowTop(1) + pixel(2) - pixel(3), 2, "black", 4);

			// Yes/No options
			guiControl.drawPixelText("No", guiControl.trade.leftBorder, guiControl.trade.rowTop(2) - pixel(3), 3, "black", 6);
			guiControl.drawPixelText("Yes", guiControl.trade.leftBorder, guiControl.trade.rowTop(3) - pixel(3), 3, "black", 6);
			
			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			guiControl.drawCursor(guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(guiControl.trade.cursorPosition + 2) - pixel(4));

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
				// Play Select sound.
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
			guiControl.drawPixelText("Gossip", guiControl.trade.padding - pixel(2), guiControl.topOfBackground, 10, "black", 6);

			// Cargo icons
			var cargo = G.inventory.CheckCargo();	// Contains the item ids that have more than 1 item
			for (var i = 0; i < cargo.length; i++) {
				guiControl.drawItem(cargo[i], guiControl.trade.leftBorder, guiControl.trade.rowTop(i));
				guiControl.drawPixelText(G.inventory.cargo[cargo[i]], guiControl.trade.leftBorder + pixel(guiControl.iconSize + 4), guiControl.trade.rowTop(i) + pixel(), 8, "black", 6);
			}

			// Back Text
			guiControl.drawPixelText("Back", guiControl.trade.leftBorder, guiControl.trade.rowTop(4) - pixel(3), 8, "black", 6);
			
			// Draw cursor
			OS.context.drawImage(guiControl.cursor, guiControl.trade.leftBorder - (guiControl.iconScaled), guiControl.trade.rowTop(4) - pixel(4));

			// Button Action
			if (ct_confirm().down || ct_cancel().down) {
				guiControl.trade.screen = "main";
				guiControl.trade.cursorPosition = 2;
				// Play Select sound.
			}
		}
	}
}
