// const fs = require('fs')

// fs.writeFile('./test.txt', '1244443', e => {
//     console.log(process.platform)
// })

const { contextBridge, ipcRenderer } = require('electron')

const handleSend = async () => {
    console.log('1222')
    const res = await ipcRenderer.invoke('send-event', 'hello')
    console.log(res)
}
contextBridge.exposeInMainWorld('myApi', {
    platform: process.platform,
    handleSend
})
