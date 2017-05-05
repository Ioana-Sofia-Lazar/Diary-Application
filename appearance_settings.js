/* Appearance and settings */

// applies theme according to the 'Apply' button that was clicked
function applyTheme(index) {
    var link = document.getElementById("alternate-css");
    var href = "Themes/app-theme";
    switch(index) {
        // first button is for the default theme
        case 0: 
            href = "";
            break;
        case 1: 
            href += "1.css";
            break;
        case 2: 
            href += "2.css";
            break;
    }
    link.setAttribute("href", href);
}

// functionality for 'Apply' theme buttons
function applyButtonsFunc() {
    var buttons = document.getElementsByClassName("theme-apply");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {applyTheme(i);})
    }
}

function main_appearance_settings() {
    // functionality for 'Apply' theme buttons
    applyButtonsFunc();
}

main_appearance_settings();