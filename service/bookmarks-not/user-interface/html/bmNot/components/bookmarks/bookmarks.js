import $ from "can-jquery";
//looks for projects in node_modules
import Component from "can-component";
import Map from "can-map";
import "can-map-define";
import stache from "can-stache";
import "can-stache-bindings";
import qtools from "node_modules/qtools-minus/";

import "./bookmarks.less";
import template from "./bookmarks.stache!steal-stache";
import Bookmarks from "models/bookmarks/connector";

export const viewModel = Map.extend({
	define: {
		message: {
			value: "hello from bookmarks-grid"
		},
		bookmarks: {
			value: function() {
				const list = Bookmarks.getList();



				return list;
			}
		},
		simpleMarks: {
			type: "*"
		},
		visibleGridRefId: {
		
		get:function(value){
			if (value){
				return value;
			}
			this.attr('incomingParameters', qtools.getUriParameters(window.location.hash));
			if (this.attr('incomingParameters').targetGrid){
				return this.attr('incomingParameters').targetGrid;
			}
		}
		
		},
		incomingParameters:{
			type: "*"
		},
		dirtyGrid:{
		
		},
		editMode: {
			value: false
		}
	},
	gridManagerList: {},
	toggleEditMode: function() {
		const editMode = this.attr("editMode");
		if (editMode) {
			this.saveBookmarks();
			this.attr("editMode", false);
		} else {
			this.attr("editMode", true);
		}
	},
	setDefaultGrid: function() {
		this.bookmarks.then(grids => {
			this.attr('simpleMarks', grids);
			const simpleGrid = grids[0].attr();


			if (!this.attr("visibleGridRefId")) {
				this.attr("visibleGridRefId", simpleGrid.defaultGridRefId);
			}
		});
	},
	saveBookmarks: function() {
// 		if (!this.attr('dirtyGrid')){
// 			return;
// 		}
		var newGrid;
		this.attr('bookmarks').then(item => {
			for (var i = 0, len = item.attr().length; i < len; i++) {
				var grid = item.attr()[i];
				newGrid = {
					_id: grid._id,
					archiveGridRefId: grid.archiveGridRefId,
					defaultGridRefId: grid.defaultGridRefId,
					grids: []
				};

				for (var j = 0, len2 = grid.grids.length; j < len2; j++) {
					var subGrid = grid.grids[j];
					newGrid.grids[j] = {
						_id: subGrid._id,
						columnWidth: subGrid.columnWidth,
						name: subGrid.name,
						refId: subGrid.refId,
						bookmarks: []
					};

					for (var k = 0, len3 = subGrid.bookmarks.length; k < len3; k++) {
						var bookmark = subGrid.bookmarks[k];
						var newMark = {
							_id: bookmark._id,
							cssClasses: bookmark.cssClasses,
							anchor: {
								uri: bookmark.anchor.uri,
								text: bookmark.anchor.text
							},
							position: {
								row: bookmark.position.row,
								column: bookmark.position.column
							}
						};



						newGrid.grids[j].bookmarks.push(newMark);
					}
				}
			}
		
			const saveObj = new Bookmarks(newGrid);
			const promise = saveObj.save().then(item => {
				this.attr('dirtyGrid', false);
			}, err => {
				console.dir({ err: err });
			});
		
		});


	},
	chooseGrid: function(gridRefId) {
		this.attr("visibleGridRefId", gridRefId);
	},
	testElement: function() {
		console.dir({
			this: this.attr(),
			simpleMarks:this.attr('simpleMarks').attr()[0]
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
			return "testHelper()";
		}
	}
});
