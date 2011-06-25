/* 
 Free Cell for PRS (Touch version)
 Original version: (c) 2010 Ben Chenoweth
 
 Loosely based on code obtained from http://www.mikekohn.net/stuff/psp.php
 Card graphics obtained from http://www.jfitz.com/cards/ and then modified somewhat

 2010-12-31 Mark Nord: added NumericButtons and one additional check for aces right at the begining
 2011-01-04 Ben Chenoweth: added snapshots
 2011-01-05 Ben Chenoweth: added undo
 2011-02-07 Ben Chenoweth: added screen refresh during automove to home cells (so you can sort of see it happening!)
 2011-02-10 Ben Chenoweth: added using 9 for new deal and 0 for quit (non-touch).
*/


var deck;
var rows;
var frees;
var snapshotrows;
var snapshotfrees;
var undorows;
var undofrees;
var currundo;
var undodepth;
var curr_selected;
var lowest_free;
var stack_spacing;
var displayHelp;
var xcursor=[];
var ycursor=[];
var cursor;
var uD; // undefinded;
var win;

/* Core workaround 
var newEvent = prsp.compile("param", "return new Event(param)");
var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
var getSoValue = kbook.autoRunRoot.getSoValue; */
var getSoValue, hasNumericButtons, newEvent;

target.init = function () {
    var t,r,l,c;
    //var credits;
    var tempxcursor, tempycursor;

/* temporary Core workaround  for PRS+ v1.1.3 */

      	if(!kbook || !kbook.autoRunRoot || !kbook.autoRunRoot.getSoValue){ 
      	  		if (kbook.simEnviro) { /*Sim without handover code */
	      	  		getSoValue = _Core.system.getSoValue;
				hasNumericButtons = _Core.config.compat.hasNumericButtons;
      	  		} else {/* PRS-505 */
        	  		getSoValue = function (obj, propName) {
        			return FskCache.mediaMaster.getInstance.call(obj, propName);};
 				hasNumericButtons = true;
      			}
			try{
        			var compile = getSoValue(prsp,"compile");
        			newEvent = compile("param", "return new Event(param)");
        		} catch(ignore) {}	
	 }else { /* code is ok with PRS-600 */
		getSoValue = kbook.autoRunRoot.getSoValue;
		// newEvent = prsp.compile("param", "return new Event(param)"); // no menu no need for newEvent
		hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	}	
	
	
    deck=new Array(52);
    rows=new Array(8);
    frees=new Array(8);
	
	snapshotrows=new Array(8);
	snapshotfrees=new Array(8);
	
	// set up undo arrays
	undodepth=11; // this allows for 10 undos
	currundo=0;
	undorows=new Array(undodepth);
	undofrees=new Array(undodepth);
	for (t=0; t<undodepth; t++)
	{
		undorows[t]=new Array(8);
		undofrees[t]=new Array(8);
		for (r=0; r<8; r++)
		{
			undorows[t][r]=new Array(52);
			undofrees[t][r]=-1;
		}
	}
    
    stack_spacing=30;  // number of pixels from the top needed to display number and suit of a card
    curr_selected=-1;

    this.shuffle_deck();

    l=7;
    c=0;

    for (t=0; t<8; t++)
    {
        frees[t]=-1;
        rows[t]=new Array(52);
		snapshotrows[t]=new Array(52);

        for (r=0; r<l; r++)
        {
            rows[t][r]=deck[c];
			c++;
        }
        rows[t][r]=-1;

        if (t==3) l=6;
    }

    // unselect();
    this.draw_board();
	
    // 2010.12.31 - Mark Nord  - deal with aces at startup
    while (this.check_auto_free());
	
	win=false;
	
	// set up first level of undo
	this.updateUndo();
	
	// save initial snapshot
    for (t=0; t<8; t++)
    {
        snapshotfrees[t]=frees[t];

        for (r=0; r<52; r++)
        {
            snapshotrows[t][r]=rows[t][r];
			if (rows[t][r]==-1) {
				break;
			}
        }
    }
    
	// hide unwanted graphics
	this.messageStatus.show(false);
	this.sometext1.show(false);
	
	// hide instructions
	this.touchHelp.changeLayout(0,0,uD,0,0,uD);
	displayHelp=false;
	
	// hide selection sprite
	this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
    	curr_selected=-1;
	
	// hide congratulations sprite
	this.congratulations.changeLayout(0,0,uD,0,0,uD);
	
	if (hasNumericButtons) {
		this.touchButtons1.show(false);
		this.nonTouch_colHelp.show(true);
		// set up cursor position array
		xcursor[0]=355; // 'restart' button
		ycursor[0]=-35;
		xcursor[1]=465; // 'new deal' button
		ycursor[1]=-35;
		xcursor[2]=540; // 'quit' button
		ycursor[2]=-35;
		xcursor[3]=8;
		ycursor[3]=80;
		xcursor[4]=82;
		ycursor[4]=80;
		xcursor[5]=156;
		ycursor[5]=80;
		xcursor[6]=230;
		ycursor[6]=80;
		xcursor[7]=309;
		ycursor[7]=80;
		xcursor[8]=383;
		ycursor[8]=80;
		xcursor[9]=457;
		ycursor[9]=80;
		xcursor[10]=531;
		ycursor[10]=80;
		xcursor[11]=10;
		ycursor[11]=-1;
		xcursor[12]=84;
		ycursor[12]=-1;
		xcursor[13]=158;
		ycursor[13]=-1;
		xcursor[14]=232;
		ycursor[14]=-1;
		xcursor[15]=306;
		ycursor[15]=-1;
		xcursor[16]=380;
		ycursor[16]=-1;
		xcursor[17]=454;
		ycursor[17]=-1;
		xcursor[18]=528;
		ycursor[18]=-1;
		
		// position cursor
		cursor=11;
		tempxcursor=xcursor[cursor];
		tempycursor=this.get_y_position(cursor);
		this.gridCursor.changeLayout(tempxcursor,90,uD,tempycursor,100,uD);
	} else {
		this.gridCursor.show(false);
		this.nonTouch_colHelp.show(false);
		this.nonTouch.show(false);
		this.instr4.show(false);
	}
	return;  
}

target.get_y_position = function (location) {
	var tempycursor, rspace, r;
	
	tempycursor=ycursor[location];
	
	if (tempycursor==-1) {
		// need to find the location of the top card of the current column
		location=location-11;
        rspace=110;
        for (r=0; r<52; r++) {
            if (rows[location][r]==-1) break;
            rspace=rspace+stack_spacing;
        }
		tempycursor=rspace+40;
	}
	return tempycursor;
}

target.unselect = function () {
	// hide selection sprite
	this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
	curr_selected=-1;
	return;
}

target.remove_from_row = function (n) {
    var r,t;

    for (t=0; t<8; t++)
    {
        for (r=0; r<52; r++)
        {
            if (rows[t][r]==-1) break;
            if (rows[t][r]==n)
            {
                rows[t][r]=-1;
                return;
            }
        }
    }

    for (t=0; t<4; t++)
    {
        if (frees[t]==n) frees[t]=-1;
    }
	return;
}

target.card_is_top = function (n) {
    var t,r;
    for (t=0; t<4; t++)
    {
        if (frees[t]==n) return true;
    }

    t=this.get_row(n);
    if (t<0) return false;

    for (r=0; r<52; r++)
    {
        if (rows[t][r]==-1) return false;
        if (rows[t][r]==n) break;
    }

    if (rows[t][r+1]==-1) return true;
    return false;
}

target.add_card_to_row = function (n,t) {
    var r,z;
	//this.bubble("tracelog","adding card "+n+" to column "+t);
	// check if adding to an empty column
    if (rows[t][0]==-1)
    {
		// check for card moving from free cell
		for (r=0; r<4; r++)
		{
			//this.bubble("tracelog","looking in freecell "+r);
			if (frees[r]==n) {
				frees[r]=-1;
				rows[t][0]=n;
				rows[t][1]=-1;
				return true;
			}
		}
		
		// card moving from another row
        this.remove_from_row(n);
        rows[t][0]=n;
        rows[t][1]=-1;
        return true;
    }

    for (r=0; r<52; r++)
    {
        if (rows[t][r]==-1) break;
    }

    if ((((rows[t][r-1]%4)<=1 && (n%4)>=2) ||
        ((rows[t][r-1]%4)>=2 && (n%4)<=1)) &&
    (Math.floor(rows[t][r-1]/4)-1)==Math.floor(n/4))
    {
        this.remove_from_row(n);
        rows[t][r]=n;
        rows[t][r+1]=-1;
        return true;
    }
    return false;
}

target.open_click = function (t) {
	var r;
	// check that there is a selected card
	if (curr_selected<0) return;
	
	// check for selected card moving from free cell
	for (r=0; r<4; r++)
	{
		if (frees[r]==curr_selected) {
			if (this.add_card_to_row(curr_selected,t)==true)
			{
				this.unselect();
				this.draw_board();
				while (this.check_auto_free());
				this.updateUndo();
				return;
			}
		}
	}	

	// check to make sure selected card is top of a column
    if (this.card_is_top(curr_selected)==false) return;

	// move the selected card to the open column
    if (this.add_card_to_row(curr_selected,t)==true)
    {
        this.unselect();
		this.draw_board();
        while (this.check_auto_free());
		this.updateUndo();
        return;
    }
}

target.move_to_home = function (t,n) {
    var r;

	frees[n]=t;
	
	// recalculate the lowest freeable card value
    lowest_free=13;
    for (r=4; r<8; r++)
    {
        if (Math.floor(frees[r]/4)<lowest_free)
        {
            lowest_free=Math.floor(frees[r]/4);
        }
    }
    if (lowest_free<0) lowest_free=0;
	return;
}

target.get_suit = function (n) {
	var v;
	switch (Math.floor(n%4)) {
		case 0 : {
			v = 2;	//Hearts
			break;
		}	
		case 1 : {
			v = 3;	//Diamonds
			break;
		}	
		case 2 : {
			v = 0;	//Clubs
			break;
		}			
		case 3 : {
			v = 1;	//Spades
			break;
		}	
	}
	return v;
}

target.card_click = function (n) {
    var t,r,u,sum,rspace;
	//this.bubble("tracelog","curr_selected="+curr_selected+", n="+n);
    if (curr_selected==n)
    {
		// unselect the currently selected card when it is clicked again
        this.unselect();
        return;
    }

    t=curr_selected;
	
    if (t>=0)
    {
		// need to check if card is in free cells
		for (r = 0; r<4; r++) {
			if (frees[r] == t) {
				// found selected card in free cells
				// check to see if card that was clicked is one less than value of the selected card and the same suit as the selected card
				if (Math.floor(t/4)-1==Math.floor(n/4) && (t%4)==(n%4))
				{
					// move card from row to free cell
					// first, get location of card n
					for (u=4; u<8; u++) {
						if (frees[u]==n) {
							this.move_to_home(t,u);
							frees[r]=-1;
							this.unselect();
							this.draw_board();
							while (this.check_auto_free());
							this.updateUndo();
							return;	
						}
					}
					
					
				}				
			}
		}
		
        if (this.card_is_top(t)==false) return;
		
	// check to see if card that was clicked is one less than value of the selected card and the same suit as the selected card
        if (Math.floor(t/4)-1==Math.floor(n/4) && (t%4)==(n%4))
        {
			// move card from row to free cell
			// first, get location of card n
			for (u=4; u<8; u++) {
				if (frees[u]==n) {
					this.move_to_home(t,u);
					this.remove_from_row(t);
					this.unselect();
					this.draw_board();			
					while (this.check_auto_free());
					this.updateUndo();
					return;	
				}
			}
        }
    }

    if (t!=-1)
    {
        if (this.card_is_top(n)==true)
        {
            r=this.get_row(n);
            if (r!=-1)
            {
                if (this.add_card_to_row(t,r)==true)
                {
		    // card successfully moved to a new row
                    this.unselect();
					this.draw_board();
                    while (this.check_auto_free());
					this.updateUndo();
                    return;
                }
            }
        }
    }


    if (curr_selected!=-1)
    {
       this.unselect();
    }

	// look in the four free cells
	for (r = 0; r<4; r++) {
		if (frees[r] == n) {
			// update position of selection sprite
			curr_selected=n;
			this.selection.changeLayout(73*r+r+2,73,uD,0,96,uD);		
			return; 
		}
	}		
	
    if (curr_selected==n)
    {
	// unselect the currently selected card when it is clicked again
        this.unselect();
    }
    else
    {
		if (this.card_is_top(n)==false) return;
		
		// select the card just clicked
       		curr_selected=n;
		t=this.get_row(n);
		sum=t*73+t+4;
		
		rspace=110;
		for (r=0; r<52; r++)
		{
			if (rows[t][r] == -1) {
				continue;
			} else if (rows[t][r] != n) {
				rspace=rspace+stack_spacing;
				continue;
			} else {
				// update position of selection sprite
				this.selection.changeLayout(sum,73,uD,rspace,96,uD);
				return;
			}
		}
    }
	return;
}

target.get_card_from_num = function (tempnum) {
var suit, cardnum
	suit=this.get_suit(tempnum);
	cardnum=Math.floor(tempnum/4);
	cardnum++;
	if (cardnum==1) { cardnum="Ace"; }
	if (cardnum==11) { cardnum="Jack"; }
	if (cardnum==12) { cardnum="Queen"; }
	if (cardnum==13) { cardnum="King"; }
	if (suit==2)
	{
		return cardnum+" of Hearts";
	}
	else
	if (suit==3)
	{
		return cardnum+" of Diamonds";
	}
	else
	if (suit==0)
	{
		return cardnum+" of Clubs";
	}
	else
	if (suit==1)
	{
		return cardnum+" of Spades";
	}
}

target.free_click = function(n) {
    var card,free_area,r;
	
    if (frees[n]!=-1 && n<4) return;

    if (curr_selected<0) return;
	
    if (this.card_is_top(curr_selected)==false) return;
	
	// check to see if card already in a free cell
	for (r=0; r<4; r++) {
		if (frees[r]==curr_selected) {
			// free up the old free cell
			frees[r]=-1;
			
			// assign it to the new free cell
			frees[n]=curr_selected;
			this.unselect();
			this.draw_board();
			//while (this.check_auto_free());
			this.updateUndo();
			return;
		}
	}
	
	// move it into the free cell
	frees[n]=curr_selected;
	
	// remove it from its row
	this.remove_from_row(curr_selected);
	this.unselect();
	if (n>=4) card.free=true;
	this.draw_board();
	while (this.check_auto_free());
	this.updateUndo();
	return;
}

target.check_can_free = function (n) {
// this function checks to see if card n can be freed, and if it can it frees it, returning true
    var r,t,v;
	
	// get card value
    v=Math.floor(n/4);

	// found an Ace
    if (v==0)
    {
        for (t=4; t<8; t++)
        {
	   // search for free home cell
            if (frees[t]==-1)
            {
				this.move_to_home(n,t);
				// "select" the Ace
                		//curr_selected=n;
				
				// "click" on the free home cell
                		//this.free_click(t+4);
				
				// remove ace if it was in the free cells (is that even possible?)
				for (r=0; r<4; r++) {
					if (frees[r]==n) {
						frees[r]=-1;
						this.draw_board();
						return true;
					}
				}
				
				// remove ace if it was in a column
				this.remove_from_row(n);
				this.draw_board();
                return true;
            }
        }
     return false;
    }

    // can't free a card of this value yet
   if (v>lowest_free+1) return false;

    for (t=4; t<8; t++)
    {
	// check to see if card is one more than value of the top card of home cell and of the same suit
        if (Math.floor(n/4)==(Math.floor(frees[t]/4)+1) && (n%4)==(frees[t]%4))
        {
	    // move card to its home cell
            this.move_to_home(n,t);
			
			// remove ace if it was in the free cells (is that even possible?)
			for (r=0; r<4; r++) {
				if (frees[r]==n) {
					frees[r]=-1;
					this.draw_board();
					return true;
				}
			}
			
			// remove ace if it was in a column
			this.remove_from_row(n);			
			
			// update screen
			this.draw_board();
			
			// continue checking
            return true;
        }
    }
    return false;
}

target.check_auto_free = function () {
    var t,r;
	// check to see if cards in free cells can be sent home
    for (t=0; t<4; t++)
    {
        if (frees[t]==-1) continue;
        if (this.check_can_free(frees[t])==true)
        {
	// keep checking
			FskUI.Window.update.call(kbook.model.container.getWindow());
            return true;
        }
    }

	// check to see if last card in each column can be sent home
    for (t=0; t<8; t++)
    {
        for (r=0; r<52; r++)
        {
            if (rows[t][r]==-1) break;
        }

        if (r==0) continue;
        r--;

        if (this.check_can_free(rows[t][r])==true)
        {
	// keep checking
            return true;
        }
    }
    return false;
}

target.draw_board = function () {
    var card,free_area;
    var t,r,z;
    var rspace;
    var id,card_num,u,v;

    id=-1;
	
    for (t=0; t<8; t++)
    {
        rspace=110;

        for (r=0; r<52; r++)
        {
            if (rows[t][r]==-1) break;
          	card_num = rows[t][r];
      		v=this.get_suit(card_num);
      		u=Math.floor(card_num/4);
      		
      		// get the next card's id
      		id++;
      		
      		// assign graphics to card
      		this['card'+1*id].u=u;
      		this['card'+1*id].v=v;
      		
      		// update position of card
      	        this['card'+1*id].changeLayout(t*73+t+4,73,uD,rspace,98,uD);
      		//this.bubble("tracelog","id="+id);
      	            rspace=rspace+stack_spacing;
        }

		// Deal with free cells
        if (frees[t]!=-1 && t<4)
        {
            card_num=frees[t];
			v=this.get_suit(card_num);
			u=Math.floor(card_num/4);
			
			// get the next card's id
			id++;
			
			// assign graphics to card
			this['card'+1*id].u=u;
			this['card'+1*id].v=v;
			
			// update position of card
            this['card'+1*id].changeLayout(t*73+t+2,73,uD,0,98,uD);
			//this.bubble("tracelog","id="+id);
        }
		
		// Deal with home cells (note that only the top card is visible)
		if (frees[t]!=-1 && t>3)
        {
            card_num=frees[t];
			v=this.get_suit(card_num);
			u=Math.floor(card_num/4);
			
			// get the next card's id
			id++;
			
			// assign graphics to card
			this['card'+1*id].u=u;
			this['card'+1*id].v=v;
			
			// update position of card
            this['card'+1*id].changeLayout((t-4)*74+303,73,uD,0,98,uD);
			//this.bubble("tracelog","id="+id);
        }
    }
	// need to hide unused card sprites
	for (r=id+1; r<52; r++) {
		//this.bubble("tracelog","hiding card "+r);
		this['card'+1*r].changeLayout(0,0,uD,0,0,uD);
	}
	
	if (id==3) {
		// only four cards are visible, so that means you've won!
		this.congratulations.changeLayout(94,411,uD,250,142,uD);
		win=true;
	}
	return;
}

target.get_row = function (n) {
    var t,r;

    for (t=0; t<8; t++)
    {
        for (r=0; r<52; r++)
        {
            if (rows[t][r]==-1) break;
            if (rows[t][r]==n) return t;
        }
    }
	
    return -1;
}

target.shuffle_deck = function () {
    var temp_deck;
    var t,c;

    temp_deck=new Array(52);

    //this.unselect();
    lowest_free=1;

    for (t=0; t<52; t++)
    {
        temp_deck[t]=t;
    }

    for (t=0; t<52; t++)
    {
        this['card'+1*t].free=false;
    }

    for (t=0; t<52; t++)
    {
        c=Math.floor(Math.random()*52);
        if (c<0) c=-c;

        while(temp_deck[c]==-1)
        {
            c++;
            if (c>=52) c=0;
        }

        deck[t]=c;
        temp_deck[c]=-1;
    }
  // deck_count=0;
	return;
}

target.doCardClick = function (sender) {
	var id, n, u, v;
   	id = getSoValue(sender, "id");
	u = getSoValue(sender, "u");
	v = getSoValue(sender, "v");
	if (v==0) { suit=2; }
	if (v==1) { suit=3; }
	if (v==2) { suit=0; }
	if (v==3) { suit=1; }
	n=u*4+suit;
	card=this.get_card_from_num(n);
	//this.bubble("tracelog","id="+id+", n="+n+", card="+card);
	this.card_click(n);
	return;
}

target.doSelectClick = function (sender) {
	this.unselect();
	return;
}

target.doFreeClick = function (sender) {
	var id, n;
    	id = getSoValue(sender, "id");
	n = id.substring(4, 5);
	this.free_click(n);
	return;
}

target.doOpenClick = function (sender) {
	var id, n;
    	id = getSoValue(sender, "id");
	n = id.substring(4, 5);
	this.open_click(n);
	return;
}

target.doButtonClick = function (sender) {
	var id;
    id = getSoValue(sender, "id");
	n = id.substring(7, 10);
	if (n == "RAN") {
		this.init();
		return;
	}
	if (n == "RES") {
		l=7;
		c=0;

		for (t=0; t<8; t++)
		{
			frees[t]=-1;

			for (r=0; r<l; r++)
			{
				rows[t][r]=deck[c++];
			}
			rows[t][r]=-1;

			if (t==3) l=6;
		}

		this.draw_board();

		// 2010.12.31 - Mark Nord  - deal with aces at startup
		while (this.check_auto_free());
		
		win=false;
		
		// reset undo history
		currundo=0;
		
		// set up first level of undo
		this.updateUndo();
		
		// hide selection sprite
		this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
		curr_selected=-1;

		// hide congratulations sprite
		this.congratulations.changeLayout(0,0,uD,0,0,uD);
		return;
	}
	if (n == "EXT") {
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
}

target.showHelp = function () {
    if (!displayHelp) {
        displayHelp = true;
        this.touchHelp.changeLayout(42,516,uD,50,611,uD);
    } else {
        displayHelp = false;
        this.touchHelp.changeLayout(0,0,uD,0,0,uD);
    }	
}

target.quitGame = function () {
	kbook.autoRunRoot.exitIf(kbook.model);
	return;
}

target.doNext = function () {
	if (win==true) return;

	// save snapshot
    for (t=0; t<8; t++)
    {
        snapshotfrees[t]=frees[t];

        for (r=0; r<52; r++)
        {
            snapshotrows[t][r]=rows[t][r];
			if (rows[t][r]==-1) {
				break;
			}
        }
    }
	this.draw_board();
	
	// hide selection sprite
	this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
	curr_selected=-1;

	// hide congratulations sprite
	this.congratulations.changeLayout(0,0,uD,0,0,uD);
	
	return;
}

target.doPrev = function () {
	if (win==true) return;

	// open snapshot
    for (t=0; t<8; t++)
    {
        frees[t]=snapshotfrees[t];

        for (r=0; r<52; r++)
        {
            rows[t][r]=snapshotrows[t][r];
			if (snapshotrows[t][r]==-1) {
				break;
			}
        }
    }
	this.draw_board();
	
	// reset undo history
	currundo=0;
	
	// set up first level of undo
	this.updateUndo();
	
	// hide selection sprite
	this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
	curr_selected=-1;

	// hide congratulations sprite
	this.congratulations.changeLayout(0,0,uD,0,0,uD);
		
	return;
}

target.doSize = function () {
	if (win==true) return;
	
	// do undo
	if (currundo==1) return;
	
	// retrieve most recent undo
	for (t=0; t<8; t++)
	{
		frees[t]=undofrees[currundo-2][t];

		for (r=0; r<52; r++)
		{
			rows[t][r]=undorows[currundo-2][t][r];
			if (undorows[currundo-2][t][r]==-1) {
				break;
			}
		}
	}	
	
	// decrement current undo
	currundo--;
	
	// update board
	this.draw_board();
	
	// hide selection sprite
	this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
	curr_selected=-1;

	// hide congratulations sprite
	this.congratulations.changeLayout(0,0,uD,0,0,uD);
	return;
}

target.updateUndo = function () {
	// update undo
	if (currundo < undodepth) {
		// increment current undo if possible
		currundo++;
	}
	else {
		// if not possible, then shift all previous undos, losing oldest one
		for (s=1; s<undodepth; s++)
		{
			for (t=0; t<8; t++)
			{
				undofrees[s-1][t]=undofrees[s][t];

				for (r=0; r<52; r++)
				{
					undorows[s-1][t][r]=undorows[s][t][r];
					if (undorows[s][t][r]==-1) {
						break;
					}
				}
			}
		}
	}
	// store current layout
	for (t=0; t<8; t++)
	{
		undofrees[currundo-1][t]=frees[t];

		for (r=0; r<52; r++)
		{
			undorows[currundo-1][t][r]=rows[t][r];
			if (rows[t][r]==-1) {
				break;
			}
		}
	}
	return;
}

target.doMark = function () {
	// unused
	return;
}

target.updateGridCursor = function () {
	var tempxcursor, tempycursor;
	tempxcursor=xcursor[cursor];
	tempycursor=this.get_y_position(cursor);
	this.gridCursor.changeLayout(tempxcursor,90,uD,tempycursor,100,uD);
}

target.moveCursor = function (dir) {
	switch (dir) {
	case "down":
		{
			cursor+=8;
			if (cursor>18) {
				cursor=18;
			}
			break;
		}
	case "up":
		{
			cursor-=8;
			if (cursor<0) {
				cursor=0;
			}
			break;
		}
	case "left":
		{
			cursor--;
			if (cursor<0) {
				cursor=18;
			}
			break;
		}
	case "right":
		{
			cursor++;
			if (cursor>18) {
				cursor=0;
			}
			break;
		}
	}
	this.updateGridCursor();
}

target.digitF = function (key) {
	if (key==0) {
		kbook.autoRunRoot.exitIf(kbook.model);
		return;		
	}
	if (key==9) {
		this.init();
		return;
	}
	key = key*1;
	cursor = 10 + key;
	this.updateGridCursor();
	this.cursorClick();
	return;
}

target.doHold1 = function() {
	cursor = 3;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold2 = function() {
	cursor = 4;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold3 = function() {
	cursor = 5;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold4 = function() {
	cursor = 6;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold5 = function() {
	cursor = 7;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold6 = function() {
	cursor = 8;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold7 = function() {
	cursor = 9;
	this.updateGridCursor();
	this.cursorClick();
}

target.doHold8 = function() {
	cursor = 10;
	this.updateGridCursor();
	this.cursorClick();
}

target.cursorClick = function () {
	var l,c,t,r,n;
	var tempxcursor,tempycursor,temp;

	// deal with buttons first
	if (cursor==0) {
		l=7;
		c=0;

		for (t=0; t<8; t++)
		{
			frees[t]=-1;

			for (r=0; r<l; r++)
			{
				rows[t][r]=deck[c++];
			}
			rows[t][r]=-1;

			if (t==3) l=6;
		}

		this.draw_board();
		
		// 2010.12.31 - Mark Nord  - deal with aces at startup
		while (this.check_auto_free());
		
		win=false;
		
		// reset undo history
		currundo=0;
		
		// set up first level of undo
		this.updateUndo();
		
		// hide selection sprite
		this.selection.changeLayout(-100,uD,uD,uD,uD,uD);
		curr_selected=-1;

		// hide congratulations sprite
		this.congratulations.changeLayout(0,0,uD,0,0,uD);
		return;		
	}
	if (cursor==1) {
		this.init();
		cursor=1;
		tempxcursor=xcursor[cursor];
		tempycursor=this.get_y_position(cursor);
		this.gridCursor.changeLayout(tempxcursor,90,uD,tempycursor,100,uD);
		return;
	}
	if (cursor==2) {
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
	
	if ((cursor>2) && (cursor<7)) {
		temp=cursor-3;
		// clicking in a free cell
		n=cursor-3;
		
		// check to see if free cell is empty
		if (frees[n]==-1) {
			this.free_click(n);
			return;
		}
		
		// clicked on a card in a free cell
		this.card_click(frees[n]);
		return;
	}
	
	if ((cursor>6) && (cursor<11)) {
		// clicking in a home cell
		n=cursor-3;
		
		// check to see if free cell is empty
		if (frees[n]!=-1) {
			// clicked on a card in a free cell
			temp=frees[n];
			this.card_click(frees[n]);
		}
		return;
	}
	
	if ((cursor>10) && (cursor<19)) {
		temp=cursor-11;
		// clicking in a column
		t=cursor-11;
		
		// check to see if column is empty
		if (rows[t][0]==-1) {
			this.open_click(t);
			return
		}
		
		// clicked on a card in a column
        for (r=0; r<52; r++)
        {
            if (rows[t][r]==-1) break;
        }
        r--;
		temp=rows[t][r];
		this.card_click(rows[t][r]);
		return;
	}
	return;
}
