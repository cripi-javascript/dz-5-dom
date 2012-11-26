/**
 * Created with PyCharm.
 * User: pahaz
 * Date: 11.11.12
 * Time: 22:08
 * To change this template use File | Settings | File Templates.
 */

/**
 * Application Event.
 *
 * @constructor
 * @this {app}
 */
var app = function () {};

/**
 * Application initialization.
 *
 * @this {app}
 */
app.prototype.init = function () {
    var self = this;
    this.render = document.getElementById('todo-list');
    this.inputs = {
        'title': document.getElementById('new-todo'),
        'start_time': document.getElementById('js-start_time'),
        'end_time': document.getElementById('js-end_time')
    };

    this.full_collection = new EventsCollection(this.load());
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

    this.action = document.getElementById('add-button');
    this.action.addEventListener('click', function (event) {
        self.action_click(event);
        event.preventDefault();
    });

    var listeners = document.querySelectorAll('.js-filters');
    var self = this;
    _.each(listeners, function(listener) {
        listener.addEventListener('change', self.change_current_collection.bind(self));
    });
};

/**
 * Load initial collection data.
 *
 * @this {app}
 */
app.prototype.load = function () {
    return [
        createNewEvent(new Date(2000, 10, 1), new Date(2000, 11, 1), "First", true),
        createNewEvent(new Date(2005, 5, 1), new Date(2006, 1, 1), "Second"),
        createNewEvent(new Date(2001, 10, 1), new Date(2006, 10, 1), "Looooong event", true),
        createNewEvent(new Date(1991, 5, 1), new Date(2000, 1, 20), "OoOOOoold event"),
        createNewEvent(new Date(2007, 3, 11), new Date(2008, 1, 5), "from 2007 to 2008", true),
        createNewEvent(new Date(2000, 5, 12), new Date(2020, 8, 17), "from 2000 To futureeeee"),
        createNewEvent(new Date(2013, 5, 12), new Date(2017, 1, 27), "Futureeeee", true),
        createNewEvent(new Date(2006, 10, 1), new Date(2008, 11, 1), "Firth")
    ];
};

/**
 * Application click action listener.
 *
 * @this {app}
 */
app.prototype.action_click = function (event) { // WTF: this is WINDOW !!!
    var info = {};
    _.each(this.inputs, function(num, key) {
        info[key] = num.value;
    });

    try {
        var model_class = this.full_collection.model;
        var new_event = new model_class(info);
        this.full_collection.add(new_event);
        this.change_current_collection(event);
        this.save();
    } catch (e) {
        alert(e.message);
    }
};

/**
 * Save collection data.
 *
 * @this {app}
 */
app.prototype.save = function() {

};

/**
 * Application change collection listener.
 *
 * @this {app}
 */
app.prototype.change_current_collection = function (event) {
    this.current_collection = this.full_collection;

    // TODO: optimization;
    var my = document.getElementById('filter_my').checked;
    var future = document.getElementById('filter_future').checked;
    var sort = false;

    if (document.querySelector('input[name="sort"]:checked') !== null) {
        sort = document.querySelector('input[name="sort"]:checked').value;
    }

    var tmp_collection = this.current_collection;
    if (my) {
        tmp_collection = tmp_collection.my_events();
    }
    if (future) {
        tmp_collection = tmp_collection.start_after(new Date());
    }
    if (sort) {
        tmp_collection = tmp_collection.sortBy(function (model) { return model.get(sort); });
    }

    this.current_collection = tmp_collection;
    this.paint();
};

/**
 * Render current collection.
 *
 * @this {app}
 */
app.prototype.paint = function () {
    this.render.innerHTML = this.template({'collection': this.current_collection});
};

var application = new app();
application.init();
application.paint();
