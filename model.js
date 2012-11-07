(function (exports) {
    "use strict";

/**
 * Абстрактный конструктор, принимает объект и создает абстрактный объект для работы
 *
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
exports.Model = function (data) {

    var key;

    for (key in data) {
        if (data.hasOwnProperty(key)) {
            this[key] = data[key];
        }
    }
};


/**
 * Сеттер - устанавливает аттрибуты и значения атрибутов, в соответсвии с принятым в качестве параметра объектом
 *
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
Model.prototype.set = function (attributes) {

    var key;

    for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            this[key] = attributes[key];
        }
    }
};

/**
 * Геттер - возвращает запрашиваемое свойство у объекта
 *
 * @param {Object} attributes
 */
Model.prototype.get = function (attribute) {

    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }

    return undefined;
};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {
    throw new Error('this is Abstract method');
};
}(window));