const { app, BrowserWindow } = require("electron")
const WinState = require('electron-win-state').default
const path = require('path')
require('./controller/buildMenu')
const getSource = require('./controller/getSource')
const alert = require('./controller/alert')
const open = require('./controller/open')
const getFileList = require('./controller/getFileList')
const createTray = require("./tray")

const createWindow = () => {
    const winState = new WinState({
        defaultWidth: 1000,
        defaultHeight: 800,
        electronStoreOptions: {
            name: 'main'
        }
    })
    const win = new BrowserWindow({
        ...winState.winOptions,
        webPreferences: {
            // nodeIntegration: true,
            sandbox: false, // https://www.electronjs.org/zh/blog/electron-20-0#%E7%A0%B4%E5%9D%8F%E6%80%A7--api-%E6%9B%B4%E6%94%B9
            preload: path.resolve(__dirname, './preload/index.js')
        },
        show: false
    })
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
    winState.manage(win)
    win.on('ready-to-show', () => {
        win.show()
    })
    getSource()
    alert()
    open()
    getFileList()

    createTray(app, win)
}
app.on('window-all-closed', () => {
    // mac
    if (process.platform === 'darwin') {
        app.quit()
    }
    console.log('close')
})
app.whenReady().then(() => {
    createWindow()
    // mac 程序坞重新打开
    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createWindow()
        }
    })
})
