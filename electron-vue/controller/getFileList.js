const { ipcMain } = require('electron')
const fs = require('fs/promises')
const path = require('path')

const getFileList = () => {
    ipcMain.handle('on-get-file-event', async (e, msg) => {
        const files = await fs.readdir(path.resolve(__dirname, '../public/uploads'))
        return files
    })
}

module.exports = getFileList
