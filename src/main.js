import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.component('paginate', VuejsPaginate);
var VueTruncate = require('vue-truncate-filter');
Vue.use(VueTruncate);
Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app');
