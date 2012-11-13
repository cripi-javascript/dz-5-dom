/*global Collection: true*/
(function(toExport) {
    "use strict";
/**
 * Создает оболочка для хранения массива объектов с операциями по извлечению более конкретных элементов
 * @class Оболочка для храения массива объектов
 *
 * @param {Array} элементы коллекции
*/
    var Collection = function (otherItems) {
        "use strict";
        var item;
        this.items = [];
        for (item in otherItems) {
            if (otherItems.hasOwnProperty(item)) {
                this.items.push(otherItems[item]);
            }
        }
    };
    toExport.Collection = Collection;
/**
 * @field {Collection} хранит ссылку на родной конструктор
*/
    Collection.prototype.constructor = Collection
/**
 * @function создает новую коллекцию элементов с теме же элементами + с новым элементом obj
 *
 * @return {instanceof this.constructor}
*/
    Collection.prototype.add = function (obj) {
        var newEvents = this.items.concat([obj]);
        return new this.constructor(newEvents);
    };
/**
 * @function создает новую коллекцию элементов с отфильтрованными элементами
 *
 * @param {Function} - делегат
 *
 * @return {instanceof this.constructor}
*/
    Collection.prototype.filter = function (selector) {
        var newItems = this.items.filter(selector);
        return new this.constructor(newItems);
    };
/**
* @function создает новую коллекцию элементов с теме же элементами + с новым элементом obj
 *
 * @param {Function} - компаратор
 * @param {Function} - инвертировать, ли результат
 *
 * @return {instanceof this.constructor}
*/
    Collection.prototype.sortBy = function (comparator, isInvert) {
        var newItems = [].concat(this.items);
        if (newItems.length === 0) {
            return [];
        }
        if (comparator) {
            if (isInvert) {
                newItems.sort(function (a, b) {
                    return -1 * comparator(a, b);
                });
            } else {
                newItems.sort(comparator);
            }
        } else {
            newItems.sort();
        }
        return new this.constructor(newItems);
    };
}(window));