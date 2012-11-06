test("Create object Collection", function () {
    "use strict";

    var result = new Collection(examples);

    ok(result.items[0].name == examples[0].name, "Passed!");
});

test("Testing for creating new Collection in constructor", function () {
    "use strict";

    var result = new Collection(examples);
    result.items.pop();

    ok(result.items.length !== examples.length, "Passed!");
});

test("Add func in Collection", function () {
    "use strict";

    var collection = new Collection(examples),
        element = {title: "March 20", content: "In his eyes she eclipses..."},
        result = collection.add(element);

    examples.push(element);

    deepEqual(result.items, examples, "Two objects can be the same in value");
});

test("Test Collection", function () {
    "use strict";

    var collection = new Collection(),
        element = {title: "March 20", content: "In his eyes she eclipses..."},
        result = collection.add(element);

    deepEqual(result.items, [element], "Two objects can be the same in value");
});

test("Filter func in Collection", function () {
    "use strict";

    var collection = new Collection(examples),
        result = collection.filter(function (item) {
            return item.name === "День зимы";
        });

    ok(result.items.length !== examples.length, "Passed");
});
