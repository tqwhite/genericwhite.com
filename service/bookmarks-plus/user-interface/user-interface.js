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

	//LOCAL VARIABLES ====================================

	const src = `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/html/bmp/src/`;
	const lib = `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/html/bmp/lib/`;

	const webpackConfig = {
		entry: [path.join(__dirname, 'html/bmp/src/app.js')],
		output: {
			filename: 'bundle.js',
			path: lib,
			publicPath: '/bmp/lib/'
		},
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				vue$: 'vue/dist/vue.min.js',
				'@': path.join(__dirname, 'html/bmp/src')
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: `${process.env.gwProjectPath}/code/service/bookmarks-plus/user-interface/node_modules/babel-loader`,
						options: {
							presets: ['env']
						}
					}
				}
			]
		}
	};

	//LOCAL FUNCTIONS ====================================

	//METHODS AND PROPERTIES ====================================

	const compiler = webpack(webpackConfig);
	this.router.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath
		})
	);

	//API ENDPOINTS ====================================
	
	this.router.get('/bmp/lib/bundle.js', function(req, res) {
qtools.logDebug("req.url="+req.url);


qtools.logDebug("compiler.outputFileSystem.readFileSync(req.url)="+compiler.outputFileSystem.readFileSync(req.url));


qtools.die({"compiler.outputFileSystem.readFileSync(req.url)":compiler.outputFileSystem.readFileSync(req.url)});


		res.write(compiler.outputFileSystem.readFileSync(req.url));
		res.end();
	});
	
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
