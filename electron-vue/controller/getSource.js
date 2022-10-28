const { ipcMain, BrowserWindow } = require('electron')
const getSource = () => {
        ipcMain.handle('on-url-event', (e, url) => {
            return new Promise((resolve, reject) => {
                const win = new BrowserWindow({
                    width: 500,
                    height: 500,
                    show: false,
                    webPreferences: {
                        offscreen: true
                    }
                })
                win.loadURL(url)
                win.webContents.on('did-finish-load', async () => {
                    const title = win.getTitle()
                    // console.log(title)
                    try {
                        const img = await win.webContents.capturePage()
                        if (img.isEmpty()) {
                            resolve({
                                msg: '无法获取网站'
                            })
                        } else {
                            const screenshot = img.toDataURL()
                            // console.log(screenshot
                            resolve({
                                title,
                                screenshot,
                                url
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        reject(error)
                    }
                })
            })
        })
}

module.exports = getSource
