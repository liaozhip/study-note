实现一个简易版的 `Vue-Router` 插件。easy-router.js

```js
// 保存 Vue 提供使用。
let Vue = null;

class EasyRouter {
    constructor(options) {
        this.$options = options;

        // 保存当前路径 current 
        this.current = window.location.hash.slice(1) || '/';
        // 保存跳转的路径并响应式
        Vue.util.defineReactive(this, 'matched', []);

        // 监听 hash 修改当前路径
        window.addEventListener('hashchange', onHashchange.bind(this));
        this.match()
    }
    onHashchange() {
        this.current = window.location.hash.slice(1);
        this.matched = []
        this.match()
    }
    match(routes) {
        routes = routes || this.$options.routes

        for (const route of routes) {
            // 遍历找到根路由
            if (this.current === '/' && route.path === '/') {
                this.matched.push(route)
                return
            }
            // 找到多级路由
            if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                this.matched.push(route)
                if (route.children?.length > 0) {
                  this.match(route.children)
                }
            }
        }
    }
};

// Vue.use()的时候会调用插件的 install 方法，并把自身Vue传入。
EasyRouter.install = function(_Vue) {
  Vue = _Vue;

  // 当 Vue 根组件创建时把根组件挂载的router挂载到全局$router
  Vue.mixin({
    beforeCreate() {
      // 只在挂载了router的根组件执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  })
  
  // 全局注册router—link组件
  Vue.component('router-link', {
    render(h) {
      return h('a', {
        attrs: {
          // 组件上面的to属性修改成原始href属性。
          href: '#' + this.$attrs.to
        }
          // 默认插槽
      }, this.$slots.default);
    },
  })

  // 全局注册router—view组件
  Vue.component('router-view', {
    render(h) {
        this.$vnode.data.routerView = true
        let depth = 0

        let parent = this.$parent
        while(parent) {
            const routerView = parent?.$vnode?.data?.routerView
            if (routerView) {
                depth++
            }
            parent = parent.$parent
        }

        let component = null
        const route = this.$router.matched[depth]

        if (route) {
            component = route.component
        }

        return h(component)
    }
  })
};

export default EasyRouter;

```

