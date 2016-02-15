/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-23
 * Time: 下午03:04:21
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	//layout视图
	var layoutTmpStr = require('../../template/deploy/groupServerAppStautsLayout.tpl');
	//基本信息视图
	var baseInfoTmpStr = require('../../template/deploy/groupServerAppBaseInfo.tpl') ;
	//列表项视图
	var itemTmpStr = require("../../template/deploy/groupServerAppStatusItem.tpl") ;
	var listTmpStr = require("../../template/deploy/groupServerAppStatusList.tpl") ;
	var ListTipView = require("../listTip_view") ;
	var ListTipModel = require("../../model/listTip_model") ;
	
	//整个列表视图
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	
	var authCheck = require("./AuthCheck4DeployUtil") ;
	
	//基本信息部分视图
	var BaseInfoView = Marionette.ItemView.extend({
		  template: _.template(baseInfoTmpStr),
		  tagName:"table",
		  className:"table list"
	});
	
	//列表每一项视图
	var ItemsView = Marionette.ItemView.extend({
		  initialize:function(){
			 var groupId = $("#groupIdHiddenOnPage").val() ;
			 this.model.set("groupId",groupId) ;
			 var deployAuthFlag = authCheck.getDeployFlag() ;
			 var undeployAuthFlag = authCheck.getUndeployFlag() ;
			 this.model.set("deployAuthFlag",deployAuthFlag) ;
			 this.model.set("undeployAuthFlag",undeployAuthFlag) ;
			 this.model.view = this ;
			 this.listenTo(this.model, "change", this.render);
		  },
		  template: _.template(itemTmpStr),
		  tagName:"tr",
		  events:{
			"click td.deployOrNotTd a" : "deployOrNotOper",
			"click .serverIds" : "singleChecked"
		  },
		  singleChecked:function(e){//点击单checkbox
			  var len1 = $("input:checkbox[name='serverIds']").length ;
			  var len2 = $("input:checkbox[name='serverIds']:checked").length ;
			  if(len1==len2){
				  $("#selectAll").prop("checked",true) ; 
			  }else{
				  $("#selectAll").prop("checked",false) ; 
			  }
		  },
		  deployOrNotOper:function(e){//部署列操作
			  e.preventDefault() ;
			  jcfManager.tipInfoRegion.empty() ;
			  var href = $(e.target).attr("href") ;
			  var appId = this.model.get("appId")+"" ;
			  var serverId = this.model.get("serverId")+"" ;
			  var groupId = this.model.get("groupId")+"" ;
			  var jsParam = {} ;
			  jsParam.appId = appId ;
			  jsParam.serverId= serverId ;
			  jsParam.groupId = groupId ;
			  if("reDeploy"==href){
				  jsParam.operation="6" ;
				  this.deployApp(jsParam) ;
			  }else if ("undeploy"==href||"reUndeploy"==href){
				  jsParam.operation="7" ;
				  jsParam.mode = "single" ;//这个必须填写，否则报错//只有在反部署的时候需要该字段
				  this.undeployApp(jsParam) ;
			  }
		  },
		  deployApp:function(jsParam){//部署
			  var modelName = sidbarUtil.getModuleName() ;
			  var flag = this.check4DeployOrNot(jsParam) ;
			  var self = this ;
			  if(flag){
				  delete jsParam.operation ;
				  var serverURL = "/"+jcfManager.appName+"/deployMgr/mDeployApp.action" ;
			      var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
				  $.when(ajaxing).done(function(data){
					 if(data.flag =="true"){//跳转到应用管理页面
						self.model.set("appStatus","7") ;//正在部署中,后面会重新刷新页面
						//一直刷新本条记录
						self.triggerMethod("parent:refreshSingleModel") ;
					 }else{
						alert("部署失败!") ;
					 }
				  }) ; 
			  }
		  },
		  undeployApp:function(jsParam){//反部署
		  	  
			  if(confirm("确认反部署?")){
				  var flag = this.check4DeployOrNot(jsParam) ;
				  var modelName = sidbarUtil.getModuleName() ;
				  var self = this ;
				  if(flag){
					 delete jsParam.operation ;//operation
					 var serverURL = "/"+jcfManager.appName+"/deployMgr/mUndeployApp.action" ;
				     var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					 $.when(ajaxing).done(function(data){
						 if(data.flag =="true"){//跳转到应用管理页面
							 self.model.set("appStatus","8") ;//正在部署中,后面会重新刷新页面
							//一直刷新本条记录
							self.triggerMethod("parent:refreshSingleModel") ;
						 }else{
							alert("反部署失败!") ;
						 }
					  }) ; 
				  }
			  }
		  },
		  check4DeployOrNot:function(jsParam){//检查是否能部署或反部署
			 var flag = false;
	    	 var serverURL = "/"+jcfManager.appName+"/deployMgr/mApplication.action" ;
	    	 var ajaxing = util.dealSYNCHAjaxRequest4JSObj(serverURL,jsParam) ;
	    	 $.when(ajaxing).done(function(data){
	    	   if(data.flag=="true"){
	    		  delete jsParam.operation ;
	    		  flag = true ;
	    	   }else{
	    		  alert(data.msg) ;
	    	   }
	    	 }) ;
	    	 return flag; 
		  },
		  render: function() {
			  this.$el.html(this.template(this.model.attributes));
			  return this;
		  }

	});
	//整个列表视图
	var ListView =  Marionette.CompositeView.extend({
		tagName:"table",
		className:"table table-bordered list",
	    template: _.template(listTmpStr),
		childView: ItemsView,
		childViewContainer: "tbody",
		events:{
			"click #selectAll" : "selectAll"
		},
		selectAll:function(e){
			var checkFlag = $("#selectAll").prop("checked") ; 
			$(e.target).parents("thead")
			.siblings("tbody")
			.find(":checkbox[name='serverIds']")
			.prop("checked",checkFlag);
		},
		childEvents: {
		    'parent:refreshSingleModel': function (curChildView) {
				var currentModel = curChildView.model ;
		        var  refreshSpace = 2000 ;
				var  refreshNum = util.getFefreshPageNum() ;//刷新次数
				var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
				var curHash = window.location.hash ;
				$("#freshPage4GroupAppUrl").val(curHash) ;
				var ttt= setInterval(this.refreshSingleStatus,refreshSpace,currentModel);
				$("#freshPage4GroupAppFlag").val(ttt) ;
				setTimeout("window.clearInterval("+ttt+")",refreshTime);
		    }
		},
		refreshSingleStatus:function(curModel){
		    var curHash = window.location.hash ;
		    var oldUrl  = $("#freshPage4GroupAppUrl").val() ;
		    var autoFreshFlag = $("#freshPage4GroupAppFlag").val() ;
		    if(oldUrl==curHash){//刷新页面
		    	var serverId = curModel.get("serverId") ;
				var appId = curModel.get("appId") ;
				var serverURL = "/"+jcfManager.appName+"/deployMgr/freshAppStatus4Server.action" ;
				var groupId = curModel.get("groupId") ;
				var jsonParam = {"groupId":groupId,"serverId":serverId,"appId":appId} ;
				var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				$.when(ajaxing).done(function(data){
					if(data.continueFreshFlag!="true"){
						var cStatus = data.appStatus ;
						if(cStatus!="7"&&cStatus!="8"&&cStatus!="9"){
							if(cStatus==3){//已反部署，则删除此条记录
								curModel.view.destroy() ;
							}else{
								curModel.set("appStatus",cStatus) ;
							}
							window.clearInterval(autoFreshFlag)
						}
					}else{
						window.clearInterval(autoFreshFlag)  
					}
				}) ;
		    }else{
		    	window.clearInterval(autoFreshFlag)  
		    }
		}
		
	});
	
	
	var GroupServerAppStatusLayout = Marionette.LayoutView.extend({
		  initialize:function(option){
			this.queryString = option.queryString ;
			var deployAuthFlag = authCheck.getDeployFlag() ;
			var undeployAuthFlag = authCheck.getUndeployFlag() ;
			this.model.set("deployAuthFlag",deployAuthFlag) ;
			this.model.set("undeployAuthFlag",undeployAuthFlag) ;
			this.on("showPageInfo",this.showPageInfo) ;
			jcfManager.tipInfoRegion = this.tipInfoRegion ;
		  },
		  template: _.template(layoutTmpStr),
		  regions: {
		  	tipInfoRegion:"#tipInfoRegion",
			baseInfoRegion: "#baseInfoRegion",
			listRegion: "#listRegion",
			pagebarRegion:"#pagebarRegion"
		  },
		  events:{
			  "click #batchReDeployBtn" :"batchReDeploy",
			  "click #batchReundeployBtn" :"batchReundeploy"
		  },
		  showPageInfo:function(){
			  var self = this ;
			  var groupId = this.queryString.groupId  ;
			  var appId = this.queryString.appId ;
			  var currentPage = this.queryString.currentPage ;
			  if(currentPage==null){
				 this.queryString.currentPage = "1" ;
				 this.queryString.pageSize = jcfManager.defaultPageSize ;
			  }
			  var serverURL = "/"+jcfManager.appName+"/deployMgr/viewAppStatus4Group.action" ;
			  var jsonParam = {"groupId":groupId,"appId":appId,
					   "currentPage":this.queryString.currentPage,"pageSize":this.queryString.pageSize} ;
			  var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			  var  refreshSpace = 2000 ;
			  var refreshNum = util.getFefreshPageNum() ;//刷新次数
			  var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
			  //保存当前url
			  var curHash = window.location.hash ;
			  $("#freshPage4GroupAppUrl").val(curHash) ;
			  var deployFlag = this.queryString.deployFlag ;
			  $.when(ajaxing).done(function(data){
				  //基本信息部分
				  var model = new Backbone.Model(data.appInfo) ;
				  var baseView = new BaseInfoView({model:model}) ;
				  self.baseInfoRegion.show(baseView) ;
				  //显示列表信息
				  var collection = new Backbone.Collection(data.pageBean.recordList) ;
				  //将数据保存到layout中
				  self.collection = collection ;
				  var listView = new ListView({collection:collection}) ;
				  self.listRegion.show(listView) ;
				  //显示分页栏
				  var pbModel = new Backbone.Model(data.pageBean) ;
				  pbModel.set("uriSection","group/appDeploy") ;
				  var pbView = new PagebarView({model:pbModel,queryString:self.queryString}) ;
				  self.pagebarRegion.show(pbView) ;
				  if(deployFlag=="true"){//从部署页面过来的需要刷新页面，其他地方过来的不需要刷新页面
					  $("#serverId4deployApp").val(self.queryString.serverId) ;
					  $("#appId4deployApp").val(self.queryString.appId) ;
					  if(collection.length>0){//定时刷新页面
						  var ttt= setInterval(self.updatePageAppStatus4AllUpdate,refreshSpace,collection);
						  $("#freshPage4GroupAppFlag").val(ttt) ;
						  setTimeout("window.clearInterval("+ttt+")",refreshTime);
					  }
				   }
			  }) ;
		  },
		  checkboxAllNotUnCheck:function(){
		  	   $(":checkbox").prop("checked",false) ;
		  },
		  batchReDeploy:function(){//批量重新部署
			  var checkFlag = $("#selectAll").prop("checked",false) ; 
			  var serverIds = "" ;
			  var infos = $("input:checkbox[name='serverIds']:checked") ;
			  var len = infos.length ;
			  var self = this ;
			  var ids = new Array() ;
			  infos.each(function(index){
				  var serverId = $(this).val() ;
				  var appStatus = $(this).attr("appStatus") ;
			  	  if(appStatus=="2"){//只有部署失败的应用才能重新部署
				  	  serverIds += serverId ;
					  ids.push(serverId) ;
					  if((index+1)<len){
						  serverIds += "," ;
					  }
				  }
			  }) ;
			  if(ids.length>0){
				  var jsParam = {} ;
				  jsParam.serverId = serverIds ;
				  jsParam.groupId = this.queryString.groupId ;
				  jsParam.appId = this.queryString.appId ;
				  jsParam.mode = "more" ;
				  jsParam.operation = "6" ;
				  $("#serverId4deployApp").val(jsParam.serverId) ;
				  $("#appId4deployApp").val(jsParam.appId) ;
				  //检查是否符合重部署条件
				  var flag = this.check4DeployOrNot(jsParam) ;
				  if(flag){
					  delete jsParam.operation ;
					  delete jsParam.mode ;
					  var serverURL = "/"+jcfManager.appName+"/deployMgr/mDeployApp.action" ;
				      var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					  $.when(ajaxing).done(function(data){
					  	 self.checkboxAllNotUnCheck() ;
						 if(data.flag =="true"){//跳转到应用管理页面
							for(var i = 0 ; i < ids.length ; i++){
								var curId = ids[i] ;
								self.collection.each(function(m){
									if(m.get("serverId")==""+curId){
										m.set("appStatus","7") ;
									}
								}) ;
							}
							var  refreshSpace = 2000 ;
						    var  refreshNum = util.getFefreshPageNum() ;//刷新次数
							var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
							var curHash = window.location.hash ;
							$("#freshPage4GroupAppUrl").val(curHash) ;
							var ttt= setInterval(self.updatePageAppStatus4PartUpdate,refreshSpace,self.collection);
							$("#freshPage4GroupAppFlag").val(ttt) ;
							setTimeout("window.clearInterval("+ttt+")",refreshTime);
						 }else{
							alert("部署失败!") ;
						 }
					  }) ; 
				  }
				  
			  }else{
			  	 $("input:checkbox[name='serverIds']:checked").prop("checked",false) ;
				 var listTipModel = new ListTipModel() ;
				 listTipModel.set("errList",["应用状态必须满足:[‘部署失败’]"]) ;
				 var listTipView = new ListTipView({model:listTipModel}) ;
				 this.tipInfoRegion.show(listTipView) ;
				 //alert("请选择有效服务器") ;
			  }
		  },
		  batchReundeploy:function(){//批量重新反部署
			  var checkFlag = $("#selectAll").prop("checked",false) ; 
			  var serverIds = "" ;
			  var self = this ;
			  var infos = $("input:checkbox[name='serverIds']:checked") ;
			  var len = infos.length ;
			  var ids = new Array() ;
			  infos.each(function(index){
				  var serverId = $(this).val() ;
				  //如果不是部署失败则可反部署
				  var appStatus = $(this).attr("appStatus") ;
				  if(appStatus=="1"||appStatus=="4"){//已部署，反部署失败
				  	  ids.push(serverId) ;
					  serverIds += serverId ;
					  if((index+1)<len){
						  serverIds += "," ;
					  }
				  }
			  }) ;
			  
			  if(ids.length>0){
				  var jsParam = {} ;
				  jsParam.serverId = serverIds ;
				  jsParam.groupId = this.queryString.groupId ;
				  jsParam.appId = this.queryString.appId ;
				  jsParam.mode = "more" ;
				  jsParam.operation = "7" ;
				  $("#serverId4deployApp").val(jsParam.serverId) ;
				  $("#appId4deployApp").val(jsParam.appId) ;
				  var flag = this.check4DeployOrNot(jsParam) ;
				  if(flag){
					  delete jsParam.operation ;//operation
					  delete jsParam.mode ;
					  var serverURL = "/"+jcfManager.appName+"/deployMgr/mUndeployApp.action" ;
				      var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
					  $.when(ajaxing).done(function(data){
					  	 self.checkboxAllNotUnCheck() ;
						 if(data.flag =="true"){//跳转到应用管理页面
							//self.remove() ; //移除该视图
							for(var i = 0 ; i < ids.length ; i++){
								var curId = ids[i] ;
								self.collection.each(function(m){
									var curServerId = m.get("serverId") ;
									if(curServerId == curId){
										m.set("appStatus","8") ;
									}
								}) ;
							}
							var  refreshSpace = 2000 ;
						    var  refreshNum = util.getFefreshPageNum() ;//刷新次数
							var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
							var curHash = window.location.hash ;
							$("#freshPage4GroupAppUrl").val(curHash) ;
							var ttt= setInterval(self.updatePageAppStatus4PartUpdate,refreshSpace,self.collection);
							$("#freshPage4GroupAppFlag").val(ttt) ;
							setTimeout("window.clearInterval("+ttt+")",refreshTime);
						 }else{
							alert("反部署失败!") ;
						 }
					  }) ; 
				  }
				  
			  }else{
				 $("input:checkbox[name='serverIds']:checked").prop("checked",false) ;
			  	 var listTipModel = new ListTipModel() ;
				 listTipModel.set("errList",["应用状态必须满足:[‘已部署’，‘反部署失败’]"]) ;
				 var listTipView = new ListTipView({model:listTipModel}) ;
				 this.tipInfoRegion.show(listTipView) ;
				 //alert("请选择有效服务器") ;
			  }
		  },
		  check4DeployOrNot:function(jsParam){//检查是否能部署或反部署
			  var flag = false;
		      var serverURL = "/"+jcfManager.appName+"/deployMgr/mApplication.action" ;
		      var ajaxing = util.dealSYNCHAjaxRequest4JSObj(serverURL,jsParam) ;
		      $.when(ajaxing).done(function(data){
		    	 if(data.flag=="true"){
		    		delete jsParam.operation ;
		    		flag = true ;
		    	 }else{
		    	    alert(data.msg) ;
		        }
		      }) ;
		      return flag; 
		  },
		  arrayContainElement:function(arr,element){
			  var i = arr.length;
			  while (i--) {
			     if (a[i] == element) {
			        return true;
			     }
			  }
			  return false;
		  },
		  updatePageAppStatus4AllUpdate:function(collection){
			 var serverId = "" ;
			 collection.each(function(m){
				var cid =  m.get("serverId") ;
				serverId += cid ;
				serverId += "," ;
			 }) ;
			 var len = serverId.length ;
			 if(collection.length>0){
				serverId = serverId.substring(0,(len-1)) ; 
			 } 
	    	 var curHash = window.location.hash ;
			 var oldUrl  = $("#freshPage4GroupAppUrl").val() ;
			 var autoFreshFlag = $("#freshPage4GroupAppFlag").val() ;
			 if(oldUrl==curHash){//刷新页面
			    var appId = $("#appId4deployApp").val() ;
			    //var serverId = $("#serverId4deployApp").val() ;//这个是选中的所有的serverId
			    var serverArr = serverId.split(",") ;
			    var jsonParam = {"appId":appId,"serverId":serverId} ;
			    var serverURL = "/"+jcfManager.appName+"/deployMgr/updatePageDeployStatus.action" ;
			    var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			    $.when(ajaxing).done(function(data){
				   var model = new Backbone.Model(data) ;
				   var isClose = "1" ;
				   var len = serverArr.length ;
				   collection.each(function(m){
					   var serverId =  m.get("serverId") ;
					   for ( var i = 0; i < len; i++) {
						   var cc = serverArr[i] ;
						   if(cc==serverId){
							   var cStatus = model.get(""+serverId+"") ;
							   if(cStatus!=undefined&&cStatus!="3"){
								  if(cStatus=="7"||cStatus=="8"||cStatus=="9"){//
									  isClose = "0" ;
								  }
							      m.set("appStatus",cStatus) ;
							   }else{//如果不存在则表示已反部署
								   //m.set("appStatus","3") ;
								   collection.remove(m) ;
							   }
						   }else {
							   continue ;
						   }
					   }
				    }) ;
				   if(isClose=="1"){
					   window.clearInterval(autoFreshFlag)  ;
				   }
			    }) ;
			 }else{//结束自动刷新
			   window.clearInterval(autoFreshFlag)  ;
			 }
		},
		updatePageAppStatus4PartUpdate:function(collection){
	    	 var curHash = window.location.hash ;
			 var oldUrl  = $("#freshPage4GroupAppUrl").val() ;
			 var autoFreshFlag = $("#freshPage4GroupAppFlag").val() ;
			 if(oldUrl==curHash){//刷新页面
			    var appId = $("#appId4deployApp").val() ;
			    var serverId = $("#serverId4deployApp").val() ;//这个是选中的所有的serverId
			    var serverArr = serverId.split(",") ;
			    var jsonParam = {"appId":appId,"serverId":serverId} ;
			    var serverURL = "/"+jcfManager.appName+"/deployMgr/updatePageDeployStatus.action" ;
			    var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			    $.when(ajaxing).done(function(data){
				   var model = new Backbone.Model(data) ;
				   var isClose = "1" ;
				   var len = serverArr.length ;
				   collection.each(function(m){
					   	   var serverId =  m.get("serverId") ;
						   for ( var i = 0; i < len; i++) {
							   var cc = serverArr[i] ;
							   if(cc==serverId){
								   var cStatus = model.get(""+serverId+"") ;
								   if(cStatus!=undefined&&cStatus!="3"){
									  if(cStatus=="7"||cStatus=="8"||cStatus=="9"){//
										  isClose = "0" ;
									  }
								      m.set("appStatus",cStatus) ;
								   }else{//如果不存在则表示已反部署
									  // m.set("appStatus","3") ;
									   collection.remove(m) ;
								   }
							   }else {
								   continue ;
							   }
						   }
				    }) ;
				   if(isClose=="1"){
					   window.clearInterval(autoFreshFlag)  
				   }
			    }) ;
			 }else{//结束自动刷新
			   window.clearInterval(autoFreshFlag)  
			 }
		}
		
	});
	
	return GroupServerAppStatusLayout;
});
