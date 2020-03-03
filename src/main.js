import Vue from 'vue'
import {
  Button, Dialog, Form, FormItem, Input, Option, Select, Switch, Tabs, TabPane, Tooltip, Upload
} from 'element-ui'
import * as hooks from './hooks'
import * as gui from './gui'

function main () {
  // 初始化element
  Vue.use(Button)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Option)
  Vue.use(Select)
  Vue.use(Switch)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Tooltip)
  Vue.use(Upload)

  hooks.init()
  gui.init()
}

if (window.isBiboImgCryptoLoaded) {
  window.alert('bibo-img-crypto 已经加载，请不要重复加载')
} else {
  window.isBiboImgCryptoLoaded = true
  main()
}
