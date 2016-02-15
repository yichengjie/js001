/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-13
 * Time: 下午08:24:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var layouTmpStr = require('../../template/deploy/deployUploadLayout.tpl');
	//待上传应用itemview模版
	var itemTmpStr = require("../../template/deploy/uploadItem.tpl") ;
	//待上传应用listview模版
	var listTmpStr = require("../../template/deploy/uploadList.tpl") ;
	
	var util = require("../../util/CommonUtil") ;
	var curPathTmpStr = "<%=currentPath%>" ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var ListTipModel = require("../../model/listTip_model") ;
	var ListTipView = require("../listTip_view") ;
	
	//当前目录
	var CurrentPathView = Marionette.ItemView.extend({
		  tagName:"span",
		  template: _.template(curPathTmpStr)
	});
	
	
	//待上传应用itemview
	var AppItemView = Marionette.ItemView.extend({
		 tagName:"tr",
		 className:"listPageTr",
		 template: _.template(itemTmpStr)
	});
	//待上传应用listview
	var AppListView =  Marionette.CompositeView.extend({
    	initialize:function(){
		},
		tagName:"table",
		className:"table table-bordered list",
	    template: _.template(listTmpStr),
		childView: AppItemView,
		childViewContainer: "tbody"
	});
	
	
	//已上传应用itemview模版
	var item4AlreadyUploadTmpStr = require("../../template/deploy/upload4AlreadyUploadItem.tpl") ;
	//已上传应用listview模版
	var list4AlreadyUploadTmpStr = require("../../template/deploy/upload4AlreadyUploadList.tpl") ;
	//已上传应用itemview
	var App4AlreadyUploadItemView = Marionette.ItemView.extend({
		 tagName:"tr",
		 template: _.template(item4AlreadyUploadTmpStr),
		 events: {
		 	"click" : "highlightName"/*,
		 	"click a.clearAppBtn" :"clearApp"*/
		 },
		 highlightName: function(e){
			this.$el.toggleClass("warning");
		 }
	});
	//已上传应用listview
	var App4AlreadyUploadListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
	    template: _.template(list4AlreadyUploadTmpStr),
	    tagName:"table",
	    className:"table table-bordered list",
		childView: App4AlreadyUploadItemView,
		childViewContainer: "tbody"
	});
	
	var DeployUploadLayout = Marionette.LayoutView.extend({
		  initialize:function(option){
			 this.queryString = option.queryString ;
			 this.on("showPageInfo",this.showPageInfo) ;
		  },
		  template:_.template(layouTmpStr),
		  regions: {
			   "currentFilePathRegion": "#currentFilePathRegion",
			   "listRegion": "#listRegion",
			   "pagebarRegion": "#pagebarRegion",
			   "alreadyUploadAppRegion": "#alreadyUploadAppRegion",
			   "showTipInfoRegion":"#showTipInfoRegion"
		   },
		   events:{
			   "click #backParentFilePathBtn" : "backParentFilePath",
			   "click #uploadAppBtn":"uploadApp",
			   "click .listPageTr td span.file_dir_icon":"goToChildFilePath",
			   "click .listPageTr td input:radio[name='selectedAppName']":"clickAppRadio",
			   "click .alreadyUploadAppClearTd a" :"clearApp"
		   },
		   clearApp:function(e){
			   if(confirm("确定清除?")){
				   var $a = $(e.target) ;
				   var appId = $a.attr("appId") ;
				   var appStatus = $a.attr("appStatus") ;
				   var serverURL = "/"+jcfManager.appName+"/deployMgr/clearApp.action" ;
				   var jsonParam = {"appId":appId,"appStatus":appStatus} ;
				   var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				   var self = this ;
				   var tipModel = new ListTipModel() ;
				   $.when(ajaxing).done(function(data){
					  if(data.flag){
						  tipModel.set("succList",["清除成功!"]) ;
						  var tipView = new ListTipView({model:tipModel}) ;
					  	  self.showTipInfoRegion.show(tipView) ;
						  var cc = null ;
						  self.uploadedAppCollection.each(function(m){
							  var str = m.get("id") ;
							  if(str==appId){
								  self.uploadedAppCollection.remove(m) ;
								  return ;
							  }
						  }) ;
					  }else{
					  	  tipModel.set("errList",["清除应用失败!"]) ;
						  var tipView = new ListTipView({model:tipModel}) ;
					  	  self.showTipInfoRegion.show(tipView) ;
					  }
				   });
			   }
			   
		   },
		   clickAppRadio:function(e){//点击文件前面的radio时
			   e.stopPropagation() ;
			   var $curRadio = $(e.target) ;
			   $("#uploadAppName").val($curRadio.val()) ;
			   $("#uploadAppName").attr("title",$curRadio.attr("title")) ;
			   this.showTipInfoRegion.empty() ;
			   this.findUploadedApp($(e.target).val()) ;
		   },
		   findUploadedApp:function(path){
			   var serverURL = "/"+jcfManager.appName+"/deployMgr/ajaxSearchUploadedApp.action" ;
			   var jsonParam = {"appPath":path} ;
			   var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ; 
			   var self = this ;
			   $.when(ajaxing).done(function(data){
				   var collection = new Backbone.Collection(data.appInfoList) ;
				   //将已上传的app保存到当前当前layout中
				   self.uploadedAppCollection = collection ;
				   self.alreadyUploadAppRegion.show(new App4AlreadyUploadListView({collection:collection})) ;
			   }) ;
		   },
		   uploadApp:function(){//点击上传应用button
			   var path = $("#uploadAppName").val() ;
			   var title = $("#uploadAppName").attr("title") ;
			   var  self = this ;
			   var tipModel = new ListTipModel() ;
			   if(path== null || path==""){
			   	   tipModel.set("errList",["请选择应用包！"]) ;
				   var tipView = new ListTipView({model:tipModel}) ;
				   self.showTipInfoRegion.show(tipView) ;
			   }else{
				   var curCollection = this.uploadedAppCollection ;
				   var count = 0 ; 
				   var continueFlag = true; 
				   curCollection.each(function(c){//遍历已上传的所有应用
					   count ++ ;
					   //bar包全名称
					   var var_tmp = c.get("name") +"_"+c.get("version")+".bar" ;
					   var appStatus = c.get("appStatus") ;
					   if(title==var_tmp){//如果应用名称相同
						   if(appStatus ==2||appStatus==3||appStatus==10){//如果包为部署失败的bar这可覆盖
							   if(!confirm("同名同版本的bar包已上传，是否要覆盖?")){
								   continueFlag = false;
							   }
						   }else{
							   continueFlag = false;
							   tipModel.set("errList",["该包已部署，不能上传覆盖!"]) ;
							   var tipView = new ListTipView({model:tipModel}) ;
							   self.showTipInfoRegion.show(tipView) ;
						   }
					   }
				   }) ;
				   if(continueFlag){
					   if(count>=3){
				   		   tipModel.set("errList",["该应用包已上传三个版，不能再上传，请先进行清除！"]) ;
						   var tipView = new ListTipView({model:tipModel}) ;
						   self.showTipInfoRegion.show(tipView) ;
					   }
					   if(!confirm("确定上传应用包"+path+"?")){
						 return;
					   }
				   }else{
					   return ;
				   }
				   var serverURL = "/"+jcfManager.appName+"/deployMgr/mUploadFile.action" ;
				   var jsonParam = {"appPath":path} ;
				   var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
				   $.when(ajaxing).done(function(data){
					   if(data.flag=="true"){
					   	   tipModel.set("succList",["上传成功!"]) ;
						   var tipView = new ListTipView({model:tipModel}) ;
						   self.showTipInfoRegion.show(tipView) ;
						   self.findUploadedApp(path) ;
					   }else{//上传成功的话
					   	   tipModel.set("errList",["上传失败!"+data.msg]) ;
						   var tipView = new ListTipView({model:tipModel}) ;
						   self.showTipInfoRegion.show(tipView) ;
					   }
				   }) ;
			   }
		   },
		   backParentFilePath:function(){//点击返回上层目录按钮
			   var operPathCode = "parentPath" ;
			   this.queryString.changePageFlag= "false" ;
			   this.queryString.currentPage= "1" ;
			   appRouter.navigate("deployMgr/param/" + QueryString.stringify(this.queryString)) ;
			   this.showDirList(operPathCode) ;
		   },
		   goToChildFilePath:function(e){//点击文件夹，进入子目录//通过点进入
			   e.stopPropagation() ;
			   e.preventDefault();
			   var $curDir = $(e.target) ;
			   var pathCode = $curDir.attr("pathCode") ;
			   this.queryString.changePageFlag = "false" ;
			   this.queryString.currentPage = "1" ;
			   this.showDirList(pathCode) ;
		   },
		   showPageInfo:function(){
			 //首次进入初始化默认目录
			   var operPathCode = "defaultPath" ;
			   if(this.queryString.currentPage==undefined||this.queryStringcurrentPage==""){
				   this.queryString.currentPage = "1" ;
				   this.queryString.pageSize = jcfManager.defaultPageSize ;
			   }
			   this.showDirList(operPathCode) ; 
		   },
		   showDirList:function(operPathCode){
			   //清空应用路径文本框
			   this.alreadyUploadAppRegion.empty() ;
			   $("#uploadAppName").val("") ;
			   var serverURL = "/"+jcfManager.appName+"/deployMgr/mAccessDir.action" ;
			   var jsonParam = {"operPathCode":operPathCode,
					            "currentPage":this.queryString.currentPage,
					            "pageSize":this.queryString.pageSize,
					            "changePageFlag":this.queryString.changePageFlag} ;
			   var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			   var self = this ;
			   $.when(ajaxing).done(function(data){
				   //显示当前目录...
				   var model01 = new Backbone.Model({"currentPath":data.currentPath}) ;
				   var curPathView = new CurrentPathView({model:model01}) ;
				   self.currentFilePathRegion.show(curPathView) ;
				   //显示所有文件列表...
				   var collection = new Backbone.Collection(data.pageBean.recordList) ;
				   self.listRegion.show(new AppListView({collection:collection})) ;
				   //显示分页栏条...
				   var model = new Backbone.Model(data.pageBean) ;
				   self.queryString.selectedPageUI = "updateAppUI" ;//应用上传
				   self.queryString.changePageFlag = "true" ;
				   appRouter.navigate("deployMgr/param/" + QueryString.stringify(self.queryString)) ;
				   self.pagebarRegion.show(new PagebarView({model:model,queryString:self.queryString})) ;
			   }).fail(function(){
				   alert("根目录") ;
			   }) ;
			   
		   }
		  
	});
	
	return DeployUploadLayout ;

});
