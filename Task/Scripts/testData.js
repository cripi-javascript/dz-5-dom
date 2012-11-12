function initTestBase() {
    "use strict";
    var bestOfSweetsDateStart = new Date("December 10, 2012 00:00:00"),
        bestOfSweetsDateFinish = new Date("December 14, 2012 23:59:59"),
        bestOfSweets = new Event({"start": bestOfSweetsDateStart, "end": bestOfSweetsDateFinish, "name": "BestOfSweets", "id": 1}),
        сirioDeNazareDateStart = new Date("December 8, 2012 00:00:00"),
        сirioDeNazareDateFinish = new Date("December 15, 2012 23:59:59"),
        сirioDeNazare = new Event({"start": сirioDeNazareDateStart, "end": сirioDeNazareDateFinish, "name": "Cirio De Nazare", "id": 2}),
        vinesDayDateStart = new Date("November 10, 2012 00:00:00"),
        vinesDayDateFinish = new Date("November 15, 2012 23:59:59"), 
        vinesDay = new Event({"start": vinesDayDateStart, "end": vinesDayDateFinish, "name": "День вина", "id": 3}),
        theBlackCountryDateStart = new Date("November 15, 2012 00:00:00"),
        theBlackCountryDateFinish = new Date("December 1, 2012 23:59:59"), 
        theBlackCountry = new Event({"start": theBlackCountryDateStart, "end": theBlackCountryDateFinish, "name": 'Вкус "Черной страны"', "id": 4}),
        oktoberFestDateStart = new Date("September 24, 2012 00:00:00"),
        oktoberFestDateFinish = new Date("October 8, 2012 23:59:59"),
        oktoberFest = new Event({"start": oktoberFestDateStart, "end": oktoberFestDateFinish, "name": 'OktoberFest', "id": 5}),
        francfurtBookDateStart = new Date("October 15, 2012 00:00:00"),
        francfurtBookDateFinish = new Date("October 20, 2012 23:59:59"),
        francfurtBook = new Event({"start": francfurtBookDateStart, "end": francfurtBookDateFinish, "name": 'Франкфуртская международная книжная ярмарка', "id": 6}),
        aidaDateStart = new Date("October 12, 2012 00:00:00"),
        aidaDateFinish = new Date("October 27, 2012 23:59:59"),
        aida = new Event({"start": aidaDateStart, "end": aidaDateFinish, "name": '"Аида" у великих пирамид, Гиза', "id": 7}),
        paradeOfLoveDateStart = new Date("October 3, 2012 14:00:00"),
        paradeOfLoveDateFinish = new Date("October 3, 2012 22:00:00"),
        paradeOfLove = new Event({"start": paradeOfLoveDateStart, "end": paradeOfLoveDateFinish, "name": 'Парад любви', "id": 8}),
        sukkotDateStart = new Date("October 3, 2012 00:00:00"),
        sukkotDateFinish = new Date("October 3, 2012 23:59:59"), 
        sukkot = new Event({"start": sukkotDateStart, "end": sukkotDateFinish, "name": 'Парад любви', "id": 9}),
        fishFestivalDateStart = new Date("October 15, 2012 00:00:00"),
        fishFestivalDateFinish = new Date("October 15, 2012 23:59:59"), 
        fishFestival = new Event({"start": fishFestivalDateStart, "end": fishFestivalDateFinish, "name": 'Фестиваль рыбы', "id": 10}),
        chocolateFestivalDateStart = new Date("October 19, 2012 00:00:00"),
        chocolateFestivalDateFinish = new Date("October 28, 2012 23:59:59"), 
        chocolateFestival = new Event({"start": chocolateFestivalDateStart, "end": chocolateFestivalDateFinish, "name": 'Фестиваль "Еврошоколад"', "id": 11}),
        digitalArtFestivalDateStart = new Date("September 19, 2012 00:00:00"),
        digitalArtFestivalDateFinish = new Date("September 28, 2012 23:59:59"),
        digitalArtFestival = new Event({"start": digitalArtFestivalDateStart, "end": digitalArtFestivalDateFinish, "name": 'Фестиваль цифрового исскуства', "id": 12}),
        fatherDaysDateStart = new Date("September 18, 2012 00:00:00"),
        fatherDaysDateFinish = new Date("September 19, 2012 23:59:59"),
        fatherDays = new Event({"start": fatherDaysDateStart, "end": fatherDaysDateFinish, "name": 'Дни наследия', "id": 13}),
        bearWeekendDateStart = new Date("September 18, 2012 00:00:00"),
        bearWeekendDateFinish = new Date("September 19, 2012 23:59:59"),
        bearWeekend = new Event({"start": bearWeekendDateStart, "end": bearWeekendDateFinish, "name": 'Bear Weekends', "id": 14}),
        teaFestivalDateStart = new Date("September 1, 2012 00:00:00"),
        teaFestivalDateFinish = new Date("September 1, 2012 23:59:59"),
        teaFestival = new Event({"start": teaFestivalDateStart, "end": teaFestivalDateFinish, "name": 'Фестиваль Чая', "id": 15}),
        programmerDayDateStart = new Date("September 13, 2012 00:00:00"),
        programmerDayDateFinish = new Date("September 13, 2012 23:59:59"),
        programmerDay = new Event({"start": programmerDayDateStart, "end": programmerDayDateFinish, "name": 'День программмиста', "id": 16}),    
        knowDayDateStart = new Date("September 1, 2012 00:00:01"),
        knowDayDateDateFinish = new Date("September 1, 2012 23:59:59"),
        knowDayDate = new Event({"start": knowDayDateStart, "end": knowDayDateDateFinish, "name": 'День знаний', "id": 17, "stars": 1}),
        teacherDayDateStart = new Date("October 5, 2012 00:00:00"),
        teacherDayDateFinish = new Date("October 5, 2012 23:59:59"),
        teacherDay = new Event({"start": teacherDayDateStart, "end": teacherDayDateFinish, "name": 'День учителя', "id": 18, "stars": 5}),
        securiteDayDateStart = new Date("November 5, 2012 00:00:00"),
        securiteDayDateFinish = new Date("November 5, 2012 23:59:59"),
        securiteDay = new Event({"start": securiteDayDateStart, "end": securiteDayDateFinish, "name": 'День защиты информации', "id": 19, "stars": 3}),
        nationUnitionDateStart = new Date("November 4, 2012 00:00:00"),
        nationUnitionDateDateFinish = new Date("November 4, 2012 23:59:59"),
        nationUnition = new Event({"start": nationUnitionDateStart, "end": nationUnitionDateDateFinish, "name": 'День нароного единства', "id": 20});
    bestOfSweets.setLocation({"x": 15, "y": 189}, "Австрия, Бургенланд - Айзенштадте, Фестиваль сладких вин");

    сirioDeNazare.setLocation({"x": 45, "y": 133},  "Бразилия, Белен, Фестиваль Cirio De Nazare");

    vinesDay.setLocation({"x": 45, "y": 133}, "Венгрия, Мор, День вина");

    theBlackCountry.setLocation({"x": 45, "y": 133},  "Великобритания, Дадли, Вкус 'Черной страны'");

    oktoberFest.setLocation({"x":  45, "y": 133},  "Германия, Мюнхен, OktoberFest");

    programmerDay.parties = [{"name": "Pupkin"}, {"name": "Alex.IDontKnow"}];
    francfurtBook.setLocation({x : 45, y : 133}, "Германия, Frankfurt, Франкфуртская международная книжная ярмарка");
    aida.setLocation({"x": 45, "y": 133}, "Египет, ?, Аида у великих пирамид, Гиза");
    paradeOfLove.setLocation({"x":  45, "y": 133}, "Израль, Тель-Авиве, Парад любви");

    sukkot.setLocation({"x":  45, y : 133}, "Израль, Иерусалиме, праздник Суккот");

    fishFestival.setLocation({"x":  45, "y": 133}, "Испания, О Грове, Фестиваль рыбы");

    chocolateFestival.setLocation({"x":  45, "y": 133}, 'Италия, Перуджа, Фестиваль "Еврошоколад"');

    digitalArtFestival.setLocation({"x":  45, "y": 133}, "Австрия, Линц, Фестиваль Цифрового Исскуства");

    fatherDays.setLocation({"x":  45, "y": 133}, "Бельгия, Антверпене, Дни наследия");

    bearWeekend.setLocation({"x":  45, "y": 133}, "Бельгия, Брюссель, Bear Weekends");

    teaFestival.setLocation({"x":  45, "y": 133}, "Россия, Москва, Фестиваль чая");
    programmerDay.setLocation({"x":  45, "y": 133}, "Вселенная, Земля, День программиста");
    programmerDay.parties = [{"name": "Alexander.Mangin"}, {"name": "Alex.IDontKnow"}];
    knowDayDate.setLocation({"x":  45, "y": 133}, "Вселенная, Земля, День знаний");
    teacherDay.setLocation({"x":  45, "y": 133}, "Вселенная, Земля, День учителя");
    securiteDay.setLocation({"x":  45, "y": 133}, "Вселенная, Земля, День защиты информации");
    nationUnition.setLocation({"x":  45, "y": 133}, "Вселенная, Земля, День народного единства");
return new BaseEvent([bestOfSweets, сirioDeNazare, vinesDay, theBlackCountry, oktoberFest, francfurtBook
    , aida, paradeOfLove, sukkot, fishFestival, chocolateFestival, digitalArtFestival, fatherDays,
    bearWeekend, teaFestival, programmerDay, knowDayDate, teacherDay, securiteDay, nationUnition]);
}