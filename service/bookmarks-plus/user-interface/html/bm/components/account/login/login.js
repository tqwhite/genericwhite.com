import $ from 'jquery'; //looks for projects in node_modules
import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import stache from 'can/view/stache/stache';

import template from './login.stache!steal-stache';
import User from 'models/user/connector'

var viewModel = Map.extend({
    visible: false,
    user:{
    	type:User
    },
    get message(){ return 'hello '+(new Date());},
    testElement:function(){
	console.dir({"this":this});
	console.dir({"this":this.attr()});
    },
    
    getToken:function(event, element){
    	console.clear();

    	event.preventDefault();
    	const user=new User({
    		data:{
    			username:this.attr('user').username,
    			password:this.attr('user').password
    		}
    	});
    	
    	user.save()
    	.then((result)=>{
			this.attr('rootVm').attr('appStatus', `Good login ${result.username}`);


    	}, (err)=>{
			this.attr('rootVm').attr('appStatus', err.responseJSON.errorText);

    	});
    }
  });

Component.extend({
  tag: "account-login",
  view: template,
  viewModel: viewModel,
  events: {
    click: function(){
        this.viewModel.attr("visible", !this.viewModel.attr("visible") );
    }
  },
  helpers:{
  	testHelper:function(arg1, options){
  
	console.dir({"testHelper.options":options.context.attr()});
	return 'testHelper '+arg1;

  }
  }
});

