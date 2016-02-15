/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-4-14
 * Time: 下午03:37:31
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var InputUtil = require("../../util/SpecialPatternInputCheckUtil2") ;	
	var util = require("../../util/CommonUtil") ;
	var _ = require('underscore');
	var CahceGroupInputCheck = function(){
		this.checkMaxSize4Store=function(){
	    	var id = "addGroup_maxSize4Store" ;
	    	var maxLength = 10 ;
	    	var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
	    	return flag ;
	    }
		this.checkMaxSize4Cache=function(){
			var id = "addGroup_maxSize4Cache" ;
			var maxLength = 10 ;
			var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
			return flag ;
		}
		this.checkaNetworkPort = function(){
			var id = "addGroup_networkPort" ;
			var flag = InputUtil.checkInputMatchPort(id) ;
			return flag;
		}
		this.checkaddTcpIPMember = function(){
			var id = "addGroup_tcpIPMember" ;
			var flag = InputUtil.checkNotNull(id) ;
	    	var errInfo = "[如 172.27.1.1:8080,172.27.1.2:8080]" ;
	    	if(flag){
	    		var valueAll = $.trim($("#"+id).val()) ;
	    		var allInfos = valueAll.split(",") ;
				var doubleFlag = false;//重复标记
				var newInfos = _.uniq(allInfos) ;
				if(allInfos.length>newInfos.length){
					doubleFlag = true;
				}
				if(doubleFlag){//如果重复
					flag = false ;
					InputUtil.errInput(id,"不能添加重复信息!") ;
				}else{
					for ( var i = 0; i < allInfos.length; i++) {
		    			var value = allInfos[i] ;
		    			var infos = value.split(":")
			    		if(infos.length!=2){
			    			InputUtil.errInput(id,errInfo) ;
			    			flag = false;
			    		}else{
							var ip = infos[0] ;
							flag = util.checkStrIsIp(ip) ;
			    			var port = infos[1] ;
			    			var reg1 =  /^[0-9]*[1-9][0-9]*$/;
						    if(!reg1.test(port)){
						    	InputUtil.errInput(id,errInfo) ;
						    	flag = false;
						    }
			    		}
					}
				}
	    	}
	    	return flag ;
		}
	    this.checkSingleDataMaxLength=function(){
	    	var id = "addGroup_singleDataMaxLength" ;
	    	var maxLength = 10 ;
	    	var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
	    	return flag ;
	    }
	    this.checkCacheNodeAlert=function(){
	    	var retInfo = {}  ;
	    	var id = "addGroup_cacheNodeAlert" ;
	    	var maxLength = 10 ;
	    	var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength) ;
	    	return flag ;
	    }
	    this.checkJvmMemory=function(){
	    	var id = "addGroup_jvmMemory" ;
	    	var maxLength = 10 ;
	    	var regular =/^\d+[kKmMgG]$/;
			var errTip = "单位只能为kK,mM,gG" ;
			var flag = InputUtil.checkInputMatchRegularAndNotNull(id, maxLength, regular, errTip) ;
			return flag ;
	    }
	    this.checkJvmHeapAlert=function(){
	    	var id = "addGroup_jvmHeapAlert" ;
	    	var minNum = 1 ;
	    	var maxNum = 100 ;
	    	var flag = InputUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum)
	    	return flag;
	    }
	    this.checkStatisticsPath=function(){
	    	var id = "addGroup_statisticsPath" ;
	    	return true ;
	    }
	    this.checkStatisticsSyncTime=function(){//单位秒
	    	var id = "addGroup_statisticsSyncTime" ;
	    	var maxLength = 10 ;
	    	var flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,maxLength)
	    	return flag ;
	    }
	    this.checkJvmHeapBlock=function(){//百分比
	    	var id = "addGroup_jvmHeapBlock" ;
	    	var minNum = 1 ;
	    	var maxNum = 100 ;
	    	var flag = InputUtil.checkInputMatchInt_MinNum__MaxNum(id,minNum,maxNum)
	    	return flag;
	    }
	    this.checkGroupPassword=function(){
	    	var id = "addGroup_groupPassword" ;
	    	var flag = InputUtil.checkInputMatchMaxLength(id,10) ;
	    	return flag ;
	    }
	    this.checkBroadcastURL=function(){
	    	var id = "addGroup_broadcastURL" ;
	    	var flag = true ;
	    	/*var flag = InputUtil.checkNotNull(id) ;
	    	var errInfo = "广播地址不合法[如 172.27.1.1:8080]" ;
	    	if(flag){
	    		var value = $.trim($("#"+id).val()) ;
	    		var infos = value.split(":")
	    		if(infos.length!=2){
	    			flag = InputUtil.errInput(id,errInfo) ;
	    		}else{
	    			var port = infos[1] ;
	    			var reg1 =  /^[0-9]*[1-9][0-9]*$/;
				    if(!reg1.test(port)){
				    	flag = InputUtil.errInput(id,errInfo) ;
				    }else{
				    	flag = true;
				    }
	    		}
	    	}*/
	    	return flag ;
	    }
	    this.checkDataBackupNum=function(){
	    	var flag = false;
	    	var id = "addGroup_dataBackupNum" ;
	    	flag = InputUtil.checkInputMatchPositiveIntegerAndMaxLength(id,10) ;
	    	return flag;
	    }
	    this.checkGroupName=function(){
	    	var groupName = this.$el.find("#addGroup_groupName").val() ;
	    	var id = "addGroup_groupName" ;
	    	var flag = InputUtil.checkInputMatchMaxLength(id,30) ;
	    	if(flag){
	    		flag = InputUtil.checkGoodString(id) ;
	    		if(flag){
	    			var jsonParam = {"groupName":groupName} ;
					var serverURL = "/"+jcfManager.appName+"/server/isGroupExist.action" ;
					var ajaxing = util.dealSYNCHAjaxRequest4SimpleParam(serverURL,jsonParam) ;
					$.when(ajaxing).done(function(data){
						if(data.flag){
							flag = false ; 
							InputUtil.errInput(id,"名称已存在!") ;
						}else{
							InputUtil.successInput(id) ;
							flag = true ; 
						}
					}) ;
	    		}
	    	}
	    	return flag ;
	    }
	}
	
	return CahceGroupInputCheck ;
});




