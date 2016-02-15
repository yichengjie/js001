/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-31
 * Time: 上午09:33:48
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var GroupAppModel = require("../../model/deploy/groupApp_model") ;
	
	var GroupAppCollection = Backbone.Collection.extend({
		model:GroupAppModel,
		url:"/"+jcfManager.appName+"/deployMgr/mSearchGroupApp.action",
		parse : function(response){
			return _.extend(response.pageBean.recordList);
        }
	});
	
	return GroupAppCollection;
});
