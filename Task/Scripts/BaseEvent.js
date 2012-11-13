/*global Collection: true*/
(function (toExport) {
    "use strict";
/**
 * Создает оболочку над массивом событий, предоставляющую "sql" подобные операции
 *
 * @class Оболочка над массивом событий.
 * @augments Collection 
 */
    var BaseEvent = function BaseEvent(events) {
        "use strict";
        Collection.call(this, events);
    }

    toExport.BaseEvent = BaseEvent;

    BaseEvent.prototype = Object.create(Collection.prototype, {
        constructor: {
            value: BaseEvent,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
/**
 *
 *@field {BaseEvent} - ссылка на "родной" конструктор
*/
    BaseEvent.prototype.constructor = BaseEvent;
/**
 *@function Возвращает новую оболочку, но уже только с прошедшими событиями
 *
 *@return {BaseEvent}
*/
    BaseEvent.prototype.pastEventBase = function () {
        var currentDate = new Date();
        return this.filter(function (event) {
            return event.end.getTime() < currentDate.getTime();
        });
    };
/**
 * @function Возвращает новую оболочку, но уже только с ненаступившими событиями
 *
 * @return {BaseEvent}
*/
    BaseEvent.prototype.nextEventBase = function () {
        var currentDate = new Date();
        return this.filter(function (event) {
            return event.start.getTime() > currentDate.getTime();
        });
    };
/**
 * @function Возвращает новую оболочку, но уже с событиями, которые идут в данный момент
 *
 * @return
*/
    BaseEvent.prototype.nowEventBase = function () {
        var currentDate = new Date();
        return this.filter(function (event) {
            return (event.start.getTime() <= currentDate.getTime() && event.end.getTime() >= currentDate.getTime());
        });
    };

/**
 * @function Возвращает новую оболочку, но уже с событиями, в которых участвует определенный человек
 *
 * @return
 */
    BaseEvent.prototype.withFriend = function (myFriend) {
        return this.filter(function (event) {
            return event.parties.some(function (party) {
                return party.name === myFriend.name;
            });
        });
    };
/**
 * @function Увеличивает дату на день
 * @private
 *
 * @field {Date} currentDate дата, которую будем увеличивать
 *
 * @return {Date}
 */
    var addDay = function (currentDate) {
         return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    }

/**
 * @function Возвращает новую оболочку, но уже с событиями, которые будут через день
 *
 * @return {BaseEvent}
*/
    BaseEvent.prototype.getEventAfterDay = function () {
        var currentDate = addDay(new Date());
        return this.filter(function (event) {
            return event.start.getTime() > currentDate.getTime();
        });
    };

/**
 * @function Увеличивает дату на неделю
 * @private
 *
 * @field {Date} currentDate дата, которую будем увеличивать
 *
 * @return {Date}
 */
    var addWeek = function (currentDate) {
         return new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

/**
 * @function Возвращает новую оболочку, но уже с событиями, которые будут через неделю
 *
 * @return {BaseEvent}
*/
    BaseEvent.prototype.getEventAfterWeek = function () {
        var currentDate = addWeek(new Date());
        return this.filter(function (event) {
            return event.start.getTime() > currentDate.getTime();
        });
    };

/**
 * @function Увеличивает дату на месяц
 * @private
 *
 * @field {Date} currentDate дата, которую будем увеличивать
 *
 * @return {Date}
 */
    var addMonth = function (currentDate) {
        if (currentDate.getMonth() === 11) {
            currentDate = new Date(currentDate.getFullYear() + 1, 0, currentDate.getDay());
        } else {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay());
        }
        return currentDate;
    }

/**
 * @function Возвращает новую оболочку, но уже с событиями, которые будут через месяц
 *
 * @return {BaseEvent}
*/
    BaseEvent.prototype.getEventAfterMonth = function () {
        var currentDate = addMonth(new Date());
        return this.filter(function (event) {
            return event.start.getTime() > currentDate.getTime();
        });
    };

/**
 * @function Возвращает новую оболочку, но уже с событиями, которые будут в определенный период
 *
 * @param {Date} fromDate - начала периода
 * @param {Date} toDate - конец периода
 *
 * @return
*/
    BaseEvent.prototype.getEventFromPeriod = function (fromDate, toDate) {
        return this.filter(function (event) {
            return (event.start.getTime() > fromDate.getTime() && event.end.getTime() < toDate.getTime());
        });
    };

/**
 * @function Компаратор рейтинга по убыванию
 * @private
 *
 * @field {Date} a
 * @field {Date} b
 *
 * @return {Numeric}
 */
    var starsComparer = function compare(a, b) {
            if (a.stars > b.stars) {
                return -1;
            }
            if (a.stars < b.stars) {
                return 1;
            }
            return 0;
        };

/**
 * @function Возвращает новую оболочку c теми же событиями, но отсортированными по уменьшению количества звезд
 *
 * @return {BaseEvent}
*/
    BaseEvent.prototype.sortByStars = function (ascending) {
        
        return this.sortBy(starsComparer, ascending);
    };

/**
 * @function Компаратор дат по возрастанию
 * @private
 *
 * @field {Date} a
 * @field {Date} b
 *
 * @return {Numeric}
 */
    var dateComparer = function (a, b) {
            if (a.start.getTime() < b.start.getTime()) {
                return -1;
            }
            if (a.start.getTime() > b.start.getTime()) {
                return 1;
            }
            return 0;
        };

/**
 * @function Возвращает новую оболочку c теми же событиями, но отсортированными по дате
 *
 * @return {BaseEvent}
 */
    BaseEvent.prototype.sortByDate = function (ascending) {
        
        return this.sortBy(dateComparer, ascending);
    };
}(window));