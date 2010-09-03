// Name: Core Media
// Description: Provides media (books, images, music, notes) related services (indexing etc)
// Author: kartu
//
// History:
//	2010-07-07 kartu - Initial version
//	2010-07-09 kartu - Renamed file so that it is loaded before other modules

tmp = function() {
	// Creates file path => media mapping
	var pathToMedia = null;
	var indexMedia = function () {
		var cache = kbook.model.cache;
		if (pathToMedia === null) {
			pathToMedia = {};
			var records = kbook.model.cache.allMasters;
			
			var media, path;
			for (var i = 0, n = records.count(); i < n; i++) {
				try {
					media = records.getRecord(i);
					
					var source = null;
					if (media.hasOwnProperty("source")) {
						source = media.source;
					} else if (media.hasOwnProperty("sourceid")) {
						source = cache.getSourceByID(media.sourceid);
					}
					if (source !== null) {
						path = source.path + media.path;
						pathToMedia[path] = media;
					}
				} catch (e) {
					log.warn("Failed to process media file with index: " + i + " path " + path);
				}
			}
		}
	};
	
	var findMedia = function (path) {
		indexMedia();
		var media = pathToMedia[path];
		if (media) {
			return media;
		}
		return null;
	};
	
	var createMediaNode = function (path, parent) {
		var node, media = findMedia(path);
		var mediaTypes = Core.config.compat.media.types;
		var mediaTypesStr = Core.config.compat.media.kinds;
		var mediaNodePrototypes = Core.config.compat.media.prototypes;
		
		if (media !== null) {
			for (var i = 0, n = mediaTypes.length; i < n; i++) {
				if (xs.isInstanceOf(media, mediaTypes[i])) {
					node = xs.newInstanceOf(mediaNodePrototypes[i]);
					node.media = media;
					node.cache = kbook.model.cache;
					node.parent = parent;
					node.depth = parent.depth + 1;
					node.type = mediaTypesStr[i];
					return node;
				}
			}
		}
		
		return null;	
	};	
	
	Core.media = {
		/**
		* Finds media (book, image, audio, etc) with a given path
		* @returns null, if media cannot be found
		*/
		findMedia: findMedia,
		
		/**
		* Creates node corresponding to the given path with a given title
		* @returns null, if media cannot be found
		*/
		createMediaNode: createMediaNode
	};
};

try {
	tmp();
	tmp = undefined;
} catch (e) {
	log.error("in core media", e);
}

