const templateRegExp = new RegExp(/\{\{(.*)\}\}/)

const originalProto = Array.prototype
const arrayProto = Object.create(originalProto);

['push', 'pop', 'shift', 'unshift'].forEach(method => {
  arrayProto[method] = function() {
    originalProto[method].apply(this, arguments)
  }
})

function defineReactive(obj, key, val) {
  // 递归
  observe(val);
  // 每个key对应一个dep
  const dep = new Dep()
  // 拦截代理响应式对象
  Object.defineProperty(obj, key, {

    get() {
      // 创建 watcher 时会读取属性值，收集 watcher
      Dep.target && dep.addDep(Dep.target)
      return val;
    },

    set(newVal) {
      if (newVal !== val) {
        // 数据重新赋值为对象时，重新拦截代理
        observe(newVal)
        val = newVal
        // 数据改变通知更新
        dep.notify()
      }
    },
  });
}

function observe(obj) {

  if (typeof obj !== 'object' && obj !== null) {
    return obj
  }

  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto
    for (let i = 0; i < obj.length; i++) {
      defineReactive(obj, i, obj[i])
      // observe(obj[i])
    }
  } else {
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }
}

// 代理app.key
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      }
    })
  })
}

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    
    observe(this.$data)
    proxy(this)

    new Compile(options.el, this)
  }
}

class Compile {
  constructor(el, vm) {
    const element = document.querySelector(el)
    this.$vm = vm
    this.compile(element)
  }

  compile(element) {
    element.childNodes.forEach(node => {

      if (this.isElement(node)) {
        const attrs = node.attributes

        Array.from(attrs).forEach(attr => {
          const attrName = attr.name
          const exp = attr.value

          if (this.isDirective(attrName)) {
            const dir = attrName.substring(2)

            this[dir] && this[dir](node, exp)
          }
        })

        if (node.childNodes.length > 0) {
          this.compile(node)
        }

      } else if (this.isInter(node)) {
        this.compileText(node)
      }
    })
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater']

    fn && fn(node, this.$vm[exp])

    // 初始化数据，每个页面上的key都对应一个 watcher
    new Watcher(this.$vm, exp, () => {
      fn && fn(node, this.$vm[exp])
    })
  }

  html(node, exp) {
    this.update(node, exp, 'html')
  }

  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  text(node, exp) {
    this.update(node, exp, 'text')
  }

  textUpdater(node, val) {
    node.textContent = val
  }

  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  compileText(node) {
    const key = templateRegExp.exec(node.textContent)[1].trim()
    this.update(node, key, 'text')
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInter(node) {
    return node.nodeType === 3 && templateRegExp.test(node.textContent)
  }
}

class Watcher {
  constructor(vm, key, updater) {
    this.$vm = vm
    this.key = key
    this.updater = updater

    Dep.target = this
    // 创建时读取属性提供响应式数据收集自己
    this.$vm[key]
    Dep.target = null
  }

  update() {
    this.updater.call(this.$vm, this.$vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
