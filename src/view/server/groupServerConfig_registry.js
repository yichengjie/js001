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
	var viewTemplateStr = require('../../template/server/groupServerConfig_registry.tpl');
	var ServerInputCheck = require("./serverInputCheck") ;
	var util = require("../../util/CommonUtil") ;
	
	var GroupServerConfig_registry = Marionette.ItemView.extend({
	  template: _.template(viewTemplateStr),
	  initialize:function(){
		$.extend(this,new ServerInputCheck()) ;
	  },
	  events:{
		 "click #groupServerCfgSubmit" : "saveGroupServerCfg",
		 "blur #java_Memory" :"checkjava_Memory",
		 "blur #java_Perm_Mem" :"checkjava_Perm_Mem",
		 "blur #synchTime" :"checksynchtime",
		 "blur #maxIdleTime" :"checkMaxidletime",
		 "blur #gcFileNum" : "checkgcFileNum",
		 "blur #gcFileSize" : "checkgcFileSize"
	  },
	  saveGroupServerCfg: function() {
		var flag = this.checkRegistryGroupFrom() ;
		if(flag){
			var formIds = ["serverId","groupId","serverCategory","java_Memory",
			               "java_Perm_Mem","karaf_opts","synchTime","maxIdleTime",
			               "heapDumpPath","gcFile","gcRotation","gcFileNum",
			               "gcFileSize","serverLogLevel","serverLogType"] ;
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
	  checkRegistryGroupFrom:function () {
		  	if (this.checkjava_Memory()&& this.checkjava_Perm_Mem() && this.checksynchtime() 
		  		&& this.checkMaxidletime()&&this.checkgcFileNum()&&this.checkgcFileSize())
		  		return true;
		  	return false;
	  }
	});
	return GroupServerConfig_registry ;

});
