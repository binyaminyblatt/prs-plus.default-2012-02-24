// Name: Joypad Page Forward
// Description: In page view (reading book) scrolls to the next page, if joypad -> right button is pressed. Temporary!
//

var oldDoRight = kbook.model.container.PAGE_GROUP.PAGE.doRight;
kbook.model.container.PAGE_GROUP.PAGE.doRight = function() {
	this.bubble("doNext");
}