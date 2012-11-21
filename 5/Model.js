/*jslint plusplus: true, browser: true, devel: true */

/**
* Абстрактный конструктор Model
* 
* @constructor
* @param {Object} data
**/

var Model = function (data) {
    "use strict";
    var keyName;
    for (keyName in data) {
        if (data.hasOwnProperty(keyName)) {
            this[keyName] = data[keyName];
        }
    }
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
        if (attributes.hasOwnProperty(keyName)) {
            this[keyName] = attributes[keyName];
        }
    }
};
/**
 * возвращает аттрибут объекта, если это его собственное свойсово
 * @param {String} attribute    атрибуты объекта, которые получаем
 */

Model.prototype.get = function (attribute) {
    "use strict";
    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }
};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {"use strict"; throw new Error('this is Abstract method'); };