import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';
import 'can/list/list';


export const User = can.Map.extend({
  define: {}
});

User.List = can.List.extend({
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


