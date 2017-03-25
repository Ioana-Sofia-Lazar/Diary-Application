const electron = require('electron');
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});
const {app, BrowserWindow} = electron;
var ipc = require("electron").ipcMain;

app.on('ready', () => {
     let loginWindow = new BrowserWindow({
         width:350, 
         height: 500, 
         frame:false
     });
    loginWindow.loadURL(`file://${__dirname}/login.html`);
     loginWindow.webContents.openDevTools(); //shows Console
    let mainWindow = new BrowserWindow({
        width:1200, 
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
    
})