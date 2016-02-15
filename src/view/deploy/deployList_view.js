/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2015-1-13
 * Time: 下午05:40:22
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {

	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var Marionette = require("marionette");
	var itemTemplateStr = require('../../template/deploy/deployItem.tpl');
	
	var DeployItemView = Marionette.ItemView.extend({
		template:_.template(itemTemplateStr) ,
		tagName: "tr"
	});
	
	var listTemplateStr = require('../../template/deploy/deployList.tpl');
	var DeployListView = Marionette.CompositeView.extend({
		  initialize:function(){
		  },
		  tagName:"table",
		  className:"table table-bordered list",
		  template: _.template(listTemplateStr) ,
		  childView: DeployItemView,
		  childViewContainer: "tbody"
	});
	
	return DeployListView ;
	

});
