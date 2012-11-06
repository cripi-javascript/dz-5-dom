(function (exports) {
    "use strict";

exports.Events = function (data) {

    Collection.apply(this, arguments);
};

inherits(Events, Collection);

Events.prototype.constructor = exports.Events;

/**
 * Возвращает прошедшие события, из items отсортированной по дате начала
 *
 * @param {events} - коллекция объектов типа event
 * @return {Collection} - коллекция объектов типа event
*/
Events.prototype.past = function () {

    return this.filter(function (events) {
        return events.start < new Date();
    });
};

/**
 * Возвращает предстоящие события,
 * из items, отсортированной по дате начала
 *
 * @return {Collection} - коллекция объектов типа event
*/
Events.prototype.coming = function () {

    return this.filter(function (events) {
        return events.start > new Date();
    });
};

/**
 * Возвращает события, которые произойдут через опр период времени,
 * из items, отсортированной по дате начала
 *
 * @param {number} days - период (в днях) времени
 *
 * @return коллекция объектов типа event
*/
Events.prototype.comeThrough = function (days) {

    var now = new Date();
    now.setDate(now.getDate() + days);

    var result = this.coming()
               .filter(function (events) {
            return events.start < now;
        });

    return result;
};

Events.prototype.byEndTime =  function () {

    return this.sort(function (a, b) {
        return a.end - b.end;
    });
};

Events.prototype.byRaiting = function () {

    return this.sort(function (a, b) {
        return a.raiting - b.raiting;
    });
};

Events.prototype.byStartTime = function () {

    return this.sort(function (a, b) {
        return a.start - b.start;
    });
};

Events.prototype.byName = function () {

    return this.sort(function (a, b) {
        return a.name - b.name;
    });
};

/**
 * Возвращает события,из items отсортированной по дате начала по  возр/убыв 
 * от старых обытий к новым / наоборот.
 * По умолчанию сортирует в порядке возрастания
 *
 * @param {bool} isAscending - необязательный параметр - указывает порядок сортировки. 
 * при отсутсвии сортируется по возрастанию.
 *
 * @return {Collection}  - Новый объект типа Collection
*/
Events.prototype.sortByName = function (isAscending) {

    isAscending = isAscending || false;

    if (isAscending) {
        return this.byName();
    }
    return this.byName()
             .reverse();
};

/**
 * Возвращает события,из items отсортированной по названию по  возр/убыв 
 * По умолчанию сортирует в порядке возрастания
 *
 * @param {bool} isAscending - необязательный параметр - указывает порядок сортировки. 
 * при отсутсвии сортируется по возрастанию.
 *
 * @return {Collection}  - Новый объект типа Collection
*/
Events.prototype.sortByTime = function (isAscending) {

    isAscending = isAscending || false;

    if (isAscending) {
        return this
               .byStartTime();
    }
    return this.byStartTime()
            .reverse();
};

/**
 * Возвращает события, из items, отсортированной по рейтингу по  убыв/возрастанию 
 * от событий с более высоким рейтингом к самому низко приоритетному / наоборот. 
 * По умолчанию сортирует в порядке убывания
 *
 * @param {bool} isAscending - необязательный параметр - указывает порядок сортировки. 
 * при отсутствии сортируется по убыванию.
 *
 * @return {COllection} - Новый объект типа Collection
*/
Events.prototype.sortByRaiting = function (isAscending) {

    isAscending = isAscending || false;

    if (isAscending) {
        return this
               .byRaiting();
    }
    return this
            .byRaiting()
            .reverse();
};
}(window));