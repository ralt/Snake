"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 10;
    this.direction = 'right';
    this.game = game;
    this.draw();
}

Snake.prototype = {
    constructor: Snake,

    move: function( direction ) {
        this.direction = direction;
    },

    draw: function() {
        var ctx = this.ctx,
            board = this.game.board,
            reqID = window.requestAnimationFrame(
            this.draw.bind( this )
        );

        // Build the new snake on the board


        // Clear the canvas
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        // And draw it
        console.log( board );
    }
};

module.exports = Snake;

