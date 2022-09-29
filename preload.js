// const fs = require('fs')

// fs.writeFile('./test.txt', '1244443', e => {
//     console.log(process.platform)
// })

const { contextBridge, ipcRenderer, clipboard, nativeImage } = require('electron')

const handleSend = async () => {
    console.log('1222')
    const res = await ipcRenderer.invoke('send-event', 'hello')
    console.log(res)
}
const copy = () => {
    clipboard.writeText('hello clipboard')
}
const paste = () => {
    console.log(clipboard.readText())
}
const captureFunc = async () => {
    console.log('capture')
    const res = await ipcRenderer.invoke('capture-event')
    for (const source of res) {
        if (source.name === '屏幕 1') {
           const str = source.thumbnail.crop({x:0, y: 30, width: 1200, height: 1170})
           const imgSrc = str.toDataURL()
           return imgSrc
        }
    }
}
const testNativeImage = () => {
    const image = nativeImage.createFromPath('icon.png')
    console.log(image)
}
contextBridge.exposeInMainWorld('myApi', {
    platform: process.platform,
    handleSend,
    copy,
    paste,
    captureFunc,
    testNativeImage
})
