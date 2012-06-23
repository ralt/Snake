define( function() {
    "use strict";

    function Snake( ctx, direction ) {
        this.ctx = ctx;
        this.length = 1;
        this.direction = direction;
        this.position = {
            x: 150,
            y: 150
        };
        this.draw();
    }

    Snake.prototype = {
        constructor: Snake,

        move: function( direction ) {
            this.direction = direction;
        },

        draw: function() {
            requestAnimationFrame( this.draw );
        }
    };

    return Snake;
} );

