import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import 'can/list/list';


export const BookmarkGrid = can.Map.extend({
  define: {}
});

BookmarkGrid.List = can.List.extend({
  Map: BookmarkGrid
}, {});


export const userConnection = superMap({
	parseListProp: "data",
	parseListData: function(incomingJson) {
		let incoming=incomingJson;
		if (typeof (incomingJson) == 'string') {
			incoming = JSON.parse(incomingJson);
		}
		return incoming.data;
	},
	parseInstanceProp: "data",
	parseInstanceData: function(inDataItem) {

		if (typeof (inDataItem) == 'string') {
			inDataItem = JSON.parse(inDataItem).data[0];
		}

		return inDataItem.data;
	},
  url: '/bm/api/bookmarkGrid',
  idProp: '_id',
  Map: BookmarkGrid,
  List: BookmarkGrid.List,
  name: 'bookmark-grid'
});

tag('bookmark-grid-model', userConnection);

export default BookmarkGrid;


