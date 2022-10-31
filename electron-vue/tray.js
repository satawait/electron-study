const { Tray, Menu } = require('electron')
const createTray = (app, win) => {
    const tray = new Tray('icon.png')
    tray.setToolTip('我的应用')
    tray.on('click', e => {
        if (e.shiftKey) {
            app.quit()
        } else {
            win.isVisible() ? win.hide() : win.show()
        }
    })
    tray.setContextMenu(Menu.buildFromTemplate([{
        label: '退出',
        click: () => {
            app.quit()
        }
    }]))
}
module.exports = createTray
