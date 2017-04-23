"use strict";
const qtoolsGen = require("qtools");
const qtools = new qtoolsGen(module);
const async = require("async");
var express = require('express');

const webpack = require('webpack');
const webpackConfig = require('./webpack-config-dev.js');
const webpackDevMiddleware = require("webpack-dev-middleware");

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	qtools.validateProperties({
		subject: args || {},
		targetScope: this, //will add listed items to targetScope
		propList: [
			{
				name: "router",
				optional: false
			},
			{
				name: "permissionMaster",
				optional: false
			}
		]
	});

	//LOCAL VARIABLES ====================================
	
	const moduleName = qtools.ping().employer;

	//LOCAL FUNCTIONS ====================================

	//METHODS AND PROPERTIES ====================================
	
	this.objectAccess = (control, value) => {
		switch (control) {
			case "ping":
				return `${moduleName} is alive`;
				break;
		}
	};

	this.shutdown = (message, callback) => {
			console.log(`\nshutting down ${moduleName}`);
			callback("", message);
		};

	//API ENDPOINTS ====================================

	//INITIALIZATION ====================================


	this.router.get(/\/bmp/, (req, res, next) => {
		res.cookie('environment', qtools.getSurePath(this, 'config.system.environment'), { maxAge: 10000 });
		next();
	});
	
	this.permissionMaster.addRoute('get', new RegExp('/bmp/prohibited.html'), 'tq');
	this.permissionMaster.addRoute('get', new RegExp('/bmp/*'), 'all');
	this.router.use(express.static(require('path').parse(module.id).dir+'/html'));


	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

