/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-11-29
 * Time: 下午03:37:11
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../util/CommonUtil") ;
	var appName = util.getAppName() ;
	var GroupModel = require("../model/group_model") ;
	var GroupCollection = Backbone.Collection.extend({
		model:GroupModel ,
		url:'/'+appName+'/loadAllNode.action',
		initialize:function(){
			//this.fetch() ;
		},
		parse:function(response){
			return response ;
		}
	}) ;
	
	return GroupCollection ;

});
