// Name: Dictionary
// Description: will display DictioLaunchX based dictionary

/*
	this.FskCache.addContainer = function (container) {
		var containers;
		containers = this.containers;
		containers[containers.length] = container;
	};

*/
/*
	this.Fskin.treeData.setValue = function (node, name, value) {
		node.sandbox[name] = value;
		this.changed();
	};
*/

var getSoValue = utils.getSoValue;
var trace = utils.trace;

this.trace = utils.trace;

//kbookBigTitle 48 index 0
//kbookVSmallName 24 index 3

/*
trace("config is " + getSoValue(this, "config"));
trace("config.platform is " + getSoValue(this, "config.platform"));
trace("config.extension.load is " + getSoValue(this, "config.extension.load"));
trace("System.loadExtension is " + getSoValue(this, "System.loadExtension"));
trace("config.vm.root is " + getSoValue(this, "config.vm.root"));
trace("config.root is " + getSoValue(this, "config.root"));
trace("config.root.cutouts is " + getSoValue(this, "config.root.cutouts"));
trace("config.root.styles is " + getSoValue(this, "config.root.styles"));
trace("kbook.model.container.root is " + getSoValue(kbook, "model.container.root"));
trace("kbook.model.container.root.cutouts is " + getSoValue(kbook, "model.container.root.cutouts"));
trace("kbook.model.container.root.styles is " + getSoValue(kbook, "model.container.root.styles"));
trace("kbook.model.container.root.skin is " + getSoValue(kbook, "model.container.root.skin"));
trace("kbook.model.container.window is " + getSoValue(kbook, "model.container.window"));
trace("kbook.model.container.window.root is " + getSoValue(kbook, "model.container.window.root"));
//trace("sandbox is " + getSoValue(this, "sandbox"));
*/

trace("kbook.model.cache.bitmapCache[1] is " + getSoValue(kbook.model, "cache.bitmapCache.1"));

var cutouts = getSoValue(kbook, "model.container.root.cutouts");
var styles = getSoValue(kbook, "model.container.root.styles");

//var bitmap = Bitmap.call(this, "/Data/bookbyfolderpreview.jpg", "image/jpeg");
var media = {
	id: bla,
	thumbnail: {jpeg: "/Data/bookbyfolderpreview.jpg"}
}
var bitmap = kbook.model.cache.getBitmap.call(kbook.model.cache, media);
trace("bitmap is " + bitmap);
//trace("Bitmap is " + Bitmap);

/*

kbook.model.container.MENU_GROUP.MENU.doRight = function() {	
	trace("kbook.autoRunRoot.path is " + getSoValue(kbook, "autoRunRoot.path"));
} */


dump(cutouts);
dump(styles);
function dump(obj) {
	try {
		trace("dumping: " + obj.length);
		for (var i = 0, n = obj.length; i < n; i++) {
			trace(i + " => " + getSoValue(obj[i], "id"));
			/*trace(i + getSoValue(obj[i], "texture.href"));
			trace(i + getSoValue(obj[i], "texture.id"));
			trace(i + getSoValue(obj[i], "texture.width"));
			trace(i + getSoValue(obj[i], "texture.height"));*/

			/*trace(i);
			var props = ["id", "x", "y", "height", "width", "texture"];
			for (var j = 0, m = props.length; j < m; j++) {
				trace(i + "\t" + props[j] + " => " + getSoValue(obj[i], props[j]));
			}*/
		}
		trace("finished dumping");
	} catch (e) {
		trace("error when dumping: " + e);
	}
}


return;

var setValue = getSoValue(this, "Fskin.treeData.setValue");

var styles = getSoValue(kbook.tableData, "table.skin.styles");
styles[0] = styles[3];
function setSoValue(obj, propName, value) {
	var dummy = {sandbox: obj, changed: function() {}};
	try {
		setValue.call(dummy, propName, value);
	} catch (e) {
		utils.trace("failed to call set value: " + e);
	}
}



trace("setValue is " + setValue);
trace("kbook.tableData.table.skin.styles[3].id is " + getSoValue(kbook.tableData, "table.skin.styles.3.id"));
trace("kbook.tableData.table.skin.styles[3].size is " + getSoValue(kbook.tableData, "table.skin.styles.3.size"));
trace("kbook.tableData.table.skin.styles[0].id is " + getSoValue(kbook.tableData, "table.skin.styles.3.id"));
trace("kbook.tableData.table.skin.styles[0].size is " + getSoValue(kbook.tableData, "table.skin.styles.3.size"));
var style = getSoValue(kbook.tableData, "table.skin.styles.3");
trace("size is " + style.size);
//style.size=12;
//trace("2: size is " + style.size);
setSoValue(style, "size", 13);
trace("3: sosize is " + getSoValue(style, "size"));
return;

var oldDoRight = kbook.model.container.MENU_GROUP.MENU.doRight;
kbook.model.container.MENU_GROUP.MENU.doRight = function() {	
	trace("kbook.autoRunRoot.path is " + getSoValue(kbook, "autoRunRoot.path"));
}





try {

/*
trace("Fskin.tableData is " + getSoValue(this, "Fskin.tableData"));
trace("kbook.tableData.table is " + getSoValue(kbook.tableData, "table"));
trace("kbook.tableData.table.skin is " + getSoValue(kbook.tableData, "table.skin"));
trace("kbook.tableData.table.skin.styles is " + getSoValue(kbook.tableData, "table.skin.styles"));
trace("kbook.tableData.table.skin.skins is " + getSoValue(kbook.tableData, "table.skin.skins"));
trace("kbook.tableData.table.skin.cutouts is " + getSoValue(kbook.tableData, "table.skin.cutouts"));
trace("kbook.tableData.table.skin.cutouts[1] is " + getSoValue(kbook.tableData, "table.skin.cutouts.1"));
trace("kbook.tableData.table.skin.cutouts[1].id is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.id"));
trace("kbook.tableData.table.skin.cutouts[1].width is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.width"));
trace("kbook.tableData.table.skin.cutouts[1].height is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.height"));
trace("kbook.tableData.table.skin.cutouts[1].x is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.x"));
trace("kbook.tableData.table.skin.cutouts[1].y is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.y"));
trace("kbook.tableData.table.skin.cutouts[1].texture is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture"));
*/
trace("kbook.tableData.table.skin.cutouts[1].texture.getURI is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture.getURI"));
trace("kbook.tableData.table.skin.cutouts[1].texture.href is " + getSoValue(kbook.tableData, "table.skin.cutouts.1.texture.href"));
trace("kbook.root.cutouts is " + getSoValue(kbook.root, "cutouts"));

var texture = getSoValue(kbook.tableData, "table.skin.cutouts.1.texture")
texture.href=null;
trace("set texture.href to null" + getSoValue(texture, "href"));
 
var skins = getSoValue(kbook.tableData, "table.skin.skins");
var cutouts = getSoValue(kbook.tableData, "table.skin.cutouts");
//trace("skins length is " + skins.length);
trace("cutouts length is " + cutouts.length);
dump(cutouts);
//cutouts.reverse();
//trace("after reverse");
dump(cutouts);

for(var p in skins) {
	trace(p + " => " + skins[p]);
}

function dump(obj) {
	try {
		trace("dumping: " + obj.length);
		for (var i = 0, n = obj.length; i < n; i++) {
			trace(i + getSoValue(obj[i], "id"));
			/*trace(i + getSoValue(obj[i], "texture.href"));
			trace(i + getSoValue(obj[i], "texture.id"));
			trace(i + getSoValue(obj[i], "texture.width"));
			trace(i + getSoValue(obj[i], "texture.height"));*/

			/*trace(i);
			var props = ["id", "x", "y", "height", "width", "texture"];
			for (var j = 0, m = props.length; j < m; j++) {
				trace(i + "\t" + props[j] + " => " + getSoValue(obj[i], props[j]));
			}*/
		}
		trace("finished dumping");
	} catch (e) {
		trace("error when dumping: " + e);
	}
}





} catch (eee) {
	trace("error in dictionary: " + eee);
}


