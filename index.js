const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

// require('electron-reload')(path.join(__dirname, "output"));

const app = electron.app;

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    let main_width = 800;
    let main_height = 600;

    let mainWindow = new BrowserWindow({
        width: main_width,
        height: main_height,
        frame: false
    });

    mainWindow.webContents.openDevTools();

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
