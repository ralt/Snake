"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 10;
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
        var ctx = this.ctx,
            pos = this.pos,
            reqID = window.requestAnimationFrame(
            this.draw.bind( this )
        );

        // Clear the canvas
        ctx.clearRect( 0, 0, 300, 300 );

        // Draw the next position
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo( pos.x, pos.y );

        switch( this.direction ) {

        case 'left':
            ctx.lineTo( pos.x - this.length, pos.y );
            pos.x -= 1;
            break;

        case 'top':
            ctx.lineTo( pos.x, pos.y + this.length );
            pos.y -= 1;
            break;

        case 'right':
            ctx.lineTo( pos.x + this.length, pos.y );
            pos.x += 1;
            break;

        case 'bottom':
            ctx.lineTo( pos.x, pos.y - this.length );
            pos.y += 1;
            break;
        }

        ctx.stroke();
        ctx.closePath();

        if ( this.pos.x === 0 ||
            this.pos.y === 0 ||
            this.pos.x === 300 ||
            this.pos.y === 300 ) {
            this.game.stop( reqID );
        }
    }
};

module.exports = Snake;

