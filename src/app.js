define(function(require, exports, module) {
	var Backbone = require('backbone');
    var Marionette = require("marionette") ;
    var AppRouter =  require("./app_router") ;
    var SidebarUitl = require("./util/SidebarUtil") ;
    var IndexApi = require("./api/IndexApi") ;
    var $ = jQuery = require('jquery');
    var AppView = require("./view/app_view") ;
    var util = require("./util/CommonUtil") ;
    var QueryString = require('querystring');
    //将jcfManger绑定到windown对象上
    window.jcfManager = new Marionette.Application();
    
    jcfManager.addRegions({
	   menuRegion:"#menu",
       navbarRegion:"#indexNavbarRegion",
       sidebarRegion:"#sidebar",
       contentRegion: "#indexContantRegion",
       footRegion: "#indexFootRegsion",
       dialogRegion: "#dialogRegion"
      //dialogRegion: Marionette.Region.Dialog.extend({el: "#dialogRegion"})
    });
    
    jcfManager.getCurrentFragment = function(){
    	return Backbone.history.fragment ;
    };
    
    jcfManager.reqres.setHandler("login:user" , function(){
    	return IndexApi.getLoginUser();
    });
    
    jcfManager.reqres.setHandler("index:sidebarCollection" , function(selectedItem){
    	//var selectItem = SidebarUitl.getModuleName() ;
    	return IndexApi.getGroupCollection(selectedItem);
    });
    
    jcfManager.addInitializer(function(options){//查询权限
    	var serverURL = "/"+util.getAppName()+"/getSpecialAuthStrMap.action" ;
    	var ajaxing = util.dealSYNCHAjaxRequestWithoutParam(serverURL) ;
    	$.when(ajaxing).done(function(data){
    		var model = new Backbone.Model(data.authMap) ;
    		jcfManager.authModel = model ;
    		jcfManager.loginUserName = data.loginUserName ;
    		jcfManager.loginUserRole = data.loginUserRole ;
    		jcfManager.loginID = data.loginID ;
			jcfManager.defaultPageSize = data.defaultPageSize ;
    	}) ;
		//上面那部分代码一定要执行完成才能执行下面这部分代码，否者肯定要出错
		var authCheck = require("./view/AuthCheck4Menu") ;
    	var a1 = {key:"authMgr",value:"权限管理"};
    	var a2 = {key:"serverMgr",value:"服务器管理"} ;
    	var a3 = {key:"deployMgr",value:"部署管理"} ;
    	var a4 = {key:"serviceMgr",value:"服务管理"} ;
    	var a5 = {key:"dataSrcMgr",value:"数据源管理"} ;
    	var a6 = {key:"contextMgr",value:"上下文管理"} ;
    	var a7 = {key:"logMgr",value:"日志管理"} ;
    	var authServerFlag = authCheck.getServerFlag() ;
    	var authDeployFlag = authCheck.getDeployFlag() ;
    	var authServiceFlag = authCheck.getServiceFlag() ;
    	var authDatasourceFlag = authCheck.getDatasourceFlag() ;
    	var authMemacheFlag = authCheck.getMemcacheFlag() ;
    	var authLogFlag = authCheck.getLogFlag() ;
    	var logRoleName = jcfManager.loginUserRole ;
		var menus = [] ;
    	if(logRoleName=='系统管理员'){
    		menus.push(a1) ;
    	}
    	if(authServerFlag=="true"){
    		menus.push(a2) ;
    	}
    	if(authDeployFlag=="true"){
    		menus.push(a3) ;
    	}
    	if(authServiceFlag=="true"){
    		menus.push(a4) ;
    	}
    	if(authDatasourceFlag=="true"){
    		menus.push(a5) ;
    	}
    	if(authMemacheFlag=="true"){
    		menus.push(a6) ;
    	}
    	if(authLogFlag=="true"){
    		menus.push(a7) ;
    	}
		jcfManager.menus = menus ;
    });
    
    jcfManager.addInitializer(function(options){
		var MenuView = require("./view/menu_view") ;
    	this.appName = util.getAppName();
    	var selectedItem = SidebarUitl.getModuleName();
		IndexApi.showNavbar();
		//显示一级菜单栏
		var model = new Backbone.Model() ;
		model.set("current","") ; 
		model.set("menus",jcfManager.menus) ;
		var menuView = new MenuView({model:model}) ;
		jcfManager.menuRegion.show(menuView) ;
		jcfManagement.view.menu= menuView ;
    });
    
    
    
    jcfManager.addInitializer(function(options){
		window.appView = new AppView() ;
    	window.appRouter = new AppRouter();
    	Backbone.history.start();
		var str = "sysIndex" ;
		if(jcfManager.menus.length>0){
			str = jcfManager.menus[0].key ;
		}
		if(Backbone.history.fragment === "" ){
			Backbone.history.navigate(str ,{trigger:true});
		}
    });
    
    
    jcfManager.start() ;
}) ;