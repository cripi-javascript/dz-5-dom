(function (toExport) {
    "use strict";
/**
* @function - проверяет является ли передаваемый объект Датой
* @private
*
* @param {Object} element - проверяемый объект
*
* @return {Boolean}
*/
    var isDate = function (element) {
                return Event.prototype.dateValidator(element);
            };

/**
* @function - проверяет является ли передаваемый объект числом
* @private
*
* @param {Object} element - проверяемый объект
*
* @return {Boolean}
*/
    var isNumeric = function(element) {
                return !isNaN(parseFloat(element));
            };

/**
* @function - проверяет является ли передаваемый объект числом
* @private
*
* @param {Object} element - проверяемый объект
*
* @return {Boolean}
*/
    var isNumeric = function(element) {
                return !isNaN(parseFloat(element));
            };

/**
* @namespace Пространство имен для DOM обработчиков ошибок
*/
    var DOMValidator = {};
    toExport.DOMValidator = DOMValidator;

/**
* @field {Function} isTimeInterval - проверяет валидно ли поле содержащее промежуток времени
*/
    DOMValidator.isTimeInterval = function (divWithTimeInterval) {
            var startDate = new Date(divWithTimeInterval.querySelector(".StartDate").value);
            var finishDate = new Date(divWithTimeInterval.querySelector(".FinishDate").value);

            if (!isDate(startDate) && !isDate(finishDate)) 
                return "Обе даты некорректны";
            if (!isDate(startDate))
                return "Дата начала события некорректна";
            if (!isDate(finishDate))
                return "Дата конца события некорректна";
            if (startDate.getTime()> finishDate.getTime()) {
                return "Даты перепутаны местами";
            }
            return "";
        };

/**
@field {Function} isCoordinate - проверяет валидно ли поле содержащая координаты двух мерного пространства
*/
    DOMValidator.isCoordinate = function (divWithCoordinates) {
            var xCoordinate = divWithCoordinates.querySelector(".XCoordinate").value;
            var yCoordinate = divWithCoordinates.querySelector(".YCoordinate").value;

            if (!isNumeric(xCoordinate) && !isNumeric(yCoordinate)) {
                return "Обе координаты некорректны";
            }
            if (!isNumeric(xCoordinate)) {
                return "Координата X - некорректна";
            }
            if (!isNumeric(yCoordinate)) {
                return "Координата Y - некорректна";
            }
            return "";
        };

/**
* @field {Function} isTimeInterval - проверяет валидно ли поле содержащее промежуток времени
*/
    DOMValidator.isImportantStringField = function (divWithImportantStringField, minSize, maxSize) {
            minSize = minSize || 0;
            maxSize = maxSize || -1;
            if (minSize < 0) {
                minSize = 0;
            }
            if (minSize > maxSize) {
                maxSize = -1;
            }
            var importantStringField = divWithImportantStringField.querySelector(".ImportantStringField").value;
            if (maxSize != -1) {
                if (minSize > importantStringField.length || maxSize < importantStringField.length) {
                    return "Поле должно содержать от " + minSize + " до " + maxSize + "символов";
                }
            }
            else {
                if (minSize > importantStringField.length) {
                    return "Поле должно содержать как минимум " + minSize + " символов";
                }
            }
            return "";
        };

/**
* @field {Function} isStars - проверяет валидно ли поле содержащее рейтинг
*/
    DOMValidator.isStars = function (divWithStarField) {
            var starsField = parseFloat(divWithStarField.querySelector(".StarsField").value);
            if (isNaN(starsField)) {
                return "В поле введено не число";
            }
            if (starsField < 0 || starsField > 5) {
                return "Количество звезд 0-5";
            }
            if (parseInt(starsField) !== starsField) {
                return "Количество звезд целое число";
            }
            return "";
        };

/**
* @field {Function} isPositiveNumber - проверяет валидно ли поле содержащее целое положительное число
*/
    DOMValidator.isPositiveNumber = function (divWithPositiveNumberField) {
            var positiveNumberField = divWithPositiveNumberField.querySelector(" .PositiveNumber").value;
            if (!isNumeric(positiveNumberField)) {
                return "В поле введено не число";
            }
            if (parseFloat(positiveNumberField) < 0) {
                return "В поле введено отрицательное число";
            }
            return "";
    };
}(window));