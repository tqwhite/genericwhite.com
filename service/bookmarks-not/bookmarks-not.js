'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const async = require('async');

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

		const startList = [];


// 		const models = require('models');
// 		startList.push((done) => {
// 			const workerName = 'models'
// 			new models({
// 				config: this.config,
// 				apiManager: this.apiManager.init(workerName),
// 				router: this.router,
// 				permissionMaster: this.permissionMaster,
// 				initCallback: function() {
// 					workerList[workerName] = this; done();
// 				}
// 			});
// 		});
// 
// 
// 		const ui = require('./user-interface');
// 		startList.push((done) => {
// 			const workerName = 'user-interface'
// 			new ui({
// 				config: this.config,
// 				apiManager: this.apiManager.init(workerName),
// 				router: this.router,
// 				permissionMaster: this.permissionMaster,
// 				initCallback: function() {
// 					workerList[workerName] = this; done();
// 				}
// 			});
// 		});

console.log(`models are no longer being called from bookmarks-not.js\n`);

		async.series(startList, () => {
			this.initCallback && this.initCallback();
		});
	};

	//METHODS AND PROPERTIES ====================================

	if (typeof (workerList) != 'object') {
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

	//INITIALIZATION ====================================

	startSystem();

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

