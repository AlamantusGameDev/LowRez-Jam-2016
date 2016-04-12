function tradeRoom () {}

rm_Trade.DoFirst = function () {
	OS.canvas.style.background = this.background.color;
}

rm_Trade.Do = function () {}

rm_Trade.DrawAbove = function () {
    drawTradeGUI();
}

rm_Trade.DoLast = function () {
    // Clear Objects on room exit. This is best practice unless you need persistent objects.
    //rm_Trade.objects = {};
}
