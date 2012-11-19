function newFSColl(eventColl) {
	'use strict';
	var f1, f2, f3, f4, filterColl, s, sortColl;
	f1 = document.querySelector('input[name = "pastE"]:checked');
	f2 = document.querySelector('input[name = "futureE"]:checked');
	f3 = document.querySelector('input[name = "myE"]:checked');
	f4 = document.querySelector('input[name = "all"]:checked');
	if (f4 !== null && f4.value === "on") {
		filterColl = eventColl;
	}
	if (f1 !== null && f1.value === "on") {
		filterColl = eventColl.findPastEvents();
	}
	if (f2 !== null && f2.value === "on") {
		filterColl = eventColl.findFutureEvents();
	}
	if (f3 !== null && f3.value === "on") {
		filterColl = eventColl.findOnlyMyEvents();
	}
	s = document.querySelector('input[name = "sort"]:checked').value;
	switch (s) {
	case "date":
		sortColl = filterColl.sortByDate();
		break;
	case "rating":
		sortColl = filterColl.sortByRating();
		break;
	case "name":
		sortColl = filterColl.sortByName();
		break;
	case "nPart":
		sortColl = filterColl.sortByNumberOfParticipants();
		break;
	}
	sortColl.Out();
}

function clearForm() {
	'use strict';
	document.getElementsByName("nameOfEvent")[0].value = "";
	document.getElementsByName("start")[0].value = "";
	document.getElementsByName("end")[0].value = "";
	document.getElementsByName("startTime")[0].value = "";
	document.getElementsByName("endTime")[0].value = "";
	document.getElementsByName("rating")[0].value = "1star";
	document.getElementsByName("place")[0].value = "";
	document.getElementsByName("numbOfParticipants")[0].value = "";
	document.getElementsByName("participants")[0].value = "";
	document.getElementsByName("regularity")[0].value = "noReg";
	document.getElementsByName("comment")[0].value = "";
}

var eventColl = new Events();
function CreateEvent() {
	'use strict';
	var nameN = document.getElementsByName("nameOfEvent")[0].value,
		dateS = document.getElementsByName("start")[0].value,
		dateE = document.getElementsByName("end")[0].value,
		timeS = document.getElementsByName("startTime")[0].value,
		timeE = document.getElementsByName("endTime")[0].value,
		startN = dateS + "T" + timeS + ":00",
		endN = dateE + "T" + timeE + ":00",
		ratingN = document.getElementsByName("rating")[0].value,
		placeN = document.getElementsByName("place")[0].value,
		numbOfParticipantsN = document.getElementsByName("numbOfParticipants")[0].value,
		participantsN = document.getElementsByName("participants")[0].value,
		regularityN = document.getElementsByName("regularity")[0].value,
		commentN = document.getElementsByName("comment")[0].value,
		event = new Event({
			start: startN,
			end: endN,
			rate: ratingN,
			place: placeN,
			numbParticipants: numbOfParticipantsN,
			participants: participantsN,
			regularity: regularityN,
			comment: commentN,
			name: nameN
		});
	event.validate();
	eventColl.add(event);
	newFSColl(eventColl);
	clearForm();
}

function load() {
	'use strict';
	var butt = document.getElementById("button");
	butt.addEventListener("click", CreateEvent, false);
}

document.addEventListener("DOMContentLoaded", load, false);