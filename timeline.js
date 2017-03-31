/* We will have an Entry object that will hold title, time, location, text,.. for an entry and the li that will be attached to the timeline.
 * We will also have an array of entries that will only hold the entries that appear in the timeline at some point.
 * When we edit an entry we actually delete the original entry and make a new one with the new data.
 * Each entry has a unique id.
 */

var calendar; // pikaday calendar

// the icon that will be displayed according to the selected activity
function selectIcon(activity) {
    var icon = "fa-";
    
    switch (activity) {
        case "Eat":
            icon += "cutlery";
            break;
        case "University/School":
            icon += "university";
            break;
      case "Study":
        icon += "book";
        break;
      case "Work/Job":
        icon += "briefcase";
        break;
        case "Shopping":
            icon += "shopping-cart";
            break;
        case "Sleep":
            icon += "hotel";
            break;
        case "Shower":
            icon += "shower";
            break;
        case "Convesation":
            icon += "wechat";
            break;
        case "Other":
            icon += "pencil";
            break;
    }
    
    return icon;
}

// we get the activity acording to the icon previously selected
function getActivity(icon) {
    var activity;
    
    switch (icon) {
        case "cutlery":
            activity += "Eat";
            break;
        case "university":
            activity += "University/School";
            break;
      case "book":
        activity += "Study";
        break;
      case "briefcase":
        activity += "Work/Job";
        break;
        case "shopping-cart":
            activity += "Shopping";
            break;
        case "hotel":
            activity += "Sleep";
            break;
        case "shower":
            activity += "Shower";
            break;
        case "wechat":
            activity += "Convesation";
            break;
        case "pencil":
            activity += "Other";
            break;
    }
    
    return activity;
}

var entries = []; // array that holds all the entries currently attached to the timeline
var timeline = document.getElementsByClassName("timeline")[0];
var form = document.getElementById("add-entry-wrapper");
var savebut = document.getElementById("save-entry"); // form button

var newTitle = document.getElementById("entry-title");
var newText = document.getElementById("entry-text");
var newTime = document.getElementById("entry-time");
var newLocation = document.getElementById("entry-location");
var newActivity = "Other";

// we insert the newly created entry so that we keep the cronologycal order
function insertEntry(entry) {
    
    var newLi = entry.li;
    
    // if there is no entry yet, we attach the new one
    if (entries.length == 0) {
        entries.push(entry);
        timeline.appendChild(newLi);
    }
        
    else {
        // we find the first entry that happens later (bigger time) than the one we want to insert
        // we will insert the new one right before it
        var i = 0;
        while(i < entries.length){
            if(entries[i].time > entry.time)
                break;
            i++;
        }
    
        // we add it to the array
        entries.splice(i, 0, entry);
        
        // we attach it to the timeline in the right cronologycal place
        var li = timeline.firstElementChild;
        for (var j = 0; j < i; j++) {
            li = li.nextElementSibling;
        }
        timeline.insertBefore(newLi, li); 
    }
          
}

// we will remove an entry with a given id from entries array
function removeEntry(searchid) {
    var i = 0;
    while(i < entries.length) {
        if(entries[i].id == searchid)
            break;
        i++;
    }
    
    if(i < entries.length && entries[i].id == searchid)
        entries.splice(i, 1);
    else alert("error");
    
}

function Entry(_title, _activity, _time, _location, _text){
    this.title = _title;
    this.activity = _activity;
    this.icon = selectIcon(_activity);
    this.time = _time;
    this.location = _location;
    this.text = _text;
    this.id = 0;
    
    var self = this;
    
    this.saveEditEntry = function() {
        
        savebut.removeEventListener("click", self.saveEditEntry);
        
        var li = new Entry(newTitle.value, newActivity, newTime.value, newLocation.value, newText.value);
        li.createEntry();
        
        // we remove the current entry and make a new one instead
        removeEntry(self.id);
        timeline.removeChild(self.li);
     
        form.style.display = "none";
        savebut.addEventListener("click", saveAddEntry);

        newTitle.value = "";
        newText.value = "";
        newTime.value = "";
        newLocation.value = "";
    };
    
    this.editEntry = function() {
        
        newTitle.value = this.title;
        newText.value = this.text;
        newTime.value = this.time;
        newLocation.value = this.location;

        form.style.display = "block";
        
        savebut.innerHTML = "Save";
        savebut.removeEventListener("click", saveAddEntry);
        savebut.addEventListener("click", self.saveEditEntry);
    };
    
    this.createEntry = function() {
        savebut.innerHTML = "Add";
        
        var li = document.createElement("LI");
        var badge = document.createElement("DIV");
        var badgei = document.createElement("I");
        var panel = document.createElement("DIV");
        var btns = document.createElement("DIV");
        var editbutton = document.createElement("BUTTON");
        var xbutton = document.createElement("BUTTON");
        var title = document.createElement("H4");
        var timei = document.createElement("I");
        var br = document.createElement("BR");
        var time = document.createElement("P");
        var locationi = document.createElement("I");
        var location = document.createElement("P");
        var hr = document.createElement("HR");
        var text = document.createElement("P");

        title.innerHTML = this.title;
        text.innerHTML = this.text;
        time.innerHTML = "  " + this.time;
        location.innerHTML = "  " + this.location;
        xbutton.innerHTML = "&#10005;"; 
        editbutton.innerHTML = "...";

        li.classList.add("timeline-inverted");
        badge.classList.add("timeline-badge");
        badgei.classList.add("fa"); badgei.classList.add(selectIcon(newActivity));
        panel.classList.add("timeline-panel");
        btns.classList.add("timeline-entry-btns");
        editbutton.classList.add("timeline-entry-edit");
        xbutton.classList.add("timeline-entry-delete");
        title.classList.add("timeline-title");
        timei.classList.add("fa"); timei.classList.add("fa-clock-o");
        time.classList.add("timeline-time");
        locationi.classList.add("fa"); locationi.classList.add("fa-map-marker"); 
        location.classList.add("timeline-location");
        text.classList.add("timeline-text");

        btns.appendChild(editbutton);
        btns.appendChild(xbutton);
        panel.appendChild(btns);
        panel.appendChild(title);
        panel.appendChild(timei);
        panel.appendChild(time);
        panel.appendChild(br);
        panel.appendChild(locationi);
        panel.appendChild(location);
        panel.appendChild(hr);
        panel.appendChild(text);
        badge.appendChild(badgei);
        li.appendChild(badge);
        li.appendChild(panel);
        
        self.id = Entry.len;
        Entry.len++;
        
        self.li = li;
        insertEntry(self);
        
        xbutton.onclick = function() {
            removeEntry(self.id);
            timeline.removeChild(li);
        };
        
        editbutton.onclick = function() {     
            self.editEntry();
        };
              
    };
     
}

Entry.len = 0; //static variable that will help assign unique id's to entries

// creates the entry according to the form
function saveAddEntry() {
    
    var activityList = document.getElementsByName("activity-list")[0];  
    for (let i = 0; i < activityList.options.length; i++) {
        let opt = activityList.options[i];
        if (opt.selected === true) {
            newActivity = opt.value;
            break;
        }
    }
    
    var li = new Entry(newTitle.value, newActivity, newTime.value, newLocation.value, newText.value);
    li.createEntry();
    
    newTitle.value = "";
    newText.value = "";
    newTime.value = "";
    newLocation.value = "";
    
    form.style.display = "none";  
}

function cancelAddEntry() {
    form.style.display = "none";
}

// creates and attaches calendar
function createCalendar() {
    var field = document.getElementById('calendar-pikaday');
        calendar = new Pikaday({
            firstDay: 1, // Monday is first day
            theme: 'dark-theme',
            onSelect: function(date) {
                handleDatePick();
            }
        });
    field.appendChild(calendar.el);
}

function main_timeline() {
    
    // creates the calendar and attaches it
    createCalendar();
    
    document.getElementById("cancel-entry").addEventListener("click", cancelAddEntry);
    
    savebut.addEventListener("click", saveAddEntry);    
    
}

main_timeline();