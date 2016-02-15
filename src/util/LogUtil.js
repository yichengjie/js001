define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var util = require("./CommonUtil");
	var CheckUtil = require("./SpecialPatternInputCheckUtil");
	
	var LogUtil = {
		checkAppName: function(){
			var result = CheckUtil.checkNotNull(id);
			console.log(result);
			this.renderInput(id, result);
			return result;
		},
		checkAppConfigFileName: function(id){
			var result = CheckUtil.checkNotNull(id);
			this.renderInput(id, result);
			return result;
		},
		checkLogSavePath: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = /^\w+(\/\w+)*$/;
				result = CheckUtil.checkMatchRegular(id, reg, "不能输入含有后缀或者以/开头或结尾");
			}
			this.renderInput(id, result);
			return result;
		},
		checkMaxLogFileSize: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = /^\d+[kKmMgG][bB]$/;
				result = CheckUtil.checkMatchRegular(id, reg, "单位只能为KB,kb,MB,mb,GB,gb");
			}
			this.renderInput(id, result);
			return result;
		},
		checkLogFileMaxBackupIndex: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				result = CheckUtil.checkIsPositiveInteger(id);
			}
			this.renderInput(id, result);
			return result;
		},
		checkRunningLogSavePath: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = /^\w+(\/\w+)*$/;
				result = CheckUtil.checkMatchRegular(id, reg, "不能输入含有后缀或者以/结尾");
			}
			this.renderInput(id, result);
			return result;
		},
		checkMaxRunningLogFileSize: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = /^\d+[kKmMgG][bB]$/;
				result = CheckUtil.checkMatchRegular(id, reg, "单位只能为KB,kb,MB,mb,GB,gb");
			}
			this.renderInput(id, result);
			return result;
		},
		checkRunningLogFileMaxBackupIndex: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				result = CheckUtil.checkIsPositiveInteger(id);
			}
			this.renderInput(id, result);
			return result;
		},
		renderInput: function(id, result){
			if (result){
				var item = $("#"+id);
				item.parent().addClass("has-success");
				if (item.parent().hasClass("has-error")){
					item.parent().removeClass("has-error");
				}
			}
			else{
				var item = $("#"+id);
				item.parent().addClass("has-error");
				if (item.parent().hasClass("has-success")){
					item.parent().removeClass("has-success");
				}
			}
		}
	};
	return LogUtil;
});