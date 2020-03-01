import {Notification} from 'element-ui'
import {encrypt, decrypt} from './codec'
import {getConfig} from './config'

export function init () {
  hookUpload()
  hookContextMenu()
}

// Hook上传图片函数
async function hookUpload () {
  // WIP
}

// 监听右键菜单
function hookContextMenu () {
  document.addEventListener('contextmenu', async event => {
    let originImg = event.target
    if (getConfig().enableDecryption && originImg instanceof window.Image) {
      if (originImg.src.startsWith('data:')) { // 如果是'data:'开头说明已经解密过了
        return
      }
      event.preventDefault() // 解密时屏蔽右键菜单
      let url = await decrypt(originImg)
      if (url) {
        originImg.src = url
      }
    }
  })
}

async function sleep (time) {
  return new Promise(resolve => {
    window.setTimeout(resolve, time)
  })
}
