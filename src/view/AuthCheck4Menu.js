/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-22
 * Time: 下午02:52:46
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var AuthCheckUtil = {};
	
	AuthCheckUtil.getServerFlag = function(){//服务器管理模块
		var jmm = jcfManager.authModel ;
		var code = "2_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getDeployFlag = function(){///部署管理模块
		var jmm = jcfManager.authModel ;
		var code = "3_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getServiceFlag = function(){//服务管理模块
		var jmm = jcfManager.authModel ;
		var code = "4_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getDatasourceFlag = function(){//数据源管理模块
		var jmm = jcfManager.authModel ;
		var code = "5_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getMemcacheFlag = function(){//上下文管理模块
		var jmm = jcfManager.authModel ;
		var code = "6_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getLogFlag = function(){//日志管理模块
		var jmm = jcfManager.authModel ;
		var code = "7_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	return AuthCheckUtil ;
});
