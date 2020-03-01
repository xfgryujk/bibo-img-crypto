import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as hooks from './hooks'
import * as gui from './gui'

function main () {
  Vue.use(ElementUI)
  hooks.init()
  gui.init()
}

if (window.isBiboImgCryptoLoaded) {
  window.alert('bibo-img-crypto 已经加载，请不要重复加载')
} else {
  window.isBiboImgCryptoLoaded = true
  main()
}
