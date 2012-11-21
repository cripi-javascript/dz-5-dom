/*jslint plusplus: true, browser: true, devel: true */

function datatype(data) {// возвращает true, если data имеет тип дата и она корректна
    "use strict";
    if (typeof data === 'undefined') {
        return false;
    }
    if (!data.getTime) {
        return false;
    }
    if ('Invalid Date' === data) {
        return false;
    }
    return true;
}

function ratingtype(rating) {// возвращает true, если rating - число от 0 до 5
    "use strict";
    if (typeof rating !== 'number') {
        return false;
    }
    if (rating > 5 || rating < 0) {
        return false;
    }
    return true;
}

function inherits(Constructor, SuperConstructor) {
    "use strict";
    var F = function () {};

    F.prototype = SuperConstructor.prototype;

    Constructor.prototype = new F();
}


// наследуем от Абстракнтого конструктора Model объект Event
var Event = function (data) {
    "use strict";
    Model.apply(this, arguments);
};
inherits(Event, Model);

Event.prototype.validate = function () {//проверяет корректность переданных данных.
    "use strict";
    if (!datatype(this.start)) {
        throw new Error(this.start + " не является датой!");
    }
    if (!datatype(this.end)) {
        throw new Error(this.end + " не является датой!");
    }
    if (this.start.getTime() - this.end.getTime() > 0) {
        throw new Error("некорректное событие: не может закончиться раньше, чем начаться!!!");
    }
    if (!ratingtype(this.rating)) {
        throw new Error("введите рейтинг от 0 до 5");
    }
};

Event.prototype.createSection = function () {
    "use strict";
	var el, line, clone1, clone2, clone3, clone4, clone5, clone6, clone7;
    el = document.createElement('section');
    line = document.createElement('p');
    line.textContent = "Событие: " + this.name;
    el.appendChild(line);

    clone1 = line.cloneNode(true);
    clone1.textContent = "Начало: " + this.start;
    el.appendChild(clone1);

    clone2 = line.cloneNode(true);
    clone2.textContent = "Конец: " + this.end;
    el.appendChild(clone2);

    clone3 = line.cloneNode(true);
    clone3.textContent = "Продолжительность: " + hours(this.end - this.start);
    el.appendChild(clone3);

    clone4 = line.cloneNode(true);
    clone4.textContent = "Рейтинг: " + this.rating;
    el.appendChild(clone4);

    if (this.place !== '') {
        clone5 = line.cloneNode(true);
        clone5.textContent = "Место: " + this.place;
        el.appendChild(clone5);
    }

    if (this.comment !== '') {
        clone6 = line.cloneNode(true);
        clone6.textContent = "Комментарий: " + this.comment;
        el.appendChild(clone6);
    }

    if (this.link !== '') {
        clone7 = line.cloneNode(true);
        clone7.textContent = "Ссылка: " + this.link;
        el.appendChild(clone7);
    }
	el.appendChild(document.createElement('br'));
	return el;
};