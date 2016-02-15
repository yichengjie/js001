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
	var itemTmpStr = require("../../template/deploy/groupDeployNewDeployItem.tpl") ;
	var listTmpStr = require("../../template/deploy/groupDeployNewDeployList.tpl") ;
	var layoutTmpStr = require("../../template/deploy/groupDeployTabCreateNewDeploy.tpl") ;
	var util = require("../../util/CommonUtil") ;
	var PagebarView = require("../pagebar_view2") ;
	var QueryString = require('querystring');
	var sidbarUtil = require("../../util/SidebarUtil") ;
	//应用配置日志列表视图
	var GroupDeployAppLogCfgLayout = require("./groupDeployAppLogCfgLayout") ;
	var inputCheckUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	var authCheck = require("./AuthCheck4DeployUtil") ;
	var AlertView = require("../alert_view") ;
	var ConfirmView = require("../confirm_view") ;
	var ConfirmModel = require("../../model/confirm_model") ;
	//点击下一步，选择要部署的服务器，显示页面
	//var GroupDeployNewDeployNextLayout = require("./groupDeployNewDeployNext") ;
	
	
	
	
	var ItemView = Marionette.ItemView.extend({
		template:_.template(itemTmpStr) ,
		tagName: "tr"
	});
	
	var ListView = Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  template: _.template(listTmpStr) ,
		  childView: ItemView,
		  childViewContainer: "tbody"
	});
	
	
	//点击下一步，选择要部署的服务器，显示页面
	var serverItemTmpStr =  require("../../template/deploy/groupDeployNewDeployServerSelectItem.tpl");
	var serverListTmpStr = require("../../template/deploy/groupDeployNewDeployServerSelectList.tpl") ;
	var ServerItemView = Marionette.ItemView.extend({
		template:_.template(serverItemTmpStr) ,
		tagName: "tr",
		events:{
			"click input:checkbox[name='serverIds']":"selectServer"
		},
		selectServer:function(e){
			var $tbody = $(e.target).parent("td").parent("tr").parent("tbody") ;
			var $allCbox = $tbody.find("input:checkbox[name='serverIds']") ;
			var $selCbox = $tbody.find("input:checkbox[name='serverIds']:checked") ;
			var len1 = $allCbox.length ;
			var len2 = $selCbox.length ;
			if(len1==len2){
				$("#allSelected4Server").prop("checked",true) ;
			}else{
				$("#allSelected4Server").prop("checked",false) ;
			}
		}
	});
	
	var ServerListView = Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  template: _.template(serverListTmpStr) ,
		  childView: ServerItemView,
		  childViewContainer: "tbody",
		  events:{
			  "click #allSelected4Server":"checkedAll"
		  },
		  checkedAll:function(e){
			  var $checkAll = $(e.target) ;
			  var flag = e.target.checked ;
			  var $tbody = $checkAll.parent("th").parent("tr").parent("thead").siblings("tbody") ;
			  var $cbox =  $tbody.find("input:checkbox[name='serverIds']") ;
			  $cbox.each(function(){
				 this.checked = flag ;
			  }) ;
		  }
	});
	
	//部署管理
	//---群组管理
	//------新建部署
	var CreateNewDeployTabLayout = Marionette.LayoutView.extend({
		template: _.template(layoutTmpStr),
		initialize:function(options){
			this.queryString = options.queryString ;
			var authAppLogOperFlag = authCheck.getAppLogOperFlag() ;
			this.model.set("authAppLogOperFlag",authAppLogOperFlag) ;
			this.on("searchListInfo",this.searchListInfo) ;
		},
		regions: {
		  listRegion: "#listRegion",
		  pagebarRegion: "#pagebarRegion",
		  serverListRegion:"#serverListRegion"
	    },
	    events:{
	    	"click #groupServerCfgNextStepBtn":"groupServerCfgNextStep",
	    	"click #backStep4SelectAppBtn" : "backStep4SelectApp",
	    	"click #nextStep4ConfigAppLogBtn" : "nextStep4ConfigAppLog",
	    	"click #appCfgApplyBtn" : "appCfgApply",
	    	"click #appCfgBackBtn" : "appCfgBack",
	    	"click #appCfgNextBtn" : "appCfgNext",
	    	"blur #groupAppName" : "checkGroupAppName" ,
	    	"blur #appConfigFileName":"checkAppConfigFileName",
	    	"blur #logSavePath" : "checkLogSavePath",
	    	"blur #maxLogFileSize" : "checkMaxLogFileSize",
	    	"blur #logFileMaxBackupIndex" :"checkLogFileMaxBackupIndex",
	    	"click #selectRunning" : "checkSelectRunning",
	    	"blur #maxRunningLogFileSize" : "checkMaxRunningLogFileSize",
	    	"blur #runningLogFileMaxBackupIndex" : "checkRunningLogFileMaxBackupIndex",
	    	"blur #runningLogSavePath" : "checkRunningLogSavePath"
	    	
	    },
	    checkSelectRunning:function(){
	    	var runFlag = $("#selectRunning").prop("checked") ;
	    	if(!runFlag){
	    		inputCheckUtil.clearInput("maxRunningLogFileSize") ;
	    		inputCheckUtil.clearInput("runningLogFileMaxBackupIndex") ;
	    		inputCheckUtil.clearInput("runningLogSavePath") ;
	    	}
	    },
	    appCfgApply:function(inFlag){//应用日志配置---应用按钮点击
	    	//名称不相同并且不为null
	    	var	flag = this.checkLogForm() ;
	    	var runningCheckFlag =  $("#selectRunning").prop("checked") ;
	    	if (runningCheckFlag){
	    		if(flag){
	    			flag = this.checkRunningLogForm() ;
	    		}
	    	}
	    	if(flag){//如果表单验证都通过
	    		$("#appCfgApplyBtn").addClass("disabled") ;
	    		this.submitCfgForm(inFlag) ;
	    	}
	    },
	    checkLogForm:function(){////检查应用日志信息
	    	if (this.checkGroupAppName()&&this.checkAppConfigFileName()&&this.checkLogSavePath()
	    			&&this.checkMaxLogFileSize()&& this.checkLogFileMaxBackupIndex()){
	    		return true;
	    	}
	    	return false;
	    },
	    checkRunningLogForm:function(){
	    	if (this.checkRunningLogSavePath()&&this.checkMaxRunningLogFileSize()
	    			&&this.checkRunningLogFileMaxBackupIndex()){
	    		return true;
	    	}
	    	return false;
	    },
	    submitCfgForm:function(showNextFlag){//保存页面填写的配置文件信息
	    	var serverURL = "/"+jcfManager.appName+"/log/saveAppCfgLog.action" ;
	    	var formIds = ["groupAppName","appConfigFileName","logSavePath","maxLogFileSize",
	    	               "logFileMaxBackupIndex","logLevel","logAppenderType",
	    	               "runningLogSavePath","maxRunningLogFileSize","runningLogFileMaxBackupIndex"] ;
	    	
	    	//var audit = "" ;
	    	var running = "" ;
	    	var runFlag = $("#selectRunning").prop("checked") ;
	    	if(runFlag){
	    		running = $("#selectRunning").val()
	    	}
	    	var jsParam = util.getFormInputObj(formIds) ;
	    	var groupId = this.queryString.groupId ;
	    	jsParam.groupId = groupId ;
	    	//jsParam.audit = audit ;
	    	jsParam.running = running ;
			var self = this ;
	    	var ajaxing = util.dealAjaxRequest4JSObj(serverURL,jsParam); 
	    	$("#isSubmitFormFlag").val("true") ;
			var alertView = new AlertView() ;
	    	$.when(ajaxing).done(function(data){
	    		var res = "";
				for (var element in data) {
					if (data[element] === "0"){
						res = element + "配置失败,";
					}
				}
				if (res === ""){
					alertView.model.set("msg","日志配置成功!") ;
					jcfManager.dialogRegion.show(alertView) ;
					if(showNextFlag==true){//如果是直接点击下一步来的，则要显示下一页
						self.showAppLogList() ;
					}
				}else{
					alertView.model.set("msg",res) ;
					jcfManager.dialogRegion.show(alertView) ;
				}
	    	}) ;
	    },
	    checkGroupAppName:function(){
	    	var id = "groupAppName" ;
	    	var maxLength = 30 ;
	    	var flag = inputCheckUtil.checkInputMatchMaxLength(id,maxLength) ;
	    	return flag
	    },
	    checkAppConfigFileName:function(){//检查应用日志配置文件名称
	    	var id = "appConfigFileName" ;
	    	 var groupId = this.queryString.groupId ;
	    	 var appConfigFileName = $("#"+id).val();
	    	 var checkFlag = false;
	    	 var flag = inputCheckUtil.checkNotNull(id) ;
	    	 if(flag){
	    		 var serverURL = "/"+jcfManager.appName+"/log/haveSameFileName.action" ;
		    	 var jsonParam = {"groupId":groupId,"appConfigFileName":appConfigFileName} ;
		    	 var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
		    	 $.when(ajaxing).done(function(data){
		    		 if(data.flag == "true"){
		    			checkFlag = confirm("存在配置文件，是否确认覆盖") ;
		 			 }else{
		 				checkFlag = true;
		 			 }
		    	 }) ;
	    	 }
	    	 return checkFlag;
	    },
	    checkLogSavePath:function(){//检查应用日志存放路径
	    	var id = "logSavePath" ;
	    	var maxLength = 200 ;
	    	var regular =/^\w+(\/\w+)*$/ ;
			var errTip = "存储路径设置不正确" ;
	    	var flag = inputCheckUtil.checkInputMatchRegularAndNotNull(id, maxLength, regular, errTip) ;
	    	return flag;
	    },
	    checkMaxLogFileSize:function(){//检查应用日志文件最大大小
	    	var id = "maxLogFileSize" ;
	    	var maxLength = 10 ;
	    	var regular = /^[1-9]\d*[kKmMgG][bB]$/ ;
	    	var errTip = "单位为kb,KB,mb,MB,gb,GB" ;
	    	var flag = inputCheckUtil.checkInputMatchRegularAndNotNull(id,maxLength,regular,errTip) ;
	    	return flag ;
	    },
	    checkLogFileMaxBackupIndex:function(){
	    	var id = "logFileMaxBackupIndex" ;
	    	var maxLength = 10 ;
	    	var flag = inputCheckUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
	    	return flag;
	    },
	    checkMaxRunningLogFileSize:function(){
	    	var id = "maxRunningLogFileSize" ;
	    	var cflag = $("#selectRunning").prop("checked") ;
	    	var flag = true ;
	    	if(cflag){
	    		var maxLength = 10 ;
		    	var regular = /^[1-9]\d*[kKmMgG][bB]$/ ;
		    	var errTip = "单位为kb,KB,mb,MB,gb,GB" ;
		    	flag = inputCheckUtil.checkInputMatchRegularAndNotNull(id,maxLength,regular,errTip) ;
	    	}else{
	    		inputCheckUtil.clearInput(id) ;
	    	}
	    	return flag ;
	    },
	    checkRunningLogFileMaxBackupIndex:function(){
	    	var id = "runningLogFileMaxBackupIndex" ;
	    	var cflag = $("#selectRunning").prop("checked") ;
	    	var flag = true ;
	    	if(cflag){
	    		var maxLength = 10 ;
		    	flag = inputCheckUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
	    	}else{
	    		inputCheckUtil.clearInput(id) ;
	    	}
	    	return flag ;
	    },
	    checkRunningLogSavePath:function(){
	    	var id = "runningLogSavePath" ;
	    	var cFlag = $("#selectRunning").prop("checked") ;
	    	var flag = true;
	    	if(cFlag){
	    		var maxLength = 200 ;
	    		var regular =/^\w+(\/\w+)*$/ ;
				var errTip = "存储路径设置不正确" ;
		    	flag = inputCheckUtil.checkInputMatchRegularAndNotNull(id, maxLength, regular, errTip) ;
	    	}else{
	    		inputCheckUtil.clearInput(id) ;
	    	}
	    	return flag; 
	    },
	    appCfgBack:function(){
	    	this.$el.find("#page2").removeClass("hidden") ;
	    	this.$el.find("#page3").addClass("hidden") ;
	    },
	    appCfgNext:function(){
	    	//显示应用配置文件列表前，将页面填写信息保存到session中
	    	var submitFlag = $("#isSubmitFormFlag").val() ;
			var confirmModel = new ConfirmModel() ;
			confirmModel.set({"btnok":"保存","btncl":"不保存","msg":"是否需要保存保存信息?"}) ;
			var confirmView  = new ConfirmView({model:confirmModel}) ;
			var self = this ;
	    	if("true"==submitFlag){
	    		this.showAppLogList() ;
	    	}else{
				jcfManager.dialogRegion.show(confirmView) ;
				confirmView.confirm(function(retFlag){
					if(retFlag){//保存配置文件
						self.appCfgApply(true) ;
					}else{//放弃保存
						self.showAppLogList() ;
					}
				}) ;
	    	}
	    },
	    backStep4SelectApp:function(){//选择服务器页面返回上个选择应用页面
	    	this.$el.find("#page1").removeClass("hidden") ;
	    	this.$el.find("#page2").addClass("hidden") ;
	    },
	    nextStep4ConfigAppLog:function(){//下一步配置应用日志
	    	var $page2 = this.$el.find("#page2") ;
	    	var $servers = $page2.find("#serverListRegion").find("input:checkbox[name='serverIds']:checked") ;
	    	var alertView = new AlertView() ;
			if($servers.length==0){
				alertView.model.set("msg","请选择服务器!") ;
				jcfManager.dialogRegion.show(alertView) ;
	    		//alert("请选择服务器!") ;
	    	}else{
	    		var cfgFlag = $page2.find("input:radio[name='cfgLogFlag']:checked").val() ;
		    	if(cfgFlag=="true"){
		    		this.$el.find("#page2").addClass("hidden")  ;
		    		this.$el.find("#page3").removeClass("hidden")  ;
		    	}else{
		    		//显示应用配置文件列表前，将页面填写信息保存到session中
		    		this.showAppLogList() ;
		    	}
	    	}
	    },
	    showAppLogList:function(){//显示应用日志列表页面
	    	//第一步:获取选中的app信息
	    	var $listRegion = this.$el.find("#page1 #listRegion") ;
	    	var $radio = $listRegion.find("input:radio.appTagClass[name='appId']:checked") ;
	    	var appId = $.trim($radio.val()) ;
	    	//第二步:获取选中的所有服务器
	    	var serverIds = "";//拼接字符串逗号','分割
	    	var $page2 = this.$el.find("#page2") ;
	    	var $servers = $page2.find("#serverListRegion").find("input:checkbox[name='serverIds']:checked") ;
	    	$servers.each(function(){
	    		var curVal = $(this).val() ;
	    		serverIds += curVal ;
	    		serverIds += "," ;
	    	}) ;
	    	if($servers.length>0){
	    		serverIds = serverIds.substring(0, (serverIds.length-1)) ;
	    	}
	    	//修改地址栏地址
	    	var param = {"groupId":this.queryString.groupId,"appId":appId,"serverIds":serverIds,
	    			"currentPage":"1","pageSize":jcfManager.defaultPageSize} ;
	    	var modelName = sidbarUtil.getModuleName() ;
	    	appRouter.navigate(modelName +"/group/appLogCfg/param/" + QueryString.stringify(param)) ;
	    	var cfgLogLayout = new GroupDeployAppLogCfgLayout({queryString:param}) ;
	    	jcfManager.contentRegion.show(cfgLogLayout) ;
	    	cfgLogLayout.trigger("showPageInfo") ;
	    },
	    groupServerCfgNextStep:function(){//点击下一步显示，选择服务器的页面
	    	var $listRegion = this.$el.find("#page1 #listRegion") ;
	    	var $radio = $listRegion.find("input:radio.appTagClass[name='appId']:checked") ;
	    	var appId = $.trim($radio.val()) ;
	    	var appName = $.trim($radio.attr("title")) ;
			var appVersion = $.trim($radio.attr("appVersion")) ;
			var alertView = new AlertView() ;
			//将选中的应用保存起来后面，填写日志时会使用
			//获取选中的应用名称，应用version
			var ttStr = appName+"_"+appVersion ;
			$("#groupAppName").val(ttStr) ;
	    	if(appId.length==0){
				alertView.model.set("msg","请选择有效应用!") ;
				jcfManager.dialogRegion.show(alertView) ;
	    	}else{
	    		this.$el.find("#page1").addClass("hidden") ;
	    	    this.$el.find("#page2").removeClass("hidden") ;
	    	}
	    },
	    searchListInfo:function(){
	    	var self = this ;
			var serverURL = "/"+jcfManager.appName+"/deployMgr/mSearchApp.action" ;
			var jsonParam = {"groupId":this.queryString.groupId,"currentPage":this.queryString.currentPage,"pageSize":this.queryString.pageSize} ;
			var ajaxing = util.dealAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				//------------------显示页面第一部分//应用列表页面---------------//
				var pageBean = data.pageBean ;
				var model = new Backbone.Model(pageBean) ;
				var collection = new Backbone.Collection(pageBean.recordList) ;
				//显示列表区
				var listView = new ListView({collection:collection}) ;
				self.listRegion.show(listView) ;
				//显示分页栏区
				model.set("uriSection","group") ;
				var pb = new PagebarView({model:model,queryString:self.queryString}) ;
				self.pagebarRegion.show(pb) ;
				//------------------显示页面第二部分//服务器列表页面---------------------//
				var slCollection = new Backbone.Collection(data.serverList) ;
				var serverListView = new ServerListView({collection:slCollection}) ;
				self.serverListRegion.show(serverListView) ;
				//------------------显示页面第三部分//日志配置页面---------------------//
			}) ;
	    }
	});
	
	return CreateNewDeployTabLayout ;


});
