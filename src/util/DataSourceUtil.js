define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var util = require("./CommonUtil");
	var CheckUtil = require("./SpecialPatternInputCheckUtil");
	
	var DataSourceUtil = {
		checkDataSourceName: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = "^[a-zA-Z0-9_#]*$";
				result = CheckUtil.checkMatchRegular(id, reg, "只能包含字母、数字、下划线和警号");
			}
			this.renderInput(id, result);
			return result;
		},
		checkUserName: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				var reg = "^[a-zA-Z0-9_#]*$";
				result = CheckUtil.checkMatchRegular(id, reg, "只能包含字母、数字、下划线和警号");
			}
			this.renderInput(id, result);
			return result;
		},
		checkPassWord: function(id){
			//可以为空
			var val = $.trim($("#"+id).val()) ;
			var result = true;
			if(val.length>0){
				if(this.checkStrContainChinese(val)){
					result = false;
					var $tip = $("#"+id+"Tip") ;
					$tip.html("不能包含中文!") ;
				}
				this.renderInput(id, result);
			}
			return result;
		},
		checkURL: function(id){
			var result = CheckUtil.checkNotNull(id);
			this.renderInput(id, result);
			return result;
		},
		checkMaxActive: function(id){
			var result;
			if (CheckUtil.checkNotNull(id)){
				if (CheckUtil.checkIsNum(id)){
					if (CheckUtil.checkIsGreaterThanOrEqualNum(id, $("#maxIdle").val())){
						if (CheckUtil.checkIsGreaterThanOrEqualNum(id, $("#initialSize").val())){
							result = true;
						}
						else{
							result = false;
						}
					}
					else{
						result = false;
					}
				}
				else{
					result = false;
				}
			}
			else{
				result = false;
			}
			this.renderInput(id, result);
			return result;
		},
		checkMaxWait: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				result = CheckUtil.checkIsNum(id);
			}
			this.renderInput(id, result);
			return result;
		},
		checkMaxIdle: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				result = CheckUtil.checkIsPositiveInteger(id);
			}
			if (result){
				result = CheckUtil.checkIsGreaterThanOrEqualNum(id, 0);
			}
			if (result){
				result = CheckUtil.checkIsLessThanOrEqualNum(id, 500);
			}
			this.renderInput(id, result);
			return result;
		},
		checkMinIdle: function(id){
			var result = CheckUtil.checkNotNull(id);
			if (result){
				result = CheckUtil.checkIsNotNegativeInteger(id);
			}
			if (result){
				result = CheckUtil.checkIsGreaterThanOrEqualNum(id, 0);
			}
			if (result){
				result = CheckUtil.checkIsLessThanOrEqualNum(id, 500);
			}
			if (result){
				result = CheckUtil.checkIsLessThanOrEqualNum(id, $("#maxIdle").val());
			}
			this.renderInput(id, result);
			return result;
		},
		checkInitialSize: function(id){
			var result = CheckUtil.checkInputMatchIsNotNegativeAndNotNull(id);
			this.renderInput(id, result);
			return result;
		},
		checkStrContainChinese:function(valStr){//判断是否含有中文,如果含有返回:true,否则返回:false//本方法为
			for (var i=0;i<valStr.length ;i++ )
			{
				var temp=valStr.charAt(i);
				if (temp.charCodeAt()>16384 && temp.charCodeAt()<65024)
				{
					return true;
				}
			}
			return false;
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
	return DataSourceUtil;
});