
target.firstX=81;
target.firstY=195;


target.curDX = 50;
target.curDY = 50;

target.posX=1;
target.posY=1;

target.menuX=0;

target.menuDX=185;
target.subDY=22;



target.menufirstX=21;
//target.menufirstY=78;
target.menufirstY=45;

target.subfirstX=60;
//target.menufirstY=78;
target.subfirstY=90;


target.isMenu=true;
target.isSubMenu=false;
target.isEntering=false;
target.isEnteringFirst=false;


target.startTime="";

target.sudokuFiles = new Array("simple.tpl","easy.tpl","medium.tpl","hard.tpl");
target.sudokuNumRecords = new Array(0,0,0,0);

target.subMenuPos = new Array(0,0,0);
target.subMenuPosMax = new Array(3,3,1);

target.cNum=1;

target.currentPuzzle=0;


target.drawMenuCursor = function (x)
{
this.menuCursor.changeLayout(this.menufirstX+x*this.menuDX, undefined, undefined, this.menufirstY, undefined, undefined);
}


target.showTime = function ()
{

var time = new Date();
var timeLocale = time.toLocaleTimeString();
var show = timeLocale.substring(0, timeLocale.lastIndexOf(':'));

if (this.startTime!="")
{
var playDuration = time - this.startTime;
var seconds = Math.floor(playDuration/1000);
var h = Math.floor(seconds/3600);
var m = Math.floor((seconds%3600)/60);
//var s = (seconds%3600)%60;

if (h<10) h="0"+h;
if (m<10) m="0"+m;
//if (s<10) s="0"+s;


var showDuration = "Play time "+h+":"+m;//+":"+s+":";

this.clock2.setValue(showDuration); 
}
 else this.clock2.setValue(""); 

this.clock1.setValue(show);

}


target.drawSubMenu = function (x)
{
var id = 'subMenu'+x;
this.subMenu0.show(true);
this.subMenu1.show(true);
this.subMenu2.show(true);
this.currentNum.show(true);
this.subMenu0.changeLayout(this.subfirstX+0*this.menuDX, undefined, undefined, this.subfirstY, undefined, undefined); 
this.subMenu1.changeLayout(this.subfirstX+1*this.menuDX, undefined, undefined, this.subfirstY, undefined, undefined); 
this.subMenu2.changeLayout(this.subfirstX+2*this.menuDX, undefined, undefined, this.subfirstY, undefined, undefined); 
this.currentNum.show(false);
this.subMenu0.show(false);
this.subMenu1.show(false);
this.subMenu2.show(false);
if (this.isSubMenu)
{
this[id].show(true);
}
}


target.drawSubMenuCursor = function ()
{
this.subCursor.show(true);
this.subCursor.changeLayout(this.subfirstX+this.menuX*this.menuDX, undefined, undefined, this.subfirstY+this.subMenuPos[this.menuX]*this.subDY, undefined, undefined);
this.subCursor.show(false);
this.isEntering=false;
this.cNum=this.cNum*1;
if (this.isSubMenu)
{
if ((this.menuX==0)&(this.subMenuPos[0]==2))
	{
		this.isEntering=true;
		this.isEnteringFirst=true;
	}
this.subCursor.show(true);
}
}

target.drawCurrentNum = function ()
{
this.currentNum.show(false);
this.currentNum.setValue(this.cNum);
if ((this.isSubMenu)&(this.menuX==0))
{
this.currentNum.show(true);
}
}



target.showLabels = function ()
{
var totalPuzzles = this.sudokuNumRecords[target.subMenuPos[1]];

if (totalPuzzles==0) this.currentPuzzle=0;

if (target.subMenuPos[1]==0) totalPuzzles="Simple:"+totalPuzzles;
if (target.subMenuPos[1]==1) totalPuzzles="Easy:"+totalPuzzles;
if (target.subMenuPos[1]==2) totalPuzzles="Medium:"+totalPuzzles;
if (target.subMenuPos[1]==3) totalPuzzles="Hard:"+totalPuzzles;

this.numRecords.setValue(totalPuzzles);
this.numCurrent.setValue(target.currentPuzzle);
if (target.currentPuzzle==0)
{
 this.numCurrent.show(false); 
 this.sometext1.show(false); 
}
else
{
 this.numCurrent.show(true);
 this.sometext1.show(true); 
}
}



target.init=function ()
{
this.cCon.show(false);
this.showTime();
this.gridCursor.show(true);
this.menuCursor.show(true);


this.subCursor.show(true);
this.subMenu0.show(true);
this.subMenu1.show(true);
this.subMenu2.show(true);


this.menuX=0;
this.drawMenuCursor(this.menuX);
this.drawGridCursor(this.posX,this.posY);
for (var i=0; i<4; i++) this.checkSudokuFiles(i);
this.showLabels();

this.gridCursor.show(false);
this.subCursor.show(false);
this.subMenu0.show(false);
this.subMenu1.show(false);
this.subMenu2.show(false);
this.bckGround.show(false);
//this.cCon.show(false);
//this.showTime();
}
/*
target.isFree = function (x,y)
{
var id = "fixDigit"+y+x;
if (this[id].u > 0) return true
              else return false;
}
*/

target.showSubMenu = function (x)
{
this.drawSubMenu(x);
this.drawSubMenuCursor();
this.drawCurrentNum();
}


target.doMenuF = function ()
{
this.cCon.stopAnimation("cCon");
this.cCon.show(false);
this.bckGround.show(false);
this.isSubMenu=false;
this.showSubMenu(this.menuX,0);

this.gridCursor.show(true);
this.menuCursor.show(true);
this.isMenu=true;
this.menuX=0;
this.drawGridCursor(this.posX,this.posY);
this.drawMenuCursor(0);
this.gridCursor.show(false);
this.gridCursor.show(false);
this.startTime="";
this.showTime();
this.container.getDevice().doneResume();
this.container.getModel().resume();
	//this.container.getWindow().doBlink();
}


target.startSudoku = function ()
{
this.eraseBoard();
if (this.currentPuzzle>0)
{
     
      var s= this.getSudokuString(target.currentPuzzle-1,target.subMenuPos[1]);
if (s!='') this.doSudoku(s);
      this.gridCursor.show(true);
      this.menuCursor.show(true);
      this.posX=0;
      this.posY=0;
      this.drawGridCursor(this.posX,this.posY);
      this.drawMenuCursor(this.menuX);
      this.menuCursor.show(false)
      //target.moveCursor("right");
      this.isMenu=false;
	this.startTime = new Date();
	this.showTime();
}
}


target.doCenterF = function ()
{

if (this.isMenu)
{
if (this.isSubMenu)
  {
	switch(this.menuX)
	{
	case 0:
  		{
      	//this.currentPuzzle=2;

            switch (target.subMenuPos[0])
              {
               case 0:
 			{
			var nStr=Math.floor(Math.random()*this.sudokuNumRecords  [target.subMenuPos[1]]);
			this.currentPuzzle=nStr+1;
			this.showLabels();
 			this.startSudoku();
			break;
			}
               case 1:
 			{
			this.currentPuzzle=this.currentPuzzle+1;
			if (this.currentPuzzle>this.sudokuNumRecords[target.subMenuPos[1]]) this.currentPuzzle=0;
			this.showLabels();
 			this.startSudoku();
			break;
			}
               case 2:
 			{
			this.currentPuzzle=this.cNum*1;
			if (this.currentPuzzle>this.sudokuNumRecords[target.subMenuPos[1]]) {this.currentPuzzle=0; this.cNum="";};

			this.showLabels();
 			this.startSudoku();
			break;
			}
               case 3:
 			{
			this.eraseBoard();
			this.loadGame();
                  this.showLabels();
		      this.gridCursor.show(true);
		      this.menuCursor.show(true);
		      this.posX=0;
		      this.posY=0;
		      this.drawGridCursor(this.posX,this.posY);
		      this.drawMenuCursor(this.menuX);
		      this.menuCursor.show(false);
			this.startTime = new Date();
			this.showTime();
		      this.isMenu=false;
			break;
			}

              } // end of switch

		break;
		}
	case 1:
  		{
		this.currentPuzzle=0;
		this.showLabels();
		break;
		}
	case 2:
  		{
		if (target.subMenuPos[2]==1) this.saveGame();

		if (target.subMenuPos[2]==0) 
                { 
                kbook.autoRunRoot.exitIf(kbook.model);
		    return;
                };
		break;
		}

	}  //end of switch
  }
this.isSubMenu=!this.isSubMenu;
this.showSubMenu(this.menuX);

}
}



target.moveCursor = function (direction)
{
this.showTime(); 
if (this.isSubMenu)
{
if (direction=="up")
    {
     this.subMenuPos[this.menuX]=this.subMenuPos[this.menuX]-1;
     if (this.subMenuPos[this.menuX]<0) this.subMenuPos[this.menuX]=this.subMenuPosMax[this.menuX];
    this.drawSubMenuCursor();
    }
if (direction=="down")
    {
     this.subMenuPos[this.menuX]=this.subMenuPos[this.menuX]+1;
     if (this.subMenuPos[this.menuX]>this.subMenuPosMax[this.menuX]) this.subMenuPos[this.menuX]=0;
    this.drawSubMenuCursor();
    }

}

if (!this.isMenu){
if (direction=="right")
  {
   this.posX=this.posX+1;
   if (this.posX>8) this.posX=0;
   }
if (direction=="left")
  {
   this.posX=this.posX-1;
   if (this.posX<0) this.posX=8;
   }
if (direction=="up")
  {
   this.posY=this.posY-1;
   if (this.posY<0) this.posY=8;
   }
if (direction=="down")
  {
   this.posY=this.posY+1;
   if (this.posY>8) this.posY=0;
   }
this.drawGridCursor(this.posX,this.posY);
}
else 
this.moveMenuCursor(direction);

this.showSubMenu(this.menuX,0);
}

target.moveMenuCursor = function (direction)
{
if (target.isMenu){
if (direction=="right")
  {
   this.menuX=this.menuX+1;
   if (this.menuX>2) this.menuX=0;
   }
if (direction=="left")
  {
   this.menuX=this.menuX-1;
   if (this.menuX<0) this.menuX=2;
    }
this.drawMenuCursor(this.menuX);
}
}



target.drawGridCursor = function (x,y)
{
this.gridCursor.changeLayout(this.firstX+x*this.curDX, undefined, undefined, this.firstY+y*this.curDY, undefined, undefined);

}

target.drawDigit = function (key)
{

if (this.isEntering)
{
	if (this.isEnteringFirst)
	{
      this.cNum="";
      this.isEnteringFirst=false;
	}

this.cNum=this.cNum+key;
this.currentNum.setValue(this.cNum);

}
if (!this.isMenu)
{
var id = "custDigit"+this.posY+this.posX;
var id1 = "fixDigit"+this.posY+this.posX;

if (this[id1].u<=0)
{
this.showTime(); 
this[id].u=key;
//if (key!=0) this.checkDone();
this.checkDone();

}

}

}


target.doSudoku=function(strTemplate)
{
for(var i=0; i<9; i++)
 for(var j=0; j<9; j++)
{
var id = "fixDigit"+i+j;
var id1 = "custDigit"+i+j;

var dig = strTemplate.charAt(j+9*i); 

if ((dig>0)&&(dig<=9))
  {
    this[id].u=dig;
    this[id1].u=-1;
  }
 else
    { 
    this[id].u=-1;
    this[id1].u=0; 
    }
}
}

target.eraseBoard=function()
{
for(var i=0; i<9; i++)
 for(var j=0; j<9; j++)
    {
    var id = "fixDigit"+i+j;
    var id1 = "custDigit"+i+j;
    this[id].u=0; 
    this[id1].u=0; 
    }
//this.custDigit.u=0;
}


target.checkSudokuFiles = function(num)
{
var res=null;
var sudokuPath=this.sudokuRoot+'sudoku/'+this.sudokuFiles[num];
var i=0;

  if (FileSystem.getFileInfo(sudokuPath))
    {
    var stream = new Stream.File(sudokuPath);
    while(stream.bytesAvailable)
      {
      var s = stream.readLine();
      if (s.length==81) i++;
      }
       res = i;
       if (res>0) this.sudokuNumRecords[num]=i;
    stream.close();
    }
stream.close();

return res;
}



target.getSudokuString = function(nStr,num)
{
var res='';
var sudokuPath=this.sudokuRoot+'sudoku/'+this.sudokuFiles[num];

var i=0;

    try 
  {
    var stream = new Stream.File(sudokuPath);
    while(stream.bytesAvailable)
      {
      var s = stream.readLine();
      if (s.length==81) i++;
      if (i==(nStr+1)) {res = s; break};   
      }
     
   }
  catch (e)
  {
    res='';
  }
stream.close();  

return res;
}


target.saveGame = function()
{

var res=true;
var sudokuPath=this.sudokuRoot +'game';
var fixStr="";
var custStr="";

for(var i=0; i<9; i++)
 for(var j=0; j<9; j++)
{
    var id = "fixDigit"+i+j;
    var id1 = "custDigit"+i+j;
    if (this[id].u>0) fixStr=fixStr+this[id].u; else fixStr=fixStr+"."; 
    if (this[id1].u>0) custStr=custStr+this[id1].u; else custStr=custStr+"."; 
}

    try 
     {
    if (FileSystem.getFileInfo(sudokuPath))
   	   FileSystem.deleteFile(sudokuPath);
    var stream = new Stream.File(sudokuPath,1);
    stream.writeLine(this.cNum);
    stream.writeLine(this.currentPuzzle);
    stream.writeLine(this.subMenuPos[0]);
    stream.writeLine(this.subMenuPos[1]);
    stream.writeLine(this.subMenuPos[2]);
    stream.writeLine(fixStr);
    stream.writeLine(custStr);
    stream.close();  
     }
  catch (e)
  {
    res=false;
  }
stream.close();

return res;

}


target.loadGame = function()
{
var res=true;
var sudokuPath=this.sudokuRoot+'game';
var fixStr="";
var custStr="";


    try 
     {
  if (FileSystem.getFileInfo(sudokuPath))
    {
    var stream = new Stream.File(sudokuPath);
    
      this.cNum = stream.readLine();
      this.currentPuzzle = stream.readLine();
      var a = stream.readLine();
     // this.subMenuPos[0] = a*1;
      a = stream.readLine();
      this.subMenuPos[1] = a*1;
      a = stream.readLine();
      this.subMenuPos[2] = a*1;
      fixStr=stream.readLine();
      custStr=stream.readLine();

		for(var i=0; i<9; i++)
		 for(var j=0; j<9; j++)
		{
		var id = "fixDigit"+i+j;
		var id1 = "custDigit"+i+j;
		var digF = fixStr.charAt(j+9*i); 
		var digC = custStr.charAt(j+9*i); 
		
	if ((digF>0)&&(digF<=9)) this[id].u=digF; else this[id].u=0; 
	if ((digC>0)&&(digC<=9)) this[id1].u=digC; else this[id1].u=-1; 

		}
     
    stream.close();
    

    }
  }
  catch (e)
  {
    res=false;
  }
stream.close();

return res;
}

target.checkDone = function ()
{
var i=0;
var j=0;
var id="";
var id1="";
var chF=0;
var chN=0;
this.bckGround.show(false);
this.cCon.stopAnimation("cCon");
this.cCon.show(false);

for(i=0; i<9; i++)
 for(j=0; j<9; j++)
	{
	id = "fixDigit"+i+j;
	id1 = "custDigit"+i+j;
	if ((this[id].u<=0)&&(this[id1].u<=0)) return;
	}

for(i=0; i<9; i++)
  for(j=0; j<8; j++)
    {
	id = "fixDigit"+i+j;
	id1 = "custDigit"+i+j;
	if (this[id].u<=0) chF=this[id1].u; else chF=this[id].u;
   for(var k=j+1; k<9; k++)
     {
	id = "fixDigit"+i+k;
	id1 = "custDigit"+i+k;
    if (this[id].u<=0) chN=this[id1].u; else chN=this[id].u;
     if (chF==chN) return;
     }
    }


for(j=0; j<9; j++)
  for(i=0; i<8; i++)
    {
	id = "fixDigit"+i+j;
	id1 = "custDigit"+i+j;
	if (this[id].u<=0) chF=this[id1].u; else chF=this[id].u;
   for(var k=i+1; k<9; k++)
     {
	id = "fixDigit"+k+j;
	id1 = "custDigit"+k+j;
    if (this[id].u<=0) chN=this[id1].u; else chN=this[id].u;
     if (chF==chN) return;
     }
    }



this.bckGround.show(true);
this.cCon.show(true);
this.cCon.startAnimation("cCon");

 //this.numRecords.setValue("done");
}