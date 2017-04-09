import $ from "can-jquery";
//looks for projects in node_modules
import Component from "can-component";
import Map from "can-map";
import "can-define";
import stache from "can-stache";
import "can-stache-bindings";
import qtools from "node_modules/qtools-minus/";

import "./grid.less";
import template from "./grid.stache!steal-stache";

import gridManager from "node_modules/grid-manager/";

export const viewModel = Map.extend({
	define: {
		newMessage: {
			value: "hello",
			get: function(value) {
				return value + "!";
			}
		},
		message: {
			value: "hello from bookmarks-grid"
		},
		dataIsResolved: {
			value: false
		}
	},
	getAnchor: function(position) {
		return `${position.row} ${position.column}`;
	},
	showGrid: function(gridElement, editMode) {
		const incomingParameters = qtools.getUriParameters(window.location.hash);
		if (!this.attr('rootVm').gridManagerList[gridElement.refId]) {
			this.attr('rootVm').gridManagerList[gridElement.refId] = new gridManager(gridElement, {
				viewModel: this,
				qtools: qtools,
				Map: Map,
				stache: stache,
				incomingParameters: this.attr("rootVm").attr("incomingParameters")
			});
		}
		return this.attr('rootVm').gridManagerList[gridElement.refId].renderGrid(
			"mainGrid",
			editMode
		);
	},
	testElement: function() {
		console.dir({
			this: this.attr()
		});
		this.attr("bookmarks").then(item => {
			console.dir({ item: item.attr() });
		});
	}
});

Component.extend({
	tag: "bookmarks-grid",
	view: template,
	viewModel: viewModel,
	events: {
		click: function() {
			this.viewModel.attr("visible", !this.viewModel.attr("visible"));
		},
		"input change": function(element, event) {
			const visibleGridRefId = this.viewModel.attr("visibleGridRefId");
			this.viewModel.attr('rootVm').gridManagerList[visibleGridRefId].applyEdit(element);
			this.viewModel.attr("rootVm").attr("dirtyGrid", true);
		}
	},
	helpers: {
		testHelper: function(arg1, options) {
			console.dir({
				"testHelper.options": options.context.attr()
			});
			return "testHelper " + arg1;
		}
	}
});

