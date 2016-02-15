define(function(require, exports, module) {
	
	var AuthCheckUtil = {};
	
	AuthCheckUtil.getContextManagementAuth = function(){
		var code = "6_1_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getServerContextConfigAuth = function(){
		var code = "6_2_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	},
	AuthCheckUtil.getServerContextRestartAuth = function(){
		var code = "6_2_2" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	};
	return AuthCheckUtil;
});