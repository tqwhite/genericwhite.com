'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {

	qtools.validateProperties({
		subject: args || {},
		targetScope: this, //will add listed items to targetScope
		propList: [
			{
				name: 'placeholder',
				optional: true
			}
		]
	});


	//LOCAL FUNCTIONS ====================================



	//METHODS AND PROPERTIES ====================================


	this.shutdown = (message, callback) => {
		callback('', message);
	}


	//INITIALIZATION ====================================


	console.log(__dirname);


	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();






