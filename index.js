/**
 * Created with PyCharm.
 * User: stribog
 * Date: 11.11.12
 * Time: 22:08
 * To change this template use File | Settings | File Templates.
 */

var button = document.getElementById('add-button');
var dom_list_parent = document.getElementById('todo-list');

var PaintEventsTemplate = _.template("\
<% collection.each(function(event) { %> \
    <li> \
        <% if (event.get('go')) { %> \
        <input class='toggle' type='checkbox'> \
        <% } %> \
        <div class='events__item'> \
            <div><b><%- event.get('title') %></b></div> \
            <div><small>Start: <%- event.get('start_time').toLocaleDateString() %></small></div> \
            <div><small>End: <%- event.get('end_time').toLocaleDateString() %></small></div> \
        </div> \
    </li> \
<% }); %>");

var collection = new EventsCollection([
    createNewEvent(new Date(2000, 10, 1), new Date(2000, 11, 1), "First", true),
    createNewEvent(new Date(2005, 5, 1), new Date(2006, 1, 1), "Second"),
    createNewEvent(new Date(2001, 10, 1), new Date(2006, 10, 1), "Looooong event", true),
    createNewEvent(new Date(1991, 5, 1), new Date(2000, 1, 20), "OoOOOoold event"),
    createNewEvent(new Date(2007, 3, 11), new Date(2008, 1, 5), "from 2007 to 2008", true),
    createNewEvent(new Date(2000, 5, 12), new Date(2020, 8, 17), "from 2000 To futureeeee"),
    createNewEvent(new Date(2013, 5, 12), new Date(2017, 1, 27), "Futureeeee", true),
    createNewEvent(new Date(2006, 10, 1), new Date(2008, 11, 1), "Firth")
]);
var current_collection = collection;

function PaintEvents(collection) {
    dom_list_parent.innerHTML = PaintEventsTemplate({'collection': collection});
}


// Events

button.addEventListener('click', function () {

});





















function TestIndex() {
    var a = PaintEventsTemplate({'collection': collection});
    //console.log(a.length);
    ok('Template', a.length, 903);

}
TestIndex();