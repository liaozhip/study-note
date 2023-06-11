Vue-Router是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得更容易。

1. 安装使用：`vue add router`

   - 步骤一：使用 vue-router 插件。router.js

     ```js
     import Vue from 'vue';
     import Router from 'vue-router';
     
     Vue.use(Router); // 注册使用 Router
     ```

   - 步骤二：创建 Router 实例。router.js

     ```js
     const routes = [];
     
     const router = new Router({
         mode: 'history',
         base: process.env.BASE_URL,
         routes,
         ... // router 配置
     });
         
     export default router;
     ```

   - 步骤三：在跟组件上添加 Router 实例。main.js

     ```js
     import router from './router.js'; // 引入 router.js
     
     new Vue({
         router, // 把router实例挂载到vue根组件
     }).$mount('#app')
     ```

   - 步骤四：添加路由视图。App.vue

     ```vue
     <template>
       <div id="app">
         <router-view />
       </div>
     </template>
     ```

   - 导航

     ```vue
     <template>
         // 标签导航
         <router-link to="/">home</router-link>
         <router-link to="/about">about</router-link>
     </template>
     
     <script>
     // 编程式导航
     this.$router.push('/');
     this.$router.push('/about');
     </script>
     ```

     