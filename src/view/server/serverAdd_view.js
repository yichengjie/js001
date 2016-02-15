/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-23
 * Time: 下午02:52:49
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/serverAdd.tpl');
	var util = require("../../util/CommonUtil") ;
	var ServerUtil = require("./server") ;
	require("bs-modal")($) ;
	var authUtil = require("./AuthCheck4ServerUtil") ;
	
	
	var ServerAddView = Marionette.ItemView.extend({
		  initialize: function() { 
			 var groupAddFlag = authUtil.getGroupAddFlag() ;
			 this.model.set("groupAddFlag",groupAddFlag) ;
		  },
		  template: _.template(viewTemplateStr),
		  onShow:function(){
			 this.changeGroupName() ;
			 this.getRegistryBindPort() ;
		  },
		  events:{
			  "change #groupName" :"changeGroupName",
			  "click #addServerNext" : "addServerNext",
			  "blur #serverName" : "checkServerName",
			  "blur #rmiRegistryPort" : "checkServerManagePort",
			  "blur #rmiServerPort" : "checkServerDeployPort",
			  "blur #httpPort" : "checkHttpPort",
			  "blur #sshPort" : "checkSshPort",
			  "blur #java_Memory" : "checkjava_Memory",
			  "blur #java_Max_Perm_Mem" : "checkjava_Max_Perm_Mem",//java_Perm_Mem
			  "blur #direct_mem_size":"checkdirect_mem_size",
			  "blur #gcFileNum" : "checkgcFileNum",
			  "blur #gcFileSize" : "checkgcFileSize",
			  "blur #bindPort" : "checkBindPort",
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
			  "click #toAddGroupUIBtn" : "toAddGroupUI",
			  "blur #statisticsSyncTime" : "checkStatisticsSyncTime",
			  "blur #statisticsPath" :"checkStatisticsPath" ,
			  "blur #jvmHeapAlert" : "checkJvmHeapAlert",
			  "blur #jvmHeapBlock" : "checkJvmHeapBlock" ,
			  "blur #maxSize4Store" : "checkMaxSize4Store" ,//checkMaxSize4Store//checkCacheNodeMaxCount
			  "blur #cacheNodeAlert" : "checkCacheNodeAlert"
		  },
		  toAddGroupUI:function(){//显示添加群组页面
			  var GroupAddView = require("./groupAdd_view") ;
			  var serverURL = "/"+jcfManager.appName+"/server/toAddGroupUI.action" ;
			  var ajaxing = util.dealAjaxRequestWithoutParam(serverURL) ;
			  $.when(ajaxing).done(function(data){
				  var model = new Backbone.Model(data) ;
				  model.set("checkGroupCategory","1") ;//选中的组服务器类型
				  jcfManager.dialogRegion.show(new GroupAddView({model:model})) ; 
				  $('#addGroupModal').modal('show');
			  }) ;
		  },
		  addServerNext:function(){//提交表单
		      var  ServerAddNextView = require("./serverAddNext_view") ;
			  var retInfo = ServerUtil.checkForm() ;
			  var self = this ;
			  if(retInfo.flag){
				var inputObj = retInfo.inputObj ;
				var serverCategory = inputObj.serverCategory ;
				inputObj.groupNameText = $("#groupName").find("option:selected").text() ;		
				//弹出一个model框提示显示用户添加的服务器基本信息
				
				var curModel = new Backbone.Model();
				
				
				
				var serverURL = "/"+jcfManager.appName+"/server/toAddServerNextUI.action"
				var simpleData = {serverCategory:inputObj.serverCategory,groupName:inputObj.groupName} ;
				$.when(util.dealAjaxRequest4SimpleParam(serverURL,simpleData))
				 .done(function(data){
					 curModel.set(data) ;////groupName , categoryName
					 var groupNameStr = self.getGroupNameStr(data.groupName) ;
					 curModel.set("categoryName", groupNameStr);
					 curModel.set("serverCategory",serverCategory) ;
					 var showInfo = {"serverName":inputObj.serverName,"rmiRegistryHost":inputObj.rmiRegistryHost,
						 "rmiRegistryPort":inputObj.rmiRegistryPort,"rmiServerPort":inputObj.rmiServerPort} ;
					 curModel.set(showInfo) ;
					 var next_view = new ServerAddNextView({model:curModel,inputObj:inputObj}) ;
					 jcfManager.dialogRegion.show(next_view) ;
					 $('#addServerNextDialog').modal('show');
		  
				 }).fail(function(){
					 alert("添加信息失败") ;
				 }) ; 
			  }
		  },
		  getGroupNameStr:function(groupName){
			  var groupNameStr ="";
			  if("registryGroup" == groupName){
				groupNameStr = "服务库";
			  }else if("contextGroup" == groupName){
				groupNameStr = "上下文";
			  }else if("adapterGroup" == groupName){
				groupNameStr = "适配";
			  }else if ("cacheGroup"== groupName){
				groupNameStr = "cache";
			  }else{
				groupNameStr = "JCF";
			  }
			  return groupNameStr ;
		  },
		  checkServerName:function(){//服务器名称
			  ServerUtil.checkServerName() ;
		  },
		  checkServerManagePort:function(){//JMX Registry端口
			  ServerUtil.checkServerManagePort() ;
		  },
		  checkServerDeployPort:function(){
			  ServerUtil.checkServerDeployPort() ;
		  },
		  checkHttpPort:function(){
			  ServerUtil.checkHttpPort() ;
		  },
		  checkSshPort:function(){
			  ServerUtil.checkSshPort() ;
		  },
		  checkjava_Memory:function(){
			  ServerUtil.checkjava_Memory() ;
		  },
		  checkdirect_mem_size:function(){
			  ServerUtil.checkdirect_mem_size() ;
		  },
		  checkjava_Max_Perm_Mem:function(){//checkjava_Perm_Mem
			  ServerUtil.checkjava_Max_Perm_Mem() ;
		  },
		  checkgcFileNum:function(){
			  ServerUtil.checkgcFileNum() ;
		  },
		  checkgcFileSize:function(){
			  ServerUtil.checkgcFileSize() ;
		  },
		  checkBindPort:function(){
			  ServerUtil.checkBindPort() ;
		  },
		  checkloadfactor:function(){
			  ServerUtil.checkloadfactor() ;
		  },
		  checkMemoryPoolSize:function(){
			  ServerUtil.checkMemoryPoolSize() ;
		  },
		  checkBlockSize:function(){
			  ServerUtil.checkBlockSize() ;
		  },
		  checkHeapMessageLimit:function(){
			  ServerUtil.checkHeapMessageLimit() ;
		  },
		  checkchannelQueueSize:function(){
			  ServerUtil.checkchannelQueueSize() ;
		  },
		  checkchannelConcurrent:function(){
			  ServerUtil.checkchannelConcurrent() ;
		  },
		  checkconnectionRetry:function(){
			  ServerUtil.checkconnectionRetry() ;
		  },
		  checkheartBeatTime:function(){
			  ServerUtil.checkheartBeatTime() ;
		  },
		  checkmessageBodyLimit:function(){
			  ServerUtil.checkmessageBodyLimit() ;
		  },
		  getRegistryBindPort:function(){
			  ServerUtil.getRegistryBindPort() ;
		  },
		  checkserverport:function(){
			  ServerUtil.checkserverport() ;
		  },
		  checksynchtime:function(){
			  ServerUtil.checksynchtime() ;
		  },
		  checkMaxidletime:function(){
			  ServerUtil.checkMaxidletime() ;
		  },
		  checkmaxFileSize:function(){
			  ServerUtil.checkmaxFileSize() ;
		  },
		  checkmaxBackupIndex:function(){
			  ServerUtil.checkmaxBackupIndex() ;
		  },
		  checkpersistQueueFullPath:function(){
			  ServerUtil.checkpersistQueueFullPath() ;
		  },
		  checkStatisticsSyncTime:function(){
			  ServerUtil.checkStatisticsSyncTime() ;
		  },
		  checkStatisticsPath:function(){
			  ServerUtil.checkStatisticsPath() ;
		  },
		  checkJvmHeapAlert:function(){
			  ServerUtil.checkJvmHeapAlert() ;
		  },
		  checkJvmHeapBlock:function(){
			  ServerUtil.checkJvmHeapBlock() ;
		  },
		  checkMaxSize4Store:function(){
			  ServerUtil.checkMaxSize4Store() ;
		  },
		  checkCacheNodeAlert:function(){
			  ServerUtil.checkCacheNodeAlert() ;
		  },
		  getRegistryBindPort:function(){
			  var registryIp = $("#registryIp").val() ;
			  var serverURL = "/"+jcfManager.appName+"/server/getRegistryBindPort.action" ;
			  var queryParam = {"registryIp":registryIp} ;
			  var waiting = util.dealAjaxRequest4SimpleParam(serverURL,queryParam) ;
			  $.when(waiting)
			   .done(function(result){
				   $("#registryPort").val(result.bindPort);
			   }) ;
		  },
		  getCacheSpecialInputId:function(){
			  var ids =  ["statisticsSyncTime","statisticsPath","jvmHeapAlert"
			              ,"jvmHeapBlock","cacheNodeMaxCount","cacheNodeAlert"] ;
			  return ids ;
		  },
		  hideCacheSpecialInputParam:function(){//隐藏cache服务器类型页面‘特有’input参数
			  var ids = this.getCacheSpecialInputId() ;
			  for ( var i = 0; i < ids.length; i++) {
				 var str = ids[i]+"Div" ;
				 $("#"+str).hide() ;
			  } 
		  },
		  showCacheSpecialInputParam:function(){//显示cache服务器类型页面‘特有’input参数
			  var ids = this.getCacheSpecialInputId() ;
			  for ( var i = 0; i < ids.length; i++) {
				 var str = ids[i]+"Div" ;
				 $("#"+str).show() ;
			  }
		  } ,
		  changeGroupName:function(){
			 var groupNameStr = $("#groupName").find("option:selected").text() ;
			 if("contextGroup"==groupNameStr){//上下文服务器
				 $("#serverCategory").html("<option value='3' selected = 'selected'>上下文服务器</option>");	
				 $("#serverCategory").attr("disabled",true);
				 this.contextOption();
				 //自动填充服务器名称
				 $("#serverName").val("contextServer") ;
			 }else if("registryGroup"==groupNameStr){//注册库服务器
				 $("#serverCategory").html("<option value='4' selected = 'selected'>服务库</option>");
				 $("#serverCategory").attr("disabled",true);
				 if($("#serverNameDiv").hasClass("has-error")){
					 $("#serverNameDiv").removeClass("has-error") ;
					 $("#serverNameTip").html("") ;
				 }
				 this.serviceOption() ;
			 }else if ("adapterGroup"==groupNameStr){//适配服务器
				 $("#serverCategory").html("<option value='1' selected = 'selected'>适配服务器</option>");
				 $("#serverCategory").attr("disabled",true);
				 this.adapterServerOption() ;
				 //自动填充服务器名称
				 $("#serverName").val("adapterServer") ;
			 }else if ("cacheGroup"==groupNameStr){
				 $("#serverCategory").html("<option value='7' selected = 'selected'>cache服务器</option>");
				 $("#serverCategory").attr("disabled",true);
				 this.cacheServerOption() ;
				 //自动填充服务器名称
				 $("#serverName").val("cacheServer") ;
			 }else{//jcf服务器
				 $("#serverCategory").html("<option value='1' selected = 'selected'>JCF服务器</option>");
				 $("#serverCategory").attr("disabled",false);		
				 this.serverOption() ;
				 //自动填充服务器名称
				 $("#serverName").val("") ;
			 }
		  },
		  checkAllRegServerIsExist:function(){
			  var serverURL = "/"+ jcfManager.appName +"/server/checkAllRegServerIsExist.action" ;//checkRegServerIsExist
			  $.when(util.dealAjaxRequestWithoutParam(serverURL))
			   .done(function(result){
				   if (result !== ""){
						if (result.count === "0"){
							$("#serverName").val("registryServer");
							$("#serverName").addClass("readonly");
							$("#serverName").attr("readonly", true);
						}else if(result.count === "1"){
							if (result.serverName === "registryServer"){
								$("#serverName").val("registryBakServer");
								$("#serverName").addClass("readonly");
								$("#serverName").attr("readonly", true);
							}else {
								$("#serverName").val("registryServer");
								$("#serverName").addClass("readonly");
								$("#serverName").attr("readonly", true);
							}
						}else {
							$("#serverName").val("");
							$("#serverName").addClass("readonly");
							$("#serverName").attr("readonly", true);
						}
					}
			   }) ;
		  },
		  cacheServerOption:function(){//cache服务器类型
		      this.showCacheSpecialInputParam() ;
		      $("#serverName").val("");
			  $("#serverName").removeClass("readonly");
			  $("#serverName").attr("readonly", false);
				
				
			  $("#httpPortDiv").hide();
			  $("#sshPortDiv").hide();
			  $("#java_MemoryDiv").hide();
			  $("#java_Perm_MemDiv").hide();
			  $("#karaf_optsDiv").hide();
			  $("#direct_mem_sizeDiv").hide();
			  $("#gcoptionsDiv").hide();
				
			  $("#rmiRegistryPortDiv").hide();
			  $("#rmiServerPortDiv").hide();
				
			  $("#bindPortDiv").hide();
			  $("#loadFactorDiv").hide();
			  $("#memoryPoolSizeDiv").hide();
			  $("#blockSizeDiv").hide();
			  $("#heapMessageLimitDiv").hide();
			  $("#channelQueueSizeDiv").hide();
			  $("#channelConcurrentDiv").hide();
			  $("#connectionRetryDiv").hide();
			  $("#heartBeatTimeDiv").hide();
			  $("#messageBodyLimitDiv").hide();
			  $("#sendMessageLimitDiv").hide();
			  $("#registryIpDiv").hide();
			  $("#registryPortDiv").hide();
			  $("#synchTimeDiv").hide();
			  $("#maxIdleTimeDiv").hide();
				
				
			  $("#auditLevelDiv").hide() ;
				//$("#thresholdDiv").hide();
				//$("#maxFileSizeDiv").hide();
				//$("#maxBackupIndexDiv").hide();
				
			  //测试说删除部分页面控件
			  $("#java_Max_Perm_MemDiv").hide() ;
			  $("#heapDumpPathDiv").hide() ;
			  $("#gcFileDiv").hide() ;
			  $("#gcRotationDiv").hide() ;
			  $("#gcFileNumDiv").hide() ;
			  $("#serverLogTypeDiv").hide() ;
			  $("#gcFileSizeDiv").hide() ;
			  $("#persistQueueFullPathDiv").hide();
			  
			  //测试说上下文服务器无日志级别
			  $("#serverLogLevelDiv").show() ;
			  //$("#auditLevelDiv").show() ;
			  $("#serverLogType4CacheDiv").show() ;
		  },
		  contextOption:function(){//上下文服务器
			
			this.hideCacheSpecialInputParam() ;
			 
			$("#serverName").val("");
			$("#serverName").removeClass("readonly");
			$("#serverName").attr("readonly", false);
			
			
			$("#httpPortDiv").hide();
			$("#sshPortDiv").hide();
			$("#java_MemoryDiv").hide();
			$("#java_Perm_MemDiv").hide();
			$("#karaf_optsDiv").hide();
			$("#direct_mem_sizeDiv").hide();
			$("#gcoptionsDiv").hide();
			
			$("#rmiRegistryPortDiv").hide();
			$("#rmiRegistryPort").val("");
			$("#rmiServerPort").val("") ;
			$("#rmiServerPortDiv").hide();
			
			$("#bindPortDiv").hide();
			$("#bindPort").val("");
			$("#loadFactorDiv").hide();
			$("#memoryPoolSizeDiv").hide();
			$("#blockSizeDiv").hide();
			$("#heapMessageLimitDiv").hide();
			$("#channelQueueSizeDiv").hide();
			$("#channelConcurrentDiv").hide();
			$("#connectionRetryDiv").hide();
			$("#heartBeatTimeDiv").hide();
			$("#messageBodyLimitDiv").hide();
			$("#sendMessageLimitDiv").hide();
			$("#registryIpDiv").hide();
			$("#registryPortDiv").hide();
			$("#synchTimeDiv").hide();
			$("#maxIdleTimeDiv").hide();
			
			
			$("#auditLevelDiv").hide() ;
			//$("#thresholdDiv").hide();
			//$("#maxFileSizeDiv").hide();
			//$("#maxBackupIndexDiv").hide();
			
			//测试说删除部分页面控件
			$("#java_Max_Perm_MemDiv").hide() ;
			$("#heapDumpPathDiv").hide() ;
			$("#gcFileDiv").hide() ;
			$("#gcRotationDiv").hide() ;
			$("#gcFileNumDiv").hide() ;
			$("#gcFileSizeDiv").hide() ;
			$("#serverLogTypeDiv").hide() ;
			
			
			
			//测试说上下文服务器无日志级别
			$("#serverLogLevelDiv").hide() ;
			
			
			$("#serverLogType4CacheDiv").hide() ;
			$("#persistQueueFullPathDiv").hide();
		  },
		  serviceOption:function(){//服务库
			this.hideCacheSpecialInputParam() ;
			this.checkAllRegServerIsExist();
			
		    $("#httpPortDiv").hide();
			$("#sshPortDiv").show();
			$("#sshPort").val("6101");		
			$("#java_MemoryDiv").show();
			$("#java_Perm_MemDiv").show();
			$("#karaf_optsDiv").show();
			
			$("#direct_mem_sizeDiv").hide();
			$("#gcoptionsDiv").hide();
			
			$("#rmiRegistryPortDiv").show();
			$("#rmiRegistryPort").val("6103");
			$("#rmiServerPortDiv").show();
			$("#rmiServerPort").val("6102");
			$("#bindPortDiv").show();
			$("#bindPort").val("6100");
			$("#loadFactorDiv").hide();
			$("#memoryPoolSizeDiv").hide();
			$("#blockSizeDiv").hide();
			$("#heapMessageLimitDiv").hide();
			$("#channelQueueSizeDiv").hide();
			$("#channelConcurrentDiv").hide();
			$("#connectionRetryDiv").hide();
			$("#heartBeatTimeDiv").hide();
			$("#messageBodyLimitDiv").hide();
			$("#sendMessageLimitDiv").hide();
			$("#registryIpDiv").hide();
			$("#registryPortDiv").hide();
			
			$("#synchTimeDiv").show();
			$("#maxIdleTimeDiv").show();
			
			
			$("#auditLevelDiv").hide() ;
			/*$("#thresholdDiv").hide();
			$("#maxFileSizeDiv").hide();
			$("#maxBackupIndexDiv").hide();*/
			
			//测试说上下文服务器不现实日志级别
			$("#serverLogLevelDiv").show() ;
			$("#serverLogTypeDiv").show() ;
			$("#serverLogType4CacheDiv").hide() ;
			$("#persistQueueFullPathDiv").hide();
		  },
		  adapterServerOption:function(){//适配服务器
			this.hideCacheSpecialInputParam() ;
			//jcf服务器
			$("#serverName").val("");
			$("#serverName").removeClass("readonly");
			$("#serverName").attr("readonly", false);
			
			$("#serverName").val("");
			$("#serverName").removeClass("readonly");
			$("#serverName").attr("readonly", false);
			$("#httpPortDiv").show();
			$("#httpPort").val("6260");
			$("#sshPortDiv").show();
			$("#sshPort").val("6160");
			$("#java_MemoryDiv").show();
			$("#java_Perm_MemDiv").show();
			$("#karaf_optsDiv").show();
			$("#direct_mem_sizeDiv").show();
			$("#gcoptionsDiv").show();
			
			$("#rmiRegistryPortDiv").show();
			$("#rmiRegistryPort").val("6460");
			$("#rmiServerPortDiv").show();
			$("#rmiServerPort").val("6360");
			
			$("#bindPortDiv").show();
			$("#bindPort").val("6060");
			
			$("#loadFactorDiv").show();
			$("#memoryPoolSizeDiv").show();
			$("#blockSizeDiv").show();
			$("#heapMessageLimitDiv").show();
			$("#channelQueueSizeDiv").show();
			$("#channelConcurrentDiv").show();
			$("#connectionRetryDiv").show();
			$("#heartBeatTimeDiv").show();
			$("#messageBodyLimitDiv").show();
			$("#sendMessageLimitDiv").show();
			$("#registryIpDiv").show();
			$("#registryPortDiv").show();
			$("#synchTimeDiv").show();
			$("#maxIdleTimeDiv").hide();
			
			
			$("#auditLevelDiv").show();
			/*$("#thresholdDiv").show();
			$("#maxFileSizeDiv").show();
			$("#maxBackupIndexDiv").show();*/
			
			//测试说上下文服务器不现实日志级别
			$("#serverLogTypeDiv").show() ;
			$("#serverLogLevelDiv").show() ;
			$("#serverLogType4CacheDiv").hide() ;
			$("#persistQueueFullPathDiv").show();
		  },
		  serverOption:function(){//JCF服务器
			this.hideCacheSpecialInputParam() ;
			//适配服务器
			$("#serverName").val("");
			$("#serverName").removeClass("readonly");
			$("#serverName").attr("readonly", false);
			$("#httpPortDiv").show();
			$("#httpPort").val("6280");
			$("#sshPortDiv").show();
			$("#sshPort").val("6180");
			$("#java_MemoryDiv").show();
			$("#java_Perm_MemDiv").show();
			$("#karaf_optsDiv").show();
			$("#direct_mem_sizeDiv").show();
			$("#gcoptionsDiv").show();
			
			$("#rmiRegistryPortDiv").show();
			$("#rmiRegistryPort").val("6480");
			$("#rmiServerPortDiv").show();
			$("#rmiServerPort").val("6380");
			
			$("#bindPortDiv").show();
			$("#bindPort").val("6080");
			
			$("#loadFactorDiv").show();
			$("#memoryPoolSizeDiv").show();
			$("#blockSizeDiv").show();
			$("#heapMessageLimitDiv").show();
			$("#channelQueueSizeDiv").show();
			$("#channelConcurrentDiv").show();
			$("#connectionRetryDiv").show();
			$("#heartBeatTimeDiv").show();
			$("#messageBodyLimitDiv").show();
			$("#sendMessageLimitDiv").show();
			$("#registryIpDiv").show();
			$("#registryPortDiv").show();
			$("#synchTimeDiv").show();
			$("#maxIdleTimeDiv").hide();
			
			
			$("#auditLevelDiv").show();
			/*$("#thresholdDiv").show();
			$("#maxFileSizeDiv").show();
			$("#maxBackupIndexDiv").show();*/
			$("#serverLogType4CacheDiv").hide() ;
			//测试说上下文服务器不现实日志级别
			$("#serverLogLevelDiv").show() ;
			$("#persistQueueFullPathDiv").show();
			$("#serverLogTypeDiv").show() ;
		  },
		  render:function(){//
			  this.$el.html(this.template(this.model.toJSON()));
			  return this;
		  }
		  
	});
	
	return ServerAddView ;

});
