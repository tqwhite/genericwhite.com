import $ from 'can-jquery'; //looks for projects in node_modules
import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import stache from 'can-stache';
import 'can-stache-bindings';
import qtools from 'node_modules/qtools-minus/';


import './grid.less';
import template from './grid.stache!steal-stache';

export const viewModel = Map.extend({
	define: {
		newMessage: {
			value: 'hello from bookmarks-cell'
		}
	},

	testElement: function() {
		console.dir({
			"this": this.attr()
		});
	},
});

Component.extend({
	tag: "bookmarks-cell",
	view: template,
	viewModel: viewModel,
	events: {},
	helpers: {}
});

