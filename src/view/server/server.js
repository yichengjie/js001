/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-24
 * Time: 下午06:10:28
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var util = require("../../util/CommonUtil") ;
	var InputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	var AlertView = require("../alert_view") ;
	
	
	
	var ServerUtil = {
		getFormInputInfos:function(){
			var formIds = ["groupName","serverName","serverCategory",
			               "rmiRegistryHost","rmiRegistryPort","rmiServerPort",
			               "httpPort","sshPort","java_Memory",
			               "java_Max_Perm_Mem","karaf_opts","direct_mem_size",
			               "gcoptions","heapDumpPath","gcFile",
			               "gcRotation","gcFileNum","gcFileSize",
			               "bindPort","loadFactor","memoryPoolSize",
			               "blockSize","heapMessageLimit","channelQueueSize",
			               "channelConcurrent","connectionRetry","heartBeatTime",
			               "messageBodyLimit","registryIp","registryPort",
			               "synchTime","maxIdleTime","auditLevel","persistQueueFullPath",
				           "serverLogLevel","serverLogType","statisticsSyncTime","statisticsPath",
			 		       "jvmHeapAlert","jvmHeapBlock","maxSize4Store","cacheNodeAlert",
			               "serverLogType4Cache","jvmMemory4Cache"];
			var obj = {} ;
			for(var i = 0 ; i < formIds.length ;i ++){
				var curId = formIds[i] ;
				var val = $("#"+curId).val();
				var evalStr = "obj." +curId +"='" +val +"' ;"; 
				eval(evalStr) ;
			}
			//最后要重置一个属性
			obj.bindAddress = obj.rmiRegistryHost ;
			return obj ;
		},
		checkForm : function (){
			if ($("#serverCategory").val() === "1"){//jcf服务器
			   return this.checkJCFServerForm();
			}else if ($("#serverCategory").val() === "3"){//上下文服务器
			   return this.checkMemcacheServerForm();
			}else if ($("#serverCategory").val() === "4"){//服务库
			   return this.checkRegistryServerForm();
			}else if ($("#serverCategory").val() === "7"){
			   return this.checkCacheServerForm();
			}else{
			   return false;
			}
		},
		checkCacheServerForm:function(){//检查cache服务器表单数据
			var retInfo = {} ;
			retInfo.flag = false;
			if(this.checkServerName()&&this.checkStatisticsSyncTime()&&this.checkStatisticsPath()
			   &&this.checkJvmHeapAlert()&&this.checkJvmHeapBlock()&&this.checkMaxSize4Store()
			   &&this.checkCacheNodeAlert()){
				if(!this.checkJcfCacheServerExistByServerIp()){
					retInfo.flag = true;
					var inputObj = this.getFormInputInfos() ;
					retInfo.inputObj = inputObj ;
				}
			}
			return retInfo ;
		},
		checkJCFServerForm : function (){
			var retInfo = {} ;
			retInfo.flag = false;
			if (this.checkRmiRegistryHost()&&this.checkServerName()&&this.checkServerManagePort()&&this.checkServerDeployPort()//
					&&this.checkSshPort()&& this.checkHttpPort()&& this.checkBindPort()&&this.checkloadfactor()//
					&&this.checkMemoryPoolSize()&&this.checkBlockSize()&& this.checkHeapMessageLimit()//
					&&this.checkchannelQueueSize()&&this.checkchannelConcurrent()&&this.checkconnectionRetry()//
					&&this.checkheartBeatTime()&&this.checkmessageBodyLimit()&& this.checksynchtime()&&this.checkserviceip()//
					&&this.checkserverport()&&this.checkjava_Memory()&& this.checkjava_Max_Perm_Mem()&&this.checkmaxFileSize()//
					&&this.checkmaxBackupIndex()&&this.checkpersistQueueFullPath()){// jcf服务器
				retInfo.flag = true;
				var inputObj = this.getFormInputInfos() ;
				retInfo.inputObj = inputObj ;
				//return true;
			}
			//return false;
			return retInfo ;
		},
		checkRegistryServerForm: function (){
			var retInfo = {} ;
			retInfo.flag = false;
			if (this.checkRmiRegistryHost()&&this.checkRegServerIsExist()&&this.checkServerName()&&this.checkServerManagePort()//
					&&this.checkServerDeployPort()&&this.checkSshPort()&&this.checkBindPort()&&this.checksynchtime()//
					&&this.checkMaxidletime()&&this.checkjava_Memory()){// 服务库
				retInfo.flag = true;
				//return true;
				var inputObj = this.getFormInputInfos() ;
				retInfo.inputObj = inputObj ;
			}
			return retInfo;
		},
		checkMemcacheServerForm : function (){//上下文服务器在一个ip上只能存在一个(后期bug修改)
			var retInfo = {} ;
			retInfo.flag = false;
			if (this.checkServerName()&&this.checkRmiRegistryHost()){// 上下文
				if(!this.checkContextServerExistByServerIp()){
					retInfo.flag = true;
					var inputObj = this.getFormInputInfos() ;
					retInfo.inputObj = inputObj ;
				}
			}
			return retInfo ;
		},
		checkStatisticsSyncTime:function(){
			var flag = false;
			var id = "statisticsSyncTime" ;
			var maxLength = 10 ;
			flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
			return flag ;
		},
		checkStatisticsPath:function(){
			var flag = false;
			var id = "statisticsPath" ;
			flag = true ;//后期如果需要校验，在此补业务逻辑即可
			return flag; 
		},
		checkJvmHeapAlert:function(){
			var flag = false;
			var id = "jvmHeapAlert" ;
			var minNum = 1 ;
			var maxNum = 100 ;
			flag = InputUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			return flag; 
		},
		checkJvmHeapBlock:function(){
			var flag = false;
			var id = "jvmHeapBlock" ;
			var minNum = 1 ;
			var maxNum = 100 ;
			flag = InputUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			return flag; 
		},
		checkMaxSize4Store:function(){
			var flag = false;
			var id = "maxSize4Store" ;//checkMaxSize4Store
			flag = InputUtil.checkInputMatchIntegerAndMaxLength(id,10) ;
			return flag ;
		},
		checkCacheNodeAlert:function(){
			var flag = false;
			var id = "cacheNodeAlert" ;
			flag = InputUtil.checkInputMatchIntegerAndMaxLength(id,10) ;
			return flag ;
		},
		checkJcfCacheServerExistByServerIp:function(){//相同ip的上下文服务器，添加第二个时，应给出提示，不能重复添加。
			var serverIp = $.trim($("#rmiRegistryHost").val() );
			//与后台存储的所有服务器比较
			var serverURL = "/"+jcfManager.appName+"/server/isJcfCacheServerExistByServerIp.action"; 
			var jsonParam = {"serverIp":serverIp} ;
			var flag = true ;
			var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				if(data.flag == "false"){
					flag = false;
				}else if(data.flag == "true"){
					var av = new AlertView({msg:"相同IP的JcfCache服务器只能存在一个!"}) ;
					jcfManager.dialogRegion.show(av) ;
				}
			}) ;
			return flag ;
		},
		checkContextServerExistByServerIp:function(){//相同IP的上下文服务器，添加第二个时，应给出提示，不能重复添加。
			var serverIp = $.trim($("#rmiRegistryHost").val() );
			//与后台存储的所有服务器比较
			var serverURL = "/"+jcfManager.appName+"/server/isContextServerExistByServerIp.action"; 
			var jsonParam = {"serverIp":serverIp} ;
			var flag = true ;
			var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
			$.when(ajaxing).done(function(data){
				if(data.flag == "false"){
					flag = false;
				}else if(data.flag == "true"){
					var av = new AlertView({msg:"相同Ip的上下文服务器只能存在一个!"}) ;
					jcfManager.dialogRegion.show(av) ;
				}
			}) ;
			return flag ;
		},
		checkRmiRegistryHost :function(){
			var id = "rmiRegistryHost" ;
			return InputUtil.checkInputMatchIP(id) ;
		},
		checkheartBeatTime : function () {// 验证心跳间隔
			var id = "heartBeatTime" ;
			var maxLength = 10 ;
			return InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength);
		},
		checkchannelConcurrent : function () {// 连接并发数
			var id = "channelConcurrent" ;
			var maxLength = 10 ;
			return InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength);
		},
		checkmessageBodyLimit : function () {// JCF服务消息的body大小限制
			var id = "messageBodyLimit" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkserviceip:function(){//有的地方暂时没有使用
			var id = "registryIp" ;
			var flag = InputUtil.checkInputMatchIP(id) ;
			return flag ;
		},
		checkloadfactor : function () {// 验证JCF服务器负载因子
			var id = "loadFactor" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkchannelQueueSize : function () {// 验证发送队列大小
			var id = "channelQueueSize" ;
			var minNum = 1 ;
			var maxNum = 1000*10000 ;
			var flag = InputUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum) ;
			return flag; 
		},
		checkmaxBackupIndex : function () {
			var id = "maxBackupIndex" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLengthCanNull(id, maxLength) ;
			return flag;
		},
		checkconnectionRetry : function () {// 链接重试次数
			var id = "connectionRetry" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength) ;
			return flag;
		},
		checksendRetry : function () {// 验证消息发送重试次数
			var id = "sendRetry" ;
			var maxLength = 5 ;
			var flag = InputUtil.checkInputMatchNumAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkserviceip : function () {// 验证服务库IP
			var id = "registryIp" ;
			var flag = InputUtil.checkInputMatchIP(id) ;
			return flag;
		},
		checkserverport : function () {// 验证服务库端口
			var id = "registryPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checksynchtime : function () {// 验证服务库同步间隔
			var id = "synchTime" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkBindAddress : function () {// 验证服务库IP地址
			var id = "libraryBindAddress" ;
			var flag = InputUtil.checkInputMatchIP(id) ;
			return flag;
		},
		checkSynchtime : function () {// 验证同步间隔时间
			var id = "librarySynchtime" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchNumAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkMaxidletime : function () {// 验证JCF服务器失效超时
			var id = "maxIdleTime" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength) ;
			return flag;
		},
		checkServerName : function (){// 验证服务器名字
			var id = "serverName" ;
			var serverName = $("#"+id).val();
			var returnFlag = 0;
			var flag = InputUtil.checkInputMatchMaxLength(id, 20) ;
			if(flag){
				flag = InputUtil.checkGoodString(id) ;
			}
			if(flag){
				var serverURL = "/"+jcfManager.appName+"/server/checkServerNameExist.action" ;
				var simpleQData = {'serverName': serverName}
				var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,simpleQData) ;
				$.when(ajaxing).done(function(result){
					if (result !== ""){
						if (result.isExist === "1"){
							InputUtil.errInput(id,"服务器名称已存在，请重新为服务器起名") ;
						}else{
							InputUtil.successInput(id) ;
							returnFlag = 1;
						}
					}
				}) ;
			}
			if (returnFlag === 0){
				return false;
			}else{
				return true;
			}
		},
		checkRegServerIsExist : function (){//检查注册库服务器是否存在
			var rmiRegistryHost = $("#rmiRegistryHost").val();
			var returnFlag = 0;
			$.ajax({
				dataType : "json",
				type : "POST",
				url : "/"+jcfManager.appName+"/server/checkRegServerIsExist.action",
				async : false,
				data : {'rmiRegistryHost':rmiRegistryHost},
				success : function(result) {
					if (result !== ""){
						if (result.isExist === "1"){
							var av = new AlertView({msg:"该域注册库已存在"}) ;
							jcfManager.dialogRegion.show(av) ;
						}else{
							returnFlag = 1;
						}
					}
				}
			});
			if (returnFlag === 0){
				return false;
			}
			else{
				return true;
			}
		},
		checkServerManagePort : function (){// 验证服务器管理端口
			var id = "rmiRegistryPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checkServerDeployPort : function (){// 验证服务器部署端口
			var id = "rmiServerPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checkHttpPort : function (){// 验证http端口
			var id = "httpPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checkSshPort : function (){// 验证osgi端口
			var id = "sshPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checkBindPort : function (){// 验证监听端口
			var id = "bindPort";
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag ;
		},
		checkMemoryPoolSize : function (){// 验证内存池大小//可以为0
			var id = "memoryPoolSize" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchIntegerAndMaxLength(id, maxLength)  ;
			return flag ;
		},
		checkBlockSize : function (){// 验证内存块大小
			var id = "blockSize" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id, maxLength)  ;
			return flag ;
		},
		checkjava_Memory: function (){//堆 内存大小
			var id = "java_Memory" ;
			var maxLength = 10 ;
			var regular =/^\d+[kKmMgG]$/;
			var errTip = "单位只能为kK,mM,gG" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
			
		},
		checkjava_Perm_Mem : function (){
			var id = "java_Perm_Mem" ;
			var maxLength = 10 ;
			var regular =/^\d+[kKmMgG]$/;
			var errTip = "单位只能为kK,mM,gG" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
		},
		checkdirect_mem_size:function(){
			var id = "direct_mem_size" ;
			var maxLength = 10 ;
			var regular =/^\d+[kKmMgG]$/;
			var errTip = "单位只能为kK,mM,gG" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
		},
		checkjava_Max_Perm_Mem : function (){
			var id = "java_Max_Perm_Mem" ;
			var maxLength = 10 ;
			var regular =/^\d+[kKmMgG]$/;
			var errTip = "单位只能为kK,mM,gG" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
		},
		checkmaxFileSize : function (){
			var id = "maxFileSize" ;
			var maxLength = 10 ;
			var regular =/^\d+[kKmMgG][bB]$/;
			var errTip = "单位只能为kb,KB,mb,MB,gb,GB" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
		},
		checkHeapMessageLimit : function (){// 消息体大小限制
			var id = "heapMessageLimit" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchNumAndMaxLength(id, maxLength) ;
			return flag ;
		},
		checksendMessageLimit : function (){// 消息整体内容大小限制
			var id = "sendMessageLimit" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchNumAndMaxLength(id, maxLength) ;
			return flag ;
		},
		checkpersistQueueFullPath : function () {//验证心跳间隔
			var id = "persistQueueFullPath" ;
			var flag = InputUtil.checkNotNull(id) ;
			return flag;
		},
		checkgcFileSize : function (){
			var id = "gcFileSize" ;
			var maxLength = 10 ;
			var regular = /^\d+[kKmMgG]$/ ;
			var errTip = "单位只能为k,K,m,M,g,G" ;
			var flag = InputUtil.checkInputMatchRegularCanNull(id, maxLength, regular, errTip) ;
			return flag ;
		},
		checkgcFileNum : function () {//验证心跳间隔
			var id = "gcFileNum" ;
			var flag = true ;
			if($.trim($("#"+id).val()).length>0){
				var maxLength = 10 ;
				flag = InputUtil.checkMaxLengthValid(id, maxLength) ;
				if(flag){
					flag = InputUtil.checkIsPositiveInteger(id) ;
				}
			}else{
				InputUtil.clearInput(id) ;
			}
			return flag ;
		},
		getRegistryBindPort : function (){
			var registryIp = $("#registryIp").val();
			$.ajax({
				dataType : "json",
				type : "POST",
				url : "getRegistryBindPort.action",
				async : true,
				data : {
					'registryIp':registryIp
				},
				success : function(result) {
					$("#registryPort").attr("value", result.bindPort);
				}
			});
		},
		checkServerManagePort4Update : function(){//修改信息，检查端口专用
	    	//之前的逻辑
	    	var id = "rmiRegistryPort" ;
	    	var flag = this.checkServerManagePort() ;
	    	//之后补充的逻辑
	    	if(flag){
	    		var value1 = $("#"+id).val() ;
	    		var value2 = $("#orgi"+id).val() ;
	    		if(value1!=value2){//如果修改，则需要检查端口重复问题
	    			var serverIp = $("#rmiRegistryHost").val() ;
	    			var port = value1 ;
	    			flag = this.checkPortNotExist4Update(serverIp, port, id) ;
	    		}
	    	}
	    	return flag ;
	    },
	    checkServerDeployPort4Update : function(){
	    	var id = "rmiServerPort" ;
	    	var flag = this.checkServerDeployPort() ;
	    	//之后补充的逻辑
	    	if(flag){
	    		var value1 = $("#"+id).val() ;
	    		var value2 = $("#orgi"+id).val() ;
	    		if(value1!=value2){//如果修改，则需要检查端口重复问题
	    			var serverIp = $("#rmiRegistryHost").val() ;
	    			var port = value1 ;
	    			flag = this.checkPortNotExist4Update(serverIp, port, id) ;
	    		}
	    	}
	    	return flag ;
	    },
	    checkHttpPort4Update : function(){
	    	var id = "httpPort" ;
	    	var flag = this.checkHttpPort() ;
	    	//之后补充的逻辑
	    	if(flag){
	    		var value1 = $("#"+id).val() ;
	    		var value2 = $("#orgi"+id).val() ;
	    		if(value1!=value2){//如果修改，则需要检查端口重复问题
	    			var serverIp = $("#rmiRegistryHost").val() ;
	    			var port = value1 ;
	    			flag = this.checkPortNotExist4Update(serverIp, port, id) ;
	    		}
	    	}
	    	return flag ;
	    },
	    checkSshPort4Update : function(){
	    	var id = "sshPort" ;
	    	var flag = this.checkSshPort() ;
	    	//之后补充的逻辑
	    	if(flag){
	    		var value1 = $("#"+id).val() ;
	    		var value2 = $("#orgi"+id).val() ;
	    		if(value1!=value2){//如果修改，则需要检查端口重复问题
	    			var serverIp = $("#rmiRegistryHost").val() ;
	    			var port = value1 ;
	    			flag = this.checkPortNotExist4Update(serverIp, port, id) ;
	    		}
	    	}
	    	return flag ;
	    },
	    checkBindPort4Update : function(){
	    	var id = "bindPort" ;
	    	var flag = this.checkBindPort() ;
	    	//之后补充的逻辑
	    	if(flag){
	    		var value1 = $("#"+id).val() ;
	    		var value2 = $("#orgi"+id).val() ;
	    		if(value1!=value2){//如果修改，则需要检查端口重复问题
	    			var serverIp = $("#rmiRegistryHost").val() ;
	    			var port = value1 ;
	    			flag = this.checkPortNotExist4Update(serverIp, port, id) ;
	    		}
	    	}
	    	return flag ;
	    },
	    checkPortNotExist4Update : function(serverIp, port, id){//检查端口不存在并合法
	    	var flag = false ;
	    	var serverURL = "/"+jcfManager.appName+"/server/checkPortIsUseing.action"; 
	    	var jsonParam = {"serverIp":serverIp,"port":port} ;
	    	var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
	    	$.when(ajaxing).done(function(result){
	    		if (result.isUsed === "1"){
					flag = InputUtil.errInput(id,"端口被占用") ;
				}else if (result.isUsed === "2"){
					flag = InputUtil.errInput(id,"网络连接不可用，无法判断端口号是否被占用") ;
				}else {
					flag = InputUtil.successInput(id) ;
				}
	    	}) ;
	    	return flag ;
	    }
} ;
return ServerUtil ;
});