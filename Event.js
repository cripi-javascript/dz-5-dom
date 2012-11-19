/*jslint regexp: true, browser: true, devel: true, newcap: true, plusplus: true */



function isNumber(n) {
    'use strict';
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//проверка даты
function isDate(input) {
    'use strict';
    var date, reg = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
    if (input.match(reg)) {
        date = true;
    } else {
        date = false;
    }
    return date;
}

//проверка времени
function isTime(input) {
    'use strict';
    var time, reg = /^([0][0-9]|[1][0-9]|2[0-3]):([1-5][0-9]|[0-9][0-9]):([1-5][0-9]|[0-9][0-9])$/;
    if (input.match(reg)) {
        time = true;
    } else {
        time = false;
    }
    return time;
}

//check date
function checkDate(date) {
    'use strict';
	var dateDate, dateTime;
	dateDate = date.split('T')[0];
	dateTime = date.split('T')[1];
	if (!isDate(dateDate)) {
        return 1;
    }
    if (!isTime(dateTime)) {
        return 2;
    }
	return 0;
}

//checkRate
function checkRate(rate) {
    'use strict';
    if ((!isNumber(rate) && rate !== "") || (rate > 5 || rate < 1)) {
        return false;
    }
}

//check particpants
function checkParticipants(numbParticipants, participants) {
    'use strict';
    var participantsNames = participants.split(',');
    if (participantsNames.length != numbParticipants) {
        return false;
    }
	return true;
}

var Event = function (data) {
    'use strict';
    Model.apply(this, arguments);
};
inherits(Event, Model);


Event.prototype.validate = function () {
    'use strict';
    if (checkDate(this.start) === 1) {
		alert("Incorrect start date");
        throw new Error("incorrect start date");
    }
    if (checkDate(this.start) === 2) {
		alert("incorrect start time" + this.start);
        throw new Error("incorrect start time");
    }
    if (checkDate(this.end) === 1) {
		alert("incorrect end date");
        throw new Error("incorrect end date");
    }
    if (checkDate(this.end) === 2) {
		alert("incorrect end time");
        throw new Error("incorrect end time");
    }
	if (this.end < this.start) {
		alert("can't end before it starts");
        throw new Error("can't end before it starts");
    }
    if (!isNumber(this.numbParticipants)) {
		alert("incorrect number of Participants");
        throw new Error("incorrect number of Participants");
    }
    if (!checkParticipants(this.numbParticipants, this.participants)) {
		alert("incorresct list of participants");
        throw new Error("incorresct list of participants");
    }
};

Event.prototype.createList = function () {
	'use strict';
	var list = document.createElement("section"),
		listtext = document.createElement("p"),
		listtext1,
		listtext2,
		listtext3,
		listtext4,
		listtext5,
		listtext6,
		star,
		reg;
	listtext.textContent = "Name of Event: " + this.name;
	list.appendChild(listtext);
	listtext1 = listtext.cloneNode(true);
	listtext1.textContent = "Start of Event: " + this.start;
	list.appendChild(listtext1);
	listtext2 = listtext.cloneNode(true);
	listtext2.textContent = "End of Event: " + this.end;
	list.appendChild(listtext2);
	listtext3 = listtext.cloneNode(true);
	switch (this.rate) {
	case "1star":
		star = "*";
		break;
	case "2star":
		star = "**";
		break;
	case "3star":
		star = "***";
		break;
	case "4star":
		star = "****";
		break;
	case "5star":
		star = "*****";
		break;
	}
	listtext3.textContent = "Rating: " + star;
	list.appendChild(listtext3);
	listtext3 = listtext.cloneNode(true);
	listtext3.textContent = "Paricipants: " + this.participants;
	list.appendChild(listtext3);
	listtext4 = listtext.cloneNode(true);
	listtext4.textContent = "Place: " + this.place;
	list.appendChild(listtext4);
	listtext5 = listtext.cloneNode(true);
	switch (this.regularity) {
	case "noReg":
		reg = "Not a regular event";
		break;
	case "everyDay":
		reg = "Every day";
		break;
	case "everyWeek":
		reg = "Every week";
		break;
	case "everyMonth":
		reg = "Every month";
		break;
	case "everyYear":
		reg = "Every year";
		break;
	}
	listtext5.textContent = "Regularity: " + reg;
	list.appendChild(listtext5);
	listtext6 = listtext.cloneNode(true);
	listtext6.textContent = "Commentary: " + this.comment;
	list.appendChild(listtext6);
	list.appendChild(document.createElement('br'));
	return list;
};
