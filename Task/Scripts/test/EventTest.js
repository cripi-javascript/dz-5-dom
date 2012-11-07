/*global module: true*/
/*global test: true*/
/*global ok: true*/
/*global equal: true*/
/*global deepEqual: true*/
/*global initTestBase: true*/
/*global Event: true*/
/*global Collection: true*/
/*global throws: true*/
module("Tests of Event's constructor");
test('Create event', function () {
    "use strict";
    var dateToString = function (currentTime) {
        var month = currentTime.getMonth() + 1, day = currentTime.getDate(), year = currentTime.getFullYear();
        return month + "/" + day + "/" + year;
    }, currentTime = new Date(), testEvent = new Event({"start": currentTime});
    equal(dateToString(testEvent.start), dateToString(currentTime));
    testEvent = new Event({"start": new Date(1), "end": new Date(2)});
    ok(testEvent.start.getTime() < testEvent.end.getTime());
    throws(function () {
        new Event({"start": new Date(2), "end": new Date(1)});
    },
        'Error("Даты начала и конца перепутаны")'
        );
    throws(function () {
        new Event({"cost": -1});
    },
        'Error("Цена за вход не может быть отрицательной")'
        );
    throws(function () {
        new Event({"parties": "NoArray"});
    },
        'Error("Участники - это массив")'
        );
    throws(function () {
        new Event({"parties": ["sds"]});
    },
        'Error("У одного из участников нет поля <ИМЯ>")'
        );
    equal(new Event({"stars": 2}).stars, 2, "При присваивании звезд произошла ошибка");
    equal(new Event({"stars": 2.1}).stars, 2, "Функция устанавливающая звездочки не сработала");
});

module("LeaveMark(number)");
test('Передача не числа', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark("No number");
    equal(testEvent.stars, 0, 'Если звездочку передали в виде не числа, то 0');
});
test('Запуск без параметра', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark();
    equal(testEvent.stars, 0, 'Если звездочку забыли объявить, то 0');
});
test('Передача отрицательного числа', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark(-1);
    equal(testEvent.stars, 0, 'Звездочка не может быть меньше 0');
});
test('Передача числа болешьшего 5', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark(6);
    equal(testEvent.stars, 5, 'Звездочка не может быть больше 5');
});
test('Передача корректного числа', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark(3);
    equal(testEvent.stars, 3, '0-5 звездочка не изменяется, если целая');
});
test('Передача дробного числа', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.leaveMark(3.124);
    equal(testEvent.stars, 3, 'Звездочки - Int');
});

module("SetLocation(location)");
test('Gps - undef', function () {
    "use strict";
    var testEvent = new Event({}), gps;
    testEvent.setLocation(gps, "");
    deepEqual(testEvent.location, {
        "gps": {"x": 0, "y": 0},
        "nameLocation": "Earth"
    }, "GPS - некорректный => установить значения по умолчанию");
});
test('Передача числа болешьшего 5', function () {
    "use strict";
    var testEvent = new Event({}), gps;
    testEvent.setLocation(gps, "");
    deepEqual(testEvent.location, {
        "gps": {"x": 0, "y": 0},
        "nameLocation": "Earth"
    }, "GPS - некорректный => установить значения по умолчанию");
});
test('Передача объекта не являющимся gps', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.setLocation("Not gps", "");
    deepEqual(testEvent.location, {
        "gps": {"x": 0, "y": 0},
        "nameLocation": "Earth"
    }, "GPS - не содержит X  или Y => установить значения по умолчанию");
});
test('Имя места - не строка', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.setLocation({"x": 0, "y": 0}, []);
    deepEqual(testEvent.location, {
        "gps": {"x": 0, "y": 0},
        "nameLocation": "Earth"
    }, "Название места не строка => установить значения по умолчанию");
});
test('Корректный тест', function () {
    "use strict";
    var testEvent = new Event({});
    testEvent.setLocation({"x": 1, "y": 2}, "Moon");
    deepEqual(testEvent.location, {
        "gps": {"x": 1, "y": 2},
        "nameLocation": "Moon"
    }, "GPS - не содержит X  или Y => установить значения по умолчанию");
});