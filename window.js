var ipc = require("electron").ipcRenderer;
const remote = require('electron').remote;
var express = require('express');
var Q = require('Q');
var app = express();
//const jsFile = remote.require('./login-populate');alert("ddddd");

var user = "da"; // the one from the login window

// User class
function User(id, username, name, birthdate) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.birthdate = birthdate;
    
    this.setUsername = function(newUsername) {
        this.username = newUsername;
    };
    
    this.setName = function(newName) {
        this.name = newName;
    };
    
    this.setBirthdate = function(newBirthdate) {
        this.birthdate = newBirthdate;
    };
}

// Settings class
function Settings(id, first_day, send_reminders, theme) {
    this.id = id;
    this.first_day = first_day;
    this.send_reminders = send_reminders;
    this.theme = theme;
    
}

var currentUser = null;// = new User(0, "", "", ""); // current user that is logged in
var currentSettings; // account settings for current user

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

// loads profile info
function loadProfile() {alert("2");
    var query = "SELECT name, DATE_FORMAT(birthdate,'%d-%m-%Y') as birth FROM user WHERE username = '" + currentUser.username + "';";

    connection.query(query, function(err, rows){
        if(err) {
            console.log(err.stack);
            return;
        }
        
        if(rows.length > 0) {      
            var name = rows[0].name;
            var birthdate = rows[0].birth;
            if(name != null) {  
                currentUser.setName(name);
                document.getElementById("profile-name").innerHTML = name;
            }
                
            if(birthdate != null) {
                currentUser.setBirthdate(birthdate);
                document.getElementById("profile-birthdate").innerHTML = birthdate;
            }
                
        }
        else
            console.log("Error at loading profile data");
    });
}

// loads settings
function loadSettings() {alert("2");
    var query = "SELECT s.* FROM settings s join user u on (s.id_user = u.id_user) WHERE u.username = '" + user + "';";
    
    connection.query(query, function(err, rows){
        if(err) {
            console.log(err.stack);
            return;
        }
        
        if(rows.length > 0) {         
            settings = new Settings(rows[0].id_setting, rows[0].first_day, rows[0].send_reminders, rows[0].theme);
        }
        else
            console.log("Error at loading settings data");
    });
}

// create corresponding User object
function getUserInfo() {alert("1");
    var defered = Q.defer();
    var query = "SELECT id_user, name, DATE_FORMAT(birthdate,'%d-%m-%Y') as birth FROM user WHERE username = '" + user + "';";
    
    connection.query(query, function(err, rows){
        if(err) {
            console.log(err.stack);
            return;
        }
        
        if(rows.length > 0) {//alert(rows[0].id_user + " " + user);
            currentUser = new User(rows[0].id_user, user, rows[0].name, rows[0].birth);
            document.getElementById("profile-name").innerHTML = rows[0].name;
            document.getElementById("profile-birthdate").innerHTML = rows[0].birth;
        }
        else
            console.log("Error at creating user object");

    });
}

// loads all data from database for the currently logged in user
function loadAll() {
    //getUserInfo();
    //loadSettings();
    
    
}

// opens calendar
function openNav() {
    document.getElementById("calendar-bar").style.width = "250px";
    document.getElementById("calendar-bar").style.padding = "10px 20px";
}

// closes calendar
function closeNav() {
    document.getElementById("calendar-bar").style.width = "0";
    document.getElementById("calendar-bar").style.padding = "0px";
}

// when we select a date in the calendar
function handleDatePick() {
    
}

function handleMenuClick(i) {
    // we make all other divs invisible
    var opts = document.getElementsByClassName("option");
    for (var j = 0; j < opts.length; j++)
        opts[j].style.display = "none";
    
    // we make all icons not look active
    var icons = document.getElementsByClassName("icon");
    for (var j = 0; j < icons.length; j++){
        icons[j].classList.remove("menu-icon-active");
        icons[j].classList.add("menu-icon");
    }
           
    // if we clicked an icon other than the calendar we close the calendar
    if(i != 1) closeNav();
    // we find the div corresponding to the icon we clicked and we make it visible
    var name = "option" + i.toString();
    var option = document.getElementById(name);
    option.style.display = "inline";
    icons[i].classList.add("menu-icon");
    icons[i].classList.add("menu-icon-active");
}

function addMenuListeners() {
    var icons = document.getElementsByClassName("icon");
    for (let i = 0; i < icons.length; i++){
        icons[i].addEventListener("click", function() {handleMenuClick(i);});       
    }      
}

// functionality for window close and minimize buttons  
function minCloseBtns() { 
    document.getElementById("min-btn").addEventListener("click", function(e) {
        const window = remote.getCurrentWindow();
        window.minimize(); 
    }); 
    document.getElementById("close-btn").addEventListener("click", function(e) {
        const window = remote.getCurrentWindow();
            window.close();
        }); 
}

function main_window() {
    getConnection();
    loadAll();
    
    // window close and minimize buttons 
    minCloseBtns();
    
    // calendar slide push menu
    document.getElementsByClassName("calicon")[0].onclick = openNav;
    
    // menu functionality
    addMenuListeners();
    
    
}

main_window();