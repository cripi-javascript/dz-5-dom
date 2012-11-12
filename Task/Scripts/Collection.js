/*global Collection: true*/

/**
 * Creates an instance of Event.
 *
 * @param {data} - start elements of collection
 * @field {items} - elements of collection
 * @method {add} - add element in current collection and return it
 * @method {filter} - filter elements of current collection and return it
 * @method {sortBy} - sort elements of current collection and return it
 */
Collection = function (otherItems) {
    "use strict";
    var item;
    this.items = [];
    for (item in otherItems) {
        if (otherItems.hasOwnProperty(item)) {
            this.items.push(otherItems[item]);
        }
    }
};
Collection.prototype.constructor = Collection
Collection.prototype.add = function (obj) {
    "use strict";
    var newEvents = this.items.concat([obj]);
    return new this.constructor(newEvents);
};
Collection.prototype.filter = function (selector) {
    "use strict";
    var newItems = this.items.filter(selector);
    return new this.constructor(newItems);
};
Collection.prototype.sortBy = function (comparator, isInvert) {
    "use strict";
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