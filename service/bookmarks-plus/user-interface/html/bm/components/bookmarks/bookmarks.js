import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';
import qtools from 'node_modules/qtools-minus/';

import './bookmarks.less';
import template from './bookmarks.stache!steal-stache';
import UserBookmarks from 'models/bookmarkGrid/connector'


export const viewModel = Map.extend({
	define: {
		message: {
			value: 'hello from bookmarks-grid'
		},
		userBookmarks:{
			value:function(){
				const list=new UserBookmarks.getList();
				return list;
			}
		
		},
		visibleGridRefId:{
			
		}
	},
    setDefaultGrid:function(){
	this.userBookmarks.then((grids)=>{
	const simpleGrid=grids[0].attr();
    	if (!this.attr('visibleGridRefId')){
    		this.attr('visibleGridRefId', simpleGrid.defaultGridRefId);
    	}
});
    },

	gridManagerList: {},
	showGrid: function(gridElement) {
		if (!this.gridManagerList[gridElement.refId]) {
			this.gridManagerList[gridElement.refId] = new gridGenerator(gridElement, qtools);
		}
		return this.gridManagerList[gridElement.refId].renderGrid('mainGrid')
	},
    chooseGrid:function(gridRefId){
    
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

