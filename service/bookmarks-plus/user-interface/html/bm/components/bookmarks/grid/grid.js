import $ from 'can-jquery'; //looks for projects in node_modules
import Component from 'can-component';
import Map from 'can-map';
import 'can-define';
import stache from 'can-stache';
import 'can-stache-bindings';
import qtools from 'node_modules/qtools-minus/';

import './grid.less';
import template from './grid.stache!steal-stache';

import gridGenerator from 'node_modules/grid-manager/';

export const viewModel = Map.extend({
	define: {
		newMessage: {
			value: 'hello',
			get: function(value) {
				return value + '!';
			}
		},
		message: {
			value: 'hello from bookmarks-grid'
		},
		dataIsResolved: {
			value: false
		}
	},
	getAnchor: function(position) {
		return `${position.row} ${position.column}`
	},

	gridManagerList: {},
	showGrid: function(gridElement, editMode) {

	
		if (!this.gridManagerList[gridElement.refId]) {
			this.gridManagerList[gridElement.refId] = new gridGenerator(gridElement, {
			qtools:qtools,
			Map:Map,
			stache:stache
			});
		}
		return this.gridManagerList[gridElement.refId].renderGrid('mainGrid', editMode)
	},

	testElement: function() {
		console.dir({
			"this": this.attr()
		});
		this.attr('userBookmarks').then((item)=>{
		
console.dir({"item":item.attr()});


		});
	},
});

Component.extend({
	tag: "bookmarks-grid",
	view: template,
	viewModel: viewModel,
	events: {
		click: function() {
			this.viewModel.attr("visible", !this.viewModel.attr("visible"));
		}
	},
	helpers: {
		testHelper: function(arg1, options) {

			console.dir({
				"testHelper.options": options.context.attr()
			});
			return 'testHelper ' + arg1;

		}
	}
});

