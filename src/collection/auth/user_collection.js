/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-11-29
 * Time: 下午03:37:11
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var util = require("../../util/CommonUtil") ;
	var appName = util.getAppName() ;
	/*Backbone.sync = function(method,model){
		alert(method + " --- " +" model url : "+model.url +"  data : "+ JSON.stringify(model) ) ;
	} ;*/
	var UserModel = require("../../model/auth/user_model") ;
	
	var UserCollection = Backbone.Collection.extend({
		model:UserModel ,
		url:'/'+appName+'/user/searchUser.action',
		initialize:function(){
			//this.fetch() ;
		},
		parse:function(response){
			//alert(JSON.stringify(response)) ;
			return response ;
		}
	}) ;
	
	return UserCollection ;

});
