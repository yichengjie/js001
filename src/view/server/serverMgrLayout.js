/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-19
 * Time: 下午01:33:04
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/serverMgrLayout.tpl');
	var util = require("../../util/CommonUtil") ;
	var ServerAddView = require("./serverAdd_view") ;
	var NodeControllerCfgView = require("./nodeControllerCfg_view") ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var authUtil = require("./AuthCheck4ServerUtil") ;
	
	var rowViewTeplateStr = require("../../template/server/serverItem.tpl") ;
	var tableViewTeplateStr = require("../../template/server/serverList.tpl") ;
	var ServerItemView = Marionette.ItemView.extend({
		  initialize:function(){
			 this.model.on("change",this.render) ;
		  },
		  template: _.template(rowViewTeplateStr),
		  tagName: "tr",
		  events: {
		 	"click" : "highlightName",
		 	"click td.singleServerInfoTd a":"showSingleServerInfo",
		 	"click td.groupServerInfoTd a":"showGroupServerInfo"
		  },
		  showSingleServerInfo:function(e){
			  e.preventDefault() ;
			  e.stopPropagation() ;
			  var serverId = $.trim($(e.target).attr("href")) ;
			  var jString = {"serverId":serverId} ;
			  var modelName = sidbarUtil.getModuleName() ;
			  appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
		  },
		  showGroupServerInfo:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  var groupId = $.trim($(e.target).attr("href")) ;
			  var modelName = sidbarUtil.getModuleName() ;
			  var jString = {"groupId":groupId} ;
			  appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(jString),{trigger:true}) ;
		  },
		  highlightName: function(e){
			  e.preventDefault();
			  this.$el.toggleClass("warning");
		  },
		  render:function(){
			  this.$el.html(this.template(this.model.attributes));
			  return this;
		  }
	});

	var ServerListView = Marionette.CompositeView.extend({
		 tagName:"table",
		 className:"table table-bordered" ,
		 template: _.template(tableViewTeplateStr),
		 childView: ServerItemView,
		 childViewContainer: "tbody"
	});
	
	var ServerMgrLayout = Marionette.LayoutView.extend({
		  initialize:function(option){
		     this.queryString = option.queryString ;
		     //节点控制器配置
			 var nodeControllerFlag = authUtil.getNodeControllerCfgFlag() ;
			 this.model.set("nodeControllerFlag",nodeControllerFlag) ;
			 //服务器添加
			 var serverAddFlag = authUtil.getServerAddFlag() ;
			 this.model.set("serverAddFlag",serverAddFlag) ;
			 //域参数配置权限
			 var domainParamCfgAuthFlag = authUtil.getDomainParamCfgFlag() ;
			 this.model.set("domainParamCfgAuthFlag",domainParamCfgAuthFlag) ;
			 
			 this.on("showPageInfo",this.showPageInfo) ;
		  },
		  tagName:"div",
		  template: _.template(viewTemplateStr),
		  regions: {
			  listRegion: "#listRegion",
			  pagebarRegion: "#pagebarRegion"
		  },
		  events: {
			 "click #serverMgrNav li a" : "clickNavItem"
		  },
		  showPageInfo:function(){
			  var selectedPageUI = this.queryString.selectedPageUI ;
			  this.showPageInfo2(selectedPageUI) ;
		  },
		  showPageInfo2:function(selectedPageUI){
			  if("serverListUI"==selectedPageUI){//服务器列表页面
				 this.showServerListUI() ;
			  }else if ("serverAddUI"==selectedPageUI){//服务器添加页面
			     this.showServerAddUI() ;
			  }else if ("nodeControllerUI"==selectedPageUI){//节点控制器配置页面
				 this.showNodeControllerCfgUI() ;
			  }else if("domainParamCfgUI"==selectedPageUI){
				 this.showDomainParamCfgUI() ;
			  }
		  },
		  clickNavItem : function(e){
			  e.stopPropagation() ;
			  e.preventDefault() ;
			  var modelName = sidbarUtil.getModuleName() ;
			  var valStr = $(e.target).attr("href") ;
			  var $curLi = $(e.target).parent() ;
			  var $ul = $curLi.parent() ;
			  if(!$curLi.hasClass("active")){
				  $ul.find("li").removeClass("active") ;
				  $curLi.addClass("active") ;
				  this.queryString.selectedPageUI = valStr ;
				  appRouter.navigate(modelName +"/param/" + QueryString.stringify(this.queryString)) ;
				  //下面是切换不同的视图
				  this.showPageInfo2(valStr) ;
			  }
		  },
		  showServerListUI:function(){
			  var serverURL = '/'+util.getAppName()+'/server/searchPageServer.action' ;
		      var collection = new Backbone.Collection() ;
		      var model = new Backbone.Model() ;
		      var self = this ;
		      if(self.queryString.currentPage == undefined){
		    	  self.queryString.currentPage =1 ;
		    	  self.queryString.pageSize =jcfManager.defaultPageSize ;
		      }
		      var jsonParam = {"currentPage":self.queryString.currentPage,"pageSize":self.queryString.pageSize} ;//currentPage:"1",pageSize:"10"
		      var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam)
		      var refreshSpace = 2000 ;//刷新时间间隔
		      var freshNum = 30 ;//刷新次数 //这里没有用默认的20次，因为这里有可能在添加服务器的时候需要刷新的时间较长一点才能正确显示
		      var refreshTime = refreshSpace*freshNum ;//共刷新多长时间
		      var hash = window.location.hash ;
		      $("#freshPage4IndexServerUrl").val(hash) ;
		      $.when(ajaxing).done(function(data){
		    	  model.set(data) ;
		    	  collection.set(data.recordList) ;
		    	  var listView = new ServerListView({collection:collection}) ; 
	    		  self.listRegion.show(listView) ;
		    	  var pbview = new PagebarView({model:model,queryString:self.queryString}) ;
	    		  self.pagebarRegion.show(pbview) ;
	    		  if(collection.length>0){
	    			//执行定时更新状态函数
				      var ttt= setInterval(self.updatePageServerStatus,refreshSpace,collection);
				      $("#freshPage4IndexServerFlag").val(ttt) ;
					  setTimeout("window.clearInterval("+ttt+")",refreshTime);
	    		  }
		      }) ;
		  },
		  updatePageServerStatus:function(collection){//定时更新页面上的服务器状态字段
			  var hash = window.location.hash ;
			  var hiddenHash = $("#freshPage4IndexServerUrl").val() ;
			  var autoFreshFlag = $("#freshPage4IndexServerFlag").val() ;
			  
			  if(hash==hiddenHash){
				  var serverURL = "/"+jcfManager.appName+"/server/searchGroupServersStatus.action" ;
				  var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
				  $.when(ajaxing).done(function(data){
					  var model = new Backbone.Model(data) ;
					  collection.each(function(m){
						 var cName =  m.get("serverName") ;
						 var cStatus = model.get(""+cName+"") ;
						 if(cStatus!=undefined){
							 m.set("processStatus",""+cStatus+"") ;
						 }
					  }) ;
				  }) ;
			  }else{
				  window.clearInterval(autoFreshFlag)
			  }
		  },
		  showServerAddUI:function(){
			 var serverURL = "/"+jcfManager.appName+"/server/toAddServerUI.action" ;
			 var self = this ;
			 $.when(util.dealAjaxRequestWithoutParam(serverURL) )
			  .done(function(data){
				 var infosModel = new Backbone.Model(data);
				 self.listRegion.show(new ServerAddView({model:infosModel})) ;
				 self.pagebarRegion.empty() ;
			  });
		  },
		  showNodeControllerCfgUI:function(){
			 var serverURL = "/"+jcfManager.appName+"/server/toNodeControllerConfigUI.action" ;
			 var self = this ;
			 $.when(util.dealAjaxRequestWithoutParam(serverURL))
			  .done(function(data){
			  	 if(data.flag=="true"){
				 	 var curModel = new Backbone.Model(data) ;
				 	self.listRegion.show(new NodeControllerCfgView({model:curModel})) ;
				 	self.pagebarRegion.empty() ;
				 }else{
				 	alert("跳转到节点控制器配置页面出错") ;
				 }
			  })
			  .fail(function(){
				 alert("跳转到节点控制器配置页面出错") ;
			  });
	        },
		showDomainParamCfgUI:function(){
			  var DomainParamCfgView = require("./domainParamCfg_view") ; 
			  var self = this ;
			  var serverURL  = "/"+jcfManager.appName+"/server/readDomainParamCfgInfo.action" ;
			  var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
			  $.when(ajaxing).done(function(data){
				  if(data.flag=="true"){
					  var model = new Backbone.Model(data.param) ;
					  self.listRegion.show(new DomainParamCfgView({model:model})) ;
					  self.pagebarRegion.empty() ;
				  }else{
					  alert("获取域参数信息粗错") ;
				  }
			  }) ;
			 
		  }
	});
	
	return ServerMgrLayout ;
});
