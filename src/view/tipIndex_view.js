/**
 * <pre>
 * 	功能描述:index上导航树 或则 左侧sidebar时没有确切页面跳转时的,提示页面
 * </pre>
 * Created with eclipse.
 * User: yichengjie
 * Date: 2014-12-3
 * Time: 上午10:34:12
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module) {
	var $ = jQuery = require('jquery');
	var Backbone = require('backbone');
	var _ = require('underscore');
	var authShowViewTemplate = require('../template/tipIndex.tpl');
    var TipIndxView = Backbone.View.extend({
        template: _.template(authShowViewTemplate),
        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });

    return TipIndxView;
});