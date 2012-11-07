/*global Model: true*/
/**
 * Creates an instance of Event.
 *
 * @prototype {Model}
 * @param {data} - is start event
 * @field {start} - is start event
 * @field {end} - is end event
 * @field {id} - is id
 * @field {location} - location - is gps and name of event's place
 * @field {participants} - participants - array of participants
 * @field {stars} - is assess the importance of the event
 * @field {cost} - is price for entry
 * @method {setLocation} - is setter for location's field
 * @method {leaveMark} - is setter for stars's field (0,1,2,3,4,5 - validate value)
 */
function Event(data) {
    "use strict";
    this.id = Math.random();
    this.location = {
        "gps": {x: 0, y: 0},
        "nameLocation": "Earth"
    };
    this.stars =  0;
    this.cost =  0;
    this.parties = [];
    Model.call(this, data);
    this.validate(this);
    this.setLocation(this.location);
    this.leaveMark(this.stars);
}
Event.prototype = Object.create(Model.prototype, {
    constructor: {
        value: Event,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
Event.prototype.dateValidator = function (date) {
    "use strict";
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (!isNaN(date.getTime())) {
            return true;
        }
    }
    return false;
};
Event.prototype.setLocation = function (gps, name) {
    "use strict";
    if (typeof gps !== "undefined"  && typeof gps.x !== "undefined" && typeof gps.y !== "undefined" && typeof name === "string") {
        this.location.gps = gps;
        this.location.nameLocation = name;
    } else {
        this.location = {
            "gps" : {"x" : 0, "y" : 0},
            "nameLocation" : "Earth"
        };
    }
};
Event.prototype.leaveMark = function (stars) {
    "use strict";
    if (isNaN(parseFloat(stars)) || !isFinite(stars) || stars < 0) {
        stars = 0;
    }
    if (stars > 5) {
        stars = 5;
    }
    stars = (stars - (stars % 1)); //обрезаем дробную часть
    this.stars = stars;
};
Event.prototype.validate = function (event) {
    "use strict";
    if (event.cost < 0) {
        throw new Error("Цена за вход не может быть отрицательной");
    }
    if (!Array.isArray(event.parties)) {
        throw new Error("Участники - это массив");
    }
    if (event.parties.some(function (party) {
            return !party.name;
        })
            ) {
        throw new Error("У одного из участников нет поля <ИМЯ>");
    }
    if (event.end < event.start) {
        throw new Error("Даты начала и конца перепутаны");
    }
};