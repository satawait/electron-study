const { app, BrowserWindow } = require("electron")
const WinState = require('electron-win-state').default
const path = require('path')

const createWindow = () => {
    const winState = new WinState({
        defaultWidth: 1000,
        defaultHeight: 800
    })
    const win = new BrowserWindow({
        ...winState.winOptions,
        webPreferences: {
            preload: path.resolve(__dirname, './preload/index.js')
        }
    })
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
    winState.manage(win)
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
