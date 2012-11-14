/*jslint plusplus: true, browser: true, devel: true */
// абстрактная коллекция Collection, представляющая из себя набор объектов Model
/**
* @constructor
* @param {Object} items
**/
var Collection = function (items) {
    "use strict";
    this.items = [];
    var keyName;
    for (keyName in items) {
        if (items.hasOwnProperty(keyName)) {
            this.items.push(items[keyName]);
        }
    }
};

/**
 * @param {Model} model
 *
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
    "use strict";
    this.items.push(model);
};

/**
 * @param {Function} selector
 *
 * @example
 *    new Collection().filter(function (item) {
 *        return item.get('attendee').indexOf("me") !== -1;
 *    });
 * @return {Collection}
 */
Collection.prototype.filter = function (selector) {
    "use strict";
    return new Collection(this.items.filter(selector));
};
/**
 * @param {String} fieldName    параметр, по которому происходит сотрировка
 * @return {Collection}
 */
Collection.prototype.sortBy = function (fieldName) {
    "use strict";
    if (fieldName === "start") { // сортировка по началу события
        return new Collection(this.items.sort(function (Event1, Event2) {return Event1.start - Event2.start; }));
    }
    if (fieldName === "length") {//сортировка по длине события
        return new Collection(this.items.sort(function (Event1, Event2) {return (Event1.end - Event1.start) - (Event2.end - Event2.start); }));
    }
    if (fieldName === "rating") {//сортировка по рейтингу события
        return new Collection((this.items.sort(function (Event1, Event2) {return Event1.rating - Event2.rating; })).reverse());
    }
	if (fieldName === "") {
	    return new Collection(this.items);
	}
};
