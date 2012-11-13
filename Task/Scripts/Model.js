
/**
 * @class Абстрактный класс объектов ООП
 *
 * @param {data} - копируемый объект
*/
var Model = function (data) {
    "use strict";
    var nameField;
    for (nameField in data) {
        this[nameField] = data[nameField];
    }
};
/**
 * @function setter
 *
 * @param {Object} - присваиваемый объект
*/
Model.prototype.set = function (attributes) {
    "use strict";
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
    "use strict";
    if (typeof attribute !== 'string' || typeof this[attribute] === "undefined") {
        return; //return undefined;
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
