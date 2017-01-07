import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';
import qtools from 'node_modules/qtools-minus/';

import template from './grid.stache!steal-stache';
import BookmarkGrid from 'models/bookmarkGrid/connector'

import gridGenerator from 'node_modules/grid-manager/';





var viewModel = Map.extend({

	message: 'hello from bookmarks-grid',
	dataIsResolved:{
		value:false
	},
	
	getGrid: function() {
		BookmarkGrid.getList({
			userRefId: 'tqwhiteUserRefId'
		})
			.then((result) => {

				this.attr('bookmarkGrid', result);
console.log("\n=-=============   bookmarkGrid  =========================\n");


				this.attr('dataIsResolved', true);

console.log("\n=-=============   dataIsResolved  =========================\n");

console.dir({"this.attr()":this.attr()});


			},
				(err) => {
					console.dir({
						"BookmarkGrid.err": err
					});
				})
	},

	getAnchor: function(position) {
		return `${position.row} ${position.column}`
	},

	gridManagerList: {},
	showGrid: function(gridElement) {
		if (!this.gridManagerList[gridElement.refId]) {
			this.gridManagerList[gridElement.refId] = new gridGenerator(gridElement, qtools);
		}
		return this.gridManagerList[gridElement.refId].renderGrid('mainGrid')
	},


	testElement: function() {
		console.dir({
			"this": this.attr()
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

