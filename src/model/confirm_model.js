/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-5-13
 * Time: 下午02:59:55
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var ConfirmModel = Backbone.Model.extend({
		defaults: function(){
	        return {
				 'msg': '内容',
			     'title': '提示',
			     'btnok': '确定',
			     'btncl':'取消',
				 'ccFlag':'true'
	        };
    	}
	}) ;
	return ConfirmModel ;
});