// Name: Author List
// Models: 300, 600 and x50 series
//
// Description: Adds 
//
// Author: quisvir
//
// History:
//	2011-09-24 quisvir - Initial version

tmp = function() {

	var L = Core.lang.getLocalizer('AuthorList');
	var LX = Core.lang.LX;
	var log = Core.log.getLogger('AuthorList');
	
	var AuthorsNode = null;
	var Authors = [];
	
	AuthorsNodeConstruct = function () {
		var i, node, nodes, result, records, author, path, books;
		nodes = this.nodes = [];
		Authors = [];
		result = kbook.root.children.deviceRoot.children.books.filter(kbook.model.cache['textMasters']);
		// TODO optionally attempt sorting by author's last name
		obj0 = new Object();
		obj0.by = 'indexArtist';
		obj0.order = xdb.ascending;
		obj1 = new Object();
		obj1.by = 'indexTitle';
		obj1.order = xdb.ascending;
		result.sort_c(obj0, obj1);
		records = result.count();
		for (i=0;i<records;i++) {
			record = result.getRecord(i);
			if (record) {
				author = record.author;
				path = record.getFilePath();
				if (!Authors.length || Authors[Authors.length-1][0] != author) Authors.push([author, path]);
				else Authors[Authors.length-1].push(path);
			}
		}
		// Create author subnodes
		for (i=0;i<Authors.length;i++) {
			books = Authors[i].length - 1;
			if (books >= Number(AuthorList.options.MinimumBooks)) {
				node = nodes[nodes.length] = Core.ui.createContainerNode({
					title: Authors[i][0] ? Authors[i][0] : '(' + L('NO_AUTHOR') + ')',
					parent: AuthorsNode,
					comment: LX('BOOKS', books),
					construct: AuthorsBooksNodeConstruct,
					destruct: AuthorsBooksNodeDestruct
				})
				node.index = i;
			}
		}
	};
	
	AuthorsNodeDestruct = function () {
		Authors = [];
		this.nodes = [];
	}
	
	AuthorsBooksNodeConstruct = function () {
		this.nodes = [];
		for (var i=1;i<Authors[this.index].length;i++) this.nodes.push(Core.media.createMediaNode(Authors[this.index][i], this));
	}
	
	AuthorsBooksNodeDestruct = function () {
		this.nodes = [];
	}
	
	var AuthorList = {
		name: 'AuthorList',
		title: L('TITLE'),
		optionDefs: [
			{
				name: 'MinimumBooks',
				title: L('MINIMUM_BOOKS_PER_AUTHOR'),
				defaultValue: '2',
				values: ['1', '2', '3', '4', '5', '10', '15', '20', '25'],
			},
		],
		/**
		* @constructor
		*/
		onPreInit: function () {
		},
		onInit: function () {
		},
		getAddonNode: function () {
			if (AuthorsNode === null) {
				AuthorsNode = Core.ui.createContainerNode({
					title: L('TITLE'),
					shortName: L('SHORT_TITLE'),
					icon: 'BOOK_HISTORY',
					construct: AuthorsNodeConstruct,
					destruct: AuthorsNodeDestruct
				});
			}
			return AuthorsNode;
		},
		onSettingsChanged: function (propertyName, oldValue, newValue, object) {
		},
	};

	Core.addAddon(AuthorList);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error('in AuthorList.js', e);
}
