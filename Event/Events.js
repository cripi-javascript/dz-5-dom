/**
 * @return {Object} Список событий
 */
var Events = function (items) {
    "use strict";

    Collection.call(this, items);
};

inherits(Events, Collection);
Events.prototype.constructor = Events;

/**
 * Прошедшие события 
 *
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
    "use strict";

    return this.filter(function (event) {
        return event.get("timeStart") < new Date().getTime();
    });
};

/**
 * Предстоящие события 
 *
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
    "use strict";

    return this.filter(function (event) {
        return event.get("timeStart") > new Date().getTime();
    });
};

/**
 * События с участием персоны с именем "name" 
 *
 * @param personName Имя персоны
 *
 * @return {Events}
 */
Events.prototype.findEventsWithPerson = function (personName) {
    "use strict";

    return this.filter(function (event) {
        return event.get("member").some(function (member) {
            return member === personName;
        });
    });
};

/**
 * События без участия персоны с именем "name" 
 *
 * @param personName Имя персоны
 *
 * @return {Events}
 */
Events.prototype.findEventsWithoutPerson = function (personName) {
    "use strict";

    return this.filter(function (event) {
        return event.get("member").every(function (member) {
            return member != personName;
        });
    });
};

/**
 * События, которые произойдут после указанного времени
 *
 * @param time Временной отсчет
 *
 * @return {Events}
 */
Events.prototype.findEventsHappendLaterTime = function (time) {
    "use strict";

    return this.filter(function (event) {
        return event.get("timeStart") > time;
    });
};

/**
 * События, которые произойдут до указанного времени
 *
 * @param time Временной отсчет
 *
 * @return {Events}
 */
Events.prototype.findEventsHappendBeforeTime = function (time) {
    "use strict";

    return this.filter(function (event) {
        return event.get("timeStart") < time;
    });
};

/**
 * Сортировка по времени начала события
 *
 * @return {Events}
 */
Events.prototype.sortEventsByDate = function () {
    "use strict";

    return this.sortBy("timeStart");
};

/**
 * Сортировка по рэтингу события
 *
 * @return {Events}
 */
Events.prototype.sortEventsByRaiting = function () {
    "use strict";

    return this.sortBy("raiting");
};

/**
 * Сортировка по имени события
 *
 * @return {Events}
 */
Events.prototype.sortEventsByName = function () {
    "use strict";

    return this.sortBy("name");
};