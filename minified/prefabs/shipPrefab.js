function shipPrefab(){Oversimplified.DEBUG.showMessages&&console.log("Ran shipPrefab()"),prefabsLoaded++}var ani_ship_r=OS.A.Add("Ship Right",64,64,{columns:2,speed:1/60,yOffset:256}),ani_ship_ur=OS.A.Add("Ship Up-Right",64,64,{columns:2,speed:1/60,yOffset:448}),ani_ship_u=OS.A.Add("Ship Up",64,64,{columns:2,speed:1/60,yOffset:320}),ani_ship_ul=OS.A.Add("Ship Up-Left",64,64,{columns:2,speed:1/60,yOffset:384}),ani_ship_l=OS.A.Add("Ship Left",64,64,{columns:2,speed:1/60,yOffset:192}),ani_ship_dl=OS.A.Add("Ship Down-Left",64,64,{columns:2,speed:1/60,yOffset:64}),ani_ship_d=OS.A.Add("Ship Down",64,64,{columns:2,speed:1/60,yOffset:0}),ani_ship_dr=OS.A.Add("Ship Down-Right",64,64,{columns:2,speed:1/60,yOffset:128}),pr_ship=OS.P.Add("Ship",{solid:!0,imageSrc:"images/ship_sheet.png",maskImageSrc:"images/ship_mask.png",animations:[ani_ship_r,ani_ship_ur,ani_ship_u,ani_ship_ul,ani_ship_l,ani_ship_dl,ani_ship_d,ani_ship_dr],direction:0,currentSpeed:0,pointInFront:{x:0,y:0},moveStepSize:3,moveStepAmount:5*OS.R[OS.R.currentRoom].stepSpeed,moveStepProgress:0,doTakeStep:!1,energyRefillTimer:0,drawSickIndicator:0,drawSickIndicatorTime:secondsWorthOfFrames(1.5)});pr_ship.BeforeDo=function(){G.gameStarted&&this.GetMapPosition()},pr_ship.Do=function(){G.gameStarted&&(guiControl&&guiControl.inventory&&guiControl.map&&guiControl.trade&&(guiControl.inventory.show||guiControl.map.show||guiControl.trade.show||(ct_left().down?this.direction+=45:ct_right().down&&(this.direction-=45),this.direction=Math.clampAngle(this.direction),ct_up().down?this.currentSpeed++:ct_down().down&&this.currentSpeed--,this.AdjustSpeedBasedOnEnergy(),this.CheckInteraction())),this.currentSpeed=Math.clamp(this.currentSpeed,0,4),this.moveStepProgress+=this.currentSpeed*this.moveStepAmount,this.moveStepProgress>=this.moveStepSize?(this.moveStepProgress-=this.moveStepSize,this.doTakeStep=!0):this.doTakeStep=!1,this.SeamlessScroll())},pr_ship.AfterDo=function(){G.gameStarted&&(this.CheckMovement(),this.UpdateEnergy())},pr_ship.DrawAbove=function(){if(G.gameStarted&&(this.drawSickIndicator--,this.drawSickIndicator<0&&(this.drawSickIndicator=0),this.drawSickIndicator>0)){var t=Math.round((this.drawSickIndicatorTime-this.drawSickIndicator)/2)/OS.S.pixelScale,i=this.y-t-Oversimplified.camera.y-guiControl.iconScaled/2;guiControl.drawIcon(4,1,this.x-Oversimplified.camera.x-guiControl.iconScaled/2,i)}},pr_ship.GetMapPosition=function(){this.mapX=pixel(Math.round(this.x/pixel(64))),this.mapY=pixel(Math.round(this.y/pixel(64)))},pr_ship.CheckInteraction=function(){if(ct_confirm().down){var t=OS.GameObjectsAtPoint(this.pointInFront.x,this.pointInFront.y);if(t.length>0)for(var i=0;i<t.length;i++)t[i].canTrade&&t[i].TradeWith()}},pr_ship.CheckMovement=function(){var t=pixel(G.stats.speed+this.currentSpeed),i=!1;switch(this.direction){case 0:"Ship Right"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Right"),this.doTakeStep&&(i=this.SimpleMove(t,0,!0,pixel(4))),this.pointInFront.x=this.x+this.xBound+pixel(2)+t,this.pointInFront.y=this.y;break;case 45:"Ship Up-Right"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Up-Right"),this.doTakeStep&&(i=this.SimpleMove(t,-t,!0,pixel(4))),this.pointInFront.x=this.x+this.xBound+pixel(2)+t,this.pointInFront.y=this.y-this.yBound-pixel(2)-t;break;case 90:"Ship Up"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Up"),this.doTakeStep&&(i=this.SimpleMove(0,-t,!0,pixel(4))),this.pointInFront.x=this.x,this.pointInFront.y=this.y-this.yBound-pixel(2)-t;break;case 135:"Ship Up-Left"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Up-Left"),this.doTakeStep&&(i=this.SimpleMove(-t,-t,!0,pixel(4))),this.pointInFront.x=this.x-this.xBound-pixel(2)-t,this.pointInFront.y=this.y-this.yBound-pixel(2)-t;break;case 180:"Ship Left"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Left"),this.doTakeStep&&(i=this.SimpleMove(-t,0,!0,pixel(4))),this.pointInFront.x=this.x-this.xBound-pixel(2)-t,this.pointInFront.y=this.y;break;case 225:"Ship Down-Left"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Down-Left"),this.doTakeStep&&(i=this.SimpleMove(-t,t,!0,pixel(4))),this.pointInFront.x=this.x-this.xBound-pixel(2)-t,this.pointInFront.y=this.y+this.yBound+pixel(2)+t;break;case 270:"Ship Down"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Down"),this.doTakeStep&&(i=this.SimpleMove(0,t,!0,pixel(4))),this.pointInFront.x=this.x,this.pointInFront.y=this.y+this.yBound+pixel(2)+t;break;case 315:"Ship Down-Right"!=this.sprite.currentAnimation&&this.SetAnimation("Ship Down-Right"),this.doTakeStep&&(i=this.SimpleMove(t,t,!0,pixel(4))),this.pointInFront.x=this.x+this.xBound+pixel(2)+t,this.pointInFront.y=this.y+this.yBound+pixel(2)+t;break;default:console.log("No valid direction")}this.doTakeStep&&!i&&(this.currentSpeed=0)},pr_ship.UpdateEnergy=function(){this.energyRefillTimer++,this.energyRefillTimer>=100/G.stats.crew+G.stats.illness*(100/G.stats.crew)&&(G.stats.energy+=G.stats.crew,this.energyRefillTimer=0),this.doTakeStep&&(G.stats.energy-=.25*(this.currentSpeed/G.stats.speed+.1*G.stats.illness)),G.stats.energy<0&&(G.stats.energy=0),G.stats.energy>G.stats.maxEnergy&&(G.stats.energy=G.stats.maxEnergy)},pr_ship.SeamlessScroll=function(){this.x<=rm_Ocean.mapLeftTrigger?(this.x=rm_Ocean.mapLeftTriggerTarget,OS.SetCamera({x:rm_Ocean.width})):this.x>=rm_Ocean.mapRightTrigger?(this.x=rm_Ocean.mapRightTriggerTarget,OS.SetCamera({x:0})):this.y<=rm_Ocean.mapUpTrigger?(this.y=rm_Ocean.mapUpTriggerTarget,OS.SetCamera({y:rm_Ocean.height})):this.y>=rm_Ocean.mapDownTrigger&&(this.y=rm_Ocean.mapDownTriggerTarget,OS.SetCamera({y:0}))},pr_ship.AdjustSpeedBasedOnEnergy=function(){(this.currentSpeed>3&&G.stats.energy<.3*G.stats.maxEnergy||this.currentSpeed>2&&G.stats.energy<.15*G.stats.maxEnergy||this.currentSpeed>1&&G.stats.energy<.05*G.stats.maxEnergy)&&this.currentSpeed--},pr_ship.CheckIllnessIncrease=function(){var t=G.stats.crew+this.currentSpeed/(G.stats.energy+.001)*G.stats.illness;Math.randomRange(0,100)<t&&(snd_illness.Play(),G.stats.illness++,this.drawSickIndicator+=secondsWorthOfFrames(1.5))};