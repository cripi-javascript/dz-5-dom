(function (toExport) {
/**
 * @class Класс содержит обработчики ошибок при изменении элементов DOM связанных с календорем
 * @augments DOMErrorManager 
 */

    var CalendaryErrorManager = function (errorClassName) {
        DOMErrorManager.call(this, errorClassName);
    }

    toExport.CalendaryErrorManager = CalendaryErrorManager;

    CalendaryErrorManager.prototype = Object.create(DOMErrorManager.prototype, {
        constructor: {
            value: Event,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

/**
 * @function Обработчик ошибок объекта, содержащий начальное и конечное время
 *
 * @param {DOMdivElement} хранилище, содержащее таймер.
 */
    CalendaryErrorManager.prototype.changeTime = function (timer) {
        var textError = DOMValidator.isTimeInterval(timer);
        this.changeTextError(timer, textError);
    }

/**
 * @function Обработчик ошибок объекта, содержащий координаты
 *
 * @param {DOMdivElement} хранилище, содержащее координаты.
 */
    CalendaryErrorManager.prototype.changeCoordinate = function (coordinates) {
        var textError = DOMValidator.isCoordinate(coordinates);
        this.changeTextError(coordinates, textError);
    }

/**
 * @function Обработчик ошибок объекта, содержащий важныее данные
 *
 * @param {DOMdivElement} хранилище, содержащее важное поле.
*/
    CalendaryErrorManager.prototype.changeImportantStringField = function (importantStringField) {
        var textError = DOMValidator.isImportantStringField(importantStringField, 5, 20);
        this.changeTextError(importantStringField, textError);
    }

/**
 * @function Обработчик ошибок объекта, содержащий поле с положительным числом
 *
 * @param {DOMdivElement} хранилище, содержащее поле с положительным числом.
*/
    CalendaryErrorManager.prototype.changePositiveNumber = function (positiveNumber) {
        var textError = DOMValidator.isPositiveNumber(positiveNumber);
        this.changeTextError(positiveNumber, textError);
    }

/**
 * @function Обработчик ошибок объекта, содержащий поле с рейтингом
 *
 * @param {DOMdivElement} хранилище, содержащее поле с положительным числом.
*/
    CalendaryErrorManager.prototype.changeStars = function (stars) {
        var textError = DOMValidator.isStars(stars);
        this.changeTextError(stars, textError);
    }
}(window));