# -*- coding: utf-8 -*-
import json


def main():
    with open('dist/js/app.js', encoding='utf-8') as f:
        script = f.read()
    with open('package.json', encoding='utf-8') as f:
        package = json.load(f)
    version = package['version']
    with open('bibo-img-crypto.user.js', 'w', encoding='utf-8') as f:
        f.write(f"""// ==UserScript==
// @name         bibo-img-crypto
// @namespace    http://tampermonkey.net/
// @version      {version}
// @description  自动加密解密B博上传的图片。上传图片时自动加密，在图片上点击鼠标右键自动解密。GitHub: https://github.com/xfgryujk/bibo-img-crypto
// @author       xfgryujk
// @match        *://t.bilibili.com/*
// @match        *://space.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {{
""")
        f.write(script)
        f.write("""
})();
""")


if __name__ == '__main__':
    main()
