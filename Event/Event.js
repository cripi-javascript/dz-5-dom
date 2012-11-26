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
*       "Совещание", "Екатеринбург, ул. Тургенева, д. 4, ауд. 150", eventTime, ["я"], 5)
*
* @see EventTime
*/

var Event = function (name, address, time, member, raiting) {
    "use strict";

    Model.call(this);
    var myTime = time || new EventTime(new Date(), new Date());

    this.set({
        name: name || "Событие",
        address: address || "",
        timeStart: myTime.start,
        timeEnd: myTime.end,
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
* @param {Number|Date} start          Время начала события
* @param {Number|Date} end            Время конца события
*
* @example
*    EventTime(new Date(2011, 10, 10, 14, 48, 00), new Date(2011, 10, 10, 15, 48, 00))
*
* @return {Object}
*/
function EventTime(start, end) {
    "use strict";

    return {
        "start": start,
        "end": end
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
    if (this.get("timeStart") > this.get("timeEnd")) {
        errors.push("Время начала события больше чем время конца");
    }
    if (this.get("raiting") < 0) {
        errors.puch("Рэйтинг собития меньше допустимой величины");
    }
    else if (this.get("raiting") > 5) {
        errors.push("Рэйтинг события больше допустимой величины");
    }
    return errors;
};