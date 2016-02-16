// 配置seajs
seajs.config({
    base: '/jcf/static/js/seajs-modules/',
	alias: {
        '$': 'jquery/1.11.1/jquery-min.js',
        'jquery': 'jquery/1.11.1/jquery-min.js',
        'ajaxfileupload': 'jquery/1.11.1/ajaxfileupload.js',
        'underscore': 'underscore/1.7.0/underscore-min.js',
        'backbone': 'backbone/1.1.2/backbone.js',
        'querystring': 'querystring/1.0.2/querystring.js',
        'marionette': 'marionette/2.2.0/backbone.marionette.min.js',
        'syphon': 'syphon/0.4.1/backbone.syphon.js',
        'seajs-text': 'seajs/2.3.0/seajs-text-debug.js',
        'bs-modal': 'bootstrap/3.3.0/modal.js',
        'bs-alert': 'bootstrap/3.3.0/alert.js',
        'bs-popover': 'bootstrap/3.3.0/popover.js',
        'bs-tooltip': 'bootstrap/3.3.0/tooltip.js',
        'ztree-core' :'ztree/3.5.15/jquery.ztree.core-3.5.js',
        'ztree-excheck' :'ztree/3.5.15/jquery.ztree.excheck-3.5.js',
		'highcharts' : 'highcharts/4.1.3/highcharts.js',
        'exporting' : 'highcharts/4.1.3/modules/exporting.js',
        'icheck' : 'icheck/1.0.2/icheck.js',
        'my97Date' : 'My97DatePicker/WdatePicker.js'
	},
    vars: {// 变量配置
      'appName': 'jcf'
    },
    preload: ['seajs-text'],
	debug: true
});
//上线版本
seajs.use("travsky/jcf/1.0.0/app")  ;
//开发版本
//seajs.use("./static/js/src/app")  ;

	

	