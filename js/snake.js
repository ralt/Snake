define( function() {
    "use strict";

    function Snake() {}

    Snake.prototype = {
        constructor: Snake,

        move: function() {
            console.log( this );
        },
    };

    return Snake;
} );

