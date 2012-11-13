/**
 * установим обработчики событий
 *
 * @author Alex.Mangin
 */
(function (){
    var calendary = new Calendary();
   calendary.UpdateShowList();
    calendary.EventFactory.timer.addEventListener('blur', function() {
        calendary.errorManager.changeTime(this);
    }, true);
    calendary.EventFactory.nameLocation.addEventListener('blur', function() {
        calendary.errorManager.changeImportantStringField(this);
    }, true);
    calendary.EventFactory.coordinate.addEventListener('blur', function() {
        calendary.errorManager.changeCoordinate(this);
    }, true);
    calendary.EventFactory.stars.addEventListener('blur', function() {
        calendary.errorManager.changeStars(this);
    }, true);
    calendary.EventFactory.cost.addEventListener('blur', function() {
        calendary.errorManager.changePositiveNumber(this);
    }, true);
    document.getElementById("SubmitNewEventButton").addEventListener('click', function() {
        calendary.CreateEvent();
        calendary.UpdateShowList();
    }, false);
    document.getElementById("AddFriend").addEventListener('click', function() {
        calendary.addFriend(calendary.EventFactory.parties);
    }, false);
    var filterRadios =document.querySelectorAll("#FilterEventList input[type = radio]");
    for(var i = 0; i < filterRadios.length; i = i + 1) {
        filterRadios[i].addEventListener('click', function() {
            calendary.updateFilter();
            calendary.UpdateShowList();
        })
    }
    document.getElementById("FIlterFreshPeopleList").addEventListener('blur', function() {
        calendary.updateFilter();
        calendary.UpdateShowList();
    }, true);
}());