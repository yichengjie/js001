
/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-18
 * Time: 上午10:15:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Marionette = require("marionette");
	var SidebarUitl = require("../util/SidebarUtil") ;
	var NavbarView = require("../view/navbar_view") ;
	//var MenuView = require("../view/menu_view");
	var FootView = require("../view/foot_view") ;
	var SidebarView = require("../view/sidebar_view") ;
	var TipIndexView = require("../view/tipIndex_view") ;
	var GroupCollection = require("../collection/group_collection") ;
	var SidebarController = require("./SidebarController") ;
	var AlertView = require("../view/alert_view") ;
	
	var IndexController = {
			showNavbar : function(){//显示顶部导航栏
				var fetchingLoginUser = jcfManager.request("login:user");
		    	$.when(fetchingLoginUser).done(function(nmodel){
					if(nmodel.get("flag")=="false"||nmodel.get("jcfmanageType")=='error'){
						
						var av = new AlertView({msg:"管理中心主备配置文件存在异常，请及时修改！"}) ;
						jcfManager.dialogRegion.show(av) ;
						//alert('管理中心主备配置文件存在异常，请及时修改！') ;
					}
					var nv = new NavbarView({model:{loginInfo:nmodel.toJSON()}}) ;
					jcfManager.navbarRegion.show(nv);
			    });
			},
			showSidebar : function(selectedItem) {//显示左面sidebar视图
				SidebarController.showSidebar(selectedItem) ;
			},
			showMainContent : function(){//显示index主页面内容
				//暂时先仅显示简单提示页面
				var tipIndexView = new TipIndexView() ;
		    	jcfManager.contentRegion.show(tipIndexView) ;
			},
			showFootView : function(){//显示页脚部分信息
		    	jcfManager.footRegion.show(new FootView());
			},			
	} ;
	
	return IndexController ;
});