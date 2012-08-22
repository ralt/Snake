define( function() {
    "use strict";

    function Snake( ctx, game ) {
        this.ctx = ctx;
        this.length = 1;
        this.pos = {
            x: 150,
            y: 150
        };
        this.direction = 'right';
        this.shifts = [];
        this.game = game;
        this.draw();
    }

    Snake.prototype = {
        constructor: Snake,

        move: function( direction ) {
            this.direction = direction;
            this.shifts.push( this.position );
        },

        draw: function() {
            window.requestAnimationFrame( this.draw.bind( this ) );

            this.ctx.beginPath();
            this.ctx.moveTo( this.pos.x, this.pos.y );

            switch( this.direction ) {

            case 'left':
                this.ctx.lineTo( this.pos.x - this.length, this.pos.y );
                this.pos.x -= 1;
                break;

            case 'top':
                this.ctx.lineTo( this.pos.x, this.pos.y + this.length );
                this.pos.y -= 1;
                break;

            case 'right':
                this.ctx.lineTo( this.pos.x + this.length, this.pos.y );
                this.pos.x += 1;
                break;

            case 'bottom':
                this.ctx.lineTo( this.pos.x, this.pos.y - this.length );
                this.pos.y += 1;
                break;
            }

            this.ctx.stroke();
            this.ctx.closePath();

            if ( this.pos.x === 0 ||
                this.pos.y === 0 ||
                this.pos.x === 300 ||
                this.pos.y === 300 ) {
                this.game.stop();
            }
        }
    };

    return Snake;
} );

