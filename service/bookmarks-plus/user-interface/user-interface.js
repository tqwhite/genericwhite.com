'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const async = require('async');
var express = require('express');

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

	let workerList = {};

	//LOCAL FUNCTIONS ====================================

	const startSystem = () => {

		if (typeof (COMPONENT) == 'undefined') {
			//console.log("COMPONENT is undefined in" + __dirname)
			this.initCallback && this.initCallback();
			return;
		}



		const startList = [];


		var COMPONENT = require('COMPONENT');
		startList.push((done) => {
			const workerName = 'COMPONENT_NAME'
			new COMPONENT({
				config: this.config,
				apiManager: this.apiManager.init(workerName),
				router: this.router,
				permissionMaster: this.permissionMaster,
				initCallback: function() {
					workerList[workerName] = this; done();
				}
			});
		});


		async.series(startList, () => {
			this.initCallback && this.initCallback();
		});
	};

	//METHODS AND PROPERTIES ====================================

	if (typeof (workerList) != 'object' || 'this object DOES NOT WANT to SHUT DOWN WORKERS') {
		this.shutdown = (message, callback) => {
			console.log(`\nshutting down ${__dirname}`);
			callback('', message);
		}
	} else {
		const buildShutdownList = (message) => {
			const shutdownList = [];
			for (var i in workerList) {
				var worker = workerList[i];
				shutdownList.push(
					((i) => {
						return (done) => {
							workerList[i].shutdown(message, done)
						}
					})(i)
				);
			}
			return shutdownList;
		};

		const cleanup = () => {
			let nameString = '';
			for (var i in workerList) {
				workerList[i] = null;
				nameString += `${i}, `;
			}
			qtools.message(`[${nameString.replace(/, $/, '')}] were flushed at ${Date.now()}`);
			workerList = {};
		}

		this.shutdown = (message, callback) => {
			async.parallel(buildShutdownList(message), () => {
				cleanup();
				callback('', message);
			});
		}
	}

	//API ENDPOINTS ====================================

	
	this.router.get(/\/bmp/, (req, res, next) => {
		res.cookie('environment', qtools.getSurePath(this, 'config.system.environment'), { maxAge: 10000 });
		next();
	});
	
	this.permissionMaster.addRoute('get', new RegExp('/bmp/prohibited.html'), 'tq');
	this.permissionMaster.addRoute('get', new RegExp('/bmp/*'), 'all');
	this.router.use(express.static(require('path').parse(module.id).dir+'/html'));

	//INITIALIZATION ====================================

	startSystem();

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

