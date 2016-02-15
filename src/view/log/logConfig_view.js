define(function(require, exports, module) {
	
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var QueryString = require('querystring');
	var LogUtil = require("../../util/LogUtil");
	var util = require("../../util/CommonUtil");
	var LogAuthCheckUtil = require('../../util/LogAuthCheckUtil');
	
	var LogConfigTemplate = require("../../template/log/logConfig.tpl");
	var GlobalView = require("./global_view");
	
	
	var LogConfigView = Marionette.ItemView.extend({
		el: "#content-body",
        template:_.template(LogConfigTemplate),
        events: {
        	"change #appConfigFileName": "hasSameFile",
        	"blur #appConfigFileName": "checkAppConfigFileName",
        	"blur #logSavePath": "checkLogSavePath",
        	"blur #maxLogFileSize": "checkMaxLogFileSize",
        	"blur #logFileMaxBackupIndex": "checkLogFileMaxBackupIndex",
        	"blur #runningLogSavePath": "checkRunningLogSavePath",
        	"blur #maxRunningLogFileSize": "checkMaxRunningLogFileSize",
        	"blur #runningLogFileMaxBackupIndex": "checkRunningLogFileMaxBackupIndex",
        	"click #save": "saveConfig",
        	"click #isRunningSelect": "isRunningSelect"
        },
        initialize: function(options){
        	this.options = options || {};
        	this.model = options.model;
        	this.collection = options.collection;
        	this.groupId = options.queryString.groupId;
        	this.listenTo(this.model,'change',this.render);
        	
        	this.logUpdateAuth = LogAuthCheckUtil.getLogUpdateAuth() ;//点击应用按钮的权限
        	
        	this.logFileNameAuth = LogAuthCheckUtil.getLogFileNameConfigAuth();
        	this.logSavePathAuth = LogAuthCheckUtil.getLogPathConfigAuth();
        	this.logSizeAuth = LogAuthCheckUtil.getLogSizeConfigAuth();
        	this.logNumberAuth = LogAuthCheckUtil.getLogNumberConfigAuth();
        	this.logLevelAuth = LogAuthCheckUtil.getLogLevelConfigAuth();
        	this.logRunningAuth = LogAuthCheckUtil.getLogRunningConfigAuth();
        },
	
        render: function(){
        	this.$el.html(this.template({"model":this.model.toJSON(), "logFileNameAuth":this.logFileNameAuth,
        		"logSavePathAuth": this.logSavePathAuth, "logSizeAuth": this.logSizeAuth, "logNumberAuth":this.logNumberAuth,
        		"logLevelAuth": this.logLevelAuth, "logRunningAuth":this.logRunningAuth,"logUpdateAuth":this.logUpdateAuth}));
    		return this;
        },
        saveConfig: function(){
        	if (this.checkForm()){
        		var self = this;
        		var appName = $("#groupAppName").val();
            	var appConfigFileName = self.$el.find("#appConfigFileName").val();
            	var logSavePath = self.$el.find("#logSavePath").val();
            	var maxLogFileSize = self.$el.find("#maxLogFileSize").val();
            	var logFileMaxBackupIndex = self.$el.find("#logFileMaxBackupIndex").val();
            	var logLevel = self.$el.find("#logLevel").val();
            	var logAppenderType = self.$el.find("#logAppenderType").val();
            	var runningLogSavePath = self.$el.find("#runningLogSavePath").val();
            	var maxRunningLogFileSize = self.$el.find("#maxRunningLogFileSize").val();
            	var runningLogFileMaxBackupIndex = self.$el.find("#runningLogFileMaxBackupIndex").val();
            	if (self.model.get('appConfigFileName') != appConfigFileName){
            		self.model.set('appConfigFileName',appConfigFileName);
            	}
            	if (self.model.get('logSavePath') != logSavePath){
            		self.model.set('logSavePath',logSavePath);
            	}
            	if (self.model.get('maxLogFileSize') != maxLogFileSize){
            		self.model.set('maxLogFileSize',maxLogFileSize);
            	}
            	if (self.model.get('logFileMaxBackupIndex') != logFileMaxBackupIndex){
            		self.model.set('logFileMaxBackupIndex',logFileMaxBackupIndex);
            	}
            	if (self.model.get('logLevel') != logLevel){
            		self.model.set('logLevel',logLevel);
            	}
            	if (self.model.get('logAppenderType') != logAppenderType){
            		self.model.set('logAppenderType',logAppenderType);
            	}
            	if (this.model.isRunningSelected()){
					
            		if (self.model.get('runningLogSavePath') != runningLogSavePath){
                		self.model.set('runningLogSavePath',runningLogSavePath);
                	}
                	if (self.model.get('maxRunningLogFileSize') != maxRunningLogFileSize){
                		self.model.set('maxRunningLogFileSize',maxRunningLogFileSize);
                	}
                	if (self.model.get('runningLogFileMaxBackupIndex') != runningLogFileMaxBackupIndex){
                		self.model.set('runningLogFileMaxBackupIndex',runningLogFileMaxBackupIndex);
                	}
            	}
            	self.model.save({appName: appName, groupId: self.groupId}, {'success':function(model, data){
            		if (data.flag){
            			data.messageList = ["应用日志配置成功"];
            		}
            		var globar = new GlobalView({model: data});
    				globar.render();
            	}});
        	}
        	else{
        		var data = {"flag": false,"messageList":"页面参数验证失败"};
        		var global = new GlobalView({model: data});
				global.render();
        	}
        },
        isRunningSelect: function(){
			var appConfigFileName = this.$el.find("#appConfigFileName").val() ;
			var logSavePath = this.$el.find("#logSavePath").val();
			var maxLogFileSize = this.$el.find("#maxLogFileSize").val() ;
			var logFileMaxBackupIndex = this.$el.find("#logFileMaxBackupIndex").val() ;
			var logLevel = this.$el.find("#logLevel").val() ;
			var logAppenderType = this.$el.find("#logAppenderType").val()
			var runningLogSavePath = this.$el.find("#runningLogSavePath").val() ;
			var maxRunningLogFileSize = this.$el.find("#maxRunningLogFileSize").val()
			var runningLogFileMaxBackupIndex = this.$el.find("#runningLogFileMaxBackupIndex").val() ;
        	this.model.set("appConfigFileName", appConfigFileName);
        	this.model.set("logSavePath", logSavePath);
        	this.model.set("maxLogFileSize",maxLogFileSize );
        	this.model.set("logFileMaxBackupIndex",logFileMaxBackupIndex );
        	this.model.set("logLevel", logLevel);
        	this.model.set("logAppenderType",logAppenderType );
        	this.model.set("runningLogSavePath",runningLogSavePath) ;
        	this.model.set("maxRunningLogFileSize",maxRunningLogFileSize) ;
        	this.model.set("runningLogFileMaxBackupIndex",runningLogFileMaxBackupIndex) ;
			
        	if (this.model.isRunningSelected()){
        		this.model.set("isRunningSelect", false);
        	}
        	else{
        		this.model.set("isRunningSelect", true);
        	}
        },
        hasSameFile: function(){
        	var appLogConfigName = this.$el.find("#appConfigFileName").val();
        	var groupId = this.groupId;
        	var jsonData = {"groupId":groupId,"appLogConfigName":appLogConfigName};
        	var hasSameFileName = "/" + jcfManager.appName + "/log/hasSameFileName.action";
        	var reqing = util.dealAjaxRequest4SimpleParam(hasSameFileName, jsonData);
			$.when(reqing).done(function(data) {
				if(data.flag){
					data.flag = false;
					data.messageList = ["已包含同名配置文件，会导致同名文件的覆盖"];
					var globar = new GlobalView({model: data});
					globar.render();
				}
        	});
        },
        checkAppName: function(){
        	var flag = LogUtil.checkAppConfigFileName("groupAppName");
        	return flag;
        },
        checkAppConfigFileName: function(){
        	var flag = LogUtil.checkAppConfigFileName("appConfigFileName");
        	return flag;
        },
        checkLogSavePath: function(){
        	var flag = LogUtil.checkLogSavePath("logSavePath");
        	return flag;
        },
        checkMaxLogFileSize: function(){//应用日志大小
        	var flag = LogUtil.checkMaxLogFileSize("maxLogFileSize");
        	return flag;
        },
        checkLogFileMaxBackupIndex: function(){//应用日志最多存放个数
        	var flag = LogUtil.checkLogFileMaxBackupIndex("logFileMaxBackupIndex");
        	return flag;
        },
        checkRunningLogSavePath: function(){
        	var flag = LogUtil.checkRunningLogSavePath("runningLogSavePath");
        	return flag;
        },
        checkMaxRunningLogFileSize: function(){//性能日志文件最大大小
        	var flag = LogUtil.checkMaxRunningLogFileSize("maxRunningLogFileSize");
        	return flag;
        },
        checkRunningLogFileMaxBackupIndex: function(){//性能日志最多存放个数
        	var flag = LogUtil.checkRunningLogFileMaxBackupIndex("runningLogFileMaxBackupIndex");
        	return flag;
        },
        checkForm: function(){
        	var flag = false;
        	if (this.checkAppName() && this.checkAppConfigFileName() && this.checkLogSavePath() && this.checkMaxLogFileSize() && this.checkLogFileMaxBackupIndex()){
        		flag = true;
        	}
        	if (flag && this.model.isRunningSelected()){
        		flag = this.checkRunningLogSavePath() && this.checkMaxRunningLogFileSize() && this.checkRunningLogFileMaxBackupIndex();
        	}
        	return flag;
        }
    });
	return LogConfigView;
});