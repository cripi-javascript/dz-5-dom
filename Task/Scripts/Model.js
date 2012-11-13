(function (toExport) {
    "use strict";
/**
 * @class Абстрактный класс объектов ООП
 *
 * @param {data} - копируемый объект
*/
    var Model = function (data) {
        var nameField;
        for (nameField in data) {
            this[nameField] = data[nameField];
        }
    };
    toExport.Model = Model;

/**
 * @function setter
 *
 * @param {Object} - присваиваемый объект
*/
    Model.prototype.set = function (attributes) {
        var nameAttr;
        for (nameAttr in attributes) {
            if (attributes.hasOwnProperty(nameAttr)) {
                if (typeof this[nameAttr] !== "undefined") {
                    this[nameAttr] = attributes[nameAttr];
                }
            }
        }
    };

/**
 * @function getter
 *
 * @param {String} имя поля
 *
 * @return {Object}
*/
    Model.prototype.get = function (attribute) {
        if (typeof attribute !== 'string' || typeof this[attribute] === "undefined") {
            return;
        }
        return this[attribute];
    };

/**
 * @function Проверяющая коррекцию объекта
*/
    Model.prototype.validate = function () {
        "use strict";
        throw new Error('this is Abstract method');
    };
}(window));