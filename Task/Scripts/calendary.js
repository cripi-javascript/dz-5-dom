var Calendary= function (who) {
    this.whois = "Alex.Mangin";
    this.EventFactory = {
        "timer" : document.getElementById("NewEventTimeInterval"),
        "nameLocation" : document.getElementById("NewEventNameLocation"),
        "coordinate" : document.getElementById("NewEventCoordinate"),
        "stars" : document.getElementById("NewEventStars"),
        "cost" : document.getElementById("NewEventCost"),
        "parties" : document.querySelector("#NewEventPartiesList ol"),
    };
    this.eventList = document.getElementById("eventList");
    this.eventBase = initTestBase();
    this.errorManager = new CalendaryErrorManager("Error");
    this.currentFilters = [];
}
Calendary.prototype.ApplyFilter = function(filters) {
    var base = this.eventBase;
    for(var i in filters) {
        base = filters[i].call(base);
    }
    return base;
}
Calendary.prototype.CreateEvent = function() {
    if (!this.isCorrecteNeedFields()) {
        this.changeNeed();
        this.changeAddition();
        return
    }
    if (!this.isCorrecteAdditionFields()) {
        if (!confirm('Некоторые незначительные поля некорректны, продолжить?')) {
            this.changeAddition();
            return;
        }
    }
    var parties = [];
    var partyList = this.EventFactory.parties.querySelectorAll(" input");
    for(var i = 0; i<partyList.length;i++) {
        if (partyList[i].value && partyList[i].value !== "") {
            parties.push({"name" : partyList[i].value});
        }
    }
    var eventDate = {
        "id" : Math.random(),
        "location" : {
            "gps": {"x": parseFloat(this.EventFactory.coordinate.querySelector(" .XCoordinate").value), "y":  parseFloat(this.EventFactory.coordinate.querySelector(" .YCoordinate").value)},
            "nameLocation": this.EventFactory.nameLocation.querySelector("input").value,
        },
        "stars" : parseFloat(this.EventFactory.stars.querySelector("input").value),
        "cost" :  parseFloat(this.EventFactory.cost.querySelector("input").value),
        "start": new Date(this.EventFactory.timer.querySelector(".StartDate").value),
        "end": new Date(this.EventFactory.timer.querySelector(".FinishDate").value),
        "parties" : parties
    }
    if (Validator.isCoordinate(this.EventFactory.coordinate)) {
        eventDate.location.gps.x = 0;
        eventDate.location.gps.y = 0;
    }
    if (Validator.isStars(this.EventFactory.stars)) {
        eventDate.stars = 0;
    }
    if (Validator.isPositiveNumber(this.EventFactory.cost)) {
        eventDate.cost = 0;
    }
    this.eventBase = this.eventBase.add(new Event(eventDate));
    var inputs = document.querySelectorAll('#eventFactory input');
    for(var i=0; i<inputs.length ; i++) {
        if (inputs[i].type === "text" || inputs[i].type === "date") {
            inputs[i].value = "";
        }
    }
    var errors = document.querySelectorAll('#eventFactory .Error');
    for(var i=0; i<errors.length ; i++) {
        document.remove(errors);
    }
    
    this.errorManager.removeAllChildren(this.EventFactory.parties);
    
    var docfrag = document.createDocumentFragment()
    var io = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    io.appendChild(input);
    for(var i = 0; i<3; i+=1) {
        docfrag.appendChild(io.cloneNode(true));
    }
    this.EventFactory.parties.appendChild(docfrag);
}
Calendary.prototype.UpdateShowList= function() {
    
    var createEventRow = function(number, event) {
        var row = (function createRow() {
            var rowTable = document.createElement("tr");
            var cellTable = document.createElement("td");
            for (var i=0; i < 7; i += 1) {
                rowTable.appendChild(cellTable.cloneNode(false));
            }
            return rowTable;
        }());
        row.children[0].appendChild(document.createTextNode(number));
        row.children[1].appendChild(document.createTextNode(event.locationToString()));
        row.children[2].appendChild(document.createTextNode(event.starsToString()));
        row.children[3].appendChild(document.createTextNode(event.start.toDateString()));
        row.children[4].appendChild(document.createTextNode(event.end.toDateString()));
        row.children[5].appendChild(document.createTextNode(event.cost + " $"));
        var listParty = document.createElement("select");
        for(var n in event.parties) {
            var aDOMParty = document.createElement("option");
            aDOMParty.appendChild(document.createTextNode(event.parties[n].name));
            listParty.appendChild(aDOMParty);
        }
        if (event.parties.length) {
            row.children[6].appendChild(listParty);
        }
        return row;
    }
    this.errorManager.removeAllChildren(this.eventList);
    var newEventList = document.createDocumentFragment();
    var currentBase = this.ApplyFilter(this.currentFilters);
    
    for(var i = 0; i<currentBase.items.length; i += 1) {
        var event = currentBase.items[i];
        newEventList.appendChild(createEventRow(i + 1, event));
    }
    
    this.eventList.appendChild(newEventList);
}
Calendary.prototype.changeNeed = function () {
    this.errorManager.changeTime(this.EventFactory.timer);
    this.errorManager.changeImportantStringField(this.EventFactory.nameLocation);
}
Calendary.prototype.changeAddition = function () {
    this.errorManager.changeCoordinate(this.EventFactory.coordinate);
    this.errorManager.changePositiveNumber(this.EventFactory.cost);
    this.errorManager.changeStars(this.EventFactory.stars);
}
Calendary.prototype.isCorrecteNeedFields = function () {
    return Validator.isTimeInterval(this.EventFactory.timer) === "" && 
        Validator.isImportantStringField(this.EventFactory.nameLocation) === ""; 
}
Calendary.prototype.isCorrecteAdditionFields = function () {
    return Validator.isCoordinate(this.EventFactory.coordinate) === "" &&
        Validator.isStars(this.EventFactory.stars) === "" &&
        Validator.isPositiveNumber(this.EventFactory.cost) === "";
}
Calendary.prototype.addFriend = function (li) {
    var newParty = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    newParty.appendChild(input);
    li.appendChild(newParty);
}
Calendary.prototype.updateFilter = function () {
    var filterRadios = document.querySelectorAll("#FilterEventList input[type = radio]");
    var oldFilters = this.currentFilters;
    var newFilters = [];
    for(var i = 0; i < filterRadios.length; i += 1) {
        var radioButton = filterRadios[i];
        if (radioButton.checked && radioButton.checked === true && radioButton.value != "None") {
            // var nameFunc = radioButton.value.toString();
            newFilters.push(function(){
                return this[radioButton.value.toString()]();
            });
        }
    }
    
    var partys = document.querySelectorAll("#FilterFriens input");
    var nonEmptyParty = [];
    for(var i = 0; i < partys.length; i += 1) {
        if (partys[i].value != "") {
            nonEmptyParty.push(partys[i].value);
        }
    }
    var partyFilter = function() {
        var base = this;
        for (var i = 0; i < nonEmptyParty.length; i += 1) {
            base = base.withFriend({"name":nonEmptyParty[i]});
        }
        return base;
    }
    newFilters.push(partyFilter);
    this.currentFilters = newFilters;
}
//Садим на все события
function setInt(){
    var calendary = new Calendary("ololsdfso");
    calendary.UpdateShowList();
    calendary.EventFactory.timer.addEventListener('blur', function() {
        calendary.errorManager.changeTime(this);
    }, true);
    calendary.EventFactory.nameLocation.addEventListener('blur', function() {
        calendary.errorManager.changeImportantStringField(this);
    }, true);
    calendary.EventFactory.coordinate.addEventListener('blur', function() {
        calendary.errorManager.changeCoordinate(this);
    }, true);
    calendary.EventFactory.stars.addEventListener('blur', function() {
        calendary.errorManager.changeStars(this);
    }, true);
    calendary.EventFactory.cost.addEventListener('blur', function() {
        calendary.errorManager.changePositiveNumber(this);
    }, true);
    document.getElementById("SubmitNewEventButton").addEventListener('click', function() {
        calendary.CreateEvent();
        calendary.UpdateShowList();
    }, false);
    document.getElementById("AddFriend").addEventListener('click', function() {
        calendary.addFriend(calendary.EventFactory.parties);
    }, false);
    var filterRadios =document.querySelectorAll("#FilterEventList input[type = radio]");
    for(var i = 0; i < filterRadios.length; i += 1) {
        filterRadios[i].addEventListener('click', function() {
            calendary.updateFilter();
            calendary.UpdateShowList();
        })
    }
    document.getElementById("FIlterFreshPeopleList").addEventListener('blur', function() {
        calendary.updateFilter();
        calendary.UpdateShowList();
    }, true);
}

