var CalendaryErrorManager = function (errorClassName) {
    DOMErrorManager.call(this, errorClassName);
}
CalendaryErrorManager.prototype = Object.create(DOMErrorManager.prototype, {
    constructor: {
        value: Event,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

CalendaryErrorManager.prototype.changeTime = function (timer) {
    var textError = Validator.isTimeInterval(timer);
    this.changeTextError(timer, textError);
}
CalendaryErrorManager.prototype.changeCoordinate = function (coordinates) {
    var textError = Validator.isCoordinate(coordinates);
    this.changeTextError(coordinates, textError);
}
CalendaryErrorManager.prototype.changeImportantStringField = function (importantStringField) {
    var textError = Validator.isImportantStringField(importantStringField,5,20);
    this.changeTextError(importantStringField, textError);
}
CalendaryErrorManager.prototype.changePositiveNumber = function (positiveNumber) {
    var textError = Validator.isPositiveNumber(positiveNumber);
    this.changeTextError(positiveNumber, textError);
}
CalendaryErrorManager.prototype.changeStars = function (stars) {
    var textError = Validator.isStars(stars);
    this.changeTextError(stars, textError);
}