/*
* function Event(collection) - создает объект
*  @param {collection} - массив со значениями полей 
* function create() - добавляет событие в список событий при отпревке данных из формы
* function content() - выводит полную информацию  событии при клике на него
* function filterAll() - функция фильтрует или сортирует события в зависимости от значений формы фильтрации
* function all() - выводит полный список событий по нажатию на кнопку	"Вывести все события"
* function str2date(s) - преобразует дату начала и окончания события
* function FilterToDate(collection, flag) - возвращает предстоящие или прощедшие события в зависимости от значения flag
* function FilterToParty(collection, flag) - возвращает события, в которых я принимаю/ не принимаю участие в зависимости от значения flag
* function SortToDate(collection) сортирует встречи по дате 
*/
var hash = [];
var collection = [];
function Event(collection) {
    "use strict";
    if (typeof collection.start.value === "undefined" || collection.start.value.length === 0) {
        alert("Дата начала встречи задана не корректно");
	    throw new TypeError("should be date");
    }
    return {
        "name": collection.name.value || "Встреча",
        "start": collection.start.value,
        "end": collection.end.value,
//        "participants": collection.participants.value || {},
//        "organizer": collection.organizer.value || {},
        "place": collection.place.value || {},
        "info": collection.info.value || {},
        "reminder": collection.reminder.value || "За день до встречи",
        "type": collection.type.value || "Работа",
        "party": collection.party.value || "участвую"
    };
}
function create() {
    "use strict";
    var newEvent, el;
    newEvent = new Event(document.forms[0]);
    el = document.createElement('div');
    el.className = 'oneEvent';
    el.setAttribute('id', 'oneEvent' + hash.length);
    el.textContent =  newEvent.start + "-" + newEvent.end + " " + newEvent.name;
    spisok.appendChild(el); 
    document.getElementById('oneEvent' + hash.length).addEventListener('click', content, true);
    hash[hash.length] = newEvent;
}
function content() {
    while (contekst.childNodes.length > 0) {
		contekst.removeChild(contekst.childNodes[0]);
    }
    var newEvent = new Event(document.forms[0]);
	var el = document.getElementById('meeting').cloneNode(true);
	el.className = 'elements';
	var list = el.getElementsByTagName('label');
	for (i=0; i<list.length; i++) {
        var n = list[i].childNodes.length;
        while (n > 0) {
            if (list[i].childNodes[n - 1].nodeType === 1) {
                list[i].removeChild(list[i].childNodes[n - 1]);
            }
            n = n - 1;
        }
        for (k in newEvent) {
            if (this.className === 'oneEventCollection') {
                if (k === document.forms[0].elements[i].name && typeof newEvent[k] === 'string') {
                    list[i].textContent = list[i].textContent + " " + collection[this.id.charAt(this.id.length - 1)][k];
                }
                if (k === document.forms[0].elements[i].name && typeof newEvent[k] !== 'string') {
                    list[i].textContent = list[i].textContent + " " + collection[this.id.charAt(this.id.length - 1)][k].value;
                }
            } else {
                if (k === document.forms[0].elements[i].name && typeof newEvent[k] === 'string') {
                    list[i].textContent = list[i].textContent + " " + hash[this.id.charAt(this.id.length - 1)][k];
                }
                if (k === document.forms[0].elements[i].name && typeof newEvent[k] !== 'string') {
                    list[i].textContent = list[i].textContent + " " + hash[this.id.charAt(this.id.length - 1)][k].value;
                }
            }
        }
    }
    console.log(el.getElementsByTagName('input').length);
    el.removeChild(el.childNodes[el.childNodes.length - 2]);
    contekst.appendChild(el);
}
window.onload = function () {
    "use strict";
    document.getElementById('submitEvent').addEventListener('click', create, true);
    document.getElementById('sort').addEventListener('click', filterAll, true);
    document.getElementById('all').addEventListener('click', all, true);
}
function filterAll() {
    "use strict";
    var collection2 = [];
    while (spisok.childNodes.length > 0) {
        spisok.removeChild(spisok.childNodes[0]);
    }
    if (document.forms[1].elements[0].value === "предстоящие") {
        collection2 = new FilterToDate(hash, 1);
    }
    if (document.forms[1].elements[0].value === "прошедшие") {
        collection2 = new FilterToDate(hash, -1);
    }
    if (document.forms[1].elements[0].value === "я не участвую") {
        collection2 = new FilterToParty(hash, -1);
    }
    if (document.forms[1].elements[0].value === "я участвую") {
        collection2 = new FilterToParty(hash, 1);
    }
    
    if (document.forms[1].elements[1].value === "предстоящие") {
        collection = new FilterToDate(collection2, 1);
    }
    if (document.forms[1].elements[1].value === "прошедшие") {
        collection = new FilterToDate(collection2, -1);
    }
    if (document.forms[1].elements[1].value === "я не участвую") {
        collection = new FilterToParty(collection2, -1);
    }
    if (document.forms[1].elements[1].value === "я участвую") {
        collection = new FilterToParty(collection2, 1);
    }
    if (document.forms[1].elements[1].value === "сортировать по дате") {
        collection = [].concat(new SortToDate(collection2));
    }
    for (i = 0; i < collection.length; i ++) {
        var el = document.createElement('div');
        el.className = 'oneEventCollection';
        el.setAttribute('id', 'oneEvent' + i);
        el.textContent =  collection[i].start + "-" + collection[i].end + " " + collection[i].name;
        spisok.appendChild(el);
        document.getElementById('oneEvent' + i).addEventListener('click', content, true);
    }
}

function all() {
    "use strict";
    while (spisok.childNodes.length > 0) {
       spisok.removeChild(spisok.childNodes[0]);
    }
    for (i = 0; i < hash.length; i++) {
        var el = document.createElement('div');
        el.className = 'oneEvent';
        el.setAttribute('id', 'oneEvent' + i);
        el.textContent = hash[i].start + "-" + hash[i].end + " " + hash[i].name;
        spisok.appendChild(el);
        document.getElementById('oneEvent' + i).addEventListener('click', content, true);
    }
}

// функции фильтрации
function str2date(s) {
    "use strict";
    var dateParts = s.split('.');
    if (typeof dateParts[2] === 'string') {
        return new Date(dateParts[2], dateParts[1], dateParts[0]);
    }
    if (typeof dateParts[2] === 'undefined') {
        dateParts = s.split('-');
        return new Date(dateParts[0], dateParts[1], dateParts[2]);
    }
}
function FilterToDate(collection, flag) {
    "use strict";
    var result;
    if (flag === -1) {
        result = collection.filter(function (collection) {
	        var s = str2date(collection.start);
            return s < new Date();
		});
	} else {
        result = collection.filter(function (collection) {
	        var s = str2date(collection.start);
            return s >= new Date();
        });
    }
    return result;
}
function FilterToParty(collection, flag) {
    "use strict";
    var result;
    if (flag === -1) {
        result = collection.filter(function (collection) {
            return collection.party === "нет";
	    });
    } else {
        result = collection.filter(function (collection) {
	        return collection.party === "да";
        });
    }
    return result;
}
function SortToDate(collection) {
    "use strict";
    collection.sort(function (a, b) {
        return str2date(a.start) > str2date(b.start) ? 1 : -1;
    });
    return collection;
}

