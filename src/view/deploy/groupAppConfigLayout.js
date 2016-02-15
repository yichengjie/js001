/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-3-15
 * Time: 下午03:25:28
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var util = require("../../util/CommonUtil") ;
	var layoutTmpStr = require('../../template/deploy/serverAppConfigLayout.tpl');
	var baseInfoTmpStr = require("../../template/deploy/groupAppCfgBaseInfo.tpl") ;
	var currentPathTmpStr = require("../../template/deploy/serverAppCfgCurPath.tpl") ;
	
	var itemTmpStr = require("../../template/deploy/serverAppCfgItem.tpl") ;
	var listTmpStr = require("../../template/deploy/serverAppCfgList.tpl") ;
	var PagebarView = require("../pagebar_view2") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	var QueryString = require('querystring');
	//ajax文件上传组件
	require("ajaxfileupload") ;
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
		 } ,
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
	
	
	var GroupAppCongfigLayout =  Marionette.LayoutView.extend({
		initialize:function(option){
			this.queryString = option.queryString ;
			this.on("showPageInfo",this.showPageInfo) ;
			var uploadCfgAuthFlag = authCheck.getUploadCfgFlag() ;
			
			this.model = new Backbone.Model() ;
			this.model.set("uploadCfgAuthFlag",uploadCfgAuthFlag) ;
		},
		template:_.template(layoutTmpStr) ,
		regions: {
			baseInfoRegion:"#baseInfoRegion",
			tipInfoRegion:"#tipInfoRegion",
			currentDirRegion:"#currentDirRegion",
			listRegion:"#listRegion",
			pagebarRegion:"#pagebarRegion"
		},
		events:{
			"click td.fileNameTd span.file_dir_icon" :"goToChildPath",
			"click #appCfgBackParentPathBtn": "backParentPath",
			"click td.downloadAppCfgTd a" : "downloadAppCfg",
			"click #uploadAppCfgBtn":"uploadAppCfg",
			"click #toLastPageBtn" : "toLastPage"
		},
		toLastPage:function(){
			var groupId = this.queryString.groupId ;
			var status = this.queryString.status ;
			var jString = {"groupId":groupId,"status":status} ;
			appRouter.navigate("deployMgr/group/param/" + QueryString.stringify(jString),{trigger:true}) ;
			//window.history.back() ;
		},
		showPageInfo :function(){//显示信息
			var appName = this.queryString.appName ;
			var appVersion = this.queryString.appVersion ;
			var groupId = this.queryString.groupId ;
			var serverId = this.queryString.serverId ;
			var currentPage = this.queryString.currentPage ;
			var pageSize = this.queryString.pageSize ;
			if(currentPage==undefined ||currentPage =="" ){
				currentPage = 1 ;
				pageSize = jcfManager.defaultPageSize ;
			}
			var jsParam = {} ;
			jsParam.appName = appName ;
			jsParam.appVersion = appVersion ;
			jsParam.groupId = groupId ;
			jsParam.serverId = serverId ;
			jsParam.currentPage = currentPage ;
			jsParam.pageSize = pageSize ;
			//当前配置文件所在的目录
			var tempStr = this.queryString.currentCfgPath ;
			var dd = "" ;
			if(tempStr==undefined||tempStr==null||$.trim(tempStr).length==0){
				dd = "" ;
			}else{
				dd = decodeURIComponent(tempStr) ;
			}
			jsParam.currentCfgPath =  dd   ;
			this.showPageInfo4Private(jsParam) ;
		},
		showPageInfo4Private:function(jsParam){//内部使用方法
			delete jsParam.status ;
			var self = this ;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/getConfigFileList4Group.action" ;
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam) ;
			$.when(ajaxing).done(function(data){
				var tempStr = data.curFilepPath ;
				var ee = encodeURIComponent(tempStr) ;
				self.queryString.currentCfgPath = ee ;
				self.queryString.backOrSubstrateDirFlag = "" ;
				appRouter.navigate("deployMgr/group/appConfig/param/" + QueryString.stringify(self.queryString)) ;
				//显示基本信息
				var baseModel = new Backbone.Model(data.baseInfo) ;
				baseModel.set("appName",data.appName) ;
				baseModel.set("appVersion",data.appVersion) ;
				baseModel.set("serverName",data.serverName) ;
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
				model.set("uriSection","group/appConfig") ;
				delete self.queryString.backOrSubstrateDirFlag ;
				delete self.queryString.clickPathName ;
				var pb = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pb) ;
			}) ;
			
		},
		checkUploadCfg:function(){
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
				tv.model.set("msg","上传文件格式有误!") ;
				this.tipInfoRegion.show(tv) ;
			}else{
				var target = $inputfile[0] ;
				flag = util.checkFileSize(target,1) ;
			}
            return flag;
		},
		uploadAppCfg:function(){//组上传配置文件
			var flag = this.checkUploadCfg() ;
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
		ajaxFileUpload:function(){
			var self = this ;
			var hiddenCurrentCfgPath = $("#hiddenCurrentCfgPath").val() ;
			var groupId = this.queryString.groupId ;
			$.ajaxFileUpload({
                    url: '/'+jcfManager.appName+'/deployMgr/uploadAppConfigFile4Group.action', //用于文件上传的服务器端请求地址
                    type: 'post',
                    data: {'groupId':''+groupId,"currentCfgPath":hiddenCurrentCfgPath}, //此参数非常严谨，写错一个引号都不行
                    secureuri: false, //一般设置为false
                    fileElementId: 'inputfile', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                    dataType: 'JSON', //返回值类型 一般设置为json
                    success: function (data, status){  //服务器成功响应处理函数
                    	var result = $.parseJSON($(data).text());
                    	if(result.flag=="true"){
                    		self.showPageInfo() ;
                    	}else{
							var tv = new ItemTipView() ;
							tv.model.set("flag","false") ;
							tv.model.set("msg",""+result.errMsg) ;
							self.tipInfoRegion.show(tv) ;
                    		//alert(result.errMsg) ;
                    	}
                    },
                    error: function (data, status, e){//服务器响应失败处理函数
                        alert(e);
                    }
            }) ;
			
		},
		showDirList:function(backOrSubstrateDirFlag,clickPathName){//返回上层目录或则，进入下层目录
			var jsParam = this.queryString ;
			jsParam.backOrSubstrateDirFlag = backOrSubstrateDirFlag ;
			jsParam.clickPathName = clickPathName ;
			var hiddenCurrentCfgPath = $("#hiddenCurrentCfgPath").val() ;
			//var currentCfgPath = encodeURIComponent (hiddenCurrentCfgPath) ;
			var currentCfgPath = hiddenCurrentCfgPath ;
			jsParam.currentCfgPath = currentCfgPath ;
			this.showPageInfo4Private(jsParam) ;
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
	    downloadAppCfg:function(e){
	    	e.preventDefault() ;
	    	
	    	var $a = $(e.target) ;
	    	var downloadFileName  = $a.attr("href") ;
	    	var serverName = $("#hiddenServerId").val() ;
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
	
	return GroupAppCongfigLayout ;

});