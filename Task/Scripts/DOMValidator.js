/**
* @namespace Пространство имен для DOM обработчиков ошибок
*
* @field {Function} isTimeInterval - проверяет валидно ли поле содержащее промежуток времени
* @field {Function} isCoordinate - проверяет валидно ли поле содержащая координаты двух мерного пространства
* @field {Function} isImportantStringField - проверяет валидно ли поле содержащая строку определенных размеров
* @field {Function} isStars - проверяет валидно ли поле содержащее рейтинг
* @field {Function} isPositiveNumber - проверяет валидно ли поле содержащее целое положительное число
 */
var DOMValidator = {
    "isTimeInterval" : function  (divWithTimeInterval) {
        var startDate = new Date(divWithTimeInterval.querySelector(".StartDate").value);
        var finishDate = new Date(divWithTimeInterval.querySelector(".FinishDate").value);
        var isDate = function (element) {
            return Event.prototype.dateValidator(element);
        }
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
    },
    "isCoordinate" : function (divWithCoordinates) {
        var xCoordinate = divWithCoordinates.querySelector(".XCoordinate").value;
        var yCoordinate = divWithCoordinates.querySelector(".YCoordinate").value;
        var isNumeric = function(element) {
            return !isNaN(parseFloat(element));
        };
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
    },

    "isImportantStringField" : function (divWithImportantStringField, minSize, maxSize) {
        minSize = minSize || 0;
        maxSize = maxSize || -1;
        if (minSize < 0) {
            minSize = 0;
        }
        if (minSize> maxSize) {
            maxSize = -1;
        }
        var importantStringField = divWithImportantStringField.querySelector(".ImportantStringField").value;
        if (maxSize != -1) {
            if (minSize > importantStringField.length || maxSize < importantStringField.length) {
                return "Поле должно содержать от " + minSize + " до "+ maxSize + "символов";
            }
        }
        else {
            if (minSize > importantStringField.length) {
                return "Поле должно содержать как минимум "+minSize+" символов";
            }
        }
        return "";
    },
    "isStars" : function (divWithStarField) {
        var starsField = parseFloat(divWithStarField.querySelector(".StarsField").value);
        var isNumeric = function(element) {
            return !isNaN(parseFloat(element.value));
        };
        if (isNaN(starsField)) {
            return "В поле введено не число";
        }
        if (starsField < 0 || starsField>5) {
            return "Количество звезд 0-5";
        }
        if (parseInt(starsField) !== starsField) {
            return "Количество звезд целое число";
        }
        return "";
    },

    "isPositiveNumber" : function (divWithPositiveNumberField) {
        var positiveNumberField = divWithPositiveNumberField.querySelector(" .PositiveNumber").value;
        var isNumeric = function(element) {
            return !isNaN(parseFloat(element));
        };
        if (!isNumeric(positiveNumberField)) {
            return "В поле введено не число";
        }
        if (parseFloat(positiveNumberField) < 0) {
            return "В поле введено отрицательное число";
        }
        return "";
}}