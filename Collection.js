
var Collection = function (items) {
    'use strict';
    var name;
    this.items = [];
    for (name in items) {
        if (items.hasOwnProperty(name)) {
            this.items.push(items[name]);
        }
    }
};

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
    'use strict';
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
    'use strict';
    return new Collection(this.items.filter(selector));
};

/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (fieldName) {
    'use strict';
    if (fieldName === "date") {
        return new Collection(this.items.sort(function (Event1, Event2) {return (Event1.start - Event2.start); }));
    }
    if (fieldName === "rating") {
        return new Collection(this.items.sort(function (Event1, Event2) {return (Event1.rate - Event2.rate); }));
    }
};

Collection.prototype.sortWith = function (fieldName, partWith, partName) {
    'use strict';
    var tempCollection;
    if (partWith === "with") {
        tempCollection = new Collection(this.items.filter(function (Event) {return (Event.participants.indexOf(partName) !== -1); }));
    }
    if (partWith === "without") {
        tempCollection = new Collection(this.items.filter(function (Event) {return (Event.participants.indexOf(partName) === -1); }));
    }
    return tempCollection.sortBy(fieldName);
};
