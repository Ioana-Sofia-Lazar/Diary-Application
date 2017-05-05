var ipc = require("electron").ipcRenderer;

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

const remote = require('electron').remote;

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
   
    // window close and minimize buttons 
    minCloseBtns(); 
    
    // calendar slide push menu
    document.getElementsByClassName("calicon")[0].onclick = openNav;
    
    // menu functionality
    addMenuListeners();
    
    
}

main_window();