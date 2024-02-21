import Vue from 'vue'
import App from './components/App_cropper_test.vue'
//import router from './router'; // 導入我們剛創建的 router

Vue.config.productionTip = false

new Vue({
  //router, // 將 router 添加到 Vue 實例中
  render: h => h(App),
}).$mount('#app')
