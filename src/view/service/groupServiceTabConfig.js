define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/service/groupServiceTabConfig.tpl');
	var itemTmpStr = require("../../template/service/groupServiceTabConfigItem.tpl") ;
	var listTmpStr = require("../../template/service/groupServiceTabConfigList.tpl"); 
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	
//	var GroupServiceCfgView = require("./groupServiceCfg") ;
	
	
	//列表每一项视图
	var ItemView = Marionette.ItemView.extend({
		 initialize:function(){
		   this.model.set("groupId",$("#hiddenGroupIdOnPage").val());
		   this.model.on("change",this.render);
		//   console.log(this.model.toJSON());
	     },
		 tagName:"tr",
		 template: _.template(itemTmpStr),
		 events:{
			"click .sericeStatus a" : "operServiceStatus",
			"click .groupServiceCfgTd" :"groupServiceCfg",
		 },
	
		 operServiceStatus:function(e){//启动停止服务器
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var href = $(e.target).attr("href") ;
			 
			 var hasCompensate = this.model.get('hasCompensateService');
	    	 var toStatus = "" ;//执行成功以后要显示的状态吗
			 var operStr = "" ;
			 var operationType = "0" ;//1:表示不操作补偿服务
			 //当前服务状态
			 var curServiceStatus = this.model.get("serviceStatus") ;
			 if("stop"==href){
			    this.model.set("serviceStatus","4") ;
				operStr = "2_1_";
				toStatus = "2" ;
				if(hasCompensate == "1"){
				   if(confirm("是否停止补偿服务?")){//停止补偿服务
					  operStr += "2";
					  operationType = "0" ;
				   }else{
					  operStr += "1";
					  operationType = "1" ;
				   }
				}
			  }else if ("forceStop"==href){
				 this.model.set("serviceStatus","4") ;
				 operStr = "3_1_";
				 toStatus = "2" ;
				 if(hasCompensate == "1"){
					if(confirm("是否停止补偿服务?")){//停止补偿服务
					  operStr += "2";
					  operationType = "0" ;
					}else{
					  operStr += "1";
					  operationType = "1" ;
					}
				 }
			  }else if("start"==href){
				 this.model.set("serviceStatus","3") ;
				 operStr = "1_1_";
				 toStatus = "1" ;
				 if (hasCompensate == "1"){//是否有补偿业务
					//存在补偿服务的话只有一种情况[服务已经停止，补偿服务仍在运行中]
					if(curServiceStatus=="9"){//表示启动服务但不启动补偿服务
					   operStr +=  "1";
					   operationType = "1" ;
					}else{//其他情况，连带补偿服务一起启动
					   operStr +=  "2";
					}
		         }
			  }
			  //不存在补偿服务的话
			  if(hasCompensate != "1"){
				  operStr += "1";
				  operationType = "0" ;
			  }
			  this.serviceOperation(operStr,operationType ,toStatus ) ;
		 },
		 
		 serviceOperation:function(operStr,operationType,toStatus){
	    	 var self = this ;
	    	 var oldServiceStatus = this.model.get("serviceStatus") ;
			 var serviceId = this.model.get('serviceId');
		     var groupId = this.model.get('groupId');
		     var url = "/"+jcfManager.appName+"/service/serviceOperation.action";
		     var jsObj = {"groupId": groupId,"serviceId": serviceId,
		        		"operationType": operationType,"serviceOperation" : operStr};
		     $.when(util.dealAjaxRequest4SimpleParam(url, jsObj))
			  .done(function(data){
				 if(data.status == 1){
					self.model.set('serviceStatus',toStatus);
				 }else{
					 self.model.set('serviceStatus',oldServiceStatus);
				 }
			  });
		 },
		 
		 groupServiceCfg: function(e){
			 e.stopPropagation() ;
			 e.preventDefault() ;
			 var modelName = sidbarUtil.getModuleName() ;
			 var serverURL = "/"+jcfManager.appName+"/service/toConfigServiceUI.action" ;
			 var groupId = this.model.get('groupId');
			 var serviceId = this.model.get('serviceId');
			 var jsonParam = {"groupId":groupId,"serviceId":serviceId} ;
			 var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			 var queryString = {"groupId":groupId,"serviceId":serviceId} ;
			 ////////////////////////////////////////////
			 appRouter.navigate(modelName +"/group/cfg/param/" + QueryString.stringify(queryString)) ;
			 
			 
			 $.when(ajaxing).done(function(data){
				 var errorFlag = data.errorFlag ;
				 if(errorFlag==""){
					 var model = new Backbone.Model(data) ;
//					 var dialogView = new GroupServiceCfgView({model:model}) ;
					 jcfManager.contentRegion.show(dialogView) ;
				 }else{
					 alert(errorFlag) ;
				 }
			 }) ;
		 },
		 
		 
		 render:function(){
			  this.$el.html(this.template(this.model.attributes));
			  return this;
		 }

	});
	
	//列表视图
	var ListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
	    template: _.template(listTmpStr),
	    tagName:"table",
	    className:"table table-bordered",
		childView: ItemView,
		childViewContainer: "tbody",	
	});
	

	var GroupServiceTabConfig = Marionette.LayoutView.extend({
		  initialize:function(options){
			  this.queryString = options.queryString ;
			  this.on("showPageInfo",this.showPageInfo) ;
		  },
		  template: _.template(layoutTmpStr),
		  regions: {
			listRegion: "#listRegion",
			pagebarRegion: "#pagebarRegion"
		  },
		  events:{
			  "click #searchGroupServiceBtn" : "searchGroupService"
		  },
		  searchGroupService:function(){
			  var category = $("#search4ServiceType").val() ;
			  var status = $("#search4RuningStatus").val() ;
			  var appName = $("#search4AppName").val() ;
			  this.queryString.currentPage = "1" ;
			  if(this.queryString.pageSize==undefined||this.queryString.pageSize==""){
				  this.queryString.pageSize = "10" ;
			  }
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage;
			  jsParam.pageSize = this.queryString.pageSize ;
			  jsParam.groupId = this.queryString.groupId ;
			  jsParam.category = category ;
			  jsParam.status = status ;
			  jsParam.appName = appName ;
			  var modelName = sidbarUtil.getModuleName() ;
			  appRouter.navigate(modelName +"/group/param/" + QueryString.stringify(jsParam)) ;
			  this.showPageInfo2(jsParam) ;
		  },
		  showPageInfo:function(){
			  if(this.queryString.currentPage==undefined||this.queryString.currentPage==""){
				  this.queryString.currentPage = "1" ;
				  this.queryString.pageSize = "10" ;
			  }
			  var jsParam = {} ;
			  jsParam.currentPage = this.queryString.currentPage ;
			  jsParam.pageSize = this.queryString.pageSize ;
			  jsParam.groupId = this.queryString.groupId ;
			  jsParam.category = this.queryString.category ;
			  jsParam.status = this.queryString.status ;
			  jsParam.appName = this.queryString.appName ;
			  
			  this.showPageInfo2(jsParam) ;
		  },
		  showPageInfo2:function(jsParam){
			  var self = this ;
		      var  refreshSpace = 2000 ;
		      var refreshNum = util.getFefreshPageNum() ;//刷新次数
		      var  refreshTime = refreshSpace*refreshNum ;//多少秒后执行清除刷新函数
		      //保存当前url
		      var curHash = window.location.hash ;
		      $("#freshPage4GroupServiceUrl").val(curHash) ;
		      
			  var serverURL = '/' + jcfManager.appName + '/service/searchGroupService.action' ;
			  var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			  $.when(ajaxing).done(function(data){
				  var collection = new Backbone.Collection(data.recordList) ;
				  var listView = new ListView({collection:collection}) ;
				  self.listRegion.show(listView) ;
				  var model = new Backbone.Model(data) ;
				  model.set("uriSection","group") ;
				  var pbView = new PagebarView({model:model,queryString:self.queryString}) ;
				  self.pagebarRegion.show(pbView) ;
				  //定时刷新页面服务的状态
				  if(collection.length>0){
					 var ttt= setInterval(self.updatePageServiceStatus,refreshSpace,collection);
					 $("#freshPage4GroupServiceFlag").val(ttt) ;
					 setTimeout("window.clearInterval("+ttt+")",refreshTime);
				  }
			  }) ;
			  
		  },
		  updatePageServiceStatus:function(collection){//定时更新页面上的服务器状态字段
			  var curHash = window.location.hash ;
			  var oldUrl  = $("#freshPage4GroupServiceUrl").val() ;
			  var autoFreshFlag = $("#freshPage4GroupServiceFlag").val() ;
			  if(oldUrl==curHash){//刷新页面
				  var serverURL = "/"+jcfManager.appName+"/service/searchGroupServiceStatus.action" ;
				  var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
				  $.when(ajaxing).done(function(data){
					  var model = new Backbone.Model(data) ;
					  collection.each(function(m){
						  var serviceId =  m.get("serviceId") ;
						  var cStatus = model.get(""+serviceId+"") ;
						  if(cStatus!=undefined){
							 m.set("serviceStatus",cStatus) ;
						  }
					  }) ;
				  }) ;
			  }else{//结束自动刷新
				  window.clearInterval(autoFreshFlag)  
			  }
		  }
	});
	
	return GroupServiceTabConfig ;
});
