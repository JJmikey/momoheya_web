import Vue from 'vue';
   import VueRouter from 'vue-router';

   Vue.use(VueRouter);

   const routes = [
     {
       path: '/test',
       name: 'Test',      
       // 需要將 '@/views/Test' 替換成你Test.vue的真實路徑
       component: () => import('@/components/App_cropper_test.vue'),
     },
   ];

   const router = new VueRouter({
     mode: 'history',
     base: process.env.BASE_URL,
     routes,
   });

   export default router;
   