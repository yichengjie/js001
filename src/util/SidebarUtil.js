/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-3
 * Time: 下午05:33:32
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	String.prototype.startWith=function(str){ 
		var reg=new RegExp("^"+str); 
		return reg.test(this); 
	} ;
	var SidebarUitl = {} ;
	var infos = ["authMgr","serverMgr","deployMgr","serviceMgr","dataSrcMgr","contextMgr","logMgr"] ;
	SidebarUitl.getModuleName = function(){
		var hash = window.location.hash ;
		var retStr = null ;
		if(hash!=null&&$.trim(hash).length>0){
			for(var i = 0 ; i< infos.length ; i++){
				var info = infos[i] ;
				if(hash.startWith("#"+info)){
					retStr = info ;
					break;
				}
			}
		}else{
			//alert("地址有问题！") ; 
			retStr = "authMgr";
		}
		return retStr;
	};
	
	return SidebarUitl ;

});
