function loginValidate() {
    var div = document.getElementById("loginform");
    div.style.display = "none";
}

// if we close the login the application will quit (you can't use it without being logged in)
function closeForm(remote) {
    const window = remote.getCurrentWindow();
    window.close();
}

function main() {
    const remote = require('electron').remote; 
    
    var btn = document.getElementById("login-btn");
    btn.addEventListener('click', loginValidate);
    
    var close = document.getElementById("closeform");
    close.addEventListener('click', function() {closeForm(remote);});
}

main();