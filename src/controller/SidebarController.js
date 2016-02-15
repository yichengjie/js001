 /**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-18
 * Time: 下午02:42:22
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var GroupCollection = require("../collection/group_collection") ;
	var SidebarView = require("../view/sidebar_view") ;
	
	var SidebarController = {
		showSidebar:function(selectedItem){
			console.log("show side bar");
				var fetchingGroupCollection = jcfManager.request("index:sidebarCollection",selectedItem);
		    	$.when(fetchingGroupCollection)
			    	.done(function(nmodel){
			    		jcfManager.sidebarRegion.show(new SidebarView({collection:nmodel})) ;
			    	});
		}
	} ;
	
	return SidebarController ;

});
