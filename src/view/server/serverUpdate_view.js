/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-6
 * Time: 下午01:09:59
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var serverUpdateTemplateStr = require("../../template/server/serverUpdate.tpl") ;
	var ServerUtil = require("./server") ;
	var ServerInputCheck = require("./serverInputCheck") ;
	var util = require("../../util/CommonUtil") ;
	var sidbarUtil = require("../../util/SidebarUtil") ;
	var QueryString = require('querystring');
	var AlertView = require("../alert_view") ;
	var ConfirmView = require("../confirm_view") ;
	var WaitingView = require("../waiting_view") ;
	
	//服务器更新
	var ServerUpdateView = Marionette.ItemView.extend({
		template: _.template(serverUpdateTemplateStr),
		initialize:function(){
			$.extend(this,new ServerInputCheck()) ;
		},
		events: {
	    	"click #updateContextServerInfoBtn":"updateContextServerInfo",
	    	"click #updateRegistryServerInfoBtn":"updateRegistryServerInfo",
	    	"click #updateJCFServerInfoBtn":"updateJCFServerInfo",
	    	"click #updateJCFCacheServerInfoBtn":"updateJCFCacheServerInfo",
	    	
	    	"blur #rmiRegistryPort" : "checkServerManagePort4Update",
	    	"blur #rmiServerPort" : "checkServerDeployPort4Update",
	    	"blur #httpPort" : "checkHttpPort4Update",
	    	"blur #sshPort" : "checkSshPort4Update",
	    	"blur #java_Memory" : "checkjava_Memory",
	    	"blur #java_Max_Perm_Mem" : "checkjava_Max_Perm_Mem",//java_Perm_Mem
	    	"blur #java_Perm_Mem" : "checkjava_Max_Perm_Mem",
	    	"blur #direct_mem_size":"checkdirect_mem_size",
	    	"blur #gcFileNum" : "checkgcFileNum",
	    	"blur #gcFileSize" : "checkgcFileSize",
	    	"blur #bindPort" : "checkBindPort4Update",
	    	"blur #loadFactor" : "checkloadfactor",
	    	"blur #memoryPoolSize" : "checkMemoryPoolSize",
	    	"blur #blockSize" : "checkBlockSize",
	    	"blur #heapMessageLimit" : "checkHeapMessageLimit",
	    	"blur #channelQueueSize" : "checkchannelQueueSize",
	    	"blur #channelConcurrent" : "checkchannelConcurrent",
	    	"blur #connectionRetry" : "checkconnectionRetry",
	    	"blur #heartBeatTime" : "checkheartBeatTime",
	    	"blur #messageBodyLimit" : "checkmessageBodyLimit",
	    	"change #registryIp" : "getRegistryBindPort",
	    	"blur #registryPort" : "checkserverport",
	    	"blur #synchTime" : "checksynchtime",
	    	"blur #maxIdleTime" : "checkMaxidletime",
			"blur #persistQueueFullPath" : "checkpersistQueueFullPath",
			"change #registryIp" : "getRegistryBindPort",
			
			"blur #statisticsSyncTime" : "checkStatisticsSyncTime",
			"blur #statisticsPath" :"checkStatisticsPath" ,
			"blur #jvmHeapAlert" : "checkJvmHeapAlert",
			"blur #jvmHeapBlock" : "checkJvmHeapBlock" ,
			"blur #maxSize4Store" : "checkMaxSize4Store" ,//maxSize4Store//checkCacheNodeMaxCount
			"blur #cacheNodeAlert" : "checkCacheNodeAlert"
	    },
	    updateContextServerInfo:function(e){//上下文服务器更新操作//只有更新不存在参数配置
    		e.stopPropagation() ;
			e.preventDefault() ;
			var $btn = $(e.target) ;
			var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;	
			var formIds = ["serverId","serverCategory","serverName","rmiRegistryHost"] ;
			var formInputObj = util.getFormInputObj(formIds) ;
			var flag = this.checkContextFormSubmit() ;
			var modelName = sidbarUtil.getModuleName() ;
			var serverId = formInputObj.serverId ;
			if(flag){
				var cv = new ConfirmView() ;
				cv.model.set("msg","确定更新？") ;
				jcfManager.dialogRegion.show(cv) ;
				cv.confirm(function(myflag){
					if(myflag){
						$btn.addClass("disabled") ;
						var wv = new WaitingView() ;
						jcfManager.dialogRegion.show(wv) ;
						formInputObj.ynStart = "start" ;
						var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
						$.when(ajaxing).done(function(data){
							jcfManager.dialogRegion.empty() ;
							if(data.flag=="true"){
								util.alertEsg("保存信息成功!","true") ;
								var jString = {"serverId":serverId} ;
								appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
								//alert("更新成功!") ;
							}else{
								$btn.removeClass("disabled") ;
								var av = new AlertView() ;
								av.model.set("msg","更新失败!") ;
								jcfManager.dialogRegion.show(av) ;
							}
						});
					}
				}) ;
		  }
	    },
	    updateRegistryServerInfo:function(e){//注册库服务器更新
	    	e.stopPropagation() ;
			e.preventDefault() ;
			var modelName = sidbarUtil.getModuleName() ;
			var btnText = $(e.target).text() ;
			var formValidFlag = this.checkRegistryFormSubmit() ;
			//注册库表单ip数组
			var formIds = ["serverId","groupName","serverName","serverCategory", "rmiRegistryHost",
			               "rmiRegistryPort","rmiServerPort","sshPort","java_Memory","java_Perm_Mem",
			               "karaf_opts","heapDumpPath","gcFile","gcRotation","gcFileNum",
			               "gcFileSize","bindPort","synchTime","maxIdleTime","serverLogLevel","serverLogType"] ;
			var $btn = $(e.target) ;
			var formInputObj = util.getFormInputObj(formIds) ;
			var serverId = formInputObj.serverId ;
			if(formValidFlag){
				if("保存"==btnText){//修改配置时服务器状态不能为启动状态
					var serverURL = "/"+jcfManager.appName+"/server/updateServerConfig.action" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
					$btn.addClass("disabled") ;
					$.when(ajaxing).done(function(data){
						if(data.flag=="true"){
							util.alertEsg("保存信息成功!","true") ;
							var jString = {"serverId":serverId} ;
							appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
							//alert("保存信息成功!") ;
						}else{
							//$btn.removeClass("disabled") ;
							var av = new AlertView() ;
							av.model.set("msg","保存信息失败!") ;
							jcfManager.dialogRegion.show(av) ;
						}
					});
				}else if ("下一步"==btnText){//更新服务器时不检查服务器状态
					var flag2 = this.checkServerStatus() ;
					if(flag2){
						var cv = new ConfirmView() ;
						cv.model.set("msg","确定更新？") ;
						jcfManager.dialogRegion.show(cv) ;
						cv.confirm(function(myflag){
							if(myflag){
								var wv = new WaitingView() ;
								jcfManager.dialogRegion.show(wv) ;
								$btn.addClass("disabled") ;
								var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;
								formInputObj.ynStart = "start" ;
								var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
								$.when(ajaxing).done(function(data){
									jcfManager.dialogRegion.empty() ;
									if(data.flag=="true"){
										util.alertEsg("保存信息成功!","true") ;
										var jString = {"serverId":serverId} ;
										appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
									}else{
										$btn.removeClass("disabled") ;
										var av = new AlertView() ;
										av.model.set("msg","更新失败!") ;
										jcfManager.dialogRegion.show(av) ;
										//alert("更新失败") ;
									}
								});
							}
						}) ;
					}
				}
			}
	    },
	    updateJCFCacheServerInfo:function(e){//更新jcfCache服务器
	    	e.stopPropagation() ;
			e.preventDefault() ;
			var $btn = $(e.target) ;
			var modelName = sidbarUtil.getModuleName() ;
			var btnText = $(e.target).text() ;
			var formValidFlag = this.checkJcfCacheFormSubmit() ;
			var formIds = ["serverId","serverName","jvmMemory4Cache","serverCategory","rmiRegistryHost"
			              ,"serverLogLevel","serverLogType","statisticsSyncTime","statisticsPath"
			              ,"jvmHeapAlert","jvmHeapBlock","maxSize4Store","cacheNodeAlert","groupNameText"] ;
			var formInputObj = util.getFormInputObj(formIds) ;
			formInputObj.serverLogType4Cache = formInputObj.serverLogType ;
			var serverId = formInputObj.serverId ;
			if(formValidFlag){
				if("保存"==btnText){
					$btn.addClass("disabled") ;
					var serverURL = "/"+jcfManager.appName+"/server/updateServerConfig.action" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
					$.when(ajaxing).done(function(data){
						if(data.flag=="true"){
							util.alertEsg("保存信息成功!","true") ;
							var jString = {"serverId":serverId} ;
							appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
						}else{
							$btn.removeClass("disabled") ;
							util.alertEsg("保存信息失败!") ;
						}
					});
				}else if ("下一步"==btnText){
					var flag2 = this.checkServerStatus() ;
					if(flag2){//检查服务器是否处于停止状态
						if(confirm("确定更新？")){
							$btn.addClass("disabled") ;
							var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;
							formInputObj.ynStart = "start" ;
							var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
							$.when(ajaxing).done(function(data){
								if(data.flag=="true"){
									util.alertEsg("更新成功!","true") ;
									var jString = {"serverId":serverId} ;
									appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
								}else{
									$btn.removeClass("disabled") ;
									util.alertEsg("更新失败!") ;
								}
							});
						}
					}
				}
			}
	    	
	    },
	    updateJCFServerInfo:function(e){//jcf服务器更新
	    	e.stopPropagation() ;
			e.preventDefault() ;
			var $btn = $(e.target) ;
			var modelName = sidbarUtil.getModuleName() ;
			var btnText = $(e.target).text() ;
			var formValidFlag = this.checkJCFServerFormSubmit() ;
			//注册库表单ip数组
			var formIds = ["serverId","groupName","serverName","serverCategory","rmiRegistryHost",
			               "rmiRegistryPort","rmiServerPort","httpPort","sshPort","java_Memory",
			               "java_Max_Perm_Mem","karaf_opts","direct_mem_size","gcoptions","heapDumpPath",
			               "gcFile","gcRotation","gcFileNum","gcFileSize","bindPort",
			               "loadFactor","memoryPoolSize","blockSize","heapMessageLimit","channelQueueSize",
			               "channelConcurrent","connectionRetry","heartBeatTime", "messageBodyLimit","registryIp",
			               "registryPort","synchTime","auditLevel",
			               "persistQueueFullPath","serverLogLevel","serverLogType"] ;
			var formInputObj = util.getFormInputObj(formIds) ;
			var serverId = formInputObj.serverId ;
			if(formValidFlag){
				if("保存"==btnText){
					$btn.addClass("disabled") ;
					var serverURL = "/"+jcfManager.appName+"/server/updateServerConfig.action" ;
					var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
					$.when(ajaxing).done(function(data){
						if(data.flag=="true"){
							util.alertEsg("保存成功!","true") ;
							var jString = {"serverId":serverId} ;
							appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
						}else{
							$btn.removeClass("disabled") ;
							var av = new AlertView() ;
							av.model.set("msg","保存信息失败!") ;
							jcfManager.dialogRegion.show(av) ;
							//alert("保存信息失败") ;
						}
					});
				}else if ("下一步"==btnText){
						var flag2 = this.checkServerStatus() ;
						if(flag2){
							var cv = new ConfirmView() ;
							cv.model.set("msg","确定更新？") ;
							jcfManager.dialogRegion.show(cv) ;
							cv.confirm(function (myflag){
								if(myflag){
									$btn.addClass("disabled") ;
									var wv = new WaitingView() ;
									jcfManager.dialogRegion.show(wv) ;
									var serverURL = "/"+jcfManager.appName+"/server/addOrUpdateServer.action" ;
									formInputObj.ynStart = "start" ;
									var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formInputObj) ;
									$.when(ajaxing).done(function(data){
										jcfManager.dialogRegion.empty() ;
										if(data.flag=="true"){
											util.alertEsg("更新成功!","true") ;
											var jString = {"serverId":serverId} ;
											appRouter.navigate(modelName +"/server/param/" + QueryString.stringify(jString),{trigger:true}) ;
										}else{
											$btn.removeClass("disabled") ;
											var av = new AlertView() ;
											av.model.set("msg","更新失败!") ;
											jcfManager.dialogRegion.show(av) ;
											//alert("更新失败") ;
										}
									});
								}
							}) ;
						}
					}
			}
	    },
	    checkContextFormSubmit:function(){//检查上下文服务器是否符合提交表单要求
	    	var flag = this.checkServerStatus() ;
	    	return flag ;
	    },
	    checkRegistryFormSubmit:function(){//检查注册库服务器表单数据正确性
	    	if (this.checkServerManagePort4Update()&&this.checkServerDeployPort4Update()&&this.checkSshPort4Update()&&//
	    			this.checkBindPort4Update()&&this.checkjava_Memory()&& this.checkjava_Perm_Mem() && //
	    			this.checksynchtime()&&this.checkMaxidletime()){
	    		return true;
	    	}
	    	return false;
	    },
	    checkJCFServerFormSubmit:function(){//jcf服务器和adapter服务器相同
	    	if (this.checkServerManagePort4Update()&&this.checkServerDeployPort4Update()&&this.checkHttpPort4Update()&&this.checkSshPort4Update()&&//
	    		this.checkBindPort4Update()&&this.checkloadfactor()&&this.checkMemoryPoolSize()&&this.checkBlockSize()&& //
	    		this.checkHeapMessageLimit()&&this.checkchannelQueueSize()&&this.checkchannelConcurrent()&&this.checkconnectionRetry()&&//
	    		this.checkheartBeatTime()&&this.checkmessageBodyLimit()&&this.checksynchtime()&&this.checkserviceip()&&//
	    		this.checkserverport()&&this.checkjava_Memory()&&this.checkjava_Perm_Mem()){//
	    		return true;
	    	}
	    	return false;
	    },
	    checkJcfCacheFormSubmit:function(){
	    	if(this.checkStatisticsSyncTime()&&this.checkStatisticsPath()
	 			   &&this.checkJvmHeapAlert()&&this.checkJvmHeapBlock()&&this.checkMaxSize4Store()
	 			   &&this.checkCacheNodeAlert()){
	 			return true;
	 		}else{
	 			return false;
	 		}
	    },
	    checkServerStatus : function (){//检查服务器的状态
	    	var serverName = $("#serverName").val();
	    	var serverIp = $("#rmiRegistryHost").val();//服务器ip其实就是注册库IP一样
	    	var ajaxParam = {'serverName': serverName,'serverIp' : serverIp} ;
	    	var serverURL = "/"+jcfManager.appName+"/server/checkUpdateServer.action" ;
	    	var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,ajaxParam) ;
	    	var flag = false;
	    	$.when(ajaxing)
	    	 .done(function(result){
				if (result.isCanBeUpdate == "false"){
					var av = new AlertView() ;
					av.model.set("msg","服务器非停止或更新状态,禁止更新!") ;
					jcfManager.dialogRegion.show(av) ;
					//alert("服务器非停止或更新状态,禁止更新!");
					flag = false;
				}else if (result.isCanBeUpdate == "true"){
					flag = true;
				}else{
					var av = new AlertView() ;
					av.model.set("msg","请确保节点控制器正常运行!") ;
					jcfManager.dialogRegion.show(av) ;
					//alert("请确保节点控制器正常运行!");
					flag = false;
				}
	    	 }) ;
	    	return flag;
	    }
	});
	
	return ServerUpdateView ;

});
