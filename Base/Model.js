var Model = function (data) {
    "use strict";
};

/**
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
Model.prototype.set = function (attributes) {
    "use strict";
    var keyName;
    for (keyName in attributes) {
        this[keyName] = attributes[keyName];
    }
};

/**
 * @param {String} attribute
 */
Model.prototype.get = function (attribute) {
    "use strict";
    return this[attribute];
};

/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {
    "use strict";
    throw new Error('this is Abstract method');
};

Model.prototype.clone = function () {
    var attr, temp = new this.constructor();
    for (attr in this) {
        temp[attr] = clone(this.get(attr));
    }
    return temp;
}