/**
* Возвращает объект Event
*
* @param {String}    [name = "Событие"]  Имя события
* @param {String}    [address = ""]      Адресс события
* @param {Object}    time                Дата события
* @param {Array}     member              Участники
* @param {Number}    [raiting=3]         Важность события (по шкале от 0 до 5)
*
* @example
*   Event(
*       "Совещание", "Екатеринбург, ул. Тургенева, д. 4, ауд. 150",
*       EventTime(new Date(2011, 10, 10, 14, 48, 00), 60), ["я"], 5)
*
* @see EventTime
*/

var Event = function (name, address, time, member, raiting) {
    "use strict";

    Model.call(this);
    var myTime = time || new EventTime(new Date(), 60);

    this.set({
        name: name || "Событие",
        address: address || "",
        timeStart: myTime.start,
        timeLength: myTime.length,
        member: member || [],
        raiting: +raiting || 3
    });
}

inherits(Event, Model);
Event.prototype.constructor = Event;


/**
* Возвращает объект EventTime
*
* @private
* @param {Number|Date} start          Начало события
* @param {Number}      [length=0]     Длительность события в минутрах
*
* @example
*    EventTime(new Date(2011, 10, 10, 14, 48, 00), 60)
*
* @return {Object}
*/
function EventTime(start, length) {
    "use strict";

    return {
        "start": +start,
        "length": +length || 0
    };
}

/**
 * Валидация собития
 *
 * @return {Array}                     Список ошибок
 */
Event.prototype.validate = function () {
    "use strict";

    var errors = [];
    if (this.get("timeLength") < 0) {
        errors.push("Продолжительность события меньше допустимой величины");
    }
    if (this.get("raiting") < 0) {
        errors.puch("Рэйтинг собития меньше допустимой величины");
    }
    else if (this.get("raiting") > 5) {
        errors.push("Рэйтинг события больше допустимой величины");
    }
    return errors;
};