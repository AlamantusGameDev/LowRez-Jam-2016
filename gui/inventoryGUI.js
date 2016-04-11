function inventoryGUI() {
	guiControl.inventory = {
		scroll: 0,
		cursorPosition: 0
	}
}

function drawInventoryGUI() {
	OS.context.drawImage(guiBackground, 0, 0, 240, 240, 2 * OS.S.pixelScale, 2 * OS.S.pixelScale, 240, 240);
	// Title
	drawPixelText("Cargo", (10 + 2) * OS.S.pixelScale, guiControl.topOfBackground, 8, "black", 6);

	// Money and Supplies
	// OS.context.drawImage()

	// Cargo
	for (var i = 0; i < G.inventory.cargo.length; i++) {
		// if ()
	}
}
