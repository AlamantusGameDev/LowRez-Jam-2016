function oceanTilePrefab(){Oversimplified.DEBUG.showMessages&&console.log("Ran oceanTilePrefab()"),prefabsLoaded++}var ani_ocean=OS.A.Add("Ocean",256,256,{columns:10,speed:1/60}),pr_ocean=OS.P.Add("Ocean Particle",{imageSrc:"images/ocean_sheet.png",animations:[ani_ocean],depth:-100,positionCheckStep:30,positionCheckProgress:30,doCheckPosition:!1,moveTimer:0});pr_ocean.BeforeDo=function(){this.positionCheckProgress++,this.positionCheckProgress>=this.positionCheckStep&&(this.positionCheckProgress=0,this.doCheckPosition=!0)},pr_ocean.Do=function(){this.moveTimer++,this.moveTimer>=120&&(this.x+=1*pixel(Math.round(Math.randomRange(-1,1))),this.y+=1*pixel(Math.round(Math.randomRange(-1,1))),this.moveTimer=0)},pr_ocean.CheckPosition=function(i,e,a){if(this.doCheckPosition){if(Math.abs(this.x-i)>OS.camera.width+this.xBound||Math.abs(this.y-e)>OS.camera.height+this.yBound)switch(a){case 0:this.x=i+(OS.camera.width+this.xBound)+randomSmidge(),this.y=e+randomSmidge();break;case 45:this.x=i+(OS.camera.width+this.xBound)+randomSmidge(),this.y=e-(OS.camera.height+this.yBound)+randomSmidge();break;case 90:this.x=i+randomSmidge(),this.y=e-(OS.camera.height+this.yBound)+randomSmidge();break;case 135:this.x=i-(OS.camera.width+this.xBound)+randomSmidge(),this.y=e-(OS.camera.height+this.yBound)+randomSmidge();break;case 180:this.x=i-(OS.camera.width+this.xBound)+randomSmidge(),this.y=e+randomSmidge();break;case 225:this.x=i-(OS.camera.width+this.xBound)+randomSmidge(),this.y=e+(OS.camera.height+this.yBound)+randomSmidge();break;case 270:this.x=i+randomSmidge(),this.y=e+(OS.camera.height+this.yBound)+randomSmidge();break;case 315:this.x=i+(OS.camera.width+this.xBound)+randomSmidge(),this.y=e+(OS.camera.height+this.yBound)+randomSmidge();break;default:console.log("No valid direction")}this.doCheckPosition=!1}};