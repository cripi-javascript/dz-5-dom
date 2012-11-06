(function (exports) {
    "use strict";

    exports.ListOfEvents = new Events();

    exports.showError = function (isError, helpText) {

        if (isError) {
            if (helpText.style.visibility !== 'visible') {
                helpText.style.visibility = 'visible';
            }
            return;
        }

        if (helpText.style.visibility !== 'hidden') {
            helpText.style.visibility = 'hidden';
        }
    };

    exports.validateTitle = function (input, helpText) {

        if (input.length === 0) {
            showError(true, helpText);
            return false;
        }

        showError(false, helpText);
        return true;
    };

    exports.validateDate = function (input, helpText) {

        if (!isDate(new Date(input))) {
            showError(true, helpText);
            return false;
        }

        showError(false, helpText);
        return true;
    };

    exports.validateNumber = function (input, helpText) {

        if (typeof +input !== "number") {
            if (typeof input !== "undefined") {
                showError(true, helpText);
                return false;
            }
        }

        if (+input < 0) {
            showError(true, helpText);
            return false;
        }

        showError(false, helpText);
        return true;
    };
}(window));