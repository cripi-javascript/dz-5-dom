/*jslint plusplus: true, browser: true, devel: true */
var currentEvents = new Events();
function WriteCalendar() {
    "use strict";
    var filterEvents = currentEvents,
        filter1,
        filter2,
        bool,
        s,
        res;

    filter1 = document.querySelector('input[class="filter1"]:checked');
    filter2 = document.querySelector('input[class="filter2"]:checked');
    bool = false; // флажок. если =true, выдаем отфильтрованную коллекцию. иначе - всю.
    if (filter1 !== null && filter1.value === "on") {
        filterEvents = currentEvents.findFutureEvents();
        bool = !bool;
    }
    if (filter2 !== null && filter2.value === "on") {
        filterEvents = currentEvents.findPastEvents();
        bool = !bool;
    }

    s = "";
    if (document.querySelector('input[name="sort"]:checked') !== null) {
        s = document.querySelector('input[name="sort"]:checked').value;
    }

    if (bool) {
        res = new Events(filterEvents.sortBy(s).items);
    } else {
        res = new Events(currentEvents.sortBy(s).items);
    }
    res.write();
}

function CreateCalendar() {
    "use strict";
    var s = (document.getElementsByName("start_date")[0]).value,// строка даты 
        st = (document.getElementsByName("start_time")[0]).value, // строка времени
        startEv = s + " " + st + ":00",
        endEv,
        element;

    s = (document.getElementsByName("end_date")[0]).value;
    st = (document.getElementsByName("end_time")[0]).value;
    endEv = s + " " + st + ":00";

    element = new Event({
        start: new Date(startEv),
        end:  new Date(endEv),
        name: (document.getElementsByName("New_Event")[0]).value,
        place: (document.getElementsByName("plase_event")[0]).value,
        rating: parseFloat((document.getElementsByName("rating_event")[0]).value[0]),
        comment: (document.getElementsByName("comment_event")[0]).value,
        link: (document.getElementsByName("link_event")[0]).value
    });
    element.validate();
    currentEvents.add(element);

    WriteCalendar();
}

var addListener = function () {
    "use strict";
    var button = document.getElementsByName("add_event")[0],
        filter = document.getElementsByName("filter"),
        sort = document.getElementsByName("sort"),
        i;
    button.addEventListener('click', CreateCalendar);
    for (i = 0; i < filter.length; i++) {
        filter[i].addEventListener('change', WriteCalendar);
    }
    for (i = 0; i < sort.length; i++) {
        sort[i].addEventListener('change', WriteCalendar);
    }
};