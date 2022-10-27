const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async (url) => {
    const res = await ipcRenderer.invoke('on-url-event', url)
    return res
}

const alert = (msg) => {
    ipcRenderer.invoke('on-alert-event', msg)
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    alert
})
