// const fs = require('fs')

// fs.writeFile('./test.txt', '1244443', e => {
//     console.log(process.platform)
// })

const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('myApi', {
    platform: process.platform
})
