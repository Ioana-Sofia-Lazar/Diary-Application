const electron = require('electron');
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});
const {app, BrowserWindow} = electron;
var ipc = require("electron").ipcMain;

var log = require('electron-log');

app.on('ready', () => {
     let loginWindow = new BrowserWindow({
         width: 350, 
         height: 500, 
         frame: false,
         resizable: false
     });
    loginWindow.loadURL(`file://${__dirname}/login.html`);
    //loginWindow.webContents.openDevTools(); //shows Console
    let mainWindow = new BrowserWindow({
        width: 1200, 
        height: 700, 
        frame: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
     mainWindow.webContents.openDevTools(); //shows Console
    
    ipc.on('show-main', function() {
        loginWindow.hide();
        mainWindow.show();
    });
    
    // so the process doesn't remain open in the background
    app.on('window-all-closed', app.quit);
    app.on('before-quit', () => {
            mainWindow.removeAllListeners('close');
            mainWindow.close();
    });
});


/*app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 1200, 
        height: 700, 
        frame: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.openDevTools(); //shows Console
    
    // so the process doesn't remain open in the background
    app.on('window-all-closed', app.quit);
    app.on('before-quit', () => {
            mainWindow.removeAllListeners('close');
            mainWindow.close();
    });
    
});*/