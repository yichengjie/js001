/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-22
 * Time: 上午09:29:46
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var AuthCheckUtil = {};
	
	//服务inde页面--------------------------------开始-------------------------------------------------------------------
	//jcf服务器部分----------------------------------------------------------------------
	AuthCheckUtil.getGroupServiceCfgFlag = function(){//jcf组服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_2_3" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//服务index页面-------------------------------结束-------------------------------------------------------------------
	
	
	//组服务页面-----------------------------------开始------------------------------------------------------------------
	AuthCheckUtil.getSearchService4GroupFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_2_1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//-------------启动
	AuthCheckUtil.getJcfStart4GroupFlag = function(){//jcf服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-1" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	
	AuthCheckUtil.getJcfStop4GroupFlag = function(){//jcf服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcForceStop4GroupFlag = function(){//jcf服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-3" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getJcfSXQH4GroupFlag = function(){//切换域内外可见性
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//增加
	AuthCheckUtil.getJcfCfg4GroupFlag = function(){//jcf服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-5-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	/////////////////////////
	
	
	AuthCheckUtil.getSihStart4GroupFlag = function(){//适配服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-6" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getSihStop4GroupFlag = function(){//适配服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-7" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getSihForceStop4GroupFlag = function(){//适配服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-8" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getSihSXQH4GroupFlag = function(){//适配服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-9" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getSihCfg4GroupFlag = function(){//适配服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-10-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//////////////////////
	
	AuthCheckUtil.getHttpStart4GroupFlag = function(){//http服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-11" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getHttpStop4GroupFlag = function(){//http服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-12" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getHttpForceStop4GroupFlag = function(){//http服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-13" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getHttpSXQH4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-14" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getHttpCfg4GroupFlag = function(){//http服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-15-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	////////////////////////////////
	AuthCheckUtil.getWebStart4GroupFlag = function(){//web服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-16" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getWebStop4GroupFlag = function(){//web服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-17" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getWebForceStop4GroupFlag = function(){//web服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-18" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getWebSXQH4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-19" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getWebCfg4GroupFlag = function(){//服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-20-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//////////////////////////////
	AuthCheckUtil.getTbStart4GroupFlag = function(){//tb服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-21" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getTbStop4GroupFlag = function(){//tb服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-22" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTbForceStop4GroupFlag = function(){//tb服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-23" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTbSXQH4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-24" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTbCfg4GroupFlag = function(){//服务配置
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-25-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//////////////////////////////
	AuthCheckUtil.getTtStart4GroupFlag = function(){//tt服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-26" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getTtStop4GroupFlag = function(){//tt服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-27" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTtForceStop4GroupFlag = function(){//tt服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-28" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTtSXQH4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-29" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getTtCfg4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_4_1-30-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	/////////////////////////////
	AuthCheckUtil.getUtlStart4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-31" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getUtlStop4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-32" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getUtlForceStop4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-33" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getUtlSXQH4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-34" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getUtlCfg4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-35-4" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//-----------强制停止

	
	
	AuthCheckUtil.getUtlForceStop4GroupFlag = function(){//utl服务
		var jmm = jcfManager.authModel ;
		var code = "4_2_3" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	//组服务页面-----------------------------------结束------------------------------------------------------------------
	
	//单服务页面-----------------------------------开始---------------------------------------------------------
	AuthCheckUtil.getSearchService4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getJcfMoniService4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-5" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getJcfMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_2_2" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getSihMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-10" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	AuthCheckUtil.getHttpMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-15" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getWebMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-20" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}

	AuthCheckUtil.getTbMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-25" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getTtMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-30" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}

	AuthCheckUtil.getUtlMoni4ServerFlag = function(){//查询服务按钮
		var jmm = jcfManager.authModel ;
		var code = "4_3_1-35" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//单服务页面-----------------------------------结束---------------------------------------------------------
	
	//------------------------------------新增权限开始--------------------------------------------
	AuthCheckUtil.getSwitchDefaultVersionFlag = function(){//切换默认版本操作
		var jmm = jcfManager.authModel ;
		var code = "4_2_5" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	
	AuthCheckUtil.getClearQueueInfoFlag = function(){//清除队列操作
		var jmm = jcfManager.authModel ;
		var code = "4_6_6" ;
		var flag = jmm.get(code)||"" ;
		return flag ;
	}
	//------------------------------------新增权限结束--------------------------------------------
	
	return AuthCheckUtil ;

});
