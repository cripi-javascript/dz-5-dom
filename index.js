/**
 * Created with PyCharm.
 * User: stribog
 * Date: 11.11.12
 * Time: 22:08
 * To change this template use File | Settings | File Templates.
 */

var app = function () {};
app.prototype.init = function () {
    var self = this;
    this.action = document.getElementById('add-button');
    this.render = document.getElementById('todo-list');
    this.inputs = {
        'title': document.getElementById('new-todo'),
        'start_time': document.getElementById('js-start_time'),
        'end_time': document.getElementById('js-end_time')
    };
    this.full_collection = new EventsCollection([
        createNewEvent(new Date(2000, 10, 1), new Date(2000, 11, 1), "First", true),
        createNewEvent(new Date(2005, 5, 1), new Date(2006, 1, 1), "Second"),
        createNewEvent(new Date(2001, 10, 1), new Date(2006, 10, 1), "Looooong event", true),
        createNewEvent(new Date(1991, 5, 1), new Date(2000, 1, 20), "OoOOOoold event"),
        createNewEvent(new Date(2007, 3, 11), new Date(2008, 1, 5), "from 2007 to 2008", true),
        createNewEvent(new Date(2000, 5, 12), new Date(2020, 8, 17), "from 2000 To futureeeee"),
        createNewEvent(new Date(2013, 5, 12), new Date(2017, 1, 27), "Futureeeee", true),
        createNewEvent(new Date(2006, 10, 1), new Date(2008, 11, 1), "Firth")
    ]);
    this.current_collection = this.full_collection;

    this.template = _.template("\
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

    this.action.addEventListener('click', function (event) {
        self.action_click(event);
    });
    // TODO: add events for filters;
};
app.prototype.action_click = function (event) { // WTF: this is WINDOW !!!
    var info = {};
    _.each(this.inputs, function(num, key) {
        info[key] = num.value;
    });

    try {
        var new_event = new this.full_collection.model(info);
        this.full_collection.add(new_event);
        this.change_current_collection();
    } catch (e) {
        console.log("errrore");
    }
};
app.prototype.change_current_collection = function () {
    this.current_collection = this.full_collection;
    // TODO: filters detect;
    this.paint();
};
app.prototype.paint = function () {
    this.render.innerHTML = this.template({'collection': this.current_collection});
}

var application = new app();
application.init();
application.paint();

