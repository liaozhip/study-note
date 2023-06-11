#### **下载安装 `vuex` ：**

##### `npm`：

​	`npm install vuex --save`

#####  `yarn`：

​	`yarn add vuex`

##### `Vue.use` 注册使用。`store.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

##### 在 `Vue` 根组件里面全局挂载, 挂载以后所有的组件都能通过 `this.$store` 访问到。`main.js`

```js
import store from './store'
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

#### 1. State

##### 	通过 `this.$store.state` 直接访问：

```js
this.$store.state.count
```

##### 	通过`mapState` 辅助函数：

```vue
<script>
import { mapState } from 'vuex'
export default {
    computed: mapState({
        count: state => state.count, // 函数形式
        countAlias: 'count', // 字符串形式
    })
}
</script>
```

##### 	当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```vue
<script>
import { mapState } from 'vuex'
export default {
    computed: mapState([
		'count', // 映射 this.count 为 store.state.count
    ])
}
</script>
```

##### 	使用扩展运算符 `...` ：

```vue
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['count'])
    }
}
</script>
```

#### 2. Getters

##### 	`store` 的计算属性，就像 `Vue` 的计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变	      	才会被重新计算。

​	`Getter` 接受 `state` 作为其第一个参数，也可以接受其他 `getter` 作为第二个参数：

```js
const store = new Vuex.Store({
  state: {
    counter: 10
  },
  getters: {
    dubbleCounter: (state, getters) => state.counter * 2
  }
})
```

##### 	通过属性访问：

```js
this.$store.getters.dubbleCounter
```

##### 	通过方法访问：

​		你也可以通过让 `getter` 返回一个函数，来实现给 `getter` 传参。在你对 `store` 里的数组进行查询时非常有用。

```js
getters: {
  getArrByItem: (state) => (item) => {
    return state.arr.fin(arrItem => item === arrItem)
  }
}
```

```js
this.$store.getters.getArrByItem(2)
```

##### 	注意：`getter` 在通过方法访问时，每次都会去进行调用，而不会缓存结果。

##### 	`mapGetters` 辅助函数：

​	`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```vue
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['dubbleCounter', 'getArrByItem']),
  }
}
</script>
```

##### 	映射设置别名：

```vue
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
      ...mapGetters({ counter: 'dubbleCounter' })
  }
}
</script>
```

#### 3. Mutations

##### 	更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 `mutation`，并且它会接受 `state` 作为第一个参数。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

##### 	`mutation`不能直接调用。当触发一个类型为 `increment` 的 `mutation` 时，调用此函数。

```js
store.commit('increment')
```

##### 	传入额外的参数，即 `mutation` 的载荷`payload`：

```js
mutations: {
    increment (state, payload) {
      state.count += payload
    }
  }
store.commit('increment', 10)
```

##### 	在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 `mutation` 会更易读：

```js
mutations: {
    increment (state, payload) {
      state.count += payload.n
    }
}
store.commit('increment', {
    n: 10
})
```

##### 	`mutation`对象的提交风格。直接使用包含 `type` 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

##### 	当使用对象风格的提交方式，整个对象都作为载荷传给 `mutation` 函数，因此 `handler` 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

##### 	`Mutation` 需要遵守 `Vue` 的响应规则。

 	1. 最好提前在你的 store 中初始化好所有所需属性。
 	2. 当需要在对象上添加新属性时，你应该：

- 使用 `Vue.set(obj, 'newProp', 123)`。
- 以新对象替换老对象。比如：

```js
state.obj = { ...state.obj, newProp: 123 }
```

##### 	使用常量替代 `Mutation` 事件类型

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
// 用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做
```

##### 	`Mutation` 必须是同步函数。

```js
// 现在想象，我们正在 `debug` 一个 `app` 并且观察 `devtool` 中的 `mutation` 日志。
// 每一条` mutation` 被记录，`devtools` 都需要捕捉到前一状态和后一状态的快照。
// 然而，在上面的例子中 `mutation` 中的异步函数中的回调让这不可能完成：
// 因为当 `mutation` 触发的时候，回调函数还没有被调用，`devtools` 不知道什么时候回调函数实际上被调用
// ——实质上任何在回调函数中进行的状态的改变都是不可追踪的。
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

##### 	在组件中提交 `Mutation`

​	你可以在组件中使用 `this.$store.commit('xxx')` 提交 `mutation`。

​	或者使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```vue
<script>
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
</script>
```

​	在 `mutation` 中混合异步调用会导致你的程序很难调试。

​	例如，当你调用了两个包含异步回调的 `mutation` 来改变状态，你怎么知道什么时候回调和哪个先回调呢？

​	这就是为什么我们要区分这两个概念。

​	在 `Vuex` 中，`mutation` 都是同步事务：

```js
store.commit('increment')
// 任何由 "increment" 导致的状态变更都应该在此刻完成。
```

#### 4. Actions

##### 	`Action` 类似于 `mutation`，不同在于：

- `Action` 提交的是 `mutation`，而不是直接变更状态。
- `Action` 可以包含任意异步操作。

##### 	让我们来注册一个简单的 `action`：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    increment (context) {
      context.commit('increment')
    }
  }
})
```

##### 	`Action` 通过 `store.dispatch` 方法触发：

```js
// mutation必须同步执行，Action就不受约束，我们可以在action内部执行异步操作
store.dispatch('increment')
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})
// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

##### 	使用`mapActions`：

```vue
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
</script>
```

#### 5. Module

```js
// 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
const moduleA = {
  namespaced: true, // 开启命名空间
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) { // 这里的 `state` 对象是模块的局部状态 moduleA
      state.count++
    }
  },
  actions: actions: {
    // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    // 这里的 state 对象是模块的局部状态 moduleA,节点状态会作为第三个参数暴露出来
    doubleCount (state, getters, rootState) {
      return state.count * 2
    }
  }
}

const store = new Vuex.Store({
  modules: {f
    moduleA,
  }
})

store.state.moduleA // -> moduleA 的状态
```

##### 	若需要在全局命名空间内分发 `action` 或提交 `mutation`，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
dispatch('someOtherAction', null, { root: true })
commit('someMutation', null, { root: true })
```

##### 	在带命名空间的模块注册全局 `action`。

```js
actions: {
	someAction: {
  		root: true,
  		handler (namespacedContext, payload) { ... } // -> 'someAction'
	}
}
```

##### 	带命名空间的绑定函数。

```js
computed: {
  ...mapState({
    a: state => state.module.a,
    b: state => state.module.b
  })
},
methods: {
  ...mapActions([
    'module/foo', // -> this['module/foo']()
    'module/bar' // -> this['module/bar']()
  ])
}
// 对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。
// 于是上面的例子可以简化为：
computed: {
  ...mapState('module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

##### 	`createNamespacedHelpers`：

```vue
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('module')
export default {
  computed: {
    // 在 `module` 中查找
    ...mapState(['a', 'b'])
  },
  methods: {
    // 在 `module` 中查找
    ...mapActions(['foo', 'bar'])
  }
}
</script>
```

##### 	模块动态注册。

```js
import { createStore } from 'vuex'

const store = createStore({ /* 选项 */ })
// 在 store 创建之后，你可以使用 store.registerModule 方法注册模块：
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})

// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

模块动态注册功能使得其他 `Vue` 插件可以通过在 store 中附加新模块的方式来使用 `Vuex` 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 `Vue Router` 和 `Vuex` 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 `store` 时声明的模块）。

注意，你可以通过 `store.hasModule(moduleName)` 方法检查该模块是否已经被注册到 `store`。需要记住的是，嵌套模块应该以数组形式传递给 `registerModule` 和 `hasModule`，而不是以路径字符串的形式传递给 `module`。