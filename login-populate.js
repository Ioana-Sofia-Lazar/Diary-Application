const remote = require('remote');
var ipc = require("electron").ipcRenderer;

function loginValidate() {
    
    ipc.send('show-main');
}

// if we close the login the application will quit (you can't use it without being logged in)
function closeForm(remote) {
    const window = remote.getCurrentWindow();
    window.close();
}

function main() {
  
    var btn = document.getElementById("login-btn");
    btn.addEventListener('click', loginValidate);
    
    var close = document.getElementById("closeform");
    close.addEventListener('click', function() {closeForm(remote);});
}

main();