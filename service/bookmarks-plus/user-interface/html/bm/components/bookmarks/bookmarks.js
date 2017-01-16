import $ from 'can-jquery'; //looks for projects in node_modules
import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import stache from 'can-stache';
import 'can-stache-bindings';
import qtools from 'node_modules/qtools-minus/';

import './bookmarks.less';
import template from './bookmarks.stache!steal-stache';
import UserBookmarks from 'models/userBookmarks/connector'


export const viewModel = Map.extend({
	define: {
		message: {
			value: 'hello from bookmarks-grid'
		},
		userBookmarks: {
			value: function() {
				const list = new UserBookmarks.getList();
				return list;
			}
		},
		visibleGridRefId: {
		},
		editMode: {
			value: false
		}
	},
	toggleEditMode: function() {
		this.attr('editMode', !this.attr('editMode'));
	},
	setDefaultGrid: function() {
		this.userBookmarks.then((grids) => {
			const simpleGrid = grids[0].attr();
			if (!this.attr('visibleGridRefId')) {
				this.attr('visibleGridRefId', simpleGrid.defaultGridRefId);
			}
		});
	},
	chooseGrid: function(gridRefId) {
		this.attr('visibleGridRefId', gridRefId);
	},
	testElement: function() {
		console.dir({
			"this": this.attr()
		});
	}
});
Component.extend({
	tag: "bookmarks",
	view: template,
	viewModel: viewModel,
	events: {},
	helpers: {
		testHelper: function(arg1, options) {
			return 'testHelper()'
		}
	}
});
