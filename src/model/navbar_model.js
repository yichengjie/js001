/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-9
 * Time: 上午10:45:43
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../util/CommonUtil") ;
	var appName = util.getAppName() ;
	var NavbarModel = Backbone.Model.extend({
		defaults: function(){
	        return {
	            'loginUserName': "",
	            'loginUserRole': "",
	            'loginID' : ""	
	        };
    	},
    	url:"/"+appName+"/getLoginUserInfo.action"
	}) ;
	return NavbarModel ;

});
