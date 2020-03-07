# bibo-img-crypto
自动加密解密B博上传的图片，[weibo-img-crypto](https://github.com/xfgryujk/weibo-img-crypto) 的B博版

## 如何使用
首先安装 [Tampermonkey](http://tampermonkey.net/) 浏览器扩展，然后[去 Greasy Fork 添加 bibo-img-crypto 脚本](https://greasyfork.org/zh-CN/scripts/397467-bibo-img-crypto)。加载成功后在B博页面点击左下角的北极熊 ~~（天哥哥）~~ 按钮可以打开设置界面。上传图片时会自动加密，在图片上点击鼠标右键会自动解密

## 算法说明
置乱算法加密的原理是把像素块或 RGB 数据随机移动到一个新位置，所以加密解密时的随机种子必须一样。默认的随机种子是 `114514`，可以在设置界面修改随机种子

推荐使用块随机置乱算法，支持透明通道，不会出现有损压缩再解密造成的高频噪声，但是会裁剪图片到8像素的倍数。RGB随机置乱算法不支持透明通道，如果被有损压缩，会有高频噪声，但是B博不处理图片所以没有噪声。马赛克算法其实是利用B博不处理图片文件，将两张图片文件拼在一起，显示的可以是任意图片，这里选择了马赛克后的原图

## 兼容性
不支持 GIF 图

只在 Chrome、Edge 浏览器测试过，不保证支持其他浏览器 ~~（IE 是什么？我可不知道）~~

## 效果
加密后：

![加密后](https://github.com/xfgryujk/bibo-img-crypto/blob/master/demo/encrypted.png)

解密后：

![解密后](https://github.com/xfgryujk/bibo-img-crypto/blob/master/demo/decrypted.png)

原图：

![原图](https://github.com/xfgryujk/bibo-img-crypto/blob/master/demo/origin.jpg)
