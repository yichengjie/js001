/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-21
 * Time: 下午01:43:33
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	//ajax文件上传组件
	require("ajaxfileupload") ;
	var Marionette = require("marionette");
	var layoutTmpStr = require('../../template/deploy/serverAppConfigLayout.tpl');
	var util = require("../../util/CommonUtil") ;
	var baseInfoTmpStr = require("../../template/deploy/serverAppCfgBaseInfo.tpl") ;
	var currentPathTmpStr = require("../../template/deploy/serverAppCfgCurPath.tpl") ;
	
	var itemTmpStr = require("../../template/deploy/serverAppCfgItem.tpl") ;
	var listTmpStr = require("../../template/deploy/serverAppCfgList.tpl") ;
	var PagebarView = require("../pagebar_view2") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	var QueryString = require('querystring');
	var ItemTipView = require("../itemTip_view") ;
	
	//基本信息视图
	var ServerBaseInfoView = Marionette.ItemView.extend({
		template:_.template(baseInfoTmpStr),
		tagName:"table",
		className:"table"
	});
	
	//当前目录视图
	var CurrentPathView = Marionette.ItemView.extend({
		template:_.template(currentPathTmpStr),
		tagName:"table",
		className:"table"
	});
	
	//列表每一项视图
	var AppCfgItemView = Marionette.ItemView.extend({
		 initialize:function(){
			var downloadCfgAuthFlag = authCheck.getDownloadCfgFlag() ;
			this.model.set("downloadCfgAuthFlag",downloadCfgAuthFlag) ;
		 },
		 tagName:"tr",
		 template: _.template(itemTmpStr)
	});
	//列表视图
	var AppCfgListView =  Marionette.CompositeView.extend({
		initialize:function(){
		},
		tagName:"table",
		className:"table",
	    template: _.template(listTmpStr),
		childView: AppCfgItemView,
		childViewContainer: "tbody"
	});
	
	
	
	var ServerAppCongfigLayout =  Marionette.LayoutView.extend({
		initialize:function(option){
			this.queryString = option.queryString ;
			var uploadCfgAuthFlag = authCheck.getUploadCfgFlag() ;
			this.model = new Backbone.Model({"uploadCfgAuthFlag":uploadCfgAuthFlag}) ;
			this.on("showPageInfo",this.showPageInfoIndex) ;
		},
		template:_.template(layoutTmpStr),
		events:{
			"click td.fileNameTd span.file_dir_icon" :"goToChildPath",
			"click #appCfgBackParentPathBtn": "backParentPath",
			"click td.downloadAppCfgTd a" : "downloadAppCfg",
			"click #uploadAppCfgBtn":"uploadAppCfg",
			"click #toLastPageBtn" : "toLastPage"
		},
		toLastPage:function(){
			var serverId = this.queryString.serverId ;
			var jString = {"serverId":serverId} ;
			appRouter.navigate("deployMgr/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
		},
		regions: {
			baseInfoRegion:"#baseInfoRegion",
			tipInfoRegion:"#tipInfoRegion",
			currentDirRegion:"#currentDirRegion",
			listRegion:"#listRegion",
			pagebarRegion:"#pagebarRegion"
		},
		uploadAppCfg:function(){//上传配置文件
			var flag = this.checkUploadFile() ;
			if(flag){
				flag = this.checkRegistryRun() ;
			}
			if(flag){
				this.ajaxFileUpload() ;
			}
		},
		checkRegistryRun:function(){//检查注册库服务器是否正常运行
			var flag = false;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/checkRegistryStatus.action" ;
			var ajaxing = util.dealSYNCHAjaxRequestWithoutParam(serverURL) ;
			var self = this ;
			$.when(ajaxing).done(function(data){
				if(data.flag == "true"){
				    if(data.status=="1"){
						flag = true ;
					}else{
						var tv = new ItemTipView() ;
						tv.model.set("flag","false") ;
						tv.model.set("msg",data.errMsg) ;
						self.tipInfoRegion.show(tv) ;
					}
				}else{
					var tv = new ItemTipView() ;
					tv.model.set("flag","false") ;
					tv.model.set("msg",data.errMsg) ;
					self.tipInfoRegion.show(tv) ;
				}
			}) ;
			return flag ;
		},
		checkUploadFile:function(){
			var flag = false;
			var $inputfile = $("#inputfile") ;
			var fileName = $.trim($inputfile.val()) ;
			var len = fileName.length ;
			var ind = fileName.lastIndexOf(".") ;
			var fileExt = fileName.substring((ind+1),len) ;
			if(len>0&&ind>0){
				if(fileExt=="properties"||fileExt=="txt"||fileExt=="xml"||fileExt=="cfg"||fileExt=="drl"){
					flag = true ;
				}
			}
			if(!flag){
				var tv = new ItemTipView() ;
				tv.model.set("flag","false") ;
				tv.model.set("msg","上传文件类型有误!") ;
				this.tipInfoRegion.show(tv) ;
			}else{
				var target = $inputfile[0] ;
				flag = util.checkFileSize(target,1) ;
			}
			
			return flag ;
			
		},
		ajaxFileUpload : function() {
			var self = this ;
			var hiddenCurrentCfgPath = $("#hiddenCurrentCfgPath").val() ;
			var serverName = this.queryString.serverName ;
			$.ajaxFileUpload({
                url: '/'+jcfManager.appName+'/deployMgr/uploadAppConfigFile.action', //用于文件上传的服务器端请求地址
                type: 'post',
                data: {'serverName':''+serverName,"currentCfgPath":hiddenCurrentCfgPath}, //此参数非常严谨，写错一个引号都不行
                secureuri: false, //一般设置为false
                fileElementId: 'inputfile', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: 'JSON', //返回值类型 一般设置为json
                success: function (data, status){  //服务器成功响应处理函数
                   var result = $.parseJSON($(data).text());
                   if(result.flag=="true"){
                	  self.showPageInfoIndex() ;
                   }else{
                	  alert("上传失败!") ;
                   }
                },
                error: function (data, status, e){//服务器响应失败处理函数
                    alert(e);
                }
             });
            return false;
	    },
		showPageInfoIndex:function(){
			var jsParam = this.queryString ;
			//当前配置文件所在的目录
			var tempStr = this.queryString.currentCfgPath ;
			var dd = "" ;
			if(tempStr==undefined||tempStr==null||$.trim(tempStr).length==0){
				dd = "" ;
			}else{
				dd = decodeURIComponent(tempStr) ;
			}
			jsParam.currentCfgPath =  dd   ;
			this.showPageInfo(jsParam) ;
		},
		showPageInfo:function(jsParam){
			var self = this ;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/getPageConfigFile.action" ;
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			$.when(ajaxing).done(function(data){
				var tempStr = data.curFilepPath ;
				var ee = encodeURIComponent(tempStr) ;
				self.queryString.currentCfgPath = ee ;
				self.queryString.backOrSubstrateDirFlag = "" ;
				appRouter.navigate("deployMgr/server/appConfig/param/" + QueryString.stringify(self.queryString)) ;
				//显示基本信息
				var baseModel = new Backbone.Model(data.baseInfo) ;
				baseModel.set("appName",data.appName) ;
				baseModel.set("appVersion",data.appVersion) ;
				var baseView = new ServerBaseInfoView({model:baseModel}) ;
				self.baseInfoRegion.show(baseView) ;
				//当前目录视图
				var curPathModel = new Backbone.Model({"curFilepPath":data.curFilepPath}) ;
				var curPathView = new CurrentPathView({model:curPathModel}) ;
				self.currentDirRegion.show(curPathView) ;
				//分页列表视图
				var collection = new Backbone.Collection(data.pageBean.recordList) ;
				var listView = new AppCfgListView({collection:collection}) ;
				self.listRegion.show(listView) ;
				//分页栏视图
				var model = new Backbone.Model(data.pageBean) ;
				model.set("uriSection","server/appConfig") ;
				delete self.queryString.backOrSubstrateDirFlag ;
				delete self.queryString.clickPathName ;
				var pb = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pb) ;
			}) ;
		},
		goToChildPath:function(e){//进入子目录
			var $span = $(e.target) ;
			var clickPathName = $.trim($span.text()) ;
			var backOrSubstrateDirFlag = "next" ;
			this.showDirList(backOrSubstrateDirFlag, clickPathName) ;
		},
		backParentPath:function(){
			var backOrSubstrateDirFlag = "back" ; 
			var clickPathName = "parent" ; 
			this.showDirList(backOrSubstrateDirFlag, clickPathName) ;
		},
		showDirList:function(backOrSubstrateDirFlag,clickPathName){//返回上层目录或则，进入下层目录
			var jsParam = this.queryString ;
			var hiddenCurrentCfgPath = $("#hiddenCurrentCfgPath").val() ;
			//var currentCfgPath = encodeURIComponent(hiddenCurrentCfgPath) ;
			var currentCfgPath = hiddenCurrentCfgPath ;
			jsParam.currentCfgPath = currentCfgPath ;
			jsParam.backOrSubstrateDirFlag = backOrSubstrateDirFlag ;
			jsParam.clickPathName = clickPathName ;
			this.showPageInfo(jsParam) ;
	    },
	    downloadAppCfg:function(e){
	    	e.preventDefault() ;
	    	var $a = $(e.target) ;
	    	var downloadFileName  = $a.attr("href") ;
	    	var serverName = this.queryString.serverName ;
	    	var currentDirPath4AppCfg = $.trim($("#hiddenCurrentCfgPath").val()) ;
	    	var serverURL = "/"+jcfManager.appName+"/deployMgr/downloadAppConfigFile.action" ;
	    	var form=$("<form>");//定义一个form表单
	    	form.attr("style","display:none");
	    	form.attr("target","");
	    	form.attr("method","post");
	    	form.attr("action",serverURL);
	    	var input1=$("<input>");
	    	input1.attr("type","hidden");
	    	input1.attr("name","exportData");
	    	input1.attr("value",(new Date()).getMilliseconds());
	    	var input2 = $("<input type = 'hidden' name = 'serverName' value = '"+serverName+"' />") ;
	    	var input3 = $("<input type = 'hidden' name = 'downloadFileName' value = '"+downloadFileName+"' />") ;
	    	var input4 = $("<input type = 'hidden' name = 'currentDirPath4AppCfg' value = '"+currentDirPath4AppCfg+"' />") ;
	    	$("body").append(form);//将表单放置在web中
	    	form.append(input1);
	    	form.append(input2);
	    	form.append(input3);
	    	form.append(input4);
	    	form.submit();//表单提交
	    }
		
	}) ;
	
	return ServerAppCongfigLayout ;
});