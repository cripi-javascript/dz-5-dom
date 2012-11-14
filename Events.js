/*jslint plusplus: true, browser: true, devel: true */


function getRandomInt(min, max) {//Случайное целое число  между min и max
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var today = new Date();

function addDay(n) {// прибавляет к текущей дате n дней
    "use strict";
    return new Date(today.getTime() + (86400000 * n));
}
function nDay(n) {// возвращает n-ый день от текущей даты в 00часов 00минут
    "use strict";
    var Day, a, b;
    Day = addDay(n);
    a = Day.getTime();
    b = Day.getMilliseconds() + (Day.getHours() * 3600000) + (Day.getMinutes() * 60000) + (Day.getSeconds() * 1000);
    return new Date(a - b);
}
function hours(milis) {// переводит миллисекунда в часы. Возвращает строку
    "use strict";
    var hour, minute, s;
    hour = Math.floor(milis / 3600000);
    minute = Math.floor((milis - (hour * 3600000)) / 60000);
    s = hour + "ч " + minute + "мин";
    return s;
}
var week = addDay(7);
var maxdate = addDay(31);
var mindate = addDay(-31);


// наследуем коллекцию событий Events от абстрактной коллекции Collection
var Events = function (items) {
    "use strict";
    Collection.apply(this, arguments);
};
inherits(Events, Collection);

Events.prototype.write = function () {//выводит на экран все элементы коллекции
    "use strict";
	/**
	var el = document.getElementsByTagName('section');
	if (el.length === 1) {
		document.body.removeChild(el);
    }
	**/
	var fragment = document.createDocumentFragment('section'); // фрагмент новых элементов

    this.items.forEach(function (NewEvent) {
        fragment.appendChild(NewEvent.createSection());
    });
    document.body.appendChild(fragment);
};

/**
 * показывает все будующие события
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
    "use strict";
    return new Events((this.filter(function (NewEvent) {return (NewEvent.start > today); })).items);
};
/**
 * показывает все прошедшие события
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
    "use strict";
    return new Events((this.filter(function (NewEvent) {return (NewEvent.start < today); })).items);
};
/**
 * сортировка по началу события
 * @return {Events}
 */
Events.prototype.sortByStart = function () {
    "use strict";
    return new Events((this.sortBy("start")).items);
};
/**
 * сортировка по продолжительности события
 * @return {Events}
 */
Events.prototype.sortByLength = function () {
    "use strict";
    return new Events((this.sortBy("length")).items);
};
/**
 * сортировка по рейтингу события
 * @return {Events}
 */
Events.prototype.sortByRating = function () {
    "use strict";
    return new Events((this.sortBy("rating")).items);
};
