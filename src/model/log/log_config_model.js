define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var LogConfigModel = Backbone.Model.extend({
    	urlRoot:"/"+jcfManager.appName+"/log/appLogConfig.action",
    	defaults:{
    		"appConfigFileName":"",
    		"logSavePath": "",
    		"maxLogFileSize": "512MB",
    		"logFileMaxBackupIndex": "10",
    		"logLevel":"INFO",
    		"logAppenderType":"dateAndSize",
    		"isRunningSelect" : false,
    		"runningLogSavePath": "",
    		"maxRunningLogFileSize": "512MB",
    		"runningLogFileMaxBackupIndex": "10"
    	},
    	parse: function(response){
    		return _.extend(response);
    	},
    	isRunningSelected: function(){
    		return this.get('isRunningSelect') == true;
    	},
    	setDefault: function(){
    		this.set("appConfigFileName","");
    		this.set("logSavePath","");
    		this.set("maxLogFileSize","512MB");
    		this.set("logFileMaxBackupIndex","10");
    		this.set("logLevel","INFO");
    		this.set("logAppenderType","dateAndSize");
    		this.set("isRunningSelect",false);
    		this.set("runningLogSavePath","");
    		this.set("maxRunningLogFileSize","512MB");
    		this.set("runningLogFileMaxBackupIndex","10");
    	}
	});
	return LogConfigModel;
});