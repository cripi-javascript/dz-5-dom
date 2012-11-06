(function (exports) {
    "use strict";

exports.isDate = function (date) {

    if (typeof date === 'undefined') {
        return false;
    }
    if (typeof date.getMonth !== 'function') {
        return false;
    }
    if( isNaN( date.getMonth())) {
        return false;
    }
    return true;
}

exports.inherits = function (constructor, superconstructor) {

    var Func = function () { };

    Func.prototype = superconstructor.prototype;
    constructor.prototype = new Func();
}

exports.Event = function (data) {

    Model.apply(this, arguments);
};

inherits(Event, Model);

/**
 * Валидирует объект event, либо undefined, если в объекте  отсутвуют обязательные поля
 * eventObject{
 *            name - название события
 *            start  - начало
 *            end - окончание
 *            location - место
 *            remindTime - за сколько минут до события напомнить
 *            description - описание
 *            raiting - важность события
 * }
 
 * @param {object} obj             Объект
 * @example
 *    Event({
 *          name: "Пара по веб-технологиям",
 *          start: new Date("2012-10-20 10:00:00"),
 *          end: new Date("2012-10-20 12:50:00"),
 *          location: "5 этаж",
 *          remindTime: 10,
 *          raiting:5,
 *          description: "Взять бумагу и ручку, не брать бук!"
 *    })
 *
 * @return {Object}
 */
Event.prototype.validate = function () {

    var remindTime = this.remindTime || 0;
    this.raiting = this.raiting || 0;

    if (!isDate(this.get("start"))) {
        throw new Error('Field "start" must be Date format');
    }

    if (!isDate(this.end)) {
        this.end = this.start;
    }

    if (this.end < this.start) {
        this.end = this.start;
    }

    return {
        "name": this.name || "(Нет темы)",
        "start": this.start,
        "end": this.end,
        "location": this.location || "",
        "remindTime": remindTime,
        "description": this.description || "(отсутствует)",
        "raiting": this.raiting
    };
};
}(window));