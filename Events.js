var todayDate = new Date();
var Events = function (items) {
    'use strict';
    Collection.apply(this, arguments);
};
inherits(Events, Collection);

/**
 * @return {Events}
 */
Events.prototype.findOnlyMyEvents = function () {
    'use strict';
    return new Events((this.sortWith("date", "with", "Igor")).items);
};
/**
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
    'use strict';
    return new Events((this.filter(function (Event) {return (Event.start > todayDate); })).items);
};
/**
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
    'use strict';
    return new Events((this.filter(function (Event) {return (Event.end < todayDate); })).items);
};
/**
 * @return {Events}
 */
Events.prototype.sortByName = function () {
    'use strict';
    return new Events(this.items.sort(function (Event1, Event2) {return (Event1.participants > Event2.participants); }));
};

/**
 * @return {Events}
 */
Events.prototype.sortByDate = function () {
    'use strict';
    return new Events(this.sortBy("date").items);
};
/**
 * @return {Events}
 */
Events.prototype.sortByRating = function () {
    'use strict';
    return new Events((this.sortBy("rating")).items);
};
/**
 * @return {Events}
 */
Events.prototype.sortByNumberOfParticipants = function () {
    'use strict';
    return new Events(this.sort(function (Event) {return (Event.numbParticipants); })).items;
};

/**
 * @return {Events}
 */
Events.prototype.consoleOut = function () {
    'use strict';
    this.items.forEach(function (Event) {
        console.log(Event.name + ": "+ '/n' + "Start of event: " + Event.start + ", Rating: " + Event.rate + ", Participants: " + Event.participants);
    });
};

Events.prototype.Out = function () {
	'use strict';
	var list = document.createElement("section"), myNode;
	list.setAttribute("id", "sect");
	myNode = document.getElementById("sect");
	if (myNode !== null) {
		myNode.innerHTML = '';
	}
	this.items.forEach(function (Event) {
		list.appendChild(Event.createList());
	});
	document.body.appendChild(list);
};
