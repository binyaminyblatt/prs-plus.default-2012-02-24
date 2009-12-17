target.firstX = 40;
target.curDX = 50;
target.firstY = 45;
target.curDY = 50;
target.posX;
target.help;
target.posY;
target.anAus;
target.col10m = [];
target.summe;
target.sameBall = [];
target.cNum = -3;

target.init = function () {
	this.anAus = 0;
	this.CloseGame1.show(this.anAus);
	this.CloseGame2.show(this.anAus);
	this.help = 1;
	this.showHelp();
	var datPath = this.fiveballsRoot + 'fiveballs.dat';
	try {
		if (FileSystem.getFileInfo(datPath)) {
			var stream = new Stream.File(datPath);
			this.cNum = stream.readLine();
		}
		stream.close();
	} catch(e) {}
	for (var a = 0; a < 10; a++) this.col10m[a] = [];
	for (a = 0; a < 120; a++) this.sameBall[a] = [a];
	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 12; y++) {
			var randBL = Math.floor(Math.random() * 5) + 1;
			this.col10m[x][y] = randBL;
			this.sameBall[10 * y + x] = randBL;
		}
	}
	this.setBalls();
	this.posX = 1;
	this.posY = 0;
	this.drawGridCursor((9 + this.posX * 1) % 10, 0);
	this.drawSumNum();
	this.summe = 0;
	this.showScore.setValue("Score: 0");
};

target.removeB = function () {
	if (this.anAus == 1) {
		if (this.summe > this.cNum) {
			datPath = this.fiveballsRoot + 'fiveballs.dat';
			try {
				if (FileSystem.getFileInfo(datPath)) FileSystem.deleteFile(datPath);
				stream = new Stream.File(datPath, 1);
				stream.writeLine(this.summe);
				stream.close();
			} catch(e) {}
		}
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
	var id = "5Balls" + ((9 + this.posX * 1) % 10) + '' + this.posY,
		ball = this[id].u;
	var YX = this.posY * 10 + ((9 + this.posX * 1) % 10);
	var zwisc1 = YX,
		zwisc2 = this.sameBall[YX];
	this.sameBall[YX] = -1 * ball - 70;
	this.findUdLr(ball, YX);
	var drin = false,
		j = 1;
	while (drin == false) {
		drin = true;
		for (i = 0; i < 120; i++) {
			if ((this.sameBall[i] > -10) && (this.sameBall[i] < 0)) {
				YX = i;
				j++;
				this.sameBall[YX] = -1 * ball - 70;
				this.findUdLr(ball, YX);
				drin = false;
			}
		}
	}
	if (j > 1) {
		this.summe += j * (j - 1);
		this.showScore.setValue("Score: " + this.summe + " /" + j * (j - 1));
		for (i = 120; i > -1; i--) {
			if (this.sameBall[i] * 1 < 0) {
				i += "";
				var End = i.length - 1;
				this.col10m[i.substring(End)].splice(i.substring(0, End), 1);
				this.col10m[i.substring(End)][11] = 0;
			}
		}
		for (x = 0; x < 10; x++) {
			y = 0;
			while (this.col10m[x][11] == 0 && y < 12) {
				y++;
				this.col10m[x].splice(11, 1);
				var uS = this.col10m[x].unshift(0);
			}
		}
		for (x = 0; x < 10; x++) {
			for (y = 0; y < 12; y++) {
				this.sameBall[(10 * y + x)] = this.col10m[x][y];
			}
		}
		this.setBalls();
	} else {
		this.sameBall[zwisc1] = zwisc2;
	}
	this.drawSumNum();
};

target.findUdLr = function (ball, YX) {
	if (YX % 10 < 9) {
		for (x = 1;
		(YX + x) % 10 > 0; x++) {
			if (this.sameBall[YX + x] == ball) this.sameBall[YX + x] = ball * -1;
			else break;
		}
	}
	for (x = 1; YX + 10 * x < 120; x++) {
		if (this.sameBall[YX + 10 * x] == ball) this.sameBall[YX + 10 * x] = ball * -1;
		else break;
	}
	if (YX % 10 > 0) {
		for (x = 1;
		(YX - x) % 10 < 9; x++) {
			if (this.sameBall[YX - x] == ball) this.sameBall[YX - x] = ball * -1;
			else break;
		}
	}
	for (x = 1; YX - 10 * x > -1; x++) {
		if (this.sameBall[YX - 10 * x] == ball) this.sameBall[YX - 10 * x] = ball * -1;
		else break;
	}
};

target.drawSumNum = function () {
	id = "5Balls" + ((9 + this.posX * 1) % 10) + '' + this.posY,
	ball = this[id].u;
	this.sumNum.setValue('Highscore: ' + this.cNum + '  [' + (this.posY * 10 + ((9 + this.posX * 1) % 10)) + '/' + '5B' + ball + ']');
};

target.showHelp = function () {
	this.help = Math.abs(this.help - 1);
	this.backGrd.show(this.help);
	this.helpInfo1.show(this.help);
	this.helpInfo2.show(this.help);
	this.helpInfo3.show(this.help);
};

target.setBalls = function () {
	var B1 = 0,
		B2 = 0,
		B3 = 0,
		B4 = 0,
		B5 = 0;
	for (x = 0; x < 10; x++) {
		for (y = 0; y < 12; y++) {
			id = "5Balls" + x + '' + y;
			this[id].u = this.col10m[x][y];
			switch (this[id].u) {
			case 0:
				{
					break;
				}
			case 1:
				{
					B1 += 1;
					break;
				}
			case 2:
				{
					B2 += 1;
					break;
				}
			case 3:
				{
					B3 += 1;
					break;
				}
			case 4:
				{
					B4 += 1;
					break;
				}
			case 5:
				{
					B5 += 1;
					break;
				}
			}
		}
	}
	this.Ball1.setValue(B1);
	this.Ball2.setValue(B2);
	this.Ball3.setValue(B3);
	this.Ball4.setValue(B4);
	this.Ball5.setValue(B5);
};

target.drawGridCursor = function (x, y) {
	this.gridCursor.changeLayout(this.firstX + x * this.curDX, undefined, undefined, this.firstY + y * this.curDY, undefined, undefined);
	this.help = 1;
	this.showHelp();
};

target.moveCursor = function (dir) {
	switch (dir) {
	case "down":
		{
			this.posY = (this.posY + 1) % 12;
			break;
		}
	case "up":
		{
			this.posY = (12 + this.posY - 1) % 12;
			break;
		}
	case "left":
		{
			this.posY = Math.max(0, this.posY - 3);
			break;
		}
	case "right":
		{
			this.posY = Math.min(11, this.posY + 3);
			break;
		}
	}
	this.drawSumNum();
	this.drawGridCursor(((9 + this.posX * 1) % 10), this.posY);
};

target.moveColum = function (zahl) {
	this.posX = zahl * 1;
	this.drawGridCursor(((9 + this.posX * 1) % 10), this.posY);
	this.drawSumNum();
};

target.doCenterF = function () {
	this.help = 1;
	this.showHelp();
	this.anAus = Math.abs(this.anAus - 1);
	this.backGrd.show(this.anAus);
	this.CloseGame1.show(this.anAus);
	this.CloseGame2.show(this.anAus);
};