define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var util = require("./CommonUtil");
	var CheckUtil = require("./SpecialPatternInputCheckUtil");
	
	var ContextUtil = {
		checkOptime: function(id){
			var length = 10;
			var result = CheckUtil.checkInputMatchPositiveIntegerAndMaxLength(id, length);
			this.renderInput(id, result);
			return result;
		},
		checkExptime: function(id){
			var maxValue = 10000;
			var minValue = 0;
			var result = CheckUtil.checkInputMatchInt_MinNum__MaxNum(id, minValue, maxValue);
			this.renderInput(id, result);
			return result;
		},
		checkServers: function(id){
			var result = CheckUtil.checkServerAndPortList(id);
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
	return ContextUtil;
});