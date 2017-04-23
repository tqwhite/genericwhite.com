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
				message: 'Hello from Vue!'
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