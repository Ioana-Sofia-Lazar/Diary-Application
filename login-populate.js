var ipc = require("electron").ipcRenderer;
const remote = require('electron').remote;

function loginValidate() {   
    ipc.send('show-main');
}

// functionality to minimize and close form buttons
function loginMinCloseBtns() { 
    // if we close the login we close the app
    var close = document.getElementById("login-close-btn");
    close.addEventListener('click', function() {
        const window = remote.getCurrentWindow();
        window.close();
    });
    
    document.getElementById("login-min-btn").addEventListener("click", function(e) {
        const window = remote.getCurrentWindow();
        window.minimize(); 
    });     
}

// switches to/from Login to Sign up
function switchLoginSignup() {
    var login = document.getElementById("switch-to-login");
    var signup = document.getElementById("switch-to-signup");
    var login_div = document.getElementById("login-div");
    var signup_div = document.getElementById("signup-div");
    
    login.addEventListener('click', function() {
        signup_div.style.display = "none";
        login_div.style.display = "block";
    });
    
    signup.addEventListener('click', function() {
        login_div.style.display = "none";
        signup_div.style.display = "block";
    });
}

function login_main() {
    loginMinCloseBtns();
    
    document.getElementById("login-btn").addEventListener('click', loginValidate);
    
    switchLoginSignup();
    
}

login_main();