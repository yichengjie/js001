define(function(require, exports, module) {
	
	var AuthCheckUtil = {};
	
	AuthCheckUtil.getLogManagementAuth = function(){
		var code = "7_1_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogAppNameConfigAuth = function(){
		var code = "7_2_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogLevelConfigAuth = function(){
		var code = "7_2_2" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogTraceConfigAuth = function(){
		var code = "7_2_3" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogRunningConfigAuth = function(){
		var code = "7_2_4" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogSizeConfigAuth = function(){
		var code = "7_2_6" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogNumberConfigAuth = function(){
		var code = "7_2_7" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogViewAuth = function(){
		var code = "7_2_8" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogFileNameConfigAuth = function(){
		var code = "7_2_9" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogPathConfigAuth = function(){
		var code = "7_2_10" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	
	AuthCheckUtil.getLogDeleteAuth = function(){//删除应用日志权限
		var code = "7_2_11" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getLogUpdateAuth = function(){//添加应用日志权限
		var code = "7_2_12" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	return AuthCheckUtil;
});