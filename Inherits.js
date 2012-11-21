function inherits (Constructor, SuperConstructor) {
    "use strict";

    var Temp = function () {};
    Temp.prototype = SuperConstructor.prototype;
    Constructor.prototype = new Temp();
}