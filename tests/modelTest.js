test("Testing qunit", function () {
    "use strict";

    ok( "1" == "1", "Passed!");
});

test("Creating absract object Model", function () {
    "use strict";

    var item = new Model({title: "March 20", content: "In his eyes she eclipses..."});
    ok(item.title === "March 20", "Passed!");
});


test("Testing setter for Model", function () {
    "use strict";

    var item = new Model();
    item.set({title: "March 20", content: "In his eyes she eclipses..."});
    ok(item.title === "March 20", "Passed!");
});

test("Testing getter for Model", function () {
    "use strict";

    var item = new Model();
    item.set({title: "March 20", content: "In his eyes she eclipses..."});

    ok(item.get("title") === "March 20", "Passed!");
});