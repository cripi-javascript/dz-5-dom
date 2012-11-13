/*global module: true*/
/*global test: true*/
/*global ok: true*/
/*global equal: true*/
/*global deepEqual: true*/
/*global initTestBase: true*/
/*global Event: true*/
/*global Collection: true*/
/*global Model: true*/
/*global TestObject: true*/
module("Create model");
test('Проверка конструктора клонирования', function () {
    "use strict";
    var model = new Model(new TestObject(1));
    equal(typeof model["myNumber"], "number", "Личный объект не скопировался");
    equal(typeof model["commonNumber"], "number", "Объекты прототипа не скопировались");
});
test('Проверка метода get()', function () {
    "use strict";
    var model = new Model(new TestObject(1));
    equal(model.get("commonNumber"), 20, "Нет доступа к полям прототипа");
    equal(model.get("myNumber"), 1, "Нет доступа к личным полям");
    equal(typeof model.get({}), "undefined", "Объект не исполняет интерфейс");
    equal(typeof model.get("ТакогоПоляТочноНет"), "undefined", "несуществующее поле определено");
});
test('Проверка метода set()', function () {
    "use strict";
    var model = new Model(new TestObject(1));
    model.set({"myNumber": 2});
    equal(typeof model.get("myNumber"), "number", "Присваение произошло с ошибкой");
    equal(model.get("myNumber"), 2, "Присвоение произошло с ошибкой");
    model.set({"commonNumber": 2});
    equal(TestObject.prototype.commonNumber, 20, "Присвоение испортило прототип");
    equal(model.get("commonNumber"), 2, "Ошибка при присвоении наследуемому полю через прототип");
});

function TestObject (number) {
    "use strict";
    this.myNumber = number;
}
TestObject.prototype.commonNumber = 20;


