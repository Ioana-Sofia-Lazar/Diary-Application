// opens calendar
function openNav() {
    document.getElementById("calendar-bar").style.width = "250px";
}

// closes calendar
function closeNav() {
    document.getElementById("calendar-bar").style.width = "0";
}

// when we select a date in the calendar
function handleDatePick() {
    
}

// creates and attaches calendar
function createCalendar() {
    var field = document.getElementById('calendid');
        var picker = new Pikaday({
            firstDay: 1, // Monday is first day
            theme: 'dark-theme',
            onSelect: function(date) {
                field.value = picker.toString();
                handleDatePick();
            }
        });
    field.parentNode.insertBefore(picker.el, field.nextSibling);
}

function handleMenuClick(i) {
    // we make all other divs invisible
    var opts = document.getElementsByClassName("option");
    for (var j = 0; j < opts.length; j++)
        opts[j].style.display = "none";
    // if we clicked an icon other than the calendar we close the calendar
    if(i != 1) closeNav();
    // we find the div corresponding to the icon we clicked and we make it visible
    var name = "option" + i.toString();
    var option = document.getElementById(name);
    option.style.display = "inline";
}

function addMenuListeners() {
    var icons = document.getElementsByClassName("icon");
    for (let i = 0; i < icons.length; i++){
        icons[i].addEventListener("click", function() {handleMenuClick(i);});
        //icons[i].onclick = function() {handleMenuClick(i);}
    }      
}

function main() {
    
    const remote = require('electron').remote; 
    
    //creates the calendar and attaches it
    createCalendar();
 
    // functionality for window close and minimize buttons  
    function init() { 
    document.getElementById("min-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
        window.minimize(); 
    }); 
    document.getElementById("close-btn").addEventListener("click", function (e) {
        const window = remote.getCurrentWindow();
            window.close();
        }); 
    }; 
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            init(); 
        }
    };
    
    // calendar slide push menu
    document.getElementsByClassName("calicon")[0].onclick = openNav;
    
    // menu functionality
    addMenuListeners();
    
}

main();