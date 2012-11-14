/*jslint plusplus: true, browser: true, devel: true */
var newEvents = new Events();
function CreateCalendar() {
    "use strict";
    var s = (document.getElementsByName("Дата начала")[0]).value,// строка даты 
        st = (document.getElementsByName("Время начала")[0]).value, // строка времени
        startEv = s + " " + st + ":00",
        endEv = s + " " + st + ":00",
		element,
		filterEvents = newEvents,
		filter1,
		filter2,
		bool,
		res;

    s = (document.getElementsByName("Дата окончания")[0]).value;
    st = (document.getElementsByName("Время окончания")[0]).value;

    element = new Event({
        start: new Date(startEv),
        end:  new Date(endEv),
        name: (document.getElementsByName("Новое событие")[0]).value,
        place: (document.getElementsByName("Место")[0]).value,
        rating: parseFloat((document.getElementsByName("Рейтинг")[0]).value[0]),
        comment: (document.getElementsByName("Комментарий")[0]).value,
        link: (document.getElementsByName("Ссылка")[0]).value
    });
    element.validate();
    newEvents.add(element);

    filter1 = document.querySelector('input[class="filter1"]:checked');
    filter2 = document.querySelector('input[class="filter2"]:checked');
    bool = false; // флажок. если =true, выдаем отфильтрованную коллекцию. иначе - всю.
    if (filter1 !== null && filter1.value === "on") {
        filterEvents = newEvents.findFutureEvents();
        bool = !bool;
    }
    if (filter2 !== null && filter2.value === "on") {
        filterEvents = newEvents.findPastEvents();
        bool = !bool;
    }

    s = "";
    if (document.querySelector('input[name="sort"]:checked') !== null) {
        s = document.querySelector('input[name="sort"]:checked').value;
    }

    if (bool) {
        res = new Events(filterEvents.sortBy(s).items);
    } else {
        res = new Events(newEvents.sortBy(s).items);
    }
    res.write();
}