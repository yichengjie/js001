/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-29
 * Time: 下午04:13:18
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var Backbone = require('backbone');
	var AppModel = require("../../model/server/app_model") ;
	
	var AppCollection = Backbone.Collection.extend({
		model:AppModel 
	}) ;
	
	return AppCollection ;
});
