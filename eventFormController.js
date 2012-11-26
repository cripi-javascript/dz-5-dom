var myEvents = new Events([]);

function onSubmitEventForm() {
	try {
		var event = ParseEventForm();
		ResetEventForm();
		
		myEvents = myEvents.add(event);
		RePaintEvents(myEvents);
    } catch (e) {
		console.log(e.message);
		console.log(e.stack);
	} finally {
		return false;
	}
}

function SortEvents(selector) {
	var events = myEvents.sortEventsBy(selector.value);
	console.log(events);
	RePaintEvents(events);
}

function ResetEventForm () {
	var form = document.getElementById("eventForm");
	form.reset();
	DeleteMembers();
}

function ParseEventForm() {
    var name = document.getElementById("eventName").value;
    var address = document.getElementById("eventAddress").value;
    var timeStart =
        new Date(
            Date.parse(
                document.getElementById("eventDateStart").value + "T" +
                document.getElementById("eventTimeStart").value));
    var timeEnd = 
         new Date(
            Date.parse(
                document.getElementById("eventDateEnd").value + "T" +
                document.getElementById("eventTimeEnd")));
    var memberHTML = document.querySelectorAll(".memberItem");
	var members = [];
	for (var i = 0; i < memberHTML.length; i++) {
		members.push(memberHTML[i].innerHTML);
	}	
    var raiting = document.getElementById("eventRaiting").value;
    
    return new Event(name, address, new EventTime(timeStart, timeEnd), members, raiting);
}

function RePaintEvents(events) {
    var oldContainer = document.getElementById("myEvents");
    
    var newContainer = document.createElement("div");
    newContainer.id = "myEvents";

    events.items
        .map(EventHtml)
        .map(function (event) {
            newContainer.innerHTML += event;
        });

    oldContainer.parentNode.replaceChild(newContainer, oldContainer);
}

function EventHtml(event) {
    var i, stars = "";
    for(i = 0; i < event.raiting ; i++) {
        stars += "*"
    }
    var timeStart = (event.timeStart == "Invalid Date") ? "Не указано" : event.timeStart.toUTCString();
    var timeEnd = (event.timeEnd == "Invalid Date") ? "Не указано" : event.timeEnd.toUTCString();
    
    var eventHtml =
        "<div class='event'>" +
            "<div>" + stars + " \"" + event.name + "\" с " + timeStart + " по " + timeEnd + "</div>" +
            "<div>Адрес: " + event.address + "</div>" +
            "<div>Участники: " + event.member + "</div>" +
        "</div>";
        return eventHtml;
}

function AddMember() {
	var member = document.getElementById("eventMember").value;
	if (member != "") {
		var memberHTML =
			"<div>" +
				"<span class='inputTitle'>&nbsp;</span>" +
				"<span class='memberItem'>" + member +"</span>" +
				"<img src='images/delete.jpg' alt='Удалить элемент' height='20' align='top' onclick='DeleteMember(this);'>" +
			"</div>";

		var membersContainer = document.getElementById("eventMembers");
		membersContainer.innerHTML += memberHTML;
	}
}

function DeleteMember(deleteButton) {
	var memberContainer = deleteButton.parentNode;
	memberContainer.parentNode.removeChild(memberContainer);
}

function DeleteMembers() {
	var i, membersHTML = document.querySelectorAll(".memberItem");
	for (i = 0; i < membersHTML.length; i++) {
		var memberContainer = membersHTML[i].parentNode;
		memberContainer.parentNode.removeChild(memberContainer);
	}
}