function loadGameManager(){for(var e=0;e<G.economy.cargoItemWorth.length;e++)G.economy.cargoItemWorth[e]+=Math.round(Math.randomRange(-5,5))}var Game={};G=Game,G.gameStarted=!1,G.savedGameExists=OS.Load("TradeWindsSave")?!0:!1,G.player={},G.oceanParticle={},G.map=[],G.currentScreen="",G.inventory={money:100,supplies:20,cargo:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],moneyDisplay:function(){var e="";return G.inventory.money>=1e6&&(e=G.inventory.money.toString().substr(0,1),parseInt(G.inventory.money.toString().substr(1,1))>0&&(e+="."+G.inventory.money.toString().substr(1,1))),G.inventory.money>=1e12?e+="T":G.inventory.money>=1e9?e+="B":G.inventory.money>=1e6?e+="M":e=G.inventory.money.toString(),e},CheckCargo:function(){for(var e=[],n=0;n<G.inventory.cargo.length;n++)G.inventory.cargo[n]>0&&e.push(n);return e},CargoTotal:function(){for(var e=G.inventory.CheckCargo(),n=0,a=0;a<e.length;a++)n+=G.inventory.cargo[e[a]];return n},CanBuy:function(e,n){return G.inventory.cargo[e]<G.stats.hold&&G.inventory.money>n&&(G.inventory.cargo[e]>0||G.inventory.CheckCargo().length<G.stats.inventory)?!0:!1},CanSell:function(e){return G.inventory.cargo[e]>0}},G.stats={inventory:3,hold:20,speed:1,hull:3,maxHull:3,popularity:5,haggling:10,crew:2,energy:25,maxEnergy:50,illness:0},G.economy={innCost:50,innStays:0,cargoItemWorth:[10,20,30,30,40,20,50,80,65,20,20,30,30,60,45,70],cargoSold:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],cargoBought:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],UpdateEconomy:function(){for(var e=0;e<G.economy.cargoItemWorth.length;e++){for(var n=0,a=0;a<G.map.length;a++)n+=G.map[a].island.priceDifferences[e];G.economy.cargoItemWorth[e]+=Math.round(n/G.map.length)}for(var t=0,a=0;a<G.map.length;a++)t+=G.map[a].island.innPriceDifference;G.economy.innCost+=Math.round(t/G.map.length)}},G.SaveGame=function(){for(var e={playerX:G.player.x,playerY:G.player.y,money:G.inventory.money,supplies:G.inventory.supplies,cargo:G.inventory.cargo.slice(),stats:{inventory:G.stats.inventory,hold:G.stats.hold,speed:G.stats.speed,hull:G.stats.hull,maxHull:G.stats.maxHull,popularity:G.stats.popularity,haggling:G.stats.haggling,crew:G.stats.crew,energy:G.stats.energy,maxEnergy:G.stats.maxEnergy,illness:G.stats.illness},economy:{innCost:G.economy.innCost,innStays:G.economy.innStays,itemWorth:G.economy.cargoItemWorth.slice(),cargoSold:G.economy.cargoSold.slice(),cargoBought:G.economy.cargoBought.slice()},map:[]},n=0;n<G.map.length;n++)e.map.push({drawX:G.map[n].drawX,drawY:G.map[n].drawY,drawWidth:G.map[n].drawWidth,drawHeight:G.map[n].drawHeight,inventory:G.map[n].island.inventory.slice(),innPriceDifference:G.map[n].island.innPriceDifference,innStays:G.map[n].island.innStays,priceDifferences:G.map[n].island.priceDifferences.slice(),itemsSold:G.map[n].island.itemsSold.slice(),itemsBought:G.map[n].island.itemsBought.slice()});OS.Save("TradeWindsSave",JSON.stringify(e))&&console.log("Game Saved!")},G.LoadGame=function(){var e=OS.Load("TradeWindsSave");if(!e)return console.log("Could not load game!"),!1;e=JSON.parse(e),G.player.x=e.playerX,G.player.y=e.playerY,G.inventory.money=e.money,G.inventory.supplies=e.supplies,G.inventory.cargo=e.cargo.slice(),G.stats.inventory=e.stats.inventory,G.stats.hold=e.stats.hold,G.stats.speed=e.stats.speed,G.stats.hull=e.stats.hull,G.stats.maxHull=e.stats.maxHull,G.stats.popularity=e.stats.popularity,G.stats.haggling=e.stats.haggling,G.stats.crew=e.stats.crew,G.stats.energy=e.stats.energy,G.stats.maxEnergy=e.stats.maxEnergy,G.stats.illness=e.stats.illness,G.economy.innCost=e.economy.innCost,G.economy.innStays=e.economy.innStays,G.economy.cargoItemWorth=e.economy.itemWorth.slice(),G.economy.cargoSold=e.economy.cargoSold.slice(),G.economy.cargoBought=e.economy.cargoBought.slice();for(var n=0;n<e.map.length;n++)G.map[n].drawX=e.map[n].drawX,G.map[n].drawY=e.map[n].drawY,G.map[n].drawWidth=e.map[n].drawWidth,G.map[n].drawHeight=e.map[n].drawHeight,G.map[n].island.x=rm_Ocean.squareSize*e.map[n].drawX,G.map[n].island.y=rm_Ocean.squareSize*e.map[n].drawY,G.map[n].island.inventory=e.map[n].inventory.slice(),G.map[n].island.innPriceDifference=e.map[n].innPriceDifference,G.map[n].island.innStays=e.map[n].innStays,G.map[n].island.priceDifferences=e.map[n].priceDifferences.slice(),G.map[n].island.itemsSold=e.map[n].itemsSold.slice(),G.map[n].island.itemsBought=e.map[n].itemsBought.slice();e=null,console.log("Game Loaded!")};