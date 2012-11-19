function inherits(Constructor, SuperConstructor) {
    "use strict";
    var F = function () {}; // ���������, ������ �����������
    // ��������� ������
    F.prototype = SuperConstructor.prototype;
    // ��������� __proto__ = prototype
    Constructor.prototype = new F();
}

var Model = function (obj) {
    'use strict';
    var name;
    for (name in obj) {
        if (obj.hasOwnProperty(name)) {
            this[name] = obj[name];
        }
    }
};

Model.prototype.set = function (attributes) {
    'use strict';
    var name;
    for (name in attributes) {
        if (attributes.hasOwnProperty(name)) {
            this[name] = attributes[name];
        }
    }
};

Model.prototype.get = function (attribute) {
    'use strict';
    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }
};

Model.prototype.validate = function (attributes) {
    'use strict';
    throw new Error('this is Abstract method');
};
