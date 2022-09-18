const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            // nodeIntegration: true,
            sandbox: false, // https://www.electronjs.org/zh/blog/electron-20-0#%E7%A0%B4%E5%9D%8F%E6%80%A7--api-%E6%9B%B4%E6%94%B9
            // contextIsolation: false
            preload: path.join(__dirname, './preload.js')
        }
    })
    win.loadFile('./index.html')
    win.webContents.openDevTools()
}
// app.on('window-all-closed', () => {
//     // mac
//     if (process.platform === 'darwin') {
//         app.quit()
//     }
//     console.log('close')
// })
app.whenReady().then(() => {
    createWindow()
    // mac 程序坞重新打开
    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows()/length) {
            createWindow()
        }
    })
})
