// Name: Dictionary
// Description: will display DictioLaunchX based dictionary

return;

var trace = utils.trace;
var getSoValue = utils.getSoValue;

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

var skins = getSoValue(kbook.tableData, "table.skin.skins");
var cutouts = getSoValue(kbook.tableData, "table.skin.cutouts");
//trace("skins length is " + skins.length);
trace("cutouts length is " + cutouts.length);
dump(cutouts);
dump(skins);

function dump(obj) {
	try {
		for (var i = 0, n = obj.length; i < length; i++) {
			trace(i);
			var props = ["id", "x", "y", "height", "width", "texture"];
			for (var j = 0, m = props.length; j < m; j++) {
				trace(i + "\t" + props[j] + " => " + getSoValue(obj[i], props[j]));
			}
		}
	} catch (e) {
		trace("error when dumping: " + e);
	}
}





} catch (eee) {
	trace("error in dictionary: " + eee);
}