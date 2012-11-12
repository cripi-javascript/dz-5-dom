var DOMErrorManager = function (errorClassName) {
    this.errorClassName = errorClassName;
}
DOMErrorManager.prototype.isFieldWithError = function (element) {
    var lastElement = element.querySelector("."+this.errorClassName);
    return !!lastElement;
}
DOMErrorManager.prototype.setTextError = function (element, text) {
    var newError = document.createElement("span");
    var newTextError = document.createTextNode(text);
    newError.className = this.errorClassName;
    newError.appendChild(newTextError);
    element.appendChild(newError);
}
DOMErrorManager.prototype.removeTextError = function (element) {
    var error = element.querySelector("."+this.errorClassName);
    element.removeChild(error);
}
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
DOMErrorManager.prototype.removeAllChildren = function(element) {
    var children = element.childNodes;
    while(children.length) {
        element.removeChild(children[0])
    }
}
