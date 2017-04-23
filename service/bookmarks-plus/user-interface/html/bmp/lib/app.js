'use strict';

var _vueMin = require('vue/dist/vue.min.js');

var _vueMin2 = _interopRequireDefault(_vueMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMessage2 = function getMessage2() {
	return 'Hello app.js is doing an arrow function (' + document.cookie + ')';
};
document.getElementById('srcApp').innerHTML = getMessage2();

document.getElementById('srcApp').innerHTML = getMessage2();

var app = new _vueMin2.default({
	el: '#app',
	data: {
		message: 'Hello from Vue!'
	}
});

console.dir(app);