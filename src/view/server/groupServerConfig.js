/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-31
 * Time: 下午03:24:16
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/groupServerConfig.tpl');
	var ServerInputCheck = require("./serverInputCheck") ;
	var util = require("../../util/CommonUtil") ;
	
	var GroupServerConfig = Marionette.ItemView.extend({
	  template: _.template(viewTemplateStr),
	  initialize:function(){
		$.extend(this,new ServerInputCheck()) ;
	  },
	  events: {
		  "click #groupServerCfgSubmit":"saveGroupServerCfg",
		  "blur #java_Memory":"checkjava_Memory",
		  "blur #java_Max_Perm_Mem":"checkjava_Max_Perm_Mem",
		  "blur #direct_mem_size":"checkdirect_mem_size",
		  
		  "blur #loadFactor":"checkloadfactor",
		  "blur #memoryPoolSize":"checkMemoryPoolSize",
		  "blur #blockSize":"checkBlockSize",
		  "blur #heapMessageLimit":"checkHeapMessageLimit",
		  "blur #channelQueueSize":"checkchannelQueueSize",
		  "blur #channelConcurrent":"checkchannelConcurrent",
		  "blur #connectionRetry":"checkconnectionRetry",
		  "blur #heartBeatTime":"checkheartBeatTime",
		  "blur #messageBodyLimit":"checkmessageBodyLimit",
		  "blur #registryIp":"checkserviceip",
		  "blur #registryPort":"checkserverport",
		  "blur #synchTime":"checksynchtime",
		  "blur #gcFileNum" : "checkgcFileNum",
	      "blur #gcFileSize" : "checkgcFileSize",
	      "blur #persistQueueFullPath" : "checkpersistQueueFullPath"
	  },
	  saveGroupServerCfg: function() {
		var flag = this.checkServerGroup() ;
		if(flag){
			var formIds = ["serverId","groupId","serverCategory",
			               "java_Memory","java_Max_Perm_Mem","karaf_opts","direct_mem_size",
			               "gcoptions","loadFactor","memoryPoolSize","blockSize","heapMessageLimit",
			               "channelQueueSize","channelConcurrent","connectionRetry","heartBeatTime",
			               "messageBodyLimit","registryIp","registryPort","synchTime",
			               "heapDumpPath","gcFile","gcRotation","gcFileNum",
			               "gcFileSize","auditLevel","persistQueueFullPath","serverLogLevel",
			               "serverLogType"
			               ] ;
			var formObj = util.getFormInputObj(formIds) ;
			var serverURL = "/"+jcfManager.appName+"/server/updateGroupServerConfig.action" ;
			var ajaxing = util.dealAjaxRequest4JSObj(serverURL,formObj) ;
			$.when(ajaxing).done(function(data){
				if(data.flag=="true"){
					alert("保存信息成功") ;
				}else{
					alert("保存信息失败") ;
				}
			}) ;
		}
	  },
	  checkServerGroup:function (){
		  if (this.checkloadfactor()&&this.checkMemoryPoolSize()&&this.checkdirect_mem_size()&& this.checkBlockSize()&&this.checkHeapMessageLimit()//
			  &&this.checkchannelQueueSize()&&this.checkchannelConcurrent()&&this.checkconnectionRetry()&&this.checkheartBeatTime()//
			  &&this.checkmessageBodyLimit()&&this.checksynchtime()&&this.checkserviceip()&&this.checkserverport()//
			  &&this.checkjava_Memory()&&this.checkjava_Max_Perm_Mem()&&this.checkgcFileNum()
			  &&this.checkgcFileSize()&&this.checkpersistQueueFullPath()){//
			  return true;
		  }
		  return false;
	  }
	});
	return GroupServerConfig ;

});
