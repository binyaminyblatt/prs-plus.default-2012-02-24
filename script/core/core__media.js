// Name: Core Media
// Description: Provides media (books, images, music, notes) related services (indexing etc)
// Author: kartu
//
// History:
//	2010-07-07 kartu - Initial version
//	2010-07-09 kartu - Renamed file so that it is loaded before other modules
//	2010-10-24 kartu - Changed the way media lookup is done, now using xdb
//				Added findLibrary function
//				Fixes issue #15 (Maximum number of PRS+ indexed files limited by 1200)
//	2010-11-11 kartu - Added isImage function
//	2011-03-02 kartu - Added loadMedia, 
//			createMediaNode assumes path is actually media object, if its type is not string
//	2011-12-08 Ben Chenoweth - Archive support (using on Shura1oplot's code); scanDirectory is now recursive
//  2011-12-14 Ben Chenoweth - Added supportedExtensions
//	2011-12-20 Ben Chenoweth - Added supportedComics

tmp = function() {
	var supportedMIMEs, supportedExtensions, supportedComics, findLibrary, findMedia, loadMedia, scanDirectory, createMediaNode, isImage, startsWith;
	// Shortcut
	startsWith = Core.text.startsWith; 

	supportedMIMEs = {
		//"audio/mpeg": true,
		"application/rtf": true,
		"application/pdf": true,
		"application/epub+zip": true,
		"application/x-sony-bbeb": true,
		"text/plain": true
	};
	
	supportedExtensions = {
		"rtf": true,
		"pdf": true,
		"epub": true,
		"lrf": true,
		"txt": true,
		"fb2": true,
		"jpeg": true,
		"jpg": true,
		"png": true
	};
	
	supportedComics = {
		"cbr": true,
		"cbz": true
	};
	
	/**
	* Finds kinoma "source" (instance of FskCache.source) corresponding to the given full path
	*/
	findLibrary = function (path) {
		// Find library source responsible for handling the path
		var i, n, sources, source;
		source = null;
		sources = kbook.model.cache.sources;
		for (i = 0, n = sources.length; i < n; i++) {
			if (startsWith(path, sources[i].path)) {
				source = sources[i];
				break;
			}
		}
		return source;
	};
	
	/**
	* Given full file path returns found media instance or null, if it cannot be found
	*/
	findMedia = function (path) {
		try {
			// Find source responsible for handling the path
			var source = findLibrary(path);
			if (source) {
				// Ask library to find media record
				return source.getRecordByPath(path.substring(source.path.length));
			}
		} catch (e) {
			log.error("Finding media " + path, e);
		}
		return null;
	};
	
	/**
	* Loads (unscanned) media file
	*/
	loadMedia = function(path) {
		var library, item;
		library = findLibrary(path);
		item = library.makeItemFromFile(path);
		item.path = path.substring(library.path.length);
		library.insertRecord(item);
		return item;
	};

	/**
	* Searchs unscanned media files in directory and adds it to library
	*/
	scanDirectory = function (path) {
		var iterator, item, itemFullPath, name, mime;
		iterator = new FileSystem.Iterator(path);
		while (item = iterator.getNext()) {
			itemFullPath = path + item.path;
			if (item.type === 'directory') {
				// item is a directory, so recursively scan the directory
				scanDirectory(itemFullPath + "/");
			} else {
				mime = FileSystem.getMIMEType(itemFullPath);
				if (supportedMIMEs[mime]) {
					if (!findMedia(itemFullPath)) {
						loadMedia(itemFullPath);
						kbook.root.update();
					}
				}
			}
		}
	};
	
	/**
	* Creates media node (book, image, note etc) for media with a given path, returns null if media cannot be found.
	*/
	createMediaNode = function (path, parent) {
		var i, n, node, media, mediaTypes, mediaTypesStr, mediaNodePrototypes;
		if (typeof path === "string") {
			media = findMedia(path);
		} else {
			media = path;
		}
		mediaTypes = Core.config.compat.media.types;
		mediaTypesStr = Core.config.compat.media.kinds;
		mediaNodePrototypes = Core.config.compat.media.prototypes;
		
		if (media !== null) {
			for (i = 0, n = mediaTypes.length; i < n; i++) {
				if (xs.isInstanceOf(media, mediaTypes[i])) {
					node = xs.newInstanceOf(mediaNodePrototypes[i]);
					node.media = media;
					node.cache = kbook.model.cache;
					node.parent = parent;
					node.depth = parent.depth + 1;
					node.type = mediaTypesStr[i];
					/*try {
						if (mediaTypesStr[i]==="audio") {
							node.onEnter = kbook.model.onEnterSong(this);
							node.onSelect = kbook.model.onSelectDefault(this);
							node.kind = 3;
							node.playingKind = 14;
							node.comment = Core.io.extractFileName(path);
							//log.trace("node.comment="+node.comment);
						}
					} catch(e) { log.trace("Error trying to make media node"); } */
					//log.trace("Looking in node:");
					//for (var name in node) {
					//	if (node.hasOwnProperty(name)) {
					//		log.trace(name+"="+node[name]);
					//	}
					//}
					return node;
				}
			}
		}
		
		return null;	
	};
	
	isImage = function (path) {
		var mime = FileSystem.getMIMEType(path);
		return mime && !mime.indexOf('image/');
	};
	
	Core.media = {
		supportedMIMEs: supportedMIMEs,
		
		supportedExtensions: supportedExtensions,
		
		supportedComics: supportedComics,
		
		/**
		* Finds media (book, image, audio, etc) with a given path
		* @returns null, if media cannot be found
		*/
		findMedia: findMedia,
		
		/**
		* Loads (unscanned) media file
		*/
		loadMedia: loadMedia,

		/**
		* Finds kinoma "library source" (instance of FskCache.source) corresponding to the given full path
		*/
		findLibrary: findLibrary,
		
		/**
		* Searchs unscanned media files in directory and adds it to library
		*/
		scanDirectory: scanDirectory,
		
		/**
		* Creates node corresponding to the given path with a given title
		* @returns null, if media cannot be found
		*/
		createMediaNode: createMediaNode,

		/**
		* Determines whether given file is an image
		*/
		isImage: isImage
	};
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	log.error("in core media", e);
}

