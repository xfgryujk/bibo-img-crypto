import Vue from 'vue'
import Gui from './Gui'

export function init () {
  let button = document.createElement('div')
  document.body.appendChild(button)
  /* eslint-disable no-new */
  new Vue({
    el: button,
    render: h => h(Gui)
  })
}
