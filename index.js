const { app, BrowserWindow, ipcMain, dialog, globalShortcut, Menu, desktopCapturer } = require('electron')
const path = require('path')
const WinState = require('electron-win-state').default
const mainMenuFunc = require('./mainMenu')
const createTray  = require('./tray')
const mainMenu = mainMenuFunc('test', args => {
    console.log(args)
})
const contextMenu = Menu.buildFromTemplate([{
    role: 'editMenu'
}])
    const createWindow = () => {
        const winState = new WinState({
            defaultWidth: 800,
            defaultHeight: 600
        })

    const win = new BrowserWindow({
        ...winState.winOptions,
        // width: 1000,
        // height: 800,
        // frame: false,
        // titleBarStyle: 'hidden',
        // show: false,
        // backgroundColor: '#6c4539',
        webPreferences: {
            // nodeIntegration: true,
            sandbox: false, // https://www.electronjs.org/zh/blog/electron-20-0#%E7%A0%B4%E5%9D%8F%E6%80%A7--api-%E6%9B%B4%E6%94%B9
            // contextIsolation: false
            preload: path.join(__dirname, './preload.js')
        }
    })

    createTray(app, win)
    win.loadFile('./index.html')
    // win.loadURL('https://www.baidu.com')
    // win.on('ready-to-show', () => {
    //     win.show()
    // })
    // win.webContents.openDevTools() // console窗口
    win.webContents.on('did-finish-load', () => {
        console.log('finished')
    })
    win.webContents.on('dom-ready', () => {
        console.log('dom-ready')
    })
    win.webContents.on('context-menu', (e, params) => {
        console.log('context-menu', params)
        contextMenu.popup()
        // win.webContents.executeJavaScript(`alert('${params.srcURL}')`)
        // dialog.showOpenDialog({
        //     buttonLabel: '保存',
        //     defaultPath: app.getPath('desktop'),
        //     properties: ['multiSelections', 'createDirectory', 'openFile']
        // }).then(res => {
        //     console.log(res.filePaths)
        // })
        // dialog.showSaveDialog({}).then(res => {
        //     console.log(res.filePath)
        // })
        // dialog.showMessageBox({
        //     title: '提示',
        //     message: '请选择',
        //     detail: '详情',
        //     buttons: ['yes', 'no', 'maybe']
        // }).then(res => {
        //     console.log(res)
        // })
    })

    // const win2 = new BrowserWindow({
    //     width: 500,
    //     height: 400,
    //     parent: win,
    //     frame: false,
    //     // show: false,
    //     // backgroundColor: '#6c4539',
    //     webPreferences: {
    //         // nodeIntegration: true,
    //         sandbox: false, // https://www.electronjs.org/zh/blog/electron-20-0#%E7%A0%B4%E5%9D%8F%E6%80%A7--api-%E6%9B%B4%E6%94%B9
    //         // contextIsolation: false
    //         preload: path.join(__dirname, './preload.js')
    //     }
    // })
    // win2.loadURL('https://www.baidu.com')
    winState.manage(win)
    // // 快捷键
    // globalShortcut.register('G', () => {
    //     console.log('G')
    //     globalShortcut.unregister('G')
    // })
    // 菜单
    Menu.setApplicationMenu(mainMenu)
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
        if (!BrowserWindow.getAllWindows().length) {
            createWindow()
        }
    })
})

app.on('before-quit', () => {
    console.log('before-quit')
})

app.on('browser-window-blur', () => {
    console.log('browser-window-blur')
})

app.on('browser-window-focus', () => {
    console.log('browser-window-focus')
})

ipcMain.handle('send-event', (e, msg) => {
    console.log(msg)
    return msg
})
ipcMain.handle('capture-event', (e, args) => {
    return desktopCapturer.getSources({
        types: ['window', 'screen']
    }).then(sources => {
        return sources
    })
})
