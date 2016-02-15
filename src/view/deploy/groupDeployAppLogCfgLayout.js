/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-27
 * Time: 上午10:57:43
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	
	var layouTmpStr = require("../../template/deploy/groupDeployAppLogCfgLayout.tpl");
	var itemTmpStr = require('../../template/deploy/groupDeployAppLogCfgItem.tpl');
	var listTmpStr = require('../../template/deploy/groupDeployAppLogCfgList.tpl');
	
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	
	//列表每一项视图
	var ItemView = Marionette.ItemView.extend({
		 tagName:"tr",
		 template: _.template(itemTmpStr)
	});
	//列表视图
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
	    template: _.template(listTmpStr),
		childView: ItemView,
		childViewContainer: "tbody"
	});
	
	var GroupDeployAppLogCfgLayout = Marionette.LayoutView.extend({
		  initialize:function(option){
			 this.queryString = option.queryString ;
			 this.on("showPageInfo",this.showPageInfo) ;
		  },
		  template:_.template(layouTmpStr),
		  regions: {
			 "listRegion": "#listRegion",
			 "pagebarRegion": "#pagebarRegion"
		  },
		  events:{
			  "click #deploySubmitBtn" : "deploySubmit"
		  },
		  deploySubmit:function(){//直接部署
			var groupId = this.queryString.groupId ;
			//获取选择的配置
			var jsParam = {} ;
			jsParam.appId = this.queryString.appId ;
			jsParam.groupId = groupId ;
			jsParam.serverId  = this.queryString.serverIds ;
			jsParam.operation = "6" ;
			var modelName = sidbarUtil.getModuleName() ;
			var flag = this.checkRegistryRun() ;
			//检查注册库是否正常运行，如果没有正常运行不容许部署应用
			if(flag){
				flag = this.checkDeployApp(jsParam) ;
			}
			if(flag){//configFile
				var serverURL = "/"+jcfManager.appName+"/deployMgr/mDeployApp.action" ;
				delete jsParam.operation ;
				//选中的日志文件
				var configFile = $("input:radio[name='configFile']:checked").val() ;
				if(configFile!=undefined){
					jsParam.configFile = configFile ;
				}else{
					jsParam.configFile = "" ;
				}
				var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
				$.when(ajaxing).done(function(data){
					if(data.flag =="true"){//跳转到应用管理页面
						var param = {"deployFlag":"true","groupId":groupId,"appId":jsParam.appId,"serverId":jsParam.serverId} ;
						appRouter.navigate(modelName +"/group/appDeploy/param/" + QueryString.stringify(param),{trigger:true}) ;
					}else{
						alert("部署失败!") ;
					}
				}) ;
			}
		  },
		  checkRegistryRun:function(){//检查注册库服务器是否正常运行
		      var flag = false;
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/checkRegistryStatus.action" ;
			  var ajaxing = util.dealSYNCHAjaxRequestWithoutParam(serverURL) ;
			  $.when(ajaxing).done(function(data){
				  if(data.flag == "true"){
					  if(data.status=="1"){
						 flag = true ;
					  }else{
						 alert(data.errMsg) ;
					  }
				   }else{
					  alert(data.errMsg)
				   }
			  }) ;
			  return flag ;
		  },
		  checkDeployApp:function(jsParam){
			var serverURL = "/"+jcfManager.appName+"/deployMgr/mApplication.action" ;
			var ajaxing = util.dealSYNCHAjaxRequest4JSObj(serverURL,jsParam) ;
			var flag = false;
			$.when(ajaxing).done(function(data){
				if(data.flag =="true"){
					flag = true;
				}else{
				    flag = false;
				    alert(data.msg) ;
				}
			}) ;
			return flag;
		  },
		  showPageInfo:function(){
			  var self = this ;
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/findAppLogCfg.action" ;
			  var groupId = this.queryString.groupId; 
			  var currentPage = this.queryString.currentPage; 
			  var pageSize = this.queryString.pageSize ;
			  var jsonParam = {"groupId":groupId,"currentPage":currentPage,"pageSize":pageSize} ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			  $.when(ajaxing).done(function(data){
				  //显示列表区域
				  var collection = new Backbone.Collection(data.pageBean.recordList) ;
				  var listView = new ListView({collection:collection}) ;
				  self.listRegion.show(listView) ;
				  //显示分页栏
				  var pbModel = new Backbone.Model(data.pageBean) ;
				  pbModel.set("uriSection","group/appLogCfg") ;
				  var pbView = new PagebarView({model:pbModel,queryString:self.queryString}) ;
				  self.pagebarRegion.show(pbView) ;
			  }) ;
		  }
		
	}) ;
	
	return GroupDeployAppLogCfgLayout ;
	

});
