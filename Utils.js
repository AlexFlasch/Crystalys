function useStrict() {'use strict';}

var Utils = function() {
	function addExport(obj, propName, val) {
		useStrict();

		Object.defineProperty(obj, propName, {
			enumerable: true,
			configurable: false,
			assignable: false,
			value: val
		});
	}
};

module.exports = Utils;
