
/**
 * Abstract class for Event
 *
 * @param {data} - start elements of collection
 * @field {items} - elements of collection
 * @method {get} - get value of field
 * @method {set} - set attributes
 * @method {validate} - validate <this>
 */
var Model = function (data) {
    "use strict";
    var nameField;
    for (nameField in data) {
        this[nameField] = data[nameField];
    }
};
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
Model.prototype.get = function (attribute) {
    "use strict";
    if (typeof attribute !== 'string' || typeof this[attribute] === "undefined") {
        return; //return undefined;
    }
    return this[attribute];
};
Model.prototype.validate = function () {
    "use strict";
    throw new Error('this is Abstract method');
};