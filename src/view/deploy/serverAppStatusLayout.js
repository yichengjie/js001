/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-20
 * Time: 下午07:13:28
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var baseInfoTmpStr = require("../../template/deploy/serverBaseInfo.tpl") ;
	var itemTmpStr = require("../../template/deploy/serverAppStatusItem.tpl") ;
	var listTmpStr = require("../../template/deploy/serverAppStatusList.tpl") ;
	var viewTemplateStr = require('../../template/deploy/serverAppStatusLayout.tpl');
	var QueryString = require('querystring');
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var ServerAppCongfigLayout  =require("./serverAppConfigLayout") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	var ItemTipView = require("../itemTip_view") ;
	
	
	
	//服务器基本信息视图
	var BaseInfoItemView = Marionette.ItemView.extend({
		template:_.template(baseInfoTmpStr) ,
		tagName:"div",
		className:"row"
	});
	
	
	var ItemView = Marionette.ItemView.extend({
		initialize:function(){
			var serverId = $("#hiddenServerId4BaseInfo").val() ;
			var groupId  = $("#hiddenGroupId4BaseInfo").val() ;
			
			var authDeployFlag = authCheck.getDeploy4ServerFlag() ;
			var authUndeployFlag = authCheck.getUndeploy4ServerFlag() ;
			this.model.set("authDeployFlag",authDeployFlag) ;
			this.model.set("authUndeployFlag",authUndeployFlag) ;
			
			this.model.set("serverId",serverId) ;
			this.model.set("groupId",groupId) ;
			this.listenTo(this.model, "change", this.render);
		},
		template:_.template(itemTmpStr) ,
		tagName: "tr" ,
		events :{
			"click td.serverAppStautsTd a" :"getAppConfigFile",
			"click td.appStatusTd a" : "deployOrUndeploy"
		},
		getAppConfigFile:function(e){//点击查看
			e.stopPropagation() ;
			e.preventDefault() ;
			jcfManagement.tipInfoRegion.empty() ;
			var serverName = this.model.get("serverName") ;
			var appName = this.model.get("appName") ;
			var appVersion = this.model.get("currentVersion") ;
			var serverId = this.model.get("serverId") ;
			var jsParam = {} ;
			jsParam.serverId = serverId ;
			jsParam.serverName = serverName ;
			jsParam.appName = appName ;
			jsParam.appVersion = appVersion ;
			var modelName = sidbarUtil.getModuleName() ;
			//var jString = {"serverId":serverId,"serverName":serverName,"appName":appName,"appVersion":appVersion} ;
			appRouter.navigate(modelName +"/server/appConfig/param/" + QueryString.stringify(jsParam)) ;
			var layout = new ServerAppCongfigLayout({queryString:jsParam}) ;
			jcfManager.contentRegion.show(layout) ;//
			layout.trigger("showPageInfo") ;
			
		},
		deployOrUndeploy:function(e){
			e.preventDefault() ;
			var $a = $(e.target) ;
			var href = $a.attr("href") ;
			jcfManagement.tipInfoRegion.empty() ;
			var jsParam = {} ;
			jsParam.serverId = this.model.get("serverId") ;
			jsParam.groupId = this.model.get("groupId") ;
			jsParam.appId = this.model.get("appId") ;
			if("deploy"==href){//部署函数
				jsParam.operation = "6" ;
				this.deployApp(jsParam) ;
			}else if ("undeploy"==href){//反部署函数
				jsParam.operation = "7" ;
				jsParam.mode = "single" ;//部署的时候不需要这个参数
				this.undeployApp(jsParam) ;
			}
		},
		deployApp:function(jsParam){
		   var flag = this.check4DeployOrUndeployApp(jsParam) ;
		   var curStatus = this.model.get("status") ;
		   var self = this  ;
		   if(flag){//调用部署函数
			  delete jsParam.operation ;
			  this.model.set("status","7") ;//正在部署
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/mDeployApp.action" ;
		      var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			  $.when(ajaxing).done(function(data){
				 if(data.flag =="true"){//跳转到应用管理页面
					 //self.trigger("parent:freshPageInfo") ;
					 //self.model.set("status","1") ;
				 	 var  refreshSpace = 2000 ;
					 var refreshNum = util.getFefreshPageNum() ;//刷新次数
					 var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
					 //保存当前url
					 var curHash = window.location.hash ;
					 $("#freshPage4SeverAppStatusUrl").val(curHash) ;
				  	 var ttt= setInterval(self.updatePageAllAppStatus,refreshSpace,self);
					 self.TTTFlag = ttt ;
					 setTimeout("window.clearInterval("+ttt+")",refreshTime);
				 }else{
				     var iv = new ItemTipView({msg:'部署失败!'}) ;
					 iv.model.set("flag","false") ;
					 jcfManagement.tipInfoRegion.show(iv) ;
			         //alert("部署失败!") ;
			         self.model.set("status",curStatus) ;//返回到之前的状态
			     }
			  }) ;
		   }
		},
		undeployApp:function(jsParam){
		   if(confirm("确认反部署?")){
			   var flag = this.check4DeployOrUndeployApp(jsParam) ;
			   var serverId = jsParam.serverId ;
			   var param = {"serverId" : serverId} ;
			   var self = this ;
			   var curStatus = this.model.get("status") ;
			   if(flag){//调用反部署函数
				 delete jsParam.operation ;
				 this.model.set("status","8") ;//正在反部署
				 //groupId,groupName,appId,serverId,mode	
				 var serverURL = "/"+jcfManager.appName+"/deployMgr/mUndeployApp.action" ;
		    	 var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
				 $.when(ajaxing).done(function(data){
					//self.trigger("parent:freshPageInfo") ;
					if(data.flag =="true"){//跳转到应用管理页面
						//self.remove() ;
					  	 var  refreshSpace = 2000 ;
						 var refreshNum = util.getFefreshPageNum() ;//刷新次数
						 var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
						 //保存当前url
						 var curHash = window.location.hash ;
						 $("#freshPage4SeverAppStatusUrl").val(curHash) ;
					  	 var ttt= setInterval(self.updatePageAllAppStatus,refreshSpace,self);
						 self.TTTFlag = ttt ;
						 setTimeout("window.clearInterval("+ttt+")",refreshTime);
					}else{
					   var iv = new ItemTipView({msg:'反部署失败!'}) ;
					    iv.model.set("flag","false") ;
					   jcfManagement.tipInfoRegion.show(iv) ;
					   //alert("反部署失败!") ;
					   self.model.set("status","4") ;//返回到之前的状态
					}
				 }) ;
			   }
		   }	
		},
		check4DeployOrUndeployApp:function(jsParam){
			var serverURL = "/"+jcfManager.appName+"/deployMgr/mApplication.action" ;
			var flag = false;
			var ajaxing = util.dealSYNCHAjaxRequest4JSObj(serverURL,jsParam) ;
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					flag = true;
				}else{
					flag = false;
					alert(data.msg) ;
				}
			});
			return flag;
		},
		updatePageAllAppStatus : function(self){
			var curHash = window.location.hash ;
			var appId = self.model.get("appId") ;
			var serverId = self.model.get("serverId") ;
			var ttt = self.TTTFlag ;
			var oldUrl = $("#freshPage4SeverAppStatusUrl").val() ;
			if(curHash==oldUrl){
				 var serverURL = "/"+jcfManager.appName+"/deployMgr/updatePageDeployStatus.action" ;
				 var jsonParam = {"appId":appId,"serverId":serverId} ;
			     var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				 var isClose = false ;
				 $.when(ajaxing).done(function(data){
					 var eStr = "data['"+serverId+"'] ;";
					 var cc = eval(eStr) ;
					 if(cc!="7"&&cc!="8"&&cc!="9"){
						 if(cc==undefined||cc==null||cc.length==0){//那就说明完成
							 self.model.set("status","3") ;//已反部署，则查询不到数据
						 }else{
							 self.model.set("status",cc) ;
						 }
						 window.clearInterval(ttt)
					 }else{
						 self.model.set("status",cc) ;//状态修改
					 }
				 }) ;
			}else{
			    window.clearInterval(ttt)  
			}
		 }
	});
	//应用部署列表视图
	var ListView = Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  template: _.template(listTmpStr) ,
		  childView: ItemView,
		  childViewContainer: "tbody",
		  childEvents: {
			 'parent:freshPageInfo': function (view) {
			  	  var appId = view.model.get("appId") ; ;
			  	  var serverId = view.model.get("serverId") ;
			  	  var  refreshSpace = 2000 ;
				  var refreshNum = util.getFefreshPageNum() ;//刷新次数
				  var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
				  //保存当前url
				  var curHash = window.location.hash ;
				  $("#freshPage4SeverAppStatusUrl").val(curHash) ;
			  	  var ttt= setInterval(this.updatePageAllAppStatus,refreshSpace,this);
				  this.TTTFlag = ttt ;
				  this.appId = appId ;
				  this.serverId = serverId ;
				  setTimeout("window.clearInterval("+ttt+")",refreshTime);
			  }
		  }
		  
	});
	
	//部署管理
	//---单个服务器点击视图
	var ServerAppStatusLayout =  Marionette.LayoutView.extend({
		initialize:function(options){
			this.queryString = options.queryString ;
			this.on("queryAndShowPageInfo",this.queryAndShowPageInfo) ;
		},
		template:_.template(viewTemplateStr),
		regions: {
			tipInfoRegion: "#tipInfoRegion",
			baseInfoRegion: "#baseInfoRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		},
		events :{
		},
		queryAndShowPageInfo:function(){
			//保存到顶级作用域中，方便其他地方使用
			jcfManagement.tipInfoRegion = this.tipInfoRegion ;
			
			var serverURL = "/"+jcfManager.appName+"/deployMgr/viewServerAppStatus.action" ;
			var currentPage = this.queryString.currentPage ;
			if(currentPage==undefined||currentPage==null||currentPage==""){
				this.queryString.currentPage = "1" ;
				this.queryString.pageSize = jcfManager.defaultPageSize ;
			}
			var serverId = this.queryString.serverId ;
			var currentPage = this.queryString.currentPage ;
			var pageSize = this.queryString.pageSize  ;
			var jsonParam = {"serverId":serverId,"currentPage":currentPage,"pageSize":pageSize} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			var self = this ;
			$.when(ajaxing).done(function(data){
				//显示基本信息
				var baseModel = new Backbone.Model(data.baseInfo) ;
				self.baseInfoRegion.show(new BaseInfoItemView({model:baseModel})) ;
				//显示列表信息
				var collection = new Backbone.Collection(data.pageBean.recordList) ;
				self.listRegion.show(new ListView({collection:collection})) ;
				//显示分页栏
				var pageModel = new Backbone.Model(data.pageBean) ;
				pageModel.set("uriSection","server") ;
				self.pagebarRegion.show(new PagebarView({model:pageModel,queryString:self.queryString})) ;
			}) ;
		}
		
	}) ;
	
	return ServerAppStatusLayout ;

});
