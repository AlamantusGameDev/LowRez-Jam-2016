function loadGUIs() {
	OS.AddScript("gui/titleScreen.js");
	OS.AddScript("gui/inventoryGUI.js");
	OS.AddScript("gui/mapGUI.js");
	OS.AddScript("gui/tradeGUI.js");
}

var guiControl = {
	topOfBackground: pixel(2 + 2),
	upperBorder: pixel(13 + 2),
	lowerBorder: pixel(3 + 2),
	leftBorder: pixel(10 + 2),
	rightBorder: pixel(5 + 2),
	iconSize: 8,
	iconScaled: pixel(8),

	drawEnergyBar: function () {
	    var percentage = G.stats.energy / G.stats.maxEnergy;
	    var barHeight = pixel(2);
	    var maxBarWidth = 32;
	    var barWidth = pixel(Math.round(maxBarWidth * percentage));

	    var saveFillStyle = OS.context.fillStyle;
	    OS.context.fillStyle = "#0055FF";
	    OS.context.fillRect(64, OS.camera.height - barHeight - pixel(4), barWidth, barHeight);
	    OS.context.fillStyle = saveFillStyle;
	},
	drawClock: function () {
	    var screenX = OS.camera.width - pixel(9) - pixel(2);
	    var screenY = OS.camera.height - pixel(9) - pixel(2);
	    var percentOfClock = guiControl.clockTimerCount / guiControl.clockTimerCutoff;
	    var clockFrameX = guiControl.gui_sheet.clock.x + (Math.floor(pixel(4) * percentOfClock) * pixel(9));
	    OS.context.drawImage(guiControl.gui_sheet, clockFrameX, guiControl.gui_sheet.clock.y, pixel(9), pixel(9), screenX, screenY, pixel(9), pixel(9));
	},
	drawSpeedGauge: function () {
	    var screenX = pixel(4);
	    var screenY = OS.camera.height - guiControl.iconScaled - pixel(4);
	    var sheetX = guiControl.gui_sheet.gauge.x + (G.player.currentSpeed * guiControl.iconScaled);
	    var sheetY = guiControl.gui_sheet.gauge.y;
	    OS.context.drawImage(guiControl.gui_sheet, sheetX, sheetY, guiControl.iconScaled, guiControl.iconScaled, screenX, screenY, guiControl.iconScaled, guiControl.iconScaled);
	},

	iconPosition: function (cellPosition) {
		return (guiControl.iconScaled * cellPosition);
	},
	rowTop: function (rowNumber) {
		return guiControl.upperBorder + pixel((guiControl.iconSize + 2) * rowNumber);
	},

	drawIcon: function (cellX, cellY, xPosition, yPosition) {
		var iconSheetX = guiControl.gui_sheet.icons.x + guiControl.iconPosition(cellX);
		var iconSheetY = guiControl.gui_sheet.icons.y + guiControl.iconPosition(cellY);
		OS.context.drawImage(guiControl.gui_sheet, iconSheetX, iconSheetY, guiControl.iconScaled, guiControl.iconScaled, xPosition, yPosition, guiControl.iconScaled, guiControl.iconScaled);
	},
	drawItem: function (itemId, xPosition, yPosition) {
		var cellX = itemId % 4;
		var cellY = Math.floor(itemId / 4);
		var itemSheetX = guiControl.gui_sheet.items.x + guiControl.iconPosition(cellX);
		var itemSheetY = guiControl.gui_sheet.items.y + guiControl.iconPosition(cellY);
		OS.context.drawImage(guiControl.gui_sheet, itemSheetX, itemSheetY, guiControl.iconScaled, guiControl.iconScaled, xPosition, yPosition, guiControl.iconScaled, guiControl.iconScaled);
	},
	drawTitleImage: function () {
		OS.context.drawImage(guiControl.gui_sheet, guiControl.gui_sheet.titleImage.x, guiControl.gui_sheet.titleImage.y, guiControl.gui_sheet.titleImage.width, guiControl.gui_sheet.titleImage.height, 0, 0, guiControl.gui_sheet.titleImage.width, guiControl.gui_sheet.titleImage.height);
	},
	drawGUIBackground: function () {
		OS.context.drawImage(guiControl.gui_sheet, guiControl.gui_sheet.guiBackground.x, guiControl.gui_sheet.guiBackground.y, guiControl.gui_sheet.guiBackground.width, guiControl.gui_sheet.guiBackground.height, pixel(2), pixel(2), guiControl.gui_sheet.guiBackground.width, guiControl.gui_sheet.guiBackground.height);
	},
	drawCursor: function (xPosition, yPosition) {
		OS.context.drawImage(guiControl.gui_sheet, guiControl.gui_sheet.guiCursor.x, guiControl.gui_sheet.guiCursor.y, guiControl.iconScaled, guiControl.iconScaled, xPosition, yPosition, guiControl.iconScaled, guiControl.iconScaled);
	},
	drawPageArrow: function (direction, xPosition, yPosition) {
		var arrowSheetX = guiControl.gui_sheet.arrows.x + ((direction == "left") ? 0 : pixel(4));
		OS.context.drawImage(guiControl.gui_sheet, arrowSheetX, guiControl.gui_sheet.arrows.y, pixel(4), pixel(7), xPosition, yPosition, pixel(4), pixel(7));
	}
}
guiControl.gui_sheet = new Image();
guiControl.gui_sheet.src = "images/gui_sheet.png";
guiControl.gui_sheet.clock = { x: 0, y: 0 };
guiControl.gui_sheet.gauge = { x: 288, y: 132 };
guiControl.gui_sheet.arrows = { x: 256, y: 134 };
guiControl.gui_sheet.guiCursor = { x: 256, y: 164 };
guiControl.gui_sheet.guiBackground = { x: 0, y: 36, width: pixel(61), height: pixel(61) };
guiControl.gui_sheet.titleImage = { x: 0, y: 276, width: pixel(64), height: pixel(33) };
guiControl.gui_sheet.icons = { x: 256, y: 36 };
guiControl.gui_sheet.items = { x: 448, y: 132 };

guiControl.alphabet_sheet = new Image();
guiControl.alphabet_sheet.src = "images/alphabets_sheet.png";
guiControl.alphabet_sheet.black4 = { x: 0, y: 0 };
guiControl.alphabet_sheet.black6 = { x: 0, y: 112 };
guiControl.alphabet_sheet.white4 = { x: 96, y: 0 };
guiControl.alphabet_sheet.white6 = { x: 120, y: 112 };
guiControl.alphabet_sheet.yellow4 = { x: 192, y: 0 };
guiControl.alphabet_sheet.yellow6 = { x: 240, y: 112 };

guiControl.drawPixelText = function (text, x, y, wrapWidth, color, size) {
// Draw the text at the given x and y on the canvas using the alphabet images.
// Remember to set the pixel scale for x and y when you call the function!
// 4x4 font modified from http://pixeljoint.com/forum/forum_posts.asp?TID=18755&PID=185995#185995
// 5x6 font modified from http://atariage.com/forums/topic/165697-fonts/page-4#entry2081600
	text = text.toString().toUpperCase();
	
	var letterSizeX = pixel((size == 6) ? size - 1 : size);
	var letterSizeY = pixel(size);
	var maxWrapWidth = Math.floor(OS.camera.width / (letterSizeX + pixel(1)));
	
	wrapWidth = (wrapWidth <= 0 || wrapWidth > maxWrapWidth) ? maxWrapWidth : wrapWidth;
	
	// var alphabet = guiControl.alphabet_sheet[color + size.toString()];

	// Make words wrap nicely, but let punctuation wrap.
	var wordsInText = text.split(" ");
	if (wordsInText.length > 1) {
		var indexToBreak = 0;
		var replacementText = "";
		var punctuation = [".", ",", "-", "?", "!"];
		for (var w = 0; w < wordsInText.length; w++) {
			// console.log("\"" + wordsInText[w].charAt(wordsInText[w].length - 1) + "\"");
			
			if (punctuation.indexOf(wordsInText[w]) == -1 && punctuation.indexOf(wordsInText[w].charAt(wordsInText[w].length - 1)) != -1) {
				// If the last character of a word is punctuation, separate it out
				wordsInText.splice(w + 1, 0, wordsInText[w].charAt(wordsInText[w].length - 1));
				// console.log("punctuation:" + wordsInText[w].charAt(wordsInText[w].length - 1));
				wordsInText[w] = wordsInText[w].substr(0, wordsInText[w].length - 1);
				// console.log("Turns to:" + wordsInText[w]);
				w--;
			} else if (replacementText.substr(indexToBreak).length + wordsInText[w].length + 1 <= wrapWidth) {
				// console.log("Adding: \"" + wordsInText[w] + " \" to \"" + replacementText.substr(indexToBreak) + "\"");
				// console.log(replacementText.substr(indexToBreak).length + wordsInText[w].length + " < " + wrapWidth);
				// console.log("\"" + replacementText.substr(indexToBreak) + "\"");
				replacementText += wordsInText[w];

				if (punctuation.indexOf(wordsInText[w + 1]) == -1) {	// If the next word in the array is not punctuation,
					replacementText += " ";								// Then add a space after.
				}
				// console.log("Turns to: \"" + replacementText.substr(indexToBreak) + "\"");
			} else if (replacementText.substr(indexToBreak).length + wordsInText[w].length <= wrapWidth) {
				// console.log("Adding: \"" + wordsInText[w] + "\" to \"" + replacementText.substr(indexToBreak) + "\"");
				// console.log(replacementText.substr(indexToBreak).length + wordsInText[w].length + " < " + wrapWidth);
				// console.log("\"" + replacementText.substr(indexToBreak) + "\"");
				replacementText += wordsInText[w];
				// console.log("Turns to: \"" + replacementText.substr(indexToBreak) + "\"");
				indexToBreak = replacementText.length;
			} else {
				// console.log("Checking: \"" + replacementText.substr(indexToBreak) + wordsInText[w] + "\"");
				// console.log(replacementText.substr(indexToBreak).length + wordsInText[w].length + " > " + wrapWidth);
				// console.log("\"" + replacementText.substr(indexToBreak) + "\"");
				// indexToBreak = replacementText.length - 1;
				var numberOfSpaces = wrapWidth - replacementText.substr(indexToBreak).length;
				for (var s = 0; s < numberOfSpaces; s++) {
					replacementText += " ";
				}
				// console.log("Turns to: \"" + replacementText.substr(indexToBreak) + "\"");
				indexToBreak = replacementText.length;
				w--;
				// replacementText += wordsInText[w];
			}
			// console.log("----");
		}
		text = replacementText;
	}

	for (var i = 0; i < text.length; i++) {
		var letterCellX, letterCellY;
		switch (text.charAt(i)) {
			case "A":
				letterCellX = 0;
				letterCellY = 0;
				break;
			case "B":
				letterCellX = 1;
				letterCellY = 0;
				break;
			case "C":
				letterCellX = 2;
				letterCellY = 0;
				break;
			case "D":
				letterCellX = 3;
				letterCellY = 0;
				break;
			case "E":
				letterCellX = 4;
				letterCellY = 0;
				break;
			case "F":
				letterCellX = 5;
				letterCellY = 0;
				break;
			case "G":
				letterCellX = 0;
				letterCellY = 1;
				break;
			case "H":
				letterCellX = 1;
				letterCellY = 1;
				break;
			case "I":
				letterCellX = 2;
				letterCellY = 1;
				break;
			case "J":
				letterCellX = 3;
				letterCellY = 1;
				break;
			case "K":
				letterCellX = 4;
				letterCellY = 1;
				break;
			case "L":
				letterCellX = 5;
				letterCellY = 1;
				break;
			case "M":
				letterCellX = 0;
				letterCellY = 2;
				break;
			case "N":
				letterCellX = 1;
				letterCellY = 2;
				break;
			case "O":
				letterCellX = 2;
				letterCellY = 2;
				break;
			case "P":
				letterCellX = 3;
				letterCellY = 2;
				break;
			case "Q":
				letterCellX = 4;
				letterCellY = 2;
				break;
			case "R":
				letterCellX = 5;
				letterCellY = 2;
				break;
			case "S":
				letterCellX = 0;
				letterCellY = 3;
				break;
			case "T":
				letterCellX = 1;
				letterCellY = 3;
				break;
			case "U":
				letterCellX = 2;
				letterCellY = 3;
				break;
			case "V":
				letterCellX = 3;
				letterCellY = 3;
				break;
			case "W":
				letterCellX = 4;
				letterCellY = 3;
				break;
			case "X":
				letterCellX = 5;
				letterCellY = 3;
				break;
			case "Y":
				letterCellX = 0;
				letterCellY = 4;
				break;
			case "Z":
				letterCellX = 1;
				letterCellY = 4;
				break;
			case "1":
				letterCellX = 2;
				letterCellY = 4;
				break;
			case "2":
				letterCellX = 3;
				letterCellY = 4;
				break;
			case "3":
				letterCellX = 4;
				letterCellY = 4;
				break;
			case "4":
				letterCellX = 5;
				letterCellY = 4;
				break;
			case "5":
				letterCellX = 0;
				letterCellY = 5;
				break;
			case "6":
				letterCellX = 1;
				letterCellY = 5;
				break;
			case "7":
				letterCellX = 2;
				letterCellY = 5;
				break;
			case "8":
				letterCellX = 3;
				letterCellY = 5;
				break;
			case "9":
				letterCellX = 4;
				letterCellY = 5;
				break;
			case "0":
				letterCellX = 5;
				letterCellY = 5;
				break;
			case ".":
				letterCellX = 0;
				letterCellY = 6;
				break;
			case ",":
				letterCellX = 1;
				letterCellY = 6;
				break;
			case "-":
				letterCellX = 2;
				letterCellY = 6;
				break;
			case "?":
				letterCellX = 3;
				letterCellY = 6;
				break;
			case "!":
				letterCellX = 4;
				letterCellY = 6;
				break;
			default:	// Default to Space
				letterCellX = 5;
				letterCellY = 6;
				break;
		}

		var lineNumber = Math.floor(i/wrapWidth);
		var horizontal = i - (wrapWidth * lineNumber);
		var letterSheetX = guiControl.alphabet_sheet[color + size.toString()].x + (letterSizeX * letterCellX);
		var letterSheetY = guiControl.alphabet_sheet[color + size.toString()].y + (letterSizeY * letterCellY);
		var letterX = x + (letterSizeX * horizontal) + pixel(horizontal);	//Places a space between characters horizontally
		var letterY = y + (letterSizeY * lineNumber) + pixel(lineNumber);	//Places a space between characters vertically
		OS.context.drawImage(guiControl.alphabet_sheet, letterSheetX, letterSheetY, letterSizeX, letterSizeY, letterX, letterY, letterSizeX, letterSizeY);
	}
}
