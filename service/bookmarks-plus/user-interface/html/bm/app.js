import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';

import './styles.less';
import template from './index.stache!steal-stache';

var viewModel = new Map({
	message: "Hello World",
	appStatus: "Startup Ok",
	tokenClaims: function() {
		const parts = document.cookie.split(/;/);
		const token = parts.filter((item) => {
			return item.match(/token/);
		})
		if (!token.length){
			return 
		}
		else{
			return JSON.parse(token[0].split(/=/)[1]).claims;
		}
	}
});



$(() => {
console.log('hello');
  $('body').append(template(viewModel));
});