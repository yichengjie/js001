/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-10
 * Time: 上午10:24:21
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../../template/server/groupServerConfig_cache.tpl');
	var InputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;
	var util = require("../../util/CommonUtil") ;
	var InputCheck = require("./checkCacheGroup") ;
	
	var GlobalView = require("./global_view") ;
	
	var JcfCacheGroupCfgLayout = Marionette.LayoutView.extend({
		  initialize: function() {
	    	$.extend(this,new InputCheck()) ;
    	  },
		  template: _.template(viewTemplateStr),
		  regions: {
		    errInfoRegion: "#errInfoRegion",
		    contentRegion: "#jcfCacheGroupCfgRegion"
		  },
		  events:{
			  "blur #addGroup_maxSize4Store" :"checkMaxSize4Store",//存储最大个数
		  	  "blur #addGroup_singleDataMaxLength" :"checkSingleDataMaxLength",//已存在//单个数据最大长度
		  	  "blur #addGroup_cacheNodeAlert" :"checkCacheNodeAlert" ,//存储报警阀值
		  	   
		  	  "blur #addGroup_jvmMemory" : "checkJvmMemory" ,
		  	  "blur #addGroup_jvmHeapAlert" : "checkJvmHeapAlert" ,
		  	  "blur #addGroup_dataBackupNum" : "checkDataBackupNum" ,//已存在
		  	  "blur #addGroup_statisticsPath" : "checkStatisticsPath" ,
		  	  "blur #addGroup_statisticsSyncTime" : "checkStatisticsSyncTime" ,
		  	  "blur #addGroup_jvmHeapBlock" : "checkJvmHeapBlock" ,
		  	   
		  	  "blur #addGroup_groupPassword" :"checkGroupPassword" ,//已存在
		  	  "blur #addGroup_broadcastURL" :"checkBroadcastURL",//已存在
			  "click #groupServerCfgSubmit" : "groupServerCfgSubmit",
			  "blur #addGroup_maxSize4Cache" : "checkMaxSize4Cache" ,
		  	  "blur #addGroup_networkPort" :"checkaNetworkPort",
		  	  "blur #addGroup_tcpIPMember" :"checkaddTcpIPMember"
		  },
		  getCacheConfigFormInputParam:function(){
		    	var ids = ["groupId","groupName" ,"addGroup_groupPassword",
		    	           "addGroup_broadcastURL","addGroup_maxSize4Store","addGroup_singleDataMaxLength",
		    	           "addGroup_cacheNodeAlert","addGroup_jvmMemory",
		    	           "addGroup_jvmHeapAlert","addGroup_dataBackupNum","addGroup_statisticsPath",
		    	           "addGroup_statisticsSyncTime","addGroup_jvmHeapBlock",
		    	           "addGroup_maxSize4Cache","addGroup_networkPort","addGroup_tcpIPMember"] ;
		    	var jsParam = util.getFormInputObj(ids) ;
		    	var value = $.trim($(":radio[name='addGroup_cacheModel']:checked").val()) ;//addGroup_cacheModel单独处理
		    	jsParam.addGroup_cacheModel = value ;
		    	jsParam.groupCategory = "7" ;
		    	jsParam.addGroup_broadcastURL = "127.0.0.1:8888" ;
				return jsParam ;
		  },
		  checkCacheGroupCfgInfo:function(){
		    	if(this.checkGroupPassword()&&this.checkBroadcastURL()
		    		&&this.checkMaxSize4Store()&&this.checkSingleDataMaxLength()&&this.checkCacheNodeAlert()
		    		&&this.checkJvmMemory()&&this.checkJvmHeapAlert()&&this.checkDataBackupNum()
		    		&&this.checkStatisticsPath()&&this.checkStatisticsSyncTime()&&this.checkJvmHeapBlock()
		    		&&this.checkMaxSize4Cache()&&this.checkaNetworkPort()&&this.checkaddTcpIPMember()){
		    		return true ;
		    	}
		    	return false ;
		  },
		  groupServerCfgSubmit:function(){
			var flag = this.checkCacheGroupCfgInfo() ;
			var self = this ;
			if(flag){
				var inputObj = this.getCacheConfigFormInputParam() ;
				var serverURL = "/"+jcfManager.appName+"/server/updateJcfCacheGroupCfg.action" ;
				var ajaxing = util.dealAjaxRequest4JSObj(serverURL ,inputObj) ;
				$.when(ajaxing).done(function(data){
					var model = new Backbone.Model(data) ;
					var tipView = new GlobalView({model:model}) ;
					self.errInfoRegion.show(tipView) ;
				}) ;
			}
		  }
	});
	
	return JcfCacheGroupCfgLayout ;

});
