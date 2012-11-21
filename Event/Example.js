var myEvents = new Events([])
    .add(new Event("jsy6on0kz4", "7429kpz7nh", EventTime(new Date(2012, 10, 8), 45), ["Иванов", "я", "Петров"]))        // 1
    .add(new Event("l8zklfh2r5", "1ygb121nee", EventTime(new Date(2012, 11, 22), 45), ["Иванов", "я"]))                 // 2
    .add(new Event("weoua5w3pf", "icu620fqpo", EventTime(new Date(2012, 11, 3), 45), ["Иванов"]))                       // 3
    .add(new Event("5zs4x4aij9", "4x9pkek4dp", EventTime(new Date(2012, 9, 10), 45), ["Иванов", "я", "Петров"]))        // 4
    .add(new Event("s1m5vkm5mv", "5v6hifv041", EventTime(new Date(2012, 11, 25)), ["Иванов", "я"]))                     // 5
    .add(new Event("3bdg49u3ez", "zwvyu91w3b", EventTime(new Date(2012, 10, 10), 45), ["Иванов", "Петров"]))            // 6
    .add(new Event("efc7dr20dx", "u641l89gw7", EventTime(new Date(2012, 9, 9)), ["Иванов", "я"]))                       // 7
    .add(new Event("pqlv9jglxq", "nkb24jd7u6", EventTime(new Date(2012, 10, 29)), ["Петров"]))                          // 8
    .add(new Event("iei2z6c63b", "kgzdrcs4mk", EventTime(new Date(2012, 11, 9)), ["я", "Петров"]))                      // 9
    .add(new Event("kygauxe4ub", "br0vzaikwr", EventTime(new Date(2012, 11, 27), 45), ["Иванов", "я"], 5))              // 10
    .add(new Event("ke4vd03xp8", "9k3bbogzz5", EventTime(new Date(2012, 11, 3), 45), ["Иванов"]))                       // 11
    .add(new Event("jt4kew1ayg", "4q51wfulmd", EventTime(new Date(2012, 11, 29), 45), ["Иванов", "Петров"]))            // 12
    .add(new Event("dg9q72wmw9", "c5r5t5z024", EventTime(new Date(2012, 11, 8), 45), ["Иванов"]))                       // 13
    .add(new Event("v4873m9tgp", "l0rdqy22d3", EventTime(new Date(2012, 10, 25), 45), ["Иванов", "я"]))                 // 14
    .add(new Event("rrb6bjyubc", "0oxvmk59p4", EventTime(new Date(2012, 10, 23)), ["Иванов", "я"]))                     // 15
    .add(new Event("0oqqd4j655", "rb1gc65t8d", EventTime(new Date(2012, 10, 11), 45), ["Иванов", "Петров"]))            // 16
    .add(new Event("f7b16x9cmy", "ncxmyqnhp1", EventTime(new Date(2012, 11, 4)), ["Иванов", "я"]))                      // 17
    .add(new Event("ik3xyzqoky", "3cguxe6l6n", EventTime(new Date(2012, 11, 16)), ["Петров"]))                          // 18
    .add(new Event("u4mfqatngu", "a7vnsmnpb0", EventTime(new Date(2012, 9, 24)), ["я"]))                                // 19
    .add(new Event("s53m0j6u9j", "bk9y4szr2s", EventTime(new Date(2012, 9, 7), 45), ["Иванов", "я"], 5))                // 20
    .add(new Event("lkajbmx7y2", "vwzpu1xl0o", EventTime(new Date(2012, 9, 20), 45), ["Иванов", "я", "Петров"], 1));    // 21

/**
* Все предстоящие события с моим участием отсортированные по рейтигу
*/
function NewEventWithMeSortByRaiting() {
    "use strict";

    myEvents
        .findFutureEvents()
        .findEventsWithPerson("я")
        .sortEventsByRaiting()
        .items.forEach(printEvent);
}

/**
* Все события, которые произойдут на этой неделе, отсортированые по рейтингу
*/
function ThisWeekSortedByRaiting() {
    "use strict";

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var timeToEndOfWeek = (7 - now.getDay()) * 24 * 60 * 60 * 1000;
    var endOfWeek = new Date(today + timeToEndOfWeek);
    myEvents
        .findFutureEvents()
        .findEventsHappendBeforeTime(endOfWeek)
        .sortEventsByRaiting()
        .items.forEach(printEvent);
};

/**
* Выбрать ближайшее (по времени) событие без моего участия
*/
function FirstEventWithoutMe() {
    "use strict";
    var filteredEvents = myEvents
        .findFutureEvents()
        .findEventsWithoutPerson("я")
        .sortEventsByDate()
        .items;
    if (filteredEvents.length != 0)
        printEvent(filteredEvents[0]);
};

var printEvent = function (event) {
    console.log(
        "Наименование: " + event.name +
        " по адресу: " + event.address +
        " начало в: " + event.timeStart +
        " будет длится: " + event.timeLength +
        " участники: " + event.member +
        " рэйтинг: " + event.raiting
    );
}