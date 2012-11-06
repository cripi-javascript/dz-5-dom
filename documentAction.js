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

        var element = new Event({
                                name: name,
                                start: new Date(start),
                                end: new Date(end),
                                location: location,
                                raiting: raiting,
                                description: description,
                                remindTime: remindTime}).validate();
        ListOfEvents.add(element);

        placeElement(element);
}

    function placeElement(element) {
        var el = document.createElement('li');
        el.className = 'event_item';

        var name = document.createElement('div')
        name.textContent = "Название: " + element.name;

        var start = document.createElement('div')
        start.textContent = "Начало: " + element.start;

        var end = document.createElement('div')
        end.textContent = "Окончание: " + element.end;

        var location = document.createElement('div')
        location.textContent = "Местоположение: " + element.location;

        var remindTime = document.createElement('div')
        remindTime.textContent = "Напомнить за: " + element.remindTime + "минут";

        var description = document.createElement('div')
        description.textContent = "Описание: " + element.description;
        
        var raiting = document.createElement('div')
        raiting.textContent = "Рейтинг: " + element.raiting;

        var fragment = document.createDocumentFragment();
        fragment.appendChild(el);
        el.appendChild(start);
        el.appendChild(end);
        el.appendChild(location);
        el.appendChild(remindTime);
        el.appendChild(description);
        el.appendChild(raiting);

        var parent = document.querySelector(".events");
        parent.appendChild(fragment);
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