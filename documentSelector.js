(function (exports) {
    "use strict";

    exports.sortedList = new Events();

    function filterEvents(listEvents) {
        switch (filterOption) {
        case "future":
            return listEvents.coming();
        case "past":
            return listEvents.past();
        default:
            return listEvents;
        }
    }

    function sortEvents(listEvents) {
        switch (sortOption) {
        case "byName":
            return ListOfEvents.sortByName();
        case "byStart":
            return ListOfEvents.sortByTime();
        case "byRaiting":
            return ListOfEvents.sortByRaiting();
        default:
            return ListOfEvents;
        }
    }

/**
 * Сортирует и фильтрует события в соответствии с указанными опциями.
 *
 * @param {string} changeType - если указана строка "sort", то события также будут отсортированы,
 *  инчае - только отфильтрованы
 * @return коллекция объектов типа event
*/

    exports.changeDocument = function (changeType) {
        var parent = document.querySelector(".collection"),
            removeList = document.querySelector(".events");
        parent.removeChild(removeList);

        var addList = document.createElement('ul');
        addList.className = "events";

        var fragment = document.createDocumentFragment();
        if (changeType === "sort") {
            sortedList = sortEvents(ListOfEvents);
        }
        var filterList = filterEvents(sortedList);

        var length = filterList.length();

        for (var i = 0; i < length; i++)
        {
            var element = filterList.items[i];
            var el = addLiElement(element);
            addList.appendChild(el);
        }

        var parent = document.querySelector(".collection");
        fragment.appendChild(addList);
        parent.appendChild(fragment);
}

}(window));