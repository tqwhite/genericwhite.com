import Vue from 'vue/dist/vue.min.js'
import Router from 'vue-router'
import test from './components/test.vue'

Vue.use(Router)

const getMessage2 = () => `Hello app.js is doing an arrow function (${document.cookie})`;
document.getElementById('srcApp').innerHTML = getMessage2();

document.getElementById('srcApp').innerHTML = getMessage2();

		var helloFromVue = new Vue({
			el: '#helloFromVue',
			data: {
				htmlMesssageVar: `
				
<br/><br/><b>Hello from Vue!!</b><br/><br/>
As I turn my attention to the GE project, I remind myself of this:<br/><br/>
1) The basic nodejs app for bookmarks plus works. It's file structure is
correct. It correctly uses webpack to build the system and load both
babel and vue. The dev site compiles on every access. The demo site
loads a built library file.
<br/><br/>
2) The next step is to initialize a Vue component system. Last time I tried,
I was unable to access test.vue from app.js. I don't recall the error. Making
it so that I can structure the app into files is job #1.
<br/><br/>
3) After that the rough sequence I imagine is connect to the API and then build a UI.
<br/><br/>




`
			}
		});
		
		console.dir(helloFromVue);




const router= new Router({
  routes: [
    {
      path: '/',
      component: test
    }
  ]
})


const app2 = new Vue({
  router
}).$mount('#bookmarks')