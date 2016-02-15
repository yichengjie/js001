/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-21
 * Time: 下午02:01:30
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	
	var AuthCheckUtil = {};
	
	//组服务器模块(点击组服务器)--------------------------------开始-------------------------------------------------------------------
	//jcf服务器部分----------------------------------------------------------------------
	AuthCheckUtil.getJcfStartFlag = function(){//jcf服务器启动按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_20" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfStopFlag = function(){//jcf服务器停止按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_21" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfForceStopFlag = function(){//jcf服务器强制停止按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_22" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfConfigFlag = function(){//jcf服务器配置按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_23" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfUnloadFlag = function(){//jcf服务器卸载按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_24" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfUpdateFlag = function(){//jcf服务器更新按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_25" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfMemViewFlag = function(){//jcf服务器内存查看按钮操作权限获取
		var jmm = jcfManager.authModel ;
		var code = "2_2_26" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//上下文服务器部分-----------------------------------------------------
	AuthCheckUtil.getContextStartFlag = function(){//context服务器start
		var jmm = jcfManager.authModel ;
		var code = "2_2_6" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getContextStopFlag = function(){//context服务器stop
		var jmm = jcfManager.authModel ;
		var code = "2_2_7" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getContextForceStopFlag = function(){//context服务器forceStop
		var jmm = jcfManager.authModel ;
		var code = "2_2_8" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getContextUnloadFlag = function(){//context服务器卸载
		var jmm = jcfManager.authModel ;
		var code = "2_2_9" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//服务库部分-------------------------------------------------------------------
	AuthCheckUtil.getRegistryStartFlag = function(){//registry服务器启动
		var jmm = jcfManager.authModel ;
		var code = "2_2_11" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRegistryStopFlag = function(){//registry服务器停止
		var jmm = jcfManager.authModel ;
		var code = "2_2_17" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRegistryForceStopFlag = function(){//registry服务器强制停止
		var jmm = jcfManager.authModel ;
		var code = "2_2_18" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	AuthCheckUtil.getRegistryConfigFlag = function(){//registry服务器配置
		var jmm = jcfManager.authModel ;
		var code = "2_2_12" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRegistryUnloadFlag = function(){//registry服务器卸载
		var jmm = jcfManager.authModel ;
		var code = "2_2_13" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRegistryMemViewFlag = function(){//registry服务器卸载
		var jmm = jcfManager.authModel ;
		var code = "2_2_14" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	AuthCheckUtil.getRegistrySwitchFlag = function(){//registry服务器切换
		var jmm = jcfManager.authModel ;
		var code = "2_2_27" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	//组操作--------------------------------------------------
	AuthCheckUtil.getQueryOperFlag = function(){//查询权限flag
		var jmm = jcfManager.authModel ;
		var code = "2_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getDelGroupFlag = function(){//查询权限flag
		var jmm = jcfManager.authModel ;
		var code = "2_2_19" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getBatchOperFlag = function(){//服务器的批量启动按钮
		var jmm = jcfManager.authModel ;
		var code = "2_2_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	///////////////////////////////////////////////////////////////////////
	AuthCheckUtil.getJcfGroupConfigFlag = function(){//点击组配置按钮
		var jmm = jcfManager.authModel ;
		var code = "2_2_5" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getRegisgryGroupConfigFlag = function(){//registry组服务配置
		var jmm = jcfManager.authModel ;
		var code = "2_2_16" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//组服务器模块(点击组服务器)--------------------------------结束-------------------------------------------------------------------
	
	//单个服务器模块(点击单个服务器页面)-------------------------------开始-------------------------------------------------------------------
	//jcf
	AuthCheckUtil.getJcfCfg4Single = function(){
		var jmm = jcfManager.authModel ;
		var code = "2_2_23" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfUpdate4Single = function(){
		var jmm = jcfManager.authModel ;
		var code = "2_2_25" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//服务库
	AuthCheckUtil.getRegistryCfg4Single = function(){
		var jmm = jcfManager.authModel ;
		var code = "2_2_12" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getRegistryUpdate4Single = function(){
		var jmm = jcfManager.authModel ;
		var code = "2_2_15" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//上下文服务器
	AuthCheckUtil.getContextUpdate4Single = function(){
		var jmm = jcfManager.authModel ;
		var code = "2_2_10" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//单个服务器模块(点击单个服务器页面)-------------------------------结束-------------------------------------------------------------------
	
	//添加服务器页面-----------------------------开始-------------------------------------------------------------
	AuthCheckUtil.getNodeControllerCfgFlag = function(){//节点控制器配置
		var jmm = jcfManager.authModel ;
		var code = "2_2_28" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//域参数配置权限
	AuthCheckUtil.getDomainParamCfgFlag = function(){//节点控制器配置
		var jmm = jcfManager.authModel ;
		var code = "2_2_29" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	AuthCheckUtil.getServerAddFlag = function(){//添加服务器按钮
		var jmm = jcfManager.authModel ;
		var code = "2_2_4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	AuthCheckUtil.getGroupAddFlag = function(){//添加分组按钮
		var jmm = jcfManager.authModel ;
		var code = "2_3_4-1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//添加服务器页面-----------------------------结束-------------------------------------------------------------
	
	
	
	
	return AuthCheckUtil ;
});