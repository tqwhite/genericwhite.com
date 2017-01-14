import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';
import qtools from 'node_modules/qtools-minus/';

import './grid.less';
import template from './grid.stache!steal-stache';
import BookmarkGrid from 'models/bookmarkGrid/connector'

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
		},
		bookmarkGrid:{
			value:function(){
				const list=new BookmarkGrid.getList();
				return list;
			}
		
		},
		visibleGridRefId:{
			
		}
	},
    setDefaultGrid:function(){
	this.bookmarkGrid.then((grids)=>{
	const simpleGrid=grids[0].attr();
    	if (!this.attr('visibleGridRefId')){
console.log("simpleGrid.defaultGridRefId="+simpleGrid.defaultGridRefId);


    		this.attr('visibleGridRefId', simpleGrid.defaultGridRefId);
    	}
});



    },
    chooseGrid:function(gridRefId){
    
		this.attr('visibleGridRefId', gridRefId);


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

