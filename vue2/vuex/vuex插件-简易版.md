实现一个简易版的 `Vuex` 插件。easy-vuex.js

```js
// 保存vue
let Vue = null;

// 创建一个仓库类
class Store {
  constructor(options) {
    // 保存配置
    this.$options = options;
    this._state = options.state;
    this._getters = options.getters;
    this._mutations = options.mutations;
    this._actions = options.actions;
      
    const store = this
    const computed = {}
    
    Object.keys(this._getters).forEach(key => {
      const fn = this._getters[key]
      computed[key] = function() {
        return fn(store._state)
      }
    })
	// 用vue实例实现state响应式数据和getter计算属性
    this._vm = new Vue({
      data() {
        // 拿到仓库配置的state将它响应式化
        return store._state;
      },
      // 拿到仓库配置的getter赋值为计算属性
      computed,
    })
    // 保存this指向
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }
  // 设置读取getter属性指向
  get getters() {
    return this._vm
  }
  // 设置读取state属性指向
  get state() {
    return this._vm._data;
  }
  // 设置不能直接修改state数据
  set state(v) {
    console.error('Cannot modify state directly!')
  }
  // 触发指定 mutations 的方法
  commit(type, payload) {
    // 找到指定方法
    const mutation = this._mutations[type]
    // 存在就传入state并执行
    if (mutation) {
      mutation(this.state, payload)
    } else { // 不存在就报错
      console.error('There is no '+ type +' function!')
    }
  }
  // 触发指定 actions 的方法
  dispatch(type, payload) {
    // 找到指定方法
    const action = this._actions[type]
    // 存在就传入this并执行
    if (action) {
      action(this, payload)
    } else { // 不存在就报错
      console.error('There is no '+ type +' function!')
    }
  }
};
// 提供给 Vue.use 执行插件
const install = function(_Vue) {
  Vue = _Vue;
  // 全局混入
  Vue.mixin({
    beforeCreate() {
      // 在组件创建的时候，找到根组件把store保存成全局$store
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install };

```

