(function (toExport) {
    "use strict";
/**
 * @class * Класс содержит обработчики ошибок при изменении элементов DOM
*/
    var DOMErrorManager = function (errorClassName) {
        this.errorClassName = errorClassName;
    }
    toExport.DOMErrorManager = DOMErrorManager;
/**
 * @function Обработчик ошибок объекта, содержащий начальное и конечное время
 * @param {DOMdivElement} хранилище, содержащее таймер.
*/
    DOMErrorManager.prototype.isFieldWithError = function (element) {
        var lastElement = element.querySelector("."+this.errorClassName);
        return !!lastElement;
    }
/**
 * @function Устанавливает в передаваемый элемент ошибку
 *
 * @param {DOMdivElement} element на что устанавливаем ошибку.
 * @param {String} text текст ошибки.
*/
    DOMErrorManager.prototype.setTextError = function (element, text) {
        var newError = document.createElement("span"),
            newTextError = document.createTextNode(text);
        newError.className = this.errorClassName;
        newError.appendChild(newTextError);
        element.appendChild(newError);
    }
/**
 * @function Стереть ошибку
 *
 * @param {DOMdivElement} element на что устанавливаем ошибку.
*/
    DOMErrorManager.prototype.removeTextError = function (element) {
        var error = element.querySelector("."+this.errorClassName);
        element.removeChild(error);
    }
/**
* @function Изменить или стереть ошибку в зависимости от того есть она или нет
*
* @param {DOMdivElement} element хранилище элемента
* @param {DOMdivElement} element текст сообщения с ошибкой
*/
    DOMErrorManager.prototype.changeTextError = function (element, errorText) {
        var currentErrorState = this.isFieldWithError(element);
        if (errorText === "") {
            if (currentErrorState) {
                this.removeTextError(element);
            }
        }
        else
        {
            if (currentErrorState) {
                this.removeTextError(element);
            }
            this.setTextError(element, errorText);
        }
    }
/**
* @function Удалить всех детей элемента
*
* @param {DOMdivElement} хранилище детей
*/
    DOMErrorManager.prototype.removeAllChildren = function(element) {
        var children = element.childNodes;
        while(children.length) {
            element.removeChild(children[0])
        }
    }
}(window));