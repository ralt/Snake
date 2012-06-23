define( function() {
    "use strict";

    function Snake( ctx ) {
        this.ctx = ctx;
        this.length = 1;
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
            this.shifts.push( this.position );
        },

        draw: function() {
            requestAnimationFrame( this.draw.bind( this ) );
        }
    };

    return Snake;
} );

