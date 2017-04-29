'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const async = require('async');
var express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	qtools.validateProperties({
		subject: args || {},
		targetScope: this, //will add listed items to targetScope
		propList: [
			{
				name: 'config',
				optional: false
			},
			{
				name: 'apiManager',
				optional: false
			},
			{
				name: 'router',
				optional: false
			},
			{
				name: 'permissionMaster',
				optional: false
			},
			{
				name: 'initCallback',
				optional: false
			}
		]
	});

	var configPath =
		process.env.gwProjectPath +
		'configs/instanceSpecific/webpack/' +
		this.config.system.environment +
		'.js';

	//LOCAL VARIABLES ====================================

	const src = `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/html/bmp/src/`;
	const lib = `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/html/bmp/lib/`;
	const uiWebpackNodeModuleDir = `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/node_modules/`;
	const urlPrefix = '/bmp/lib/';

	const webpackConfig = require(configPath)(
		urlPrefix,
		src,
		lib,
		uiWebpackNodeModuleDir
	);

	//LOCAL FUNCTIONS ====================================

	//METHODS AND PROPERTIES ====================================

	if (this.config.system.environment == 'development') {
		const compiler = webpack(webpackConfig);
		this.router.use(
			webpackDevMiddleware(compiler, {
				publicPath: webpackConfig.output.publicPath
			})
		);
	}

	//API ENDPOINTS ====================================

	this.router.get(/\/bmp/, (req, res, next) => {
		res.cookie(
			'environment',
			qtools.getSurePath(this, 'config.system.environment'),
			{ maxAge: 10000 }
		);
		next();
	});

	this.permissionMaster.addRoute(
		'get',
		new RegExp('/bmp/prohibited.html'),
		'tq'
	);
	this.permissionMaster.addRoute('get', new RegExp('/bmp/*'), 'all');
	this.router.use(
		express.static(require('path').parse(module.id).dir + '/html')
	);

	//INITIALIZATION ====================================

	this.initCallback && this.initCallback();
	this.shutdown = (message, callback) => {
		console.log(`\nshutting down ${__dirname}`);
		callback('', message);
	};

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();
