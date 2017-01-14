import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';
import qtools from 'node_modules/qtools-minus/';

import './bookmarks.less';
import template from './bookmarks.stache!steal-stache';
import BookmarkGrid from 'models/bookmarkGrid/connector'


export const viewModel = Map.extend({
	define: {
		message: {
			value: 'hello from bookmarks-grid'
		}
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

