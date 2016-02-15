/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-6
 * Time: 下午01:35:49
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var ServerUtil = require("./server") ;
	
	var ServerInputCheck = function(){
	  this.checkServerName=function(){//服务器名称
		  return ServerUtil.checkServerName() ;
	  },
	  this.checkServerManagePort = function(){//JMX Registry端口
		  return ServerUtil.checkServerManagePort() ;
	  },
	  this.checkServerDeployPort = function(){
		  return ServerUtil.checkServerDeployPort() ;
	  },
	  this.checkHttpPort = function(){
		  return ServerUtil.checkHttpPort() ;
	  },
	  this.checkSshPort = function(){
		  return ServerUtil.checkSshPort() ;
	  },
	  this.checkjava_Memory = function(){
		  return ServerUtil.checkjava_Memory() ;
	  },
	  this.checkjava_Max_Perm_Mem = function(){//checkjava_Perm_Mem
		  return ServerUtil.checkjava_Max_Perm_Mem() ;
	  },
	  this.checkdirect_mem_size = function(){
		  return ServerUtil.checkdirect_mem_size() ;
	  },
	  this.checkjava_Perm_Mem = function(){
		  return ServerUtil.checkjava_Perm_Mem() ;
	  },
	  this.checkgcFileNum = function(){
		  return ServerUtil.checkgcFileNum() ;
	  },
	  this.checkgcFileSize = function(){
		  return ServerUtil.checkgcFileSize() ;
	  },
	  this.checkBindPort = function(){
		  return ServerUtil.checkBindPort() ;
	  },
	  this.checkloadfactor = function(){
		  return ServerUtil.checkloadfactor() ;
	  },
	  this.checkMemoryPoolSize = function(){
		  return ServerUtil.checkMemoryPoolSize() ;
	  },
	  this.checkBlockSize = function(){
		  return ServerUtil.checkBlockSize() ;
	  },
	  this.checkHeapMessageLimit = function(){
		  return ServerUtil.checkHeapMessageLimit() ;
	  },
	  this.checkchannelQueueSize = function(){
		  return ServerUtil.checkchannelQueueSize() ;
	  },
	  this.checkchannelConcurrent = function(){
		  return ServerUtil.checkchannelConcurrent() ;
	  },
	  this.checkconnectionRetry = function(){
		  return ServerUtil.checkconnectionRetry() ;
	  },
	  this.checkheartBeatTime = function(){
		  return ServerUtil.checkheartBeatTime() ;
	  },
	  this.checkmessageBodyLimit = function(){
		  return ServerUtil.checkmessageBodyLimit() ;
	  },
	  this.checkserviceip=function(){
		  return ServerUtil.checkserviceip() ;
	  },
	  this.getRegistryBindPort = function(){
		  return ServerUtil.getRegistryBindPort() ;
	  },
	  this.checkserverport = function(){
		  return ServerUtil.checkserverport() ;
	  },
	  this.checksynchtime = function(){
		  return ServerUtil.checksynchtime() ;
	  },
	  this.checkMaxidletime = function(){
		  return ServerUtil.checkMaxidletime() ;
	  },
	  this.checkmaxFileSize = function(){
		  return ServerUtil.checkmaxFileSize() ;
	  },
	  this.checkmaxBackupIndex = function(){
		  return ServerUtil.checkmaxBackupIndex() ;
	  },
	  this.checkpersistQueueFullPath = function(){
		  return ServerUtil.checkpersistQueueFullPath() ;
	  },
	  this.checkServerManagePort4Update = function(){
		  return ServerUtil.checkServerManagePort4Update() ;
	  },
	  this.checkServerDeployPort4Update = function(){
		  return ServerUtil.checkServerDeployPort4Update() ;
	  },
	  this.checkHttpPort4Update = function(){
		  return ServerUtil.checkHttpPort4Update() ;
	  },
	  this.checkSshPort4Update  = function(){
		  return ServerUtil.checkSshPort4Update() ;
	  },
	  this.checkBindPort4Update = function(){
		  return ServerUtil.checkBindPort4Update() ;
	  },
	  this.checkStatisticsSyncTime = function(){//1.3
		  return ServerUtil.checkStatisticsSyncTime() ;
	  },
	  this.checkStatisticsPath = function(){//1.3
		  return ServerUtil.checkStatisticsPath() ;
	  },
	  this.checkJvmHeapAlert = function(){//1.3
		  return ServerUtil.checkJvmHeapAlert() ;
	  },
	  this.checkJvmHeapBlock = function(){//1.3
		  return ServerUtil.checkJvmHeapBlock() ;
	  },
	  this.checkMaxSize4Store = function(){//1.3
		  return ServerUtil.checkMaxSize4Store() ;////checkCacheNodeMaxCount
	  },
	  this.checkCacheNodeAlert = function(){//1.3
		  return ServerUtil.checkCacheNodeAlert() ;
	  }
	  
	}
	return ServerInputCheck ;

});
