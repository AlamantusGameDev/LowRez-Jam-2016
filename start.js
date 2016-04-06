OS.S.defaultStep = 1 / 120;
OS.S.pixelScale = 4;
OS.SetCamera({
	width: 64 * OS.S.pixelScale,
	height: 64 * OS.S.pixelScale,
	hBorder: 24 * OS.S.pixelScale,
	vBorder: 24 * OS.S.pixelScale
});

function start()
{
    OS.AddScript("loadControls.js");
    OS.AddScript("loadGameManager.js");
    OS.AddScript("loadPrefabs.js");
    OS.AddScript("loadRooms.js");
}

function randomSmidge() {
// Return a random amount between -10 and 10 on the pixel scale.
	return (Math.round(Math.randomRange(-10, 10)) * OS.S.pixelScale);
}

function drawPixelText(text, x, y, wrapWidth, color, size) {
// Draw the text at the given x and y on the canvas using the alphabet images.
// Remember to set the pixel scale for x and y when you call the function!
// 4x4 font from http://pixeljoint.com/forum/forum_posts.asp?TID=18755&PID=185995#185995
// 5x6 font from http://atariage.com/forums/topic/165697-fonts/page-4#entry2081600
	text = text.toString().toUpperCase();
	
	var letterSizeX = ((size == 6) ? size - 1 : size) * OS.S.pixelScale;
	var letterSizeY = size * OS.S.pixelScale;
	var maxWrapWidth = Math.floor(OS.camera.width / (letterSizeX + OS.S.pixelScale));
	console.log(maxWrapWidth);
	wrapWidth = (wrapWidth <= 0 || wrapWidth > maxWrapWidth) ? maxWrapWidth : wrapWidth;
	
	var alphabet = new Image();
	alphabet.src = "images/alphabet_" + color + "_" + size.toString() + "px.png";

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
		var letterSheetX = letterSizeX * letterCellX;
		var letterSheetY = letterSizeY * letterCellY;
		var letterX = x + (letterSizeX * horizontal) + (OS.S.pixelScale * horizontal);	//Places a space between characters horizontally
		var letterY = y + (letterSizeY * lineNumber) + (OS.S.pixelScale * lineNumber);	//Places a space between characters vertically
		OS.context.drawImage(alphabet, letterSheetX, letterSheetY, letterSizeX, letterSizeY, letterX, letterY, letterSizeX, letterSizeY);
	}
}
