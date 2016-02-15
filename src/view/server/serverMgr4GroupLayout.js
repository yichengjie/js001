/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-29
 * Time: 下午05:59:29
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var GroupServerConfig = require("./groupServerConfig") ;
	var GroupServerConfig_registry = require("./groupServerConfig_registry") ;
	var GroupServerConfig_cache = require("./groupServerConfig_cache") ;

	var viewTemplateStr = require('../../template/server/serverMgr4GroupLayout.tpl');
	var searchTeplateStr = require("../../template/server/groupServerSearch.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	var PagebarModel = require("../../model/pagebar_model") ;
	var PagebarView = require("../pagebar_view2") ;
	var authUtil = require("./AuthCheck4ServerUtil") ;
	var ItemTipView = require("../listTip_view") ;
	var AlertView = require("../alert_view") ;
	var  ConfirmView = require("../confirm_view") ;
	
	
	
	var ListView = null ;//显示的不同视图
	var groupCategoryStr = "" ;
	//查询form视图   ----第一部分
	var GroupServerSearchView = Marionette.ItemView.extend({
		  initialize:function(){
			  var batchOperFlag = authUtil.getBatchOperFlag() ;
			  var queryOperFlag = authUtil.getQueryOperFlag() ;
			  var delOperFlag = authUtil.getDelGroupFlag() ;
			  this.model.set("batchOperFlag",batchOperFlag) ;
			  this.model.set("queryOperFlag",queryOperFlag) ;
			  this.model.set("delOperFlag",delOperFlag) ;
		  },
		  template: _.template(searchTeplateStr),
		  events:{
			 "click #deleteGroupBtn":"deleteGroup",
			 "click #batchStartBtn" : "batchStart",
			 "click #batchStopBtn" : "batchStop",
			 "click #batchForceStopBtn" : "batchForceStop"
		  },
		  deleteGroup:function(){
			  var cv = new ConfirmView() ;
			  cv.model.set("msg","确认删除分组?") ;
			  jcfManager.dialogRegion.show(cv) ;	
			  cv.confirm(function(cflag){
			  	  if(cflag){
				  	  var groupId = $("#hiddenGroupId").val() ;
					  var serverURL = "/"+jcfManager.appName+"/server/deleteServerGroupByGroupId.action" ;
					  var jsonParam = {"groupId":groupId} ;
					  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
					  $.when(ajaxing).done(function(data){
						 var alertView = new AlertView() ;
						 alertView.model.set("msg",data.message) ;
						 jcfManager.dialogRegion.show(alertView) ;
					  	 if(data.flag=="true"){
							appRouter.navigate("serverMgr",{trigger:true}) ;
						 }
					  }) ; 
				  }
			  }) ;
		  },
		  batchStart:function(){
			 var operStatus = "1" ;
			 var showProcess = "3" ;
		  	 jcfManager.tipInfoRegion.empty() ;
			 //找到有效的操作集合(当前为停止状态的可以启动)
			 var $checkedInput = $("td.groupServerIdsTd input:checkbox:checked") ;
			 var length = $checkedInput.length ;
			 var namesArr = new Array();
			 var collection = this.model.get("listCollection") ;
			 $checkedInput.each(function(){
				 var curName = $(this).val() ;
				 var serverStatus = $(this).attr("serverStatus") ;
				 if(serverStatus=="2"){//停止状态的服务器
					  namesArr.push(curName) ;
					  collection.each(function(c){
						 if(c.get("serverName")==curName){
						    c.set("processStatus",showProcess) ;
						 }
					  }) ;
				  }
			 }) ;
			 if(namesArr.length>0){
				 this.batchStartStopServer(operStatus ,showProcess ,namesArr) ;
			 }else{
			 	 var tv = new ItemTipView() ;
				 tv.model.set("flag","false") ;
				 tv.model.set("msg","请选择有效的服务器!") ;
				 jcfManager.tipInfoRegion.show(tv) ;
				 //alert("请选择有效的服务器!") ;
			 }
		  },
		  batchStop:function(){
		  	 jcfManager.tipInfoRegion.empty() ;
			 var operStatus = "2" ;
			 var showProcess = "4" ;
			 var $checkedInput = $("td.groupServerIdsTd input:checkbox:checked") ;
			 var length = $checkedInput.length ;
			 var namesArr = new Array();
			 var collection = this.model.get("listCollection") ;
			 $checkedInput.each(function(){
				 var curName = $(this).val() ;
				 var serverStatus = $(this).attr("serverStatus") ;
				  if(serverStatus=="1"){
					  namesArr.push(curName) ;
					  collection.each(function(c){
						if(c.get("serverName")==curName){
						   c.set("processStatus",showProcess) ;
						}
					  }) ;
				  }
			 }) ;
			 if(namesArr.length>0){
				 this.batchStartStopServer(operStatus ,showProcess ,namesArr) ;
			 }else{
			 	 var tv = new ItemTipView() ;
				 tv.model.set("flag","false") ;
				 tv.model.set("msg","请选择有效的服务器!") ;
				 jcfManager.tipInfoRegion.show(tv) ;
				 //alert("请选择有效的服务器!") ;
			 }
		  },
		  batchForceStop:function(){
		  	 jcfManager.tipInfoRegion.empty() ;
			 var operStatus = "3" ;
			 var showProcess = "44" ;//强制停止中
			 var $checkedInput = $("td.groupServerIdsTd input:checkbox:checked") ;
			 var length = $checkedInput.length ;
			 var namesArr = new Array();
			 var collection = this.model.get("listCollection") ;
			 $checkedInput.each(function(){
				 var curName = $(this).val() ;
				 var serverStatus = $(this).attr("serverStatus") ;
				  if(serverStatus!="2"&&serverStatus!="3"){
					  namesArr.push(curName) ;
					  collection.each(function(c){
						if(c.get("serverName")==curName){
						   c.set("processStatus",showProcess) ;
						}
					  }) ;
				  }
			 }) ;
			 if(namesArr.length>0){
				 this.batchStartStopServer(operStatus ,showProcess ,namesArr) ;
			 }else{
			 	 var tv = new ItemTipView() ;
				 tv.model.set("flag","false") ;
				 tv.model.set("msg","请选择有效的服务器!") ;
				 jcfManager.tipInfoRegion.show(tv) ;
				 //alert("请选择有效的服务器!") ;
			 }
		  },
		  batchStartStopServer:function(operStatus,showProcess ,serverNames){
			 // var collection = this.model.get("listCollection") ;
			  $("#groupCheckAll").prop("checked", false);
			  var serverURL = "/"+jcfManager.appName+"/server/batchStartStopServer.action" ;
			  var objParam = {} ;
			  objParam.operStatus = operStatus ;
			  objParam.serverNames = serverNames ;
			  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,objParam) ;
			  //取消其他的自动刷新函数
			  var autoFreshFlag = $("#freshPage4GroupServerFlag").val() ;
			  if(autoFreshFlag!=undefined&&autoFreshFlag.length>0){
				  window.clearInterval(autoFreshFlag)  ;
			  }
			  var self = this ;
			  $.when(ajaxing).done(function(data){
				  $("td.groupServerIdsTd input:checkbox").prop("checked",false)  ;
				  self.listView.trigger("autoFreshPageInfo") ;
			  }) ;
		  },
		  onShow:function(){
			  var pp = this.model.get("processStatus") ;
			  this.$el.find("#processStatus").find("option").each(function(){
				  var curStr = $(this).val() ;
				  if(curStr==pp){
					  $(this).attr("selected","selected") ;
					  return false;
				  }
			  }) ;
		  }
	});
	
	
	//显示组服务器信息列表----第二部分
	var rowViewTeplateStr = require("../../template/server/groupServerItem.tpl") ;
	var tableViewTeplateStr = require("../../template/server/groupServerList.tpl") ;
	var GroupServerItemView = Marionette.ItemView.extend({
		  initialize:function(){
			  //jcf服务器相关操作
			  var jcfStartFlag = authUtil.getJcfStartFlag() ;
			  var jcfStopFlag = authUtil.getJcfStopFlag() ;
			  var jcfForceStopFlag = authUtil.getJcfForceStopFlag() ;
			  var jcfConfigFlag = authUtil.getJcfConfigFlag() ;
			  var jcfUnloadFlag = authUtil.getJcfUnloadFlag() ;
			  var jcfUpdateFlag = authUtil.getJcfUpdateFlag() ;
			  var jcfMemViewFlag = authUtil.getJcfMemViewFlag() ;
			  this.model.set("jcfStartFlag",jcfStartFlag) ;
			  this.model.set("jcfStopFlag",jcfStopFlag) ;
			  this.model.set("jcfForceStopFlag",jcfForceStopFlag) ;
			  this.model.set("jcfConfigFlag",jcfConfigFlag) ;
			  this.model.set("jcfUnloadFlag",jcfUnloadFlag) ;
			  this.model.set("jcfUpdateFlag",jcfUpdateFlag) ;
			  this.model.set("jcfMemViewFlag",jcfMemViewFlag) ;
			  //上下文服务器相关操作
			  var contextStarFlag = authUtil.getContextStartFlag() ;
			  var contextStopFlag = authUtil.getContextStopFlag() ;
			  var contextForceStopFlag = authUtil.getContextForceStopFlag() ;
			  var contextUnloadFlag  = authUtil.getContextUnloadFlag() ;
			  this.model.set("contextStarFlag",contextStarFlag) ;
			  this.model.set("contextStopFlag",contextStopFlag) ;
			  this.model.set("contextForceStopFlag",contextForceStopFlag) ;
			  this.model.set("contextUnloadFlag",contextUnloadFlag) ;
			  //注册库相关操作
			  var registryStartFlag = authUtil.getRegistryStartFlag() ;
			  var registryStopFlag =  authUtil.getRegistryStopFlag() ;
			  var registryForceStopFlag = authUtil.getRegistryForceStopFlag() ;
			  var registryConfigFlag = authUtil.getRegistryConfigFlag() ;
			  var registryUnloadFlag = authUtil.getRegistryUnloadFlag() ;
			  var registryMenViewFlag = authUtil.getRegistryMemViewFlag() ;
			  var registrySwitchFlag = authUtil.getRegistrySwitchFlag() ;//切换注册库
			  this.model.set("registryStartFlag",registryStartFlag) ;
			  this.model.set("registryStopFlag",registryStopFlag) ;
			  this.model.set("registryForceStopFlag",registryForceStopFlag) ;
			  this.model.set("registryConfigFlag",registryConfigFlag) ;
			  this.model.set("registryUnloadFlag",registryUnloadFlag) ;
			  this.model.set("registryMenViewFlag",registryMenViewFlag) ;
			  this.model.set("registrySwitchFlag",registrySwitchFlag) ;
			  this.model.on("change",this.render) ;
		  },
		  template: _.template(rowViewTeplateStr),
		  tagName: "tr",
		  events: {
		 	"click" : "highlightName",
		 	"click td.groupServerIdsTd :checkbox" : "checkedServerItem",
		 	"click td.operTd a":"operServer",
		 	"click td.configTd a" : "configServer",
		 	"click td.deleteTd a" : "deleteServer",
		 	"click td.memoryDetailTd a" : "showMemoryDetail",
		 	"click td.changeRegistryServerTd a" : "changeRegistryServer"
		  },
		  checkedServerItem : function(e){//选择复选框时
			  e.stopPropagation() ;
			  var len1 = $("td.groupServerIdsTd input:checkbox").length ;
			  var len2 = $("td.groupServerIdsTd input:checkbox:checked").length ;
			  var $all = $("#groupCheckAll") ;
			  if(len1==len2){
				  $all.prop("checked",true) ;
			  }else{
				  $all.prop("checked",false) ;
			  }
		  },
		  highlightName: function(e){
			  e.preventDefault();
			  this.$el.toggleClass("warning");
		  },
		  checkRegistryCanSwitch:function(){//切换注册库
		  	  jcfManager.tipInfoRegion.empty() ;
			  var flag = false; 
			  var serverURL = "/"+ jcfManager.appName +"/server/checkAllRegServerIsExist.action" ;//checkRegServerIsExist
			  var ajaxing = util.dealSYNCHAjaxRequestWithoutParam(serverURL) ;
			  $.when(ajaxing).done(function(data){
				  if(data.count=="2"){
					  flag = true ;
				  }else{
				  	  var tv = new ItemTipView() ;
					  tv.model.set("flag","false") ;
					  tv.model.set("msg","不存在可切换的注册库服务器!") ;
					  jcfManager.tipInfoRegion.show(tv) ;
					 //alert("不存在可切换的注册库服务器!") ;
				  }
			  }) ;
			  return flag ;
		  },
		  changeRegistryServer:function(e){//切换注册库
			  e.preventDefault();
			  e.stopPropagation() ;
			  var flag = this.checkRegistryCanSwitch() ;//1.检查注册库是否可切换
			  var self = this ;			 
			  if(flag){ //2.切换注册库
				  var serverIp = this.model.get("serverIp") ;
				  var groupId = this.model.get("groupId") ;
				  var serverURL = "/"+jcfManager.appName+"/server/switchRegistryServer.action" ;
				  var jsonParam = {"serverIp":serverIp,"groupId":groupId} ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				  $.when(ajaxing).done(function(data){
					  if(data.flag=="true"){
						  alert("切换成功") ;
					  	  var timstamp = (new Date).valueOf();  
						  var url = "serverMgr/group/param/groupId="+groupId+"&timstamp="+timstamp ;
						  appRouter.navigate(url,{trigger:true}) ;
					  }else{
					  	  var tv = new ItemTipView() ;
					  	  tv.model.set("flag","false") ;
					      tv.model.set("msg","不存在可切换的注册库服务器!") ;
					  	  jcfManager.tipInfoRegion.show(tv) ;
						  //alert("切换失败!") ;
					  }
				  }) ;
			  }
		  },
		  showMemoryDetail:function(e){//内存查看
			  e.preventDefault();
			  e.stopPropagation();
			  var ServerSysMemoryStatisticsLayout = require("./serverSysMemoryStatisticsLayout") ;
			  var modelName = sidbarUtil.getModuleName() ;
			  var serverId = this.model.get("serverId") ;
			  var groupId = this.model.get("groupId") ;
			  var queryString = {"serverId":serverId,"groupId":groupId} ;
			  appRouter.navigate(modelName+"/server/memoryInfo/param/" + QueryString.stringify(queryString)) ;
			  var layout = new ServerSysMemoryStatisticsLayout({queryString:queryString}) ;
			  jcfManager.contentRegion.show(layout) ;
			  layout.trigger("showPageInfo") ;
			 
		  },
		  configServer:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  var modelName = sidbarUtil.getModuleName() ;
			  var serverId = $(e.target).attr("href") ;
			  var selectNavItem = "paramCfg" ;
			  var jSring = {"serverId":serverId,"selectedPageUI":selectNavItem} ;
			  appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jSring),{trigger:true}) ;
		  },
		  deleteServer:function(e){//删除服务器
			  e.preventDefault();
			  e.stopPropagation() ;
			  if(confirm("确认删除?")){
				 var $curA = $(e.target) ;
				 var serverId = this.model.get("serverId") ;
				 var serverName = this.model.get("serverName") ;
				 var jsonParam = {"serverId":serverId,"serverName":serverName} ;
				 var serverURL = "/"+jcfManager.appName+"/server/deleteServer.action" ;
				 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				 var self = this ;
				 $.when(ajaxing)
				  .done(function(data){
					 if(data.flag=="success"){
					   jcfManagement.view.server_sidebar.refresh(); 
					   //self.remove() ;
					   self.trigger("parent:removeModel") ;
				     }else{
					 	var tv = new ItemTipView() ;
						tv.model.set("flag","false") ;
						tv.model.set("msg","删除服务器失败!") ;
						jcfManager.tipInfoRegion.show(tv) ;
					    //alert("删除服务器失败!")  ;
				     }
				  }) ;
			  }
		  },
		  operServer:function(e){
			  e.preventDefault();
			  e.stopPropagation() ;
			  $("#groupCheckAll").prop("checked",false) ;
			  var $a = $(e.target) ;
			  var href = $a.attr("href") ;
			  var autoFreshFlag = $("#freshPage4GroupServerFlag").val() ;
			  if(autoFreshFlag!=undefined&&autoFreshFlag.length>0){
				  window.clearInterval(autoFreshFlag)  ;
			  }
			  //var serverName = this.$el.find("td[name='serverName']").text() ;
			  var serverName = this.model.get("serverName") ;
			  if("start"==href){
				  this.startServer(serverName) ;
			  }else if("stop"==href){
				  this.stopServer(serverName) ;
			  }else if ("forceStop"==href){
				  this.forceStopServer(serverName) ;
			  }
		  },
		  startServer:function(serverName){//启动服务器
			  var jsonData = {"serverName":serverName,"operStatus":1} ;
			  var ajaxing = this.operServerStatus(jsonData) ;
			  var self = this  ;
			  self.model.set("processStatus","3") ;//启动中
			  $.when(ajaxing)
			   .done(function(result){
				  //自动刷新页面
				  self.trigger("autoFresh:pageInfo") ;
			   }) ;
		  },
		  stopServer:function(serverName){//停止服务器
			  var jsonData = {"serverName":serverName,"operStatus":2} ;
			  var ajaxing = this.operServerStatus(jsonData) ;
			  var self = this  ;
			  self.model.set("processStatus","4") ;//停止中...
			  $.when(ajaxing)
			   .done(function(result){
				   //自动刷新页面
				   self.trigger("autoFresh:pageInfo") ;
			   }) ;
		  },
		  forceStopServer:function(serverName){//强制停止服务器//如果点击强制停止，则不可重复强制停止
			  var jsonData = {"serverName":serverName,"operStatus":3} ;
			  var ajaxing = this.operServerStatus(jsonData) ;
			  var self = this  ;
			  self.model.set({"processStatus":"44"}) ;//强制停止中...//如果点击强制停止，则不可重复强制停止
			  $.when(ajaxing)
			   .done(function(result){
				   //自动刷新页面
				   self.trigger("autoFresh:pageInfo") ;
			   }) ;
		  },
		  operServerStatus:function(jsonData){//启动、停止、强制停止服务器
			  var serverURL = "/"+jcfManager.appName+"/server/updateSingleServerStatus.action" ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonData) ;
			  return ajaxing ;
		  }
	});
	
	
	var GroupServerListView = Marionette.CompositeView.extend({//jcf服务器组
		 initialize:function(){
			this.on("autoFreshPageInfo",this.autoFreshPageInfo) ;
			this.on("freshPage4SwitchRegistryServer",this.freshPage4SwitchRegistryServer) ;
		 },
		 events:{
			 "click #groupCheckAll" : "groupCheckAll"
		 },
		 template: _.template(tableViewTeplateStr),
		 childView: GroupServerItemView,
		 childViewContainer: "tbody",
		 groupCheckAll:function(e){
			 var checkFlag = e.target.checked ;
			 $("td.groupServerIdsTd input:checkbox").prop("checked",checkFlag) ;
		 },
		 childEvents: {
		    'parent:removeModel': function (itemView) {
				var m = itemView.model ;
				this.collection.remove(m) ;
			},
			'autoFresh:pageInfo': function () {
				this.trigger("autoFreshPageInfo") ;
			}
		 },
		 autoFreshPageInfo:function(){
			var cc = this.collection ;
			var  refreshSpace = 2000 ;
		    var  refreshNum = util.getFefreshPageNum() ;//刷新次数
		    var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
		    //保存当前url
		    var curHash = window.location.hash ;
		    $("#freshPage4GroupServerUrl").val(curHash) ;
		    var self = this ;
		    //定时刷新页面服务的状态
		    if(cc.length>0){
		       //进入页面就先刷一把
		       setTimeout(self._directUpdate(self),300);
		       //第二步：定时刷新
			   var ttt= setInterval(self.updatePageServerStatus,refreshSpace,self);
			   self.autoFreshPageTTT = ttt ;
			   $("#freshPage4GroupServerFlag").val(ttt) ;
			   setTimeout("window.clearInterval("+ttt+")",refreshTime);
			}
		 },
		 freshPage4SwitchRegistryServer:function(){
			//var cc = this.collection ; 
		 },
		 updatePageServerStatus:function(self){//自动刷新
			var ttt = self.autoFreshPageTTT ;
			var curHash = window.location.hash ;
			var oldUrl  = $("#freshPage4GroupServerUrl").val() ;
			//var autoFreshFlag = $("#freshPage4GroupServerFlag").val() ;
			if(oldUrl==curHash){//刷新页面
			   self.directUpdate(self) ;
			}else{//结束自动刷新
				window.clearInterval(ttt)  ;
			}
		  },
		  _directUpdate:function(self){
			  return function (){
				  self.directUpdate(self) ;
			  }
		  },
		  directUpdate:function(self){//刷新页面
			 var collection = self.collection ;
			 var serverURL = "/"+jcfManager.appName+"/server/updatePageServerStatus.action" ;
			   var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
			   $.when(ajaxing).done(function(data){
				  var model = new Backbone.Model(data) ;
				  collection.each(function(m){
					  var serverName =  m.get("serverName") ;
					  var cStatus = model.get(""+serverName+"") ;
					  if(cStatus!=undefined){
						 m.set("processStatus",cStatus) ;
					  }
				  }) ;
			   }) ;
		  }
	});
	
	
	//组信息显示布局----第三部分
	var ServerMgr4GroupLayout = Marionette.LayoutView.extend({
		  template:_.template(viewTemplateStr),
		  initialize:function(options){
		     this.queryString = options.queryString ;
		     var jcfGroupCfgFlag = authUtil.getJcfGroupConfigFlag() ;
		     var registryGroupCfgFlag = authUtil.getRegisgryGroupConfigFlag() ;
		     this.model.set("jcfGroupCfgFlag",jcfGroupCfgFlag)
		     this.model.set("registryGroupCfgFlag",registryGroupCfgFlag)
			 groupCategoryStr = this.model.get("groupCategory") ;
			 ListView = GroupServerListView ;
			 this.on("showPageInfo",this.showPageInfo) ;//显示查询列表视图
			 jcfManager.tipInfoRegion = this.tipInfoRegion ;
		  },
		  events:{
			"click #searchGroupServer" : "searchGroupServer2",
			"click #serverMgrNav li a" : "serverMgr4GroupNav"
		  },
		  ui: {
			  hiddenGroupId: '#hiddenGroupId'
		  },
		  regions: {
		  	tipInfoRegion:"#tipInfoRegion",
			searchRegion:"#searchRegion",
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		  },
		  showPageInfo:function(){
			  var itemStr = this.queryString.selectedPageUI ;
			  if(itemStr==undefined||itemStr.length==0){
				  itemStr = "serverGroupList" ;
			  }
			  this.showPageInfo2(itemStr) ;
		  },
		  showPageInfo2:function(itemStr){
			  var self = this ;
			  var groupId = this.queryString.groupId ;
			  if("serverGroupConfig"==itemStr){//1:组服务器配置
				  //显示组服务配置的信息
				  var serverURL = "/"+jcfManager.appName+"/server/getGroupServerConfig.action" ;
				  var jsonParam = {"groupId":groupId} ;
				  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				  $.when(ajaxing).done(function(data){
					  var model = new Backbone.Model(data) ;
					  self.searchRegion.empty() ;
					  self.listRegion.empty() ;
					  self.pagebarRegion.empty() ;
					  if("7"==groupCategoryStr){
						  //alert("jcfCache组配置!") ;
						  self.searchRegion.show(new GroupServerConfig_cache({model:model})) ;
					  }else if("4"==groupCategoryStr){//注册服务库
						  self.searchRegion.show(new GroupServerConfig_registry({model:model})) ;
					  }else if ("1"==groupCategoryStr||"6"==groupCategoryStr){//6是适配组
						  self.searchRegion.show(new GroupServerConfig({model:model})) ;
					  } 
				  }) ;
			  }else if("serverGroupList"==itemStr){//2.服务器控制
				  //显示列表信息
				  var processStatus = this.queryString.processStatus==undefined ?"0":this.queryString.processStatus;
				  var searchModel = new Backbone.Model() ;
				  searchModel.set("processStatus",processStatus) ;
				  //显示查询条件部分视图
				  var searchItemView = new GroupServerSearchView({model:searchModel}) ;
				  this.searchItemView = searchItemView ;
				  this.searchRegion.show(searchItemView) ;
				  this.searchGroupServer() ;
			  }
		  },
		  serverMgr4GroupNav:function(e){
			  e.stopPropagation() ;
			  e.preventDefault() ;
			  var $curA = $(e.target) ;
			  var $curLi = $curA.parent() ;
			  $curLi.siblings().removeClass("active") ;
			  var autoFreshFlag = $("#freshPage4GroupServerFlag").val() ;
			  if(autoFreshFlag!=undefined&&autoFreshFlag.length>0){
				  window.clearInterval(autoFreshFlag)  ;
			  }
			  var modelName = sidbarUtil.getModuleName() ;
			  if(!$curLi.hasClass("active")){
				  $curLi.addClass("active") ;
				  var itemStr = $curA.attr("href") ;
				  var groupId = this.queryString.groupId ;
				  //地址栏导航到组服务器配置页面
				  var jString = {"selectedPageUI":""+itemStr,"groupId":groupId} ;
				  appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(jString)) ;
				  //显示信息
				  this.showPageInfo2(itemStr) ;
			  }
		  },
		  searchGroupServer:function(){//直接从route导航过来的
			  var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			  if(autoFreshFlag!=undefined&&autoFreshFlag.length>0){
				  window.clearInterval(autoFreshFlag)  ;
			  }
			  var goupId  = this.queryString.groupId ;
			  var jsParam = {} ;
			  jsParam.groupId = goupId ;
			  jsParam.processStatus = this.queryString.processStatus ;
			  jsParam.currentPage = this.queryString.currentPage ;
			  jsParam.pageSize = this.queryString.pageSize ;
	    	  var serverURL = '/'+jcfManager.appName+'/server/searchGroupPageServer.action' ;
	    	  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,JSON.parse(JSON.stringify(jsParam))) ;
	    	  //this.downContentRegion.empty()
	    	  var self = this ; 
	    	  $.when(ajaxing).done(function(data){
	    		  var groupCategory = data.groupCategory ;
	    		  var pageBean = data.pageBean ;
	    		  
	    		  var model = new Backbone.Model({"groupCategory":groupCategory}) ;
	    		  //显示查询列表
	    		  var cc = new Backbone.Collection(pageBean.recordList) ;
	    		  var searchView = self.searchItemView ;
	    		  //这一行一定要放在下面一行的上面，否则出错
	    		  var listView = new ListView({model:model,collection:cc}) ; 
	    		  if(searchView!=undefined){
	    			  searchView.model.set("listCollection",cc) ;
	    			//将listView传递给searchView
		    		  searchView.listView = listView ;
	    		  }
	    		  self.listRegion.show(listView) ;
	    		  //显示分页栏
	    		  var pm = new PagebarModel(pageBean) ;
				  cc.on("remove",function(m){
				  	  var n = (pm.get("recordCount")*1-1) ;
					  pm.set("recordCount",n+"") ;
				  }) ;
	    		  pm.set("uriSection","group") ;
	    		  var pbview = new PagebarView({model:pm,queryString:self.queryString}) ;
	    		  self.pagebarRegion.show(pbview) ;
	    		  //页面自动刷新
	    		  //定时刷新页面服务的状态
	    		  listView.trigger("autoFreshPageInfo") ;
	    	  }) ;
		  },
		  searchGroupServer2:function(){//点击查询按钮显示的视图
			  var modelName = sidbarUtil.getModuleName() ;
			  var id = $("#hiddenGroupId").val() ;
			  var processStatus = this.$el.find("#processStatus").val() ;
			  var pageSize = $("#pageSize").val() ;
			  if(processStatus==undefined){
				  processStatus = "" ;
			  }
			  if(pageSize ==undefined){
				  pageSize = jcfManager.defaultPageSize ;
			  }
			  var jString = {"groupId":id,"processStatus":processStatus,"currentPage":"1","pageSize":pageSize,"selectedPageUI":"serverGroupList"} ;
			  
			  appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(jString),{trigger:true}) ;
		  }
		  
	});
	
	return ServerMgr4GroupLayout ;

});
