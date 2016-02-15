/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-20
 * Time: 下午01:19:08
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var itemTmpStr = require("../../template/deploy/groupDeployAppMgrItem.tpl") ;
	var listTmpStr = require("../../template/deploy/groupDeployAppMgrList.tpl") ;
	var layoutTmpStr = require("../../template/deploy/groupDeployTabAppMgr.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	var RollBackLayout = require("./rollbackLayout") ;
	var GroupAppCollection = require("../../collection/deploy/groupApp_collection") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	
	var ListTipModel = require("../../model/listTip_model") ;//多条错误信息显示
	var ListTipView = require("../listTip_view") ;
	var ItemTipView = require("../itemTip_view") ;//单条错误信息显示
	
	var WaitingView = require("../waiting_view") ;
	
	
	
	//点击详细信息
	var GroupServerAppStatusLayout = require("./groupServerAppStautsLayout") ;
	var GroupAppCongfigLayout = require("./groupAppConfigLayout") ;
	
	var ItemView = Marionette.ItemView.extend({
		initialize:function(){
		   var groupId = $("#groupDeploy4GroupIdHidden").val() ;
		   this.model.set("groupId",groupId) ;
		   var authDeployFlag = authCheck.getDeployFlag() ;
		   var authUndeployFlag = authCheck.getUndeployFlag() ;
		   var authChageVersionFlag = authCheck.getChageVersionFlag() ;
		   var authRollbackFlag = authCheck.getRolebackFlag() ;
		   this.model.set("authDeployFlag",authDeployFlag) ;
		   this.model.set("authUndeployFlag",authUndeployFlag) ;
		   this.model.set("authChageVersionFlag",authChageVersionFlag) ;
		   this.model.set("authRollbackFlag",authRollbackFlag) ;
		   this.listenTo(this.model, 'change', this.render);
		},
		template:_.template(itemTmpStr) ,
		tagName: "tr",
		events:{
			"click button.change2Default":"change2DefaultVersion",
			"click button.change2NoDefault":"change2NoDefaultVersion",
			"click td.undeployAppTd a" : "undeployApp",
			"click td.showGroupCfgInfoTd a" : "showGroupCfgInfo",
			"click td.rollbackVersionTd a" : "rollbackVersion",
			"click td.groupAppDetailTd a" :"viewAppDetail4Group"//查看详情
		},
		viewAppDetail4Group:function(e){//查看详情
	    	e.preventDefault() ;
	    	var $a = $(e.target) ;
	    	var appId = this.model.get("appId") ;
	    	var groupId = this.model.get("groupId") ;
	    	var jsonParam = {"groupId":groupId,"appId":appId} ;
	    	var modelName = sidbarUtil.getModuleName() ;
	    	appRouter.navigate(modelName +"/group/appDeploy/param/" + QueryString.stringify(jsonParam)) ;
	    	var model = new Backbone.Model({"groupId":groupId,"appId":appId}) ;
	    	var statusLayout = new GroupServerAppStatusLayout({model:model,queryString:jsonParam}) ;
	    	jcfManager.contentRegion.show(statusLayout) ;
	    	statusLayout.trigger("showPageInfo") ;
	    },
		rollbackVersion:function(e){//回滚应用的版本
			e.preventDefault() ;
			var registryRunFlag = this.checkRegistryRun() ;
			if(registryRunFlag){
				//当前页面选中的部署状态
				var deployStatus4Search = $("#deployStatus4Search").val() ;
				var groupId = this.model.get("groupId") ;
				var groupName = this.model.get("groupName") ;
				var appId = this.model.get("appId") ;
				var appName = this.model.get("appName") ;
				var prevVersion = this.model.get("prevVersion") ;//prevVersion
				var appVersion = this.model.get("appVersion") ;
				var jsParam = {"groupId":groupId,"groupName":groupName,"appId":appId,"appName":appName,"prevVersion":prevVersion,"appVersion":appVersion} ;
				var modelName = sidbarUtil.getModuleName() ;
				var currentPage = $.trim($("#currentPage").val()) ;
				var pageSize = $.trim($("#pageSize").val()) ;
				var model = new Backbone.Model() ;
				model.set("groupId",groupId) ;
				model.set("status",deployStatus4Search) ;
				model.set("currentPage",currentPage) ;
				model.set("pageSize",pageSize) ;
				appRouter.navigate(modelName +"/group/appRollback/param/" + QueryString.stringify(jsParam)) ;
				var rollbackLayout = new RollBackLayout({model:model,queryString:jsParam}) ;
				jcfManager.contentRegion.show(rollbackLayout) ;
				rollbackLayout.trigger("showPageInfo") ;
			}
		},
		showGroupCfgInfo:function(e){//查看组配置文件
			e.preventDefault() ;
			var modelName = sidbarUtil.getModuleName() ;
			var status = $("#deployStatus4Search").val() ;
			var appName = this.model.get("appName") ;
			var appVersion = this.model.get("appVersion") ;
			var groupId = this.model.get("groupId") ;
			var serverId = this.model.get("serverId") ;
			var qString = {"groupId":groupId,"serverId":serverId,
						  "appName":appName,"appVersion":appVersion,"status":status} ;
			appRouter.navigate(modelName +"/group/appConfig/param/" + QueryString.stringify(qString)) ;
			var groupCfgLayout = new GroupAppCongfigLayout({queryString:qString}) ;
			jcfManager.contentRegion.show(groupCfgLayout) ;
			groupCfgLayout.trigger("showPageInfo") ;
		},
		undeployApp:function(e){//反部署时检查服务器是否正常运行
			e.preventDefault() ;
			var $a = $(e.target) ;
			var ttt = $("#freshPage4GroupAppTabFlag").val() ;
			window.clearInterval(ttt) ;
			
			var appId = this.model.get("appId") ;
		    var groupId = this.model.get("groupId") ;
		    var jsParam = {} ;
		    jsParam.appId = appId ;
		    jsParam.groupId = groupId ;
		    jsParam.mode = "group" ;
			var oldStatus = this.model.get("status") ;
		    var self = this ;
		    var modelName = sidbarUtil.getModuleName() ;
			this.model.set("status","8") ;
		    if (confirm("确定反部署应用?")) {
			    var flag = this.checkUndeployApp(jsParam) ;
			    if(flag){
					 var wv = new WaitingView() ;
					 jcfManager.tipInfoRegion.show(wv) ;
			    	 var serverURL = "/"+jcfManager.appName+"/deployMgr/mUndeployApp.action" ;
			    	 var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					 $.when(ajaxing).done(function(data){
						if(data.flag =="true"){//跳转到应用管理页面
							self.remove() ;
							jcfManager.tipInfoRegion.empty() ;
						}else{
							//self.model.set("status",oldStatus) ;
							self.model.set("status","4") ;
							var tm = new ListTipModel() ;
							tm.set("errList",data.errInfoList) ;
							var tv = new ListTipView({model:tm}) ;
							jcfManager.tipInfoRegion.show(tv) ;
						}
					}) ;
			    }
			}
		},
		change2DefaultVersion:function(){
			var toOperStr = "TRUE" ;
			this.changeDefaultVersion(toOperStr) ;
		},
		change2NoDefaultVersion:function(){
			var toOperStr = "FALSE" ;
		    this.changeDefaultVersion(toOperStr) ;
		},
		changeDefaultVersion:function(toOperStr){
			var self = this ;
			var msg = "确定将应用";
			if(toOperStr=="TRUE"){
				msg += "切换到默认版?";
			}else{
				msg += "切换到非默认版?";
			}
			var groupId = this.model.get("groupId") ;
			var appId = this.model.get("appId");
			var isDefaultVersion =this.model.get("isDefaultVersion") ;
			//非默认版 和状态不一致可以切换到默认版
			if(isDefaultVersion=="TRUE"){//当前为默认版
				if(toOperStr=="TRUE"){
					return ;
				}
			}else if (isDefaultVersion=="FALSE"){//当期非默认版
				if(toOperStr=="FALSE"){
					return ;
				}
			}else{//状态不一致//可切换为任意状态
				if(toOperStr=="TRUE"){//如果切换到默认版,则按当前为非默认版
					isDefaultVersion = "FALSE" ;
				}else{
					isDefaultVersion = "TRUE" ;
				}
			}
			var currentVersion = this.model.get("appVersion") ;
			var appName = this.model.get("appName") ;
			//检查注册库是否为启动状态,如果不启动状态则不可切换默认版本
			var registryRunFlag = this.checkRegistryRun() ;
			if(registryRunFlag){
				if (confirm(msg)) {
					var serverURL = "/"+jcfManager.appName+"/deployMgr/changeAppDefaultVersion.action" ;
					var jsParam = {} ;
					//地址栏获取
					jsParam.groupId = groupId ;
					//点击获取
					jsParam.appId = appId ;
					jsParam.appName = appName ;
					jsParam.isDefaultVersion = isDefaultVersion ;
					jsParam.currentVersion = currentVersion ;
					//定死参数
					//jsParam.mode = "group" ;
					jsParam.operation = "7" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					$.when(ajaxing).done(function(data){
						var flag = data.flag ;
						if(flag=="success"){
							//触发父函数执行
							self.model.set("isDefaultVersion",toOperStr) ;
							self.triggerMethod('parent:refreshPageDefaultVersion');
						}else{
							var tv = new ItemTipView() ;
							tv.model.set("flag","false") ;
							tv.model.set("msg","切换失败!") ;
							jcfManager.tipInfoRegion.show(tv) ;
						}
					});
				}
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
						var tv = new ItemTipView() ;
						tv.model.set("flag","false") ;
						tv.model.set("msg",data.errMsg) ;
						jcfManager.tipInfoRegion.show(tv) ;
					}
				}else{
					var tv = new ItemTipView() ;
					tv.model.set("flag","false") ;
					tv.model.set("msg",data.errMsg) ;
					jcfManager.tipInfoRegion.show(tv) ;
					//alert(data.errMsg)
				}
			}) ;
			return flag ;
		},
		checkUndeployApp:function(jsParam){
	    	var flag = false;
	    	var serverURL = "/"+jcfManager.appName+"/deployMgr/mApplication.action" ;
	    	jsParam.operation = "7" ;
	    	var ajaxing = util.dealSYNCHAjaxRequest4JSObj(serverURL,jsParam) ;
	    	$.when(ajaxing).done(function(data){
	    	   if(data.flag=="true"){
	    		  delete jsParam.operation ;
	    		  flag = true ;
	    	   }else{
			   		var tv = new ItemTipView() ;
					tv.model.set("flag","false") ;
					tv.model.set("msg",data.msg) ;
					jcfManager.tipInfoRegion.show(tv) ;
	    		  	//alert(data.msg) ;
	    	   }
	    	}) ;
	    	return flag; 
	    },
		render:function(){
		   this.$el.html(this.template(this.model.attributes));
		   return this;
		}
	});
	
	var ListView = Marionette.CompositeView.extend({
		  initialize:function(){
			 this.on("freshPage",this.freshPage) ;
		  },
		  tagName:"table",
		  className:"table table-bordered list",
		  template: _.template(listTmpStr) ,
		  childView: ItemView,
		  childViewContainer: "tbody",
		  freshPage:function(){
			  var self = this ;
			  var  cc = this.collection ;
			  var  refreshSpace = 2000 ;
			  var  refreshNum = util.getFefreshPageNum() ;//刷新次数
			  var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
			  var hash = window.location.hash ;
			  $("#freshPage4GroupAppTabUrl").val(hash) ;
			  var  ttt= setInterval(this.updatePageAppStatus,refreshSpace,self);
			  self.autoFreshPageTTT = ttt ;
			  $("#freshPage4GroupAppTabFlag").val(ttt) ;
			  setTimeout("window.clearInterval("+ttt+")",refreshTime);
		  },
		  updatePageAppStatus:function(self){
			  var groupId = $.trim($("#hiddenGroupId").val()) ;
			  var currentPage = $.trim($("#currentPage").val()) ;
			  var pageSize = $.trim($("#pageSize").val()) ;
			  var status = "0" ;
			  var autoFreshPageTTT = self.autoFreshPageTTT ;
			  var hash = window.location.hash ;
			  var hiddenHash = $("#freshPage4GroupAppTabUrl").val() ;
			  if(hash==hiddenHash){
				  self.collection.fetch({
					  data: { "groupId":groupId, "status":status,"currentPage":currentPage,"pageSize":pageSize},
				      success: function (collection, response) {
					      var size = collection.length ;
					      var count = 0 ;
					      collection.each(function(m){
					    		var ss = m.get("status") ;
					    		if(ss!="7"&&ss!="8"&&ss!="9"&&ss!="0"){
					    			count ++ ;
					    		}
					      }) ;
					      if(count==size){
					    	window.clearInterval(autoFreshPageTTT) ;
					      }
				      }, 
				      error: function (collection, response) {
				    	  window.clearInterval(autoFreshPageTTT) ;
				      } 
				  }) ;
			  }else{
				  window.clearInterval(autoFreshPageTTT)  ;
			  }
		  },
		  childEvents: {
			  'parent:refreshPageDefaultVersion': function (curChildView) {
			  	  var model = curChildView.model;
			  	  var appName = model.get("appName") ;
			  	  var appVersion = model.get("appVersion") ;
			  	  var isDefaultVersion = model.get("isDefaultVersion") ;
		  		  this.collection.each(function(m){
			  		   if(m.get("appName")==appName){
			  			  if(m.get("appVersion")!=appVersion){
			  				  if("TRUE"==isDefaultVersion){////如果当前model改为默认版本则其他都为非默认版本
			  					 if(m.get("isDefaultVersion")!="FALSE"){//并且当前显示为默认版
					  				m.set("isDefaultVersion","FALSE") ;
					  		     } 
			  				  }else {//切换为非默认,则所有版本都切换为非默认
			  					 m.set("isDefaultVersion","FALSE") ;
			  				  }
			  			  }
			  		   }
			  	  }) ;
			  },
			  'parent:fresh4UndeployApp':function(curChildView){
			  	   var self= this ;
				   var  refreshSpace = 2000 ;
				   var  refreshNum = util.getFefreshPageNum() ;//刷新次数
				   var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
				   var hash = window.location.hash ;
				   $("#freshPage4GroupAppTabUrl").val(hash) ;
				   var myparam = {} ;
				   self.curChildView = curChildView ;
				   var  ttt= setInterval(this.fresh4UndeployApp,refreshSpace,self);
				   self.autoFreshPageTTT = ttt ;
				   $("#freshPage4GroupAppTabFlag").val(ttt) ;
				   setTimeout("window.clearInterval("+ttt+")",refreshTime);
			   }
		  },
		  fresh4UndeployApp:function(self){//反部署的时候需要刷新页面
		  	  var curChildView = self.curChildView ;
			  var collection = self.collection ;
		  	  var mm = curChildView.model;
			  var autoFreshPageTTT = self.autoFreshPageTTT ;
			  var hash = window.location.hash ;
			  var hiddenHash = $("#freshPage4GroupAppTabUrl").val() ;
			  if (hash == hiddenHash) {
			  	  var appId = mm.get("appId") ;
				  var groupId = mm.get("groupId") ;
				  var serverUrl = "/"+jcfManager.appName+"/deployMgr/queryAppCount4Group.action" ;
				  var jsonParam = {"appId":appId,"groupId":groupId} ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverUrl,jsonParam) ;
				  $.when(ajaxing).done(function(data){
				  	  if(data.flag=="true"){
					  	 var recordCount = data.recordCount ;
						 if(recordCount==0){
						  	collection.remove(mm) ;
							window.clearInterval(autoFreshPageTTT)  ;
						 }
					  }else{
					  	  window.clearInterval(autoFreshPageTTT)  ;
					  }
				  }) ;
			  }else{
				  window.clearInterval(autoFreshPageTTT)  ;
			  }
			  
		  },
	});
	
	//部署管理
	//---群组管理
	//------应用管理	
	var AppMgrTabLayout = Marionette.LayoutView.extend({
		initialize:function(options){
			this.on("searchListInfo",this.searchListInfo) ;
			this.queryString = options.queryString ;
			jcfManager.tipInfoRegion = this.tipInfoRegion ;//
		},
		template: _.template(layoutTmpStr),
		events:{
			"change #deployStatus4Search" : "changeDeployStatus4Search",
			"click #groupAppMgrSearchBtn" : "groupAppMgrSearch"
		},
		regions: {
			tipInfoRegion:"#tipInfoRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
	    },
	    groupAppMgrSearch:function(){
	    	this.queryString.currentPage = "1" ;
	    	var modelName = sidbarUtil.getModuleName() ;
	    	appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(this.queryString)) ;
	    	this.trigger("searchListInfo") ;
	    },
	    changeDeployStatus4Search:function(){
	    	var status = this.$el.find("#deployStatus4Search").val() ;
			this.queryString.status = status ;
			appRouter.navigate("deployMgr/group/param/"+QueryString.stringify(this.queryString)) ;
	    },
	    searchListInfo:function(){
	    	var self = this ;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/mSearchGroupApp.action" ;
			var status  = this.$el.find("#deployStatus4Search").val() ;
			var jsonParam = {"groupId":this.queryString.groupId,"status":status,"currentPage":this.queryString.currentPage,"pageSize":this.queryString.pageSize} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				var model = new Backbone.Model(data.pageBean) ;
				//var collection = new Backbone.Collection(data.pageBean.recordList) ;
				var collection = new GroupAppCollection(data.pageBean.recordList) ;
				//显示列表区
				var listView = new ListView({collection:collection}) ;
				self.listRegion.show(listView) ;
				
				listView.trigger("freshPage") ;
				//显示分页栏区
				model.set("uriSection","group") ;
				var pb = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pb) ;
				//也要刷新页面
				var freshPage = self.queryString.freshPage ;
				if(freshPage=="true"){// 如果是从反部署页面过来的的则需要刷新页面
					listView.trigger("freshPage") ;
				}
			}) ;
	    }
	});
	
	return AppMgrTabLayout ;

});
