/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-9
 * Time: 上午10:49:23
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	
	var ErrorPageView  = require("../view/errorPage_view") ;
	var AlertView = require("../view/alert_view") ;
	
	var util = {};
	util.getAppName = function (){
		return "jcf";
	}
	
	
	util.showErrPage = function(){
		jcfManager.contentRegion.show(new ErrorPageView()) ;
	}
	
	util.alertEsg = function(msgStr,flag){
		if(msgStr==null){
			msgStr = "警告信息" ;
		}
		var av = new AlertView({msg:msgStr}) ;
		if(flag!=null){
			av.model.set("flag",flag+"") ;
		}
		jcfManager.dialogRegion.show(av) ;
		
	}
	
	util.checkStrIsIp = function(val){
		var regular = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		if (val.match(regular)) {
			return true ;
		}else{
			return false;
		}
	}
	
	util.getFefreshPageNum = function(){
		return 50 ;
	}
	
	util.getAppName2 = function (){
		return window.location.pathname.replace(/\//g, '');
	}
	
	util.appendURLWithDate = function(url){  
	   var timstamp = (new Date).valueOf();  
	   if (url.indexOf("?")>=0){  
	     url = url + "&t=" + timstamp;   
	   }else {  
	     url = url + "?t=" + timstamp;  
	   };  
	   return url;  
	}
	
	util.getLoginHref = function(){
		var logHref = "/"+jcfManager.appName+"/login.html" ;
		return logHref ;
	}
	
	util.checkFileSize = function(target,maxSize){//maxSize 单位M
		var flag = false;
		var isIE = /msie/i.test(navigator.userAgent) && !window.opera;    
		var fileSize = 0;          
	    if (isIE && !target.files) {
			var filePath = target.value;
			var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
			var file = fileSystem.GetFile(filePath);
			fileSize = file.Size;
		} else {
			fileSize = target.files[0].size;
		}
		var size = fileSize / 1024;
		var tt = (maxSize*1000) ;
		if (size > tt) {
		   flag = false ;
		   alert("附件不能大于"+maxSize+"M");
	    }else{
		   flag = true; 
		}
		return flag ;
	}
	
	util.getFormInputObj = function(formIds){// 异步操作
		var obj = {} ;
		for(var i = 0 ; i < formIds.length ;i ++){
			var curId = formIds[i] ;
			var val = $.trim($("#"+curId).val());
			var evalStr = "obj." +curId +"='" +val +"' ;"; 
			eval(evalStr) ;
		}
		return obj ;
	}
	
	util.dealAjaxRequestWithoutParam = function(serverURL){//异步操作
		 var loginHref = util.getLoginHref() ;
		 var defer = $.Deferred();
		 var option = {
	   	   url:serverURL,
	   	   type: 'POST',
	   	   dataType:'json',
	   	   timeout : 100000, //超时时间设置，单位毫秒
	   	   error: function (data) {
	   	   	  //alert('操作出错!');
			  window.location = loginHref ; 
	   	   },
	   	   success:function (result) { 
	   		   defer.resolve(result);
	   	   }
		 };
	   	 $.ajax(option); //发送ajax请
	   	 return defer.promise();
	}
	
	util.dealAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//异步操作
		 var loginHref = util.getLoginHref() ;
		 var defer = $.Deferred();
		 var option = {
    	   url:serverURL,
    	   type: 'POST',
    	   timeout : 100000, //超时时间设置，单位毫秒
    	   data:simpleJsonData,
    	   dataType:'json',
    	   error: function (data) {
    	   	  //alert('操作出错!') ;
			  window.location = loginHref ; 
    	   },
    	   success:function (result) { 
    		   defer.resolve(result);
    	   }
		 };
    	$.ajax(option); //发送ajax请
		return defer.promise() ;
	}
	
	util.dealAjaxRequest4JSObj = function(serverURL,jsObjData){//异步操作
		var loginHref = util.getLoginHref() ;
		var defer = $.Deferred();
		var option = {
    	   contentType:'application/json' ,
    	   url:serverURL,
    	   type: 'POST',
    	   timeout : 100000, //超时时间设置，单位毫秒
    	   data:JSON.stringify(jsObjData),
    	   dataType:'json',
    	   error: function (data) {
    	   	  //alert('操作出错!') ;
			  window.location = loginHref ; 
    	   },
    	   success:function (result) { 
    		   defer.resolve(result);
    	   }
		};
    	$.ajax(option); //发送ajax请
		return defer.promise() ;
	}
	
	
	util.dealSYNCHAjaxRequestWithoutParam = function(serverURL){//同步操作无参数访问
		 var loginHref = util.getLoginHref() ;
		 var defer = $.Deferred();
		 var option = {
	   	   url:serverURL,
	   	   async : false,
	   	   type: 'POST',
	   	   dataType:'json',
	   	   timeout : 100000, //超时时间设置，单位毫秒
	   	   error: function (data) {
	   	   	  //alert('操作出错!');
			  window.location = loginHref ; 
	   	   },
	   	   success:function (result) { 
	   		   defer.resolve(result);
	   	   }
		 };
	   	 $.ajax(option); //发送ajax请
	   	 return defer.promise();
	}
	
	util.dealSYNCHAjaxRequest4SimpleParam = function(serverURL,simpleJsonData){//同步ajax访问
	   var loginHref = util.getLoginHref() ;
	   var defer = $.Deferred();
	   var option = {
	   	   url:serverURL,
	   	   async : false,
	   	   type: 'POST',
	   	   timeout : 100000, //超时时间设置，单位毫秒
	   	   data:simpleJsonData,
	   	   dataType:'json',
	   	   error: function (data) {
	   	   	  //alert('操作出错!') ;
			  window.location = loginHref; 
	   	   },
	   	   success:function (result) { 
	   		   defer.resolve(result);
	   	   }
	   };
   	   $.ajax(option); //发送ajax请
	   return defer.promise() ;
	}
	
	util.dealSYNCHAjaxRequest4JSObj = function(serverURL,jsObjData){//同步操作
		var loginHref = util.getLoginHref() ;
		var defer = $.Deferred();
		var option = {
    	   contentType:'application/json' ,
    	   url:serverURL,
    	   timeout : 100000, //超时时间设置，单位毫秒
    	   async : false,
    	   type: 'POST',
    	   data:JSON.stringify(jsObjData),
    	   dataType:'json',
    	   error: function (data) {
    	   	  //alert('操作出错!') ;
			  window.location = loginHref ; 
    	   },
    	   success:function (result) { 
    		   defer.resolve(result);
    	   }
		};
    	$.ajax(option); //发送ajax请
		return defer.promise() ;
	}
	
	
	
	
	module.exports = util ;

});
