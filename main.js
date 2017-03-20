const electron = require('electron');
require('electron-reload')(__dirname, {
  electron: require('electron-prebuilt')
});
const {app, BrowserWindow} = electron;

app.on('ready', () => {
     let win = new BrowserWindow({width:1200, height: 700, frame:false});
    win.loadURL(`file://${__dirname}/index.html`);
     win.webContents.openDevTools(); //shows Console
})