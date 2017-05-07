var ipc = require("electron").ipcRenderer;
const remote = require('electron').remote;
const logger = remote.require('./logger');

var currentUser;
var connection; // connection to db

function changeText(elemId, text) {
    document.getElementById(elemId).innerHTML = text;
}

function loginValidate() {
    var username = document.getElementById("username-login").value;
    var passwd = document.getElementById("passwd-login").value;
    
    var query = "SELECT id_user, username, password FROM user WHERE username = '" + username + "';";
    
    connection.query(query, function(err, rows){
        if(err) {
            console.log(err.stack);
            return;
        }
        
        if(!(rows.length > 0)) {// not valid username
            changeText("login-error", "! Invalid username");
        }
        else 
            if(passwd === rows[0].password) { 
                //user = new User(rows[0].id_user, rows[0].username, rows[0].password);
                currentUser = rows[0].username;
                ipc.send('show-main');
            }
            else {// username is valid but the password doesn't match
                changeText("login-error", "! Wrong username and password combination");
            }       
        
    });
       
}

function signupValidate() {
    var username = document.getElementById("username-signup").value;
    var passwd = document.getElementById("passwd-signup").value;
    var conf_passwd = document.getElementById("conf-passwd-signup").value;
    
    var query = "SELECT * FROM user WHERE username = '" + username + "';";
    
    connection.query(query, function(err, rows){
        if(err) {
            console.log(err.stack);
            return;
        }
        
        if(rows.length > 0) {// not valid username (already exists)
            changeText("signup-error", "! Username not available");
        }
        else 
            if(!(passwd === conf_passwd)) {// passwords don't match 
                changeText("signup-error", "! Passwords do not match");
            }
            else {// username is valid and passwords match -- insert new user
                query = "INSERT INTO user (username, password) VALUES ('" + username + "', '" + passwd + "');";
                
                connection.query(query, function(err){
                    if(err) {
                        console.log(err.stack);
                        return;
                    }
                    else {// user added with success
                        alert("Signed up successfully! You can login to your new account now.");
                        // make login div visible
                        var login_div = document.getElementById("login-div");
                        var signup_div = document.getElementById("signup-div");
                        signup_div.style.display = "none";
                        login_div.style.display = "block";
                    }
                });
            }       
        
    });
       
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

// connects to DB
function getConnection() {
    var mysql = require("mysql");

    connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        database:"diary_app"
    });

    connection.connect((err) => {
        if(err) {alert(err.stack);
            return console.log(err.stack);
        }  
        console.log("succesfull connection to db");
    });
}

function login_main() {
    loginMinCloseBtns();
    getConnection();
    
    document.getElementById("login-btn").addEventListener('click', loginValidate);
    
    document.getElementById("signup-btn").addEventListener('click', signupValidate);
    
    switchLoginSignup();
    
}
login_main();

var Global = {
    user: 'da'
};    
module.exports = Global;