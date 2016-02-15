(function(root, factory) {
	define(function(require, exports, module) {
		var $ = jQuery = require('jquery');
		factory(root, exports, _,$);
	});
}(this, function(root, Backbone,$) {
	
	
	
	
})) ;



define(["jquery"], // Require jquery
	       function($){
	//把你原来的插件代码放这里吧，这样就行了
	//注意文件命名哦
	});


define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	
	
});





(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	
	
	
})) ;



define(function(){return function($){
	
	
}}) ;


define(function(){return function($){

	!function ($) {

	}($);

}});

























