/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-17
 * Time: 下午04:06:32
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var util = require("../../util/CommonUtil") ;
	var UserMgrApi = {
		getPageUser: function(searchURL,queryPageObj){
			return util.dealAjaxRequest4JSObj(searchURL,queryPageObj) ;
		},
		getAllRoles:function(){
			var serverURL = "/"+util.getAppName()+"/user/getAllRoleInfo.action" ;
			return util.dealAjaxRequestWithoutParam(serverURL) ;
		},
		getUserByID : function (userID){
			var qdata = {userID:userID} ;
			var searchURL = "/"+util.getAppName()+"/user/searchUserByID.action" ;
			return util.dealAjaxRequest4SimpleParam(searchURL,qdata) ;
		}
	};
	return UserMgrApi ;

});