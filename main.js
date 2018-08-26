const { app, BrowserWindow } = require('electron')
let win

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 270,
        backgroundColor: "#cfe2f3"
    });
    win.loadFile('index.html');
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})