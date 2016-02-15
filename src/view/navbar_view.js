/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-3
 * Time: 上午10:27:06
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var navbarViewTemplate = require('../template/navbar.tpl');
	var Marionette = require("marionette");
	var NavbarModel = require("../model/navbar_model") ;
	var util = require("../util/CommonUtil") ;
	var viewTemplateStr = require('../template/navbar.tpl');
	var SidebarController = require("../controller/SidebarController") ;
	var AlertView = require("./alert_view") ;
	
    var NavbarView = Backbone.View.extend({
        template: _.template(navbarViewTemplate),
        initialize: function () {
        	
        },
        events: {
	        "click ul.selectItem li" : "selectNavItem",
	        "click #mylogout" : "logout" ,
	        "click #indexLogoImg" : "clickIndexLogoImg",
	        "click #backup" : "backup",
	    },
	    clickIndexLogoImg:function(e){
	    	e.preventDefault() ;
	    	e.stopPropagation() ;
	    	appRouter.navigate("sysIndex",{trigger:true}) ;
	    },
        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        logout:function(){
        	var appName = util.getAppName() ;
        	$.get("/"+appName+"/logout.action")
        	 .done(function(){window.location.href = "/"+appName+"/login.html" ;});
        },
        backup:function(){
        	var serverURL = "/"+jcfManager.appName+"/server/backupServer.action" ;
        	var jsParam = {} ;
        	jsParam.operStatus = "1" ;
        	var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
        	$.when(ajaxing).done(function(data){
				if(data.flag == 'succeed'){
					var av = new AlertView({msg:"备份成功"}) ;
					jcfManager.dialogRegion.show(av) ;
//					alert('备份成功') ;
				}else{
					var av = new AlertView({msg:"备份失败"}) ;
					jcfManager.dialogRegion.show(av) ;
//					alert('备份失败') ;
				}	
			 }) ;
        	
        }
        
    });

    return NavbarView;
});
