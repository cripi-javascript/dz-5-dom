/*global Collection: true*/

/**
 * Shell for "sql" operations with Array Events. 
 * @prototype {Collection}
 * @constructor
 * @method {pastEventBase} - Создает BaseEvent с пропущенными событиями
 * @method {pastEventBase} - Создает BaseEvent с грядущими событиями
 * @method {nowEventBase}  -  Создает BaseEvent с текущими событиями
 * @method {withFriend}  -  Создает BaseEvent с событиями, в которых принимал участие определенный человек
 * @method {getEventAfterDay}  -  Создает BaseEvent с грядущими событиями, которые наступят не раньше, чем через день
 * @method {getEventAfterWeek}  -  Создает BaseEvent с грядущими событиями, которые наступят не раньше, чем через неделю
 * @method {getEventAfterMonth}  -  Создает BaseEvent с грядущими событиями, которые наступят не раньше, чем через месяц
 * @method {getEventFromPeriod}  -  Создает BaseEvent с событиями, которые лежат между двумы датами [fromDate, toDate]
 * @method {getEventAfterMonth}  -  Создает BaseEvent с теми же событиями, но отсортированными по убыванию звезд
 * @method {getEventAfterMonth}  -  Создает BaseEvent с теми же событиями, но отсортироваными по возрастанию даты
 * @example - Смотри файл с тестами...
 */
function BaseEvent(events) {
    "use strict";
    Collection.call(this, events);
    this.events = events;
}
BaseEvent.prototype = Object.create(Collection.prototype, {
    constructor: {
        value: BaseEvent,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
//пропущенные, текущие, будущие события 
BaseEvent.prototype.pastEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return event.end.getTime() < currentDate.getTime();
    });
};
BaseEvent.prototype.nextEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
BaseEvent.prototype.nowEventBase = function () {
    "use strict";
    var currentDate = new Date();
    return this.filter(function (event) {
        return (event.start.getTime() <= currentDate.getTime() && event.end.getTime() >= currentDate.getTime());
    });
};
//событие с участием друга (Друг отношение рефлексивное ^^)
BaseEvent.prototype.withFriend = function (myFriend) {
    "use strict";
    return this.filter(function (event) {
        return event.parties.some(function (party) {
            return party.name === myFriend.name;
        });
    });
};
// События через период времени день, неделя, месяц
BaseEvent.prototype.getEventAfterWeek = function () {
    "use strict";
    var currentDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
BaseEvent.prototype.getEventAfterDay = function () {
    "use strict";
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return this.filter(function (event) {
        return event.start.getTime() > currentDate.getTime();
    });
};
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
// События за период
BaseEvent.prototype.getEventFromPeriod = function (fromDate, toDate) {
    "use strict";
    return this.filter(function (event) {
        return (event.start.getTime() > fromDate.getTime() && event.end.getTime() < toDate.getTime());
    });
};
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