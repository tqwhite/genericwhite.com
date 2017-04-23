'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const async = require('async');
var express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

var configPath =
	process.env.gwProjectPath + 'configs/instanceSpecific/webpack/compile.js';

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

webpack(webpackConfig, err => {
	if (err) {
		qtools.logError(err.toString() + '\n\n');
		throw err;
	}

	qtools.logMilestone('Webpack build is complete\n\n');
});
