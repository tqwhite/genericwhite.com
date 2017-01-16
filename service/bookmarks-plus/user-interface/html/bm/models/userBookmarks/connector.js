import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import List from 'can-list';
import Map from 'can-map';


export const UserBookmarks = Map.extend({
  define: {}
});

UserBookmarks.List = List.extend({
  Map: UserBookmarks
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
  url: '/bm/api/userBookmarks',
  idProp: '_id',
  Map: UserBookmarks,
  List: UserBookmarks.List,
  name: 'user-bookmarks'
});

tag('user-bookmarks-model', userConnection);

export default UserBookmarks;


