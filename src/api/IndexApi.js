/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-16
 * Time: 下午03:02:10
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	
	var NavbarModel = require("../model/navbar_model") ;
	var GroupCollection = require("../collection/group_collection") ;
	var IndexController = require("../controller/IndexController") ;
	
	var IndexApi = {
		getLoginUser:function(){
			var defer = $.Deferred();
			var navbarModel = new NavbarModel() ;
			navbarModel.fetch({
			   success: function(data){
				  defer.resolve(data);
			   }
			});
			return defer.promise() ;
		},
		getGroupCollection : function(selectedItem){
			var defer = $. Deferred();
			var groupCollection = new GroupCollection() ;
			groupCollection.fetch({reset:true,data:{selectItem:selectedItem},
			   success: function(data){
				  defer.resolve(data);
			   }
			});
			return defer.promise() ;
		},
		showNavbar : function(){
			IndexController.showNavbar() ;
		},
		showSidebar : function(selectedItem){
			IndexController.showSidebar(selectedItem) ;
		},
		showMainContent : function(){
			IndexController.showMainContent() ;
		},
		showFootView : function(){
			IndexController.showFootView() ;
		}
	};
	return IndexApi ;

});
