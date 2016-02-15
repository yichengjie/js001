define(function(require, exports, module) {
	// global namespace
	window.jcfManagement = {
		model:{},
	    view:{},
	    collection:{},
	    temp: {},
	    service_name: "",
	    current_sidebar: null,
		tipInfoRegion:null
	};
    // 每一个模块中需要使用到 jQuery， Underscore，Backbone都需要引入这三个模块
    var $ = jQuery = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var QueryString = require('querystring');
    var sidebarManager = require('./util/SidebarManager');
    var MenuView = require("./view/menu_view");
    var ContainerView = require("./view/container_view");
    var AuthSidebarView = require('./view/auth/sidebar_view');
    var ServerSidebarView = require('./view/server/sidebar_view');
    var DeploySidebarView = require('./view/deploy/sidebar_view');
    var ServiceSidebarView = require('./view/service/sidebar_view');
    var ServiceContentView = require('./view/service/serviceContent_view');
    
    var DataSourceSidebarView = require('./view/dataSource/sidebar_view');
    var DataSourceContentView = require('./view/dataSource/dataSourceContent_view');
    var ContextSidebarView = require('./view/context/sidebar_view');
    var ContextContentView = require('./view/context/contextContent_view');
    var LogSidebarView = require('./view/log/sidebar_view');
    var LogContentView = require('./view/log/logContent_view');
    
    // 路由
    var AppRouter = Backbone.Router.extend({
    	routes: {
    		'sysIndex' : 'showSysIndex',
	        'authMgr' : 'authMgr',
	        'authMgr/userMgr': 'authMgrUser',
	        'authMgr/userMgr/param/:params': 'authMgrUser',
	        'authMgr/userMgr/add': 'addUser',
	        'authMgr/userMgr/detail/param/:params': 'detailUser',
	        'authMgr/userMgr/modify/param/:params': 'modifyUser',
	        'authMgr/roleMgr': 'authMgrRole',
	        'authMgr/roleMgr/param/:params': 'authMgrRole',
	        'authMgr/roleMgr/add': 'addRole',
	        'authMgr/roleMgr/update/param/:params': 'updateRole',
	        
	        'serverMgr': 'serverMgr',
	        'serverMgr/param/:params': 'serverMgr',
	        'serverMgr/group/param/:params': 'serverMgrGroup',
	        'serverMgr/server/param/:params': 'serverMgrServer',
	        'serverMgr/server/memoryInfo/param/:params': 'serverMemoryInfo',
	        
	        'deployMgr': 'deployMgr',
	        'deployMgr/param/:params': 'deployMgr',
	        'deployMgr/group/param/:params': 'deployMgrGroup',
	        'deployMgr/group/appConfig/param/:params': 'deployMgrGroupAppConfig',
	        'deployMgr/group/appRollback/param/:params': 'deployMgrA4ppRollback',
	        'deployMgr/group/appDeploy/param/:params': 'viewAppStatus4GroupServer',
	        'deployMgr/group/appLogCfg/param/:params': 'appLogCfg',
	        'deployMgr/server/param/:params': 'deployMgrServer',
	        'deployMgr/server/appConfig/param/:params': 'deployMgrServerAppConfig',
	        
	        'serviceMgr': 'serviceMgr',
	        'serviceMgr/param/:params': 'serviceMgr',
	        'serviceMgr/group/param/:params': 'serviceMgrGroup',
	        'serviceMgr/group/detail/param/:params': 'groupServiceDetail',
	        'serviceMgr/group/MoniOption/param/:params' : 'groupMoniOption',
	        'serviceMgr/server/param/:params': 'serviceMgrServer',
	        'serviceMgr/server/monitor/param/:params': 'serviceMonitor',
	        'serviceMgr/server/cfg/param/:params': 'serverServiceCfg',
	        'serviceMgr/server/MoniOption/param/:params' : 'serverMoniOption',
	        'serviceMgr/service/degradeConfig/param/:params': 'serviceDegradeConfig',
	        'serviceMgr/service/grayConfig/param/:params': 'serviceGrayConfig',
	        
	        
	        'dataSrcMgr': 'domainDataSource',
	        'dataSrcMgr/group/param/:params': 'groupDataSource',
	        'dataSrcMgr/server/param/:params': 'serverDataSource',
	        
	        'contextMgr': 'contextMgr',
	        'contextMgr/group/param/:params': 'contextMgrGroup',
	        'contextMgr/server/param/:params': 'contextMgrServer',
	        
	        'logMgr': 'logMgr',
	        'logMgr/group/param/:params': 'logMgrGroup',
    	},
    	initialize: function () {
	
    		//jcfManagement.view.menu = jcfManagement.view.menu || new MenuView();
    	},
    	
    	renderAuth: function(){
    		jcfManagement.view.auth_sidebar = jcfManagement.view.auth_sidebar || new AuthSidebarView({el:'#sidebar'});
    		sidebarManager.render(jcfManagement.view.auth_sidebar);
    	},
	  
    	renderServer: function(){
    		jcfManagement.view.server_sidebar = new ServerSidebarView({el:'#sidebar'});
    		sidebarManager.render(jcfManagement.view.server_sidebar);
    	},
	  
    	renderDeploy: function(){
    		jcfManagement.view.deploy_sidebar = new DeploySidebarView({el:'#sidebar'});
    		sidebarManager.render(jcfManagement.view.deploy_sidebar);
    	},
	  
    	renderService: function(){
    		//jcfManagement.view.containerView = new ContainerView();
    		jcfManagement.view.service_sidebar =  new ServiceSidebarView({el:'#sidebar'});
    		//jcfManagement.view.service_content = new ServiceContentView();
    		sidebarManager.render(jcfManagement.view.service_sidebar);
    	},
	  
    	renderDataSource: function(){
    		jcfManagement.view.containerView = new ContainerView();
    		jcfManagement.view.dataSource_sidebar = new DataSourceSidebarView({el:'#sidebar'});
    		jcfManagement.view.dataSource_content = new DataSourceContentView();
    		sidebarManager.render(jcfManagement.view.dataSource_sidebar);
    		jcfManagement.view.dataSource_content.render();
    	},
	  
    	renderContext: function(){
    		jcfManagement.view.containerView = new ContainerView();
    		jcfManagement.view.context_sidebar =  new ContextSidebarView({el:'#sidebar'});
    		jcfManagement.view.context_content = new ContextContentView();
    		sidebarManager.render(jcfManagement.view.context_sidebar);
    		jcfManagement.view.context_content.render();
    	},
	  
    	renderLog: function(){
    		jcfManagement.view.containerView = new ContainerView();
    		jcfManagement.view.log_sidebar =  new LogSidebarView({el:'#sidebar'});
    		jcfManagement.view.log_content = new LogContentView();
    		sidebarManager.render(jcfManagement.view.log_sidebar);
    		jcfManagement.view.log_content.render();
    	},
    	
    	showSysIndex:function(){
    		$("#sidebar").html("") ;
    		appView.showSysIndex() ;
    	},
    	authMgr : function(){
    		var params = {} ;
    		this.authMgrUser(params) ;
    	},
    	authMgrUser : function(params) {
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('userMgr');
    		appView.authMgrUser(params) ;
    	},	
    	addUser:function(params){
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('userMgr');
    		appView.addUser(params) ;
    	},
    	detailUser:function(params){
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('userMgr');
    		appView.detailUser(params) ;
    	},
    	modifyUser:function(params){
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('userMgr');
    		appView.modifyUser(params) ;
    	},
    	authMgrRole : function(params) {
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('roleMgr');
    		appView.authMgrRole(params) ;
    	},
    	addRole:function(){
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('roleMgr');
    		appView.addRole() ;
    	},
    	updateRole:function(params){
    		this.renderAuth();
    		jcfManagement.view.menu.select('authMgr');
    		jcfManagement.view.auth_sidebar.select('roleMgr');
    		appView.updateRole(params) ;
    	},
    	//服务器管理部分路由
    	serverMgr : function(params){
    		this.renderServer();
    		jcfManagement.view.menu.select('serverMgr');
    		jcfManagement.view.server_sidebar.select('');
    		appView.showServerIndex(params) ;
    	},
    	serverMgrGroup : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderServer();
    		jcfManagement.view.menu.select('serverMgr');
    		jcfManagement.view.server_sidebar.select(queryString.groupId);
    		appView.serverMgrGroup(params);
    	},
    	serverMgrServer : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderServer();
    		jcfManagement.view.menu.select('serverMgr');
    		jcfManagement.view.server_sidebar.select(queryString.serverId);
    		appView.serverMgrServer(params) ;
    	},
    	serverMemoryInfo:function(params){
    		var queryString = QueryString.parse(params);
    		this.renderServer();
    		jcfManagement.view.menu.select('serverMgr');
    		jcfManagement.view.server_sidebar.select(queryString.serverId);
    		appView.serverMemoryInfo(params) ;
    	},
    	//部署管理部分路由
    	deployMgr : function(params){
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select('');
    		appView.showDeployIndex(params) ;
    	},
    	deployMgrGroup : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.groupId);
    		appView.deployMgrGroup(params) ;
    	},
    	viewAppStatus4GroupServer : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.groupId);
    		appView.viewAppStatus4GroupServer(params) ;
    	},
    	deployMgrA4ppRollback:function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.groupId);
    		appView.deployMgrA4ppRollback(params) ;
    	},
    	appLogCfg : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.groupId);
    		appView.appLogCfg(params);
    	},
    	deployMgrServer : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.serverId);
    		appView.deployMgrServer(params) ;
    	},
    	deployMgrGroupAppConfig:function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.groupId);
    		appView.deployMgrGroupAppConfig(params) ;
    	},
    	deployMgrServerAppConfig:function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDeploy();
    		jcfManagement.view.menu.select('deployMgr');
    		jcfManagement.view.deploy_sidebar.select(queryString.serverId);
    		appView.deployMgrServerAppConfig(params);
    	},
    	//服务管理部分路由
    	serviceMgr : function(params){
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select('');
    		appView.showServiceIndex(params);
    	},
    	serviceMgrGroup : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.serviceMgrGroup(params);
    	},
    	groupServiceDetail:function(params){
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.groupServiceDetail(params) ;
    	},
    	groupMoniOption:function(params){//跳转到组度量数据展示页面
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.groupMoniOption(params) ;
    	},
    	serverMoniOption:function(params){//跳转到服务器度量数据展示页面
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.serverMoniOption(params) ;
    	},
    	
    	serviceMgrServer : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.serverId);
    		appView.serviceMgrServer(params);
    	},
    	serverServiceCfg:function(params){//针对单个服务器的服务配置
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.serverId);
    		appView.serverServiceCfg(params) ;
    	},
    	serviceMonitor:function(params){//针对单个服务器的服务配置
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.serverId);
    		appView.serviceMonitor(params) ;
    	},
    	serviceDegradeConfig: function(params){
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.serviceDegradeConfig(params);
    	},
    	serviceGrayConfig: function(params){
    		var queryString = QueryString.parse(params);
    		this.renderService();
    		jcfManagement.view.menu.select('serviceMgr');
    		jcfManagement.view.service_sidebar.select(queryString.groupId);
    		appView.serviceGrayConfig(params);
    	},
    	//数据源管理部分
    	domainDataSource: function(){
    		this.renderDataSource();
    		jcfManagement.view.menu.select('dataSrcMgr');
    		jcfManagement.view.dataSource_sidebar.select('');
    		var DataSourceTabbarView = require("./view/dataSource/dataSourceTabbar_view");
    		var dataSourceTabbarView = new DataSourceTabbarView();
    		dataSourceTabbarView.render();
    		appView.domainDataSource();
    	},
    	groupDataSource: function(params){
    		var queryString = QueryString.parse(params);
    		this.renderDataSource();
    		jcfManagement.view.menu.select('dataSrcMgr');
    		jcfManagement.view.dataSource_sidebar.select(queryString.groupId);
    		var GroupDataSourceTabbarView = require("./view/dataSource/groupDataSourceTabbar_view");
    		var groupDataSourceTabbarView = new GroupDataSourceTabbarView({
    			queryString : queryString
    		});
    		groupDataSourceTabbarView.render();
    		appView.groupDataSource(params);
    	},
    	serverDataSource: function(params){//数据源管理，点击单个服务器
    		var queryString = QueryString.parse(params);
    		this.renderDataSource();
    		jcfManagement.view.menu.select('dataSrcMgr');
    		jcfManagement.view.dataSource_sidebar.select(queryString.serverId);
    		var ServerDataSourceTabbarView = require("./view/dataSource/serverDataSourceTabbar_view");
	      	var serverDataSourceTabbarView = new ServerDataSourceTabbarView({
	      		queryString : queryString
	      	});
	      	serverDataSourceTabbarView.render();
	      	appView.serverDataSource(params);
    	},
    	//上下文管理部分
    	contextMgr : function(){
    		this.renderContext();
    		jcfManagement.view.menu.select('contextMgr');
    		jcfManagement.view.context_sidebar.select('');
    		appView.showContextIndex() ;
    	},
    	contextMgrGroup : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderContext();
    		jcfManagement.view.menu.select('contextMgr');
    		jcfManagement.view.context_sidebar.select(queryString.groupId);
    		appView.contextMgrGroup(params) ;
    	},
    	contextMgrServer : function(params){
    		var queryString = QueryString.parse(params);
    		this.renderContext();
    		jcfManagement.view.menu.select('contextMgr');
    		jcfManagement.view.context_sidebar.select(queryString.serverId);
    		var ServerContextTabbarView = require("./view/context/serverContextTabbar_view");
    		var serverContextTabbarView = new ServerContextTabbarView({
    			queryString : queryString
    		});
    		serverContextTabbarView.render();
    		appView.contextMgrServer(params);
    	},
    	//日志管理部分
    	logMgr: function(){
    		this.renderLog();
    		jcfManagement.view.menu.select('logMgr');
    		jcfManagement.view.log_sidebar.select('');
    		appView.showLogIndex();
    	},
    	logMgrGroup: function(params){
    		var queryString = QueryString.parse(params);
    		this.renderLog();
    		jcfManagement.view.menu.select('logMgr');
    		jcfManagement.view.log_sidebar.select(queryString.groupId);
    		appView.logMgrGroup(params);
    	}
    });
    return AppRouter ;

}) ;