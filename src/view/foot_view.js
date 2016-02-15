/**
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-16
 * Time: 下午01:59:54
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var _ = require('underscore');
	var Marionette = require("marionette");
	var viewTemplateStr = require('../template/foot.tpl');
	var FootView = Marionette.ItemView.extend({
		tagName:"p",
		className:"muted credit",
		template: _.template(viewTemplateStr)
	});
	return FootView ;
});
