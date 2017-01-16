import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import List from 'can-list';
import Map from 'can-map';


export const User = Map.extend({
  define: {}
});

User.List = List.extend({
  Map: User
}, {});


export const userConnection = superMap({
	parseListProp: "data",
	parseListData: function(incomingJson) {
		const incoming = JSON.parse(incomingJson);
		return incoming.data;
	},
	parseInstanceProp: "data",
	parseInstanceData: function(inDataItem) {

		if (typeof (inDataItem) == 'string') {
			inDataItem = JSON.parse(inDataItem).data[0];
		}

		document.cookie=`token=${JSON.stringify(inDataItem.token)}`;
		
		return inDataItem.data;
	},
  url: '/bm/api/user',
  idProp: '_id',
  Map: User,
  List: User.List,
  name: 'user'
});

tag('user-model', userConnection);

export default User;


