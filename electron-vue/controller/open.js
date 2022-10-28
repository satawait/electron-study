const { BrowserWindow, ipcMain } = require('electron')
const WinState = require('electron-win-state').default
const path = require('path')
const saveImg = require('./saveImg')

let win = null
const css = `width: 80px;height: 30px;background-color: cornflowerblue;border-radius: 5px;text-align: center;line-height: 30px;position: fixed;bottom: 50px;right: 20px;z-index=9999;color: #fff;cursor: pointer;`
const js = `
    const div = document.createElement('div')
    div.id = 'button'
    div.innerHTML = '关闭窗口'
    div.addEventListener('click', () => {
        myApi.close()
    })
    document.body.appendChild(div)
    div.style.cssText = '${css}'
`
const openWin = () => {
    ipcMain.handle('on-open-event', (e, url) => {
        const windState = new WinState({
            defaultWidth: 1200,
            defaultHeight: 800,
            electronStoreOptions: {
                name: 'open'
            }
        })
        win = new BrowserWindow({
            ...windState.winOptions,
            show: false,
            webPreferences: {
                preload: path.resolve(__dirname, '../preload/index.js')
            }
        })
        win.loadURL(url)
        win.on('ready-to-show', () => {
            win.show()
        })
        windState.manage(win)

        win.webContents.openDevTools()
        win.webContents.executeJavaScript(js).then().catch(e => {})
        win.webContents.on('context-menu', (e, args) => {
            saveImg(args.srcURL)
        })
    })
    ipcMain.handle('on-close-event', (e) => {
        win.close()
    })
}

module.exports = openWin
