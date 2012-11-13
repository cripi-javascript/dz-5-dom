/*global Collection: true*/

/**
    * Создает оболочку над массивом событий, предоставляющую "sql" подобные операции
    * @class Оболочка над массивом событий.
    * @augments Collection 
 */
function BaseEvent(events) {
    "use strict";
    Collection.call(this, events);
}
BaseEvent.prototype = Object.create(Collection.prototype, {
    constructor: {
        value: BaseEvent,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
/**
    *@field {BaseEvent} - ссылка на "родной" конструктор
*/
BaseEvent.prototype.constructor = BaseEvent;

/**
    *@function Возвращает новую оболочку, но уже только с прошедшими событиями
    *@return {BaseEvent}
*/
BaseEvent.prototype.pastEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return event.end.getTime() < currentDate.getTime();
    });
};
/**
    *@function Возвращает новую оболочку, но уже только с ненаступившими событиями
*/
BaseEvent.prototype.nextEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
/**
    *@function Возвращает новую оболочку, но уже с событиями, которые идут в данный момент
*/
BaseEvent.prototype.nowEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return (event.start.getTime() <= currentDate.getTime() && event.end.getTime() >= currentDate.getTime());
    });
};

/**
    *@function Возвращает новую оболочку, но уже с событиями, в которых участвует определенный человек
*/
BaseEvent.prototype.withFriend = function (myFriend) {
    "use strict";
    return this.filter(function (event) {
        return event.parties.some(function (party) {
            return party.name === myFriend.name;
        });
    });
};
/**
    *@function Возвращает новую оболочку, но уже с событиями, которые будут через неделю
*/
BaseEvent.prototype.getEventAfterWeek = function () {
    "use strict";
    var currentDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
/**
    *@function Возвращает новую оболочку, но уже с событиями, которые будут через день
*/
BaseEvent.prototype.getEventAfterDay = function () {
    "use strict";
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
/**
    *@function Возвращает новую оболочку, но уже с событиями, которые будут через месяц
*/
BaseEvent.prototype.getEventAfterMonth = function () {
    "use strict";
    var currentDate = new Date();
    if (currentDate.getMonth() === 11) {
        currentDate = new Date(currentDate.getFullYear() + 1, 0, currentDate.getDay());
    } else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay());
    }
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
/**
    *@function Возвращает новую оболочку, но уже с событиями, которые будут в определенный период
    *@param {Date} fromDate - начала периода
    *@param {Date} toDate - конец периода
*/
BaseEvent.prototype.getEventFromPeriod = function (fromDate, toDate) {
    "use strict";
    return this.filter(function (event) {
        return (event.start.getTime() > fromDate.getTime() && event.end.getTime() < toDate.getTime());
    });
};
/**
    *@function Возвращает новую оболочку c теми же событиями, но отсортированными по уменьшению количества звезд
*/
BaseEvent.prototype.sortByStars = function (ascending) {
    "use strict";
    var comparer = function compare(a, b) {
        if (a.stars > b.stars) {
            return -1;
        }
        if (a.stars < b.stars) {
            return 1;
        }
        return 0;
    };
    return this.sortBy(comparer, ascending);
};
/**
    *@function Возвращает новую оболочку c теми же событиями, но отсортированными по дате
*/
BaseEvent.prototype.sortByDate = function (ascending) {
    "use strict";
    var comparer = function compare(a, b) {
        if (a.start.getTime() < b.start.getTime()) {
            return -1;
        }
        if (a.start.getTime() > b.start.getTime()) {
            return 1;
        }
        return 0;
    };
    return this.sortBy(comparer, ascending);
};