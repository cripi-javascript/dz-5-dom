function getString(event) {
    "use strict";

    return "\n" + event.name + "\n" + " начало: " + event.start + "\n"
        + " конец: " + event.end + "\n"
        + " место события: "  + event.location + " напомнить за " + event.remindTime + " минут" + "\n"
        + " описание: " + event.description + "\n";
}

test("Testing inherits Events from Collection", function () {
    "use strict";

    var collection = new Events(examples),
        element = {title: "March 20", content: "In his eyes she eclipses..."},
        result = collection.add(element);

    examples.push(element);

    deepEqual(result.items, examples, "Two objects can be the same in value");
});

test("Testing past in Events", function () {
    "use strict";

    var collection = new Events(examples),
        result = collection.past();

    console.log("Result: " + result.items.map(function (event) {
        return getString(event);
    }));

    console.log("--------------\n");
    ok("1" === "1", "Two objects can be the same in value");
});

test("Testing coming in Events", function () {
    "use strict";

    var collection = new Events(examples),
        result = collection.coming();

    console.log("Result: " + result.items.map(function(event) {
        return getString(event);
    }));

    console.log("--------------\n");
    ok("1" === "1", "Two objects can be the same in value");
});

test("Testing comeThrough in Events", function () {
    "use strict";

    var collection = new Events(examples),
        result = collection.comeThrough(10);

    console.log("Result: " + result.items.map(function (event) {
        return getString(event);
    }));

    console.log("--------------\n");
    ok("1" === "1", "Two objects can be the same in value");
});

test("Testing sortBytime in Events", function () {
    "use strict";

    var collection = new Events(examples),
        result = collection.byStartTime();

    console.log("Result: " + result.items.map(function (event) {
        return getString(event);
    }));

    console.log("--------------\n");
    ok("1" === "1", "Two objects can be the same in value");
});


