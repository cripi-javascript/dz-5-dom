(function (exports) {
    "use strict";

    exports.ListOfEvents = new Events();

    exports.preventDefault = function() {

        var name = document.querySelector("#title").value;
        var start = document.querySelector("#from").value;
        var end = document.querySelector("#to").value;
        var location = document.querySelector("#location").value;
        var raiting = document.querySelector("#raiting").value;
        var description = document.querySelector("#description").value;
        var remindTime = document.querySelector("#remindTime").value;

        if ( !validateTitle(name, document.querySelector('#title_help'))) { alert("Событие не было добавлено. Ошибка"); return; };
        if (!validateDate(start, document.querySelector('#from_help'))) { alert("Событие не было добавлено. Ошибка"); return; };
        if (!validateNumber(remindTime, document.querySelector('#remindTime_help'))) { alert("Событие не было добавлено. Ошибка"); return; };

        ListOfEvents.add({ name: name,
                           start: start,
                           end: end,
                           location: location,
                           raiting: raiting,
                           description: description,
                           remindTime: remindTime});
}

    exports.addListener = function() {
        var name = document.querySelector("#title");
        var start = document.querySelector("#from");
        var remindTime = document.querySelector("#remindTime");

        name.addEventListener('blur', function(event) {
            var cur = event.currentTarget;
            validateTitle(cur.value, document.querySelector('#title_help'));
        });

        start.addEventListener('blur', function(event) {
            var cur = event.currentTarget;
            validateDate(cur.value, document.querySelector('#from_help'));
        });

        remindTime.addEventListener('blur', function(event) {
            var cur = event.currentTarget;
            validateNumber(remindTime.value, document.querySelector('#remindTime_help'));
        });
    }
}(window));