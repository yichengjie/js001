define(function(require, exports, module) {
	
	var AuthCheckUtil = {};
	
	AuthCheckUtil.getDataSourceManagementAuth = function(){
		var code = "5_1_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getServerDataSourceConfigAuth = function(){
		var code = "5_2_1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getServerDataSourceUninstallAuth = function(){
		var code = "5_2_2";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getServerDataSourceRestartAuth = function(){
		var code = "5_2_3";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getServerDataSourceDetailViewAuth = function(){
		var code = "5_2_4";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getServerDataSourceDeployAuth = function(){
		var code = "5_2_5";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getGroupDataSourceDeployAuth = function(){
		var code = "5_2_6";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getAllDataSourceListAuth = function(){
		var code = "5_2_7";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getGroupDataSourceConfigAuth = function(){
		var code = "5_3_7-1";
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	AuthCheckUtil.getGroupDataSourceListAuth = function(){
		var code = "5_3_7-2" ;
		var flag = jcfManager.authModel.get(code)||"";
		return flag;
	}
	return AuthCheckUtil;
});