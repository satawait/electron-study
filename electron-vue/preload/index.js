const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async (url) => {
    const res = await ipcRenderer.invoke('on-url-event', url)
    return res
}

const alert = (msg) => {
    ipcRenderer.invoke('on-alert-event', msg)
}

const open = url => {
    ipcRenderer.invoke('on-open-event', url)
}

const close = url => {
    ipcRenderer.invoke('on-close-event', url)
}

const saveImg = url => {
    ipcRenderer.invoke('on-save-event', url)
}

const getFileList = async () => {
    const fileList = await ipcRenderer.invoke('on-get-file-event')
    return fileList
}

const openDialog = url => {
    ipcRenderer.send('on-openDialog-event', url)
}

const rendererEvent = (callback) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.on('on-renderer-event', (e, msg) => {
            callback(msg)
        })
    })
}

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,
    alert,
    open,
    close,
    saveImg,
    getFileList,
    openDialog,
    rendererEvent
})
