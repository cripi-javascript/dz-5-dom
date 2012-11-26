var myEvents = new Events([]);

/**
 * Обработка формы с событием
 *   1. Извлечение данных о событии из формы
 *   2. Очитка формы от введенных данных
 *   3. Добавление события в список сохраненных
 *   4. Перересовка списка событий
 *
 * @return false для того чтобы не перезагружалась страница
 */
function onSubmitEventForm() {
    "use strict";

    try {
        var event = ParseEventForm();
        var errors = event.validate();
        if (errors.length == 0) {
            ResetEventForm();
            myEvents = myEvents.add(event);
            RePaintEvents(myEvents);
        }
        else {
            SetErrorMessage("Невозможно добавить событие, содержатся следующие ошибки:" + errors);
        }
    } catch (e) {
        console.log(e.message);
        console.log(e.stack);
    } finally {
        return false;
    }
}

/**
 * Сортировка списка сохраненных событий и их перерисовка
 */
function SortEvents(selector) {
    "use strict";

    var events = myEvents.sortEventsBy(selector.value);
    RePaintEvents(events);
}

/**
 * Очитка формы от введенных данных
 */
function ResetEventForm () {
    "use strict";

    var form = document.getElementById("eventForm");
    form.reset();
    DeleteMembers();
    SetErrorMessage("");
}

/**
 * Извлечение данных из формы
 * 
 * @return {Object|Event} Событие
 */
function ParseEventForm() {
    "use strict";

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
                document.getElementById("eventTimeEnd").value));
    var memberHTML = document.querySelectorAll(".memberItem");
    var i, members = [];
    for (i = 0; i < memberHTML.length; i++) {
        members.push(memberHTML[i].innerHTML);
    }    
    var raiting = document.getElementById("eventRaiting").value;

    return new Event(name, address, new EventTime(timeStart, timeEnd), members, raiting);
}

/**
 * Перерисовка списка переданных событий
 * 
 * @param events список событий для отрисовки
 */
function RePaintEvents(events) {
    "use strict";

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

/**
 * Создание представления для одного события
 *
 * @return {String} html представление события
 */
function EventHtml(event) {
    "use strict";

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

/**
 * Добавление участника события при нажатии на плюсик
 */
function AddMember() {
    "use strict";

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

/**
 * Удаление учатника события из отображаемого списка при нажатии на крестик
 */
function DeleteMember(deleteButton) {
    "use strict";

    var memberContainer = deleteButton.parentNode;
    memberContainer.parentNode.removeChild(memberContainer);
}

/**
 * Удаление всех участников события
 */
function DeleteMembers() {
    "use strict";

    var i, membersHTML = document.querySelectorAll(".memberItem");
    for (i = 0; i < membersHTML.length; i++) {
        var memberContainer = membersHTML[i].parentNode;
        memberContainer.parentNode.removeChild(memberContainer);
    }
}

/**
 * Устанавливает сообщение об ошибке
 *
 * @param message сообщение об ошибке в форме
 */
function SetErrorMessage(message) {
    "use strict";

    var errorContainer = document.getElementById("errorInForm");
    errorContainer.innerHTML = message;
}