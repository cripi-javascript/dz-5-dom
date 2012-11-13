/*global module: true*/
/*global test: true*/
/*global ok: true*/
/*global equal: true*/
/*global deepEqual: true*/
/*global initTestBase: true*/
/*global Event: true*/
/*global Collection: true*/
module("Конструктор");
test("Конструктор", function () {
    "use strict";
    var newCollection = new Collection([1, 2, 3, 4]);
    deepEqual(newCollection.items, [1, 2, 3, 4]);
});
module("Add(model)");
test("Добавление элемента в пустую коллекцию", function () {
    "use strict";
    var newCollection = new Collection();
    newCollection = newCollection.add(1);
    deepEqual(newCollection.items, [1]);
});
test("Добавление элемента в не пустую коллекцию", function () {
    "use strict";
    var newCollection = new Collection([2]);
    newCollection = newCollection.add(1);
    deepEqual(newCollection.items, [2, 1]);
});
module("filter(function)");
test("Пример использование filter", function () {
    "use strict";
    var newCollection = new Collection([1, 2, 3, 4, 5, 6]);
    newCollection = newCollection.filter(function (element) {return (element % 2 === 0); });

    deepEqual(newCollection.items, [2, 4, 6]);
});
module("sortBy(function)");
test("С использование своего компаратора, без инвертирования результата", function () {
    "use strict";
    var newCollection = new Collection([{"id": 8}, {"id": 2}, {"id": 3},
        {"id": 4}, {"id": 14}, {"id": 9}]),
        comparator = function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        };
    newCollection = newCollection.sortBy(comparator);
    deepEqual(newCollection.items, [{"id": 2}, {"id": 3}, {"id": 4},
        {"id": 8}, {"id": 9}, {"id": 14}]);
});
test("С использование своего компаратора, c инвертированием результата", function () {
    "use strict";
    var newCollection = new Collection([{"id": 8}, {"id": 2}, {"id": 3},
        {"id": 4}, {"id": 14}, {"id": 9}]),
        comparator = function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        };
    newCollection = newCollection.sortBy(comparator, true);
    deepEqual(newCollection.items, [{"id": 14}, {"id": 9}, {"id": 8},
        {"id": 4}, {"id": 3}, {"id": 2}]);
});
test("Сортировка по default", function () {
    "use strict";
    var newCollection = new Collection([3, 2, 1]);
    newCollection = newCollection.sortBy();
    deepEqual(newCollection.items, [1, 2, 3]);
});