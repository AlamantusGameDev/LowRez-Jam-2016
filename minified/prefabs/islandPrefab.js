function islandPrefab(){}var ani_island_1=OS.A.Add("Island 1",256,256,{}),pr_island=OS.P.Add("Island",{solid:!0,imageSrc:"images/island.png",animations:[ani_island_1],depth:-50,mapX:0,mapY:0,mapWidth:1,mapHeight:1,mapColor:"#00AB00",canTrade:!0,haggleAmount:0,timesHaggledToday:0,inventory:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],innPriceDifference:0,innStays:0,priceDifferences:[],itemsSold:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],itemsBought:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]});pr_island.DoFirst=function(){this.GetMapPosition(),this.SetUp()},pr_island.GetMapPosition=function(){this.mapX=this.x/OS.S.pixelScale/(OS.camera.width/OS.S.pixelScale),this.mapY=this.y/OS.S.pixelScale/(OS.camera.height/OS.S.pixelScale)},pr_island.SetUp=function(){for(var n=0;16>n;n++)Math.randomRange(0,100)<25&&(this.inventory[n]=Math.round(Math.randomRange(0,20)));this.AdjustPrices(),this.CheckInventory().length<4&&this.SetUp()},pr_island.AdjustPrices=function(){for(var n=0;16>n;n++)this.inventory[n]>10?this.priceDifferences[n]=-Math.round(this.inventory[n]*Math.randomRange(1,3)):this.inventory[n]<5?this.priceDifferences[n]=Math.round((10-this.inventory[n])*Math.randomRange(1,3)):this.priceDifferences[n]=Math.round(Math.randomRange(-2,2)),G.economy.cargoItemWorth[n]+this.priceDifferences[n]<0&&(this.priceDifferences[n]=-G.economy.cargoItemWorth[n]+1);var i=this.priceDifferences.slice().sort(sortNumber);this.innPriceDifference+=Math.round(Math.randomRange(i[0],i[i.length-1]))-Math.round(Math.randomRange(0,this.innStays))},pr_island.SimulateTrade=function(){for(var n=0;16>n;n++)this.inventory[n]>0?(this.inventory[n]+=Math.round(Math.randomRange(-5,5)),this.inventory[n]<0&&(this.inventory[n]=0)):Math.randomRange(0,100)<15&&(this.inventory[n]=Math.round(Math.randomRange(0,5)));this.AdjustPrices()},pr_island.NewDay=function(){this.haggleAmount=0,this.timesHaggledToday=0,this.SimulateTrade()},pr_island.CheckInventory=function(){for(var n=[],i=0;i<this.inventory.length;i++)this.inventory[i]>0&&n.push(i);return n},pr_island.TradeWith=function(){mus_sail.Stop(),mus_trade.Play(),guiControl.trade.island=this,guiControl.trade.haggleAmount=0,guiControl.trade.activateDelay=5,guiControl.trade.show=!0},pr_island.SellTo=function(n,i){this.inventory[n]++,this.itemsBought[n]++,G.inventory.cargo[n]--,G.inventory.money+=i,G.economy.cargoSold[n]++},pr_island.BuyFrom=function(n,i){this.inventory[n]--,this.itemsBought[n]++,G.inventory.cargo[n]++,G.inventory.money-=i,G.economy.cargoBought[n]++},pr_island.StayAtInn=function(){this.innStays++,G.stats.illness--,G.inventory.money-=G.economy.innCost+this.innPriceDifference,G.economy.innStays++};