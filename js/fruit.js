define( function() {
    "use strict";

    function Fruit() {}

    Fruit.prototype = {
        constructor: Fruit,
    };

    return Fruit;
} () );

