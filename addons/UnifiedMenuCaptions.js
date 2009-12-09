// Name: Unified Menu Captions
// Description: Disables displaying short text using "big fonts" (menu items).
//

var styles = getSoValue(kbook.tableData, "table.skin.styles");
styles[2] = styles[3];