const { dialog, ipcMain } = require('electron')

const alert = () => {
    ipcMain.handle('on-alert-event', (e, msg) => {
        dialog.showMessageBox({
            message: msg,
            type: 'error'
        })
    })
}

module.exports = alert
