// Name: Hook2
// Description: improved hook functions
// Author: kartu
//
// History:
//	2010-03-17 kartu - Initial version

Core.hook2 = {
	_hooks: [],
	_doCall: function (type, obj, args, hookHandle, result) {
		if (hookHandle[type] !== undefined) {
			var funcs = hookHandle[type];
			var tags = hookHandle[type + "Tags"];
			for (var i = 0, n = funcs.length; i < n; i++) {
				try {
					funcs[i].call(obj, args, hookHandle, tags[i], result);
				} catch (e) {
					log.warn("error when calling hooked (" + type + ") function: "  + e);
				}
			}				
		}
	}, 
	_doHook: function (where, what, hookHandle) {
		hookHandle.where = where;
		hookHandle.what = what;
		hookHandle.func = where[what];
		hookHandle.hookFunc = function() {
			// Call before
			Core.hook2._doCall("before", this, arguments, hookHandle);
			
			var result;
			// Call instead
			if (hookHandle.instead !== undefined && hookHandle.instead.length > 0) {
				var idx = hookHandle.instead.length - 1;
				var tag = hookHandle.insteadTags[idx];
				// Warning: .call returns "this" object, if called function (unless it explicitly returns undefined)
				// Warning: if argument list is null, parents arguments are used
				result = hookHandle.instead[idx].call(this, arguments, hookHandle, tag, undefined, idx - 1);
			} else {
				// Call hooked function
				// Warning: .call returns "this" object, if called function (unless it explicitly returns undefined)
				// Warning: if argument list is null, parents arguments are used
				result = hookHandle.func.apply(this, arguments);
			}
			
			// Call after
			Core.hook2._doCall("after", this, arguments, hookHandle, result);
			
			return result;
		};
		where[what] = hookHandle.hookFunc; 
	},
	_getHookHandle: function (where, what, createIfMissing) {
		var h, f = where[what];
		for (var i = 0, n = this._hooks.length; i < n; i++) {
			h = this._hooks[i];
			// TODO is hookFunc === f needed?
			if (h.where === where && h.what === what && h.hookFunc === f) {
				return h;
			}
		}
		if (createIfMissing) {
			h = {};
			this._doHook(where, what, h);
			this._hooks.push(h);
			return h;
		} else {
			return null;
		}
	},
	_ensureArray: function (obj, prop) {
		if (obj[prop] === undefined) {
			obj[prop] = [];
			obj[prop + "Tags"] = [];
		}
	},
	_hook: function (type, where, what, func, tag) {
		var hd = this._getHookHandle(where, what, true);
		this._ensureArray(hd, type);
		hd[type].push(func);
		hd[type + "Tags"].push(tag);
		return hd;
	},
	_unhook: function (type, where, what, func, tag) {
		var hh = this._getHookHandle(where, what, false);
		if (hh === null) {
			return;
		}
		var funcs = hh[type];
		var tags = hh[type + "Tags"];
		for (var i = 0, n = funcs.length; i < n; i++) {
			if (funcs[i] === func && tags[i] === tag) {
				// TODO test
				funcs.splice(i, 1);
				tags.splice(i, 1);
				break;
			}
		}
	},
	isHooked: function (where, what) {
		return this._getHookHandle(where, what, false) !== null;
	},
	hookBefore: function (where, what, newFunction, tag) {
		return this._hook("before", where, what, newFunction, tag);
	},
	hookAfter: function (where, what, newFunction, tag) {
		return this._hook("after", where, what, newFunction, tag);
	},
	hook: function (where, what, newFunction, tag) {
		return this._hook("instead", where, what, newFunction, tag);
	},
	unhookBefore: function (where, what, newFunction, tag) {
		return this._unhook("before", where, what, newFunction, tag);
	},
	unhookAfter: function (where, what, newFunction, tag) {
		return this._unhook("after", where, what, newFunction, tag);
	},
	unhook: function (where, what, newFunction, tag) {
		return this._unhook("instead", where, what, newFunction, tag);
	}
};
