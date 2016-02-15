/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-21
 * Time: 下午05:12:52
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var AuthCheckUtil = {};
	//------------------------------index页面开始-------------------------------------------------------
	AuthCheckUtil.getUploadAppFlag = function(){//是否有上传应用的权限
		var jmm = jcfManager.authModel ;
		var code = "3_2_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------index页面结束-------------------------------------------------------
	//------------------------------group操作页面开始----------------------------------------------------
	AuthCheckUtil.getDeployFlag = function(){//是否可点击部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getUndeployFlag = function(){//是否可点击反部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_3" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getChageVersionFlag = function(){//是否可点击反部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRolebackFlag = function(){//是否可点击反部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_5" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------group操作页面结束----------------------------------------------------
	//------------------------------新建部署页面开始------------------------------------------------------
	AuthCheckUtil.getAppLogOperFlag = function(){//填写应用日志  ‘点击应用按钮’权限
		var jmm = jcfManager.authModel ;
		var code = "7_2_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//------------------------------新建部署页面结束------------------------------------------------------
	
	//------------------------------server操作页面开始------------------------------------------------------------
	AuthCheckUtil.getDeploy4ServerFlag = function(){//单个服务器的部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getUndeploy4ServerFlag = function(){//单个服务器的反部署按钮
		var jmm = jcfManager.authModel ;
		var code = "3_2_3" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------server操作页面结束------------------------------------------------------------
	
	//------------------------------组配置页面开始--------------------------------------------------------
	AuthCheckUtil.getUploadCfgFlag = function(){//上传配置文件
		var jmm = jcfManager.authModel ;
		var code = "3_2_7" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getDownloadCfgFlag = function(){//下载配置文件
		var jmm = jcfManager.authModel ;
		var code = "3_2_8" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------组配置页面结束--------------------------------------------------------
	//------------------------------tab页开始-------------------------------------------
	AuthCheckUtil.getCreateNewDeployFlag = function(){
		var jmm = jcfManager.authModel ;
		var code = "3_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------tab页结束-------------------------------------------
	return AuthCheckUtil ;
});
