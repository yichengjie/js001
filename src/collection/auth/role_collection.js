define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	
	var RoleModel = require("../../model/auth/role_model") ;
	var RoleCollection = Backbone.Collection.extend({
		model:RoleModel ,
		initialize:function(){
			//this.fetch() ;
		},
		parse:function(response){
			//alert(JSON.stringify(response)) ;
			return response ;
		}
	}) ;
	
	return RoleCollection ;

});
