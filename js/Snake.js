"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 10;
    this.direction = 'right';
    this.game = game;
    this.pos = {
        startX: 150,
        endX: 160,
        startY: 150,
        endY: 150
    };
    // Build the first snake
    this.build();
    this.draw();
}

Snake.prototype = {
    constructor: Snake,

    build: function() {
        var pos = this.pos;

        for ( var i = pos.startX; i <= pos.endX; i++ ) {
            for ( var j = pos.startY; j <= pos.endY; j++ ) {
                this.game.board[ i ][ j ] = 1;
            }
        }
    },

    move: function( direction ) {
        this.direction = direction;
    },

    draw: function() {
        var ctx = this.ctx,
            board = this.game.board,
            pos = this.pos,
            reqID = window.requestAnimationFrame(
            this.draw.bind( this )
        );

        // Build the new snake on the board after updating the values
        switch( this.direction ) {
        case 'top':
            board[ pos.startX ][ pos.startY ] = 0;
            pos.startY++;
            pos.endY++;
            board[ pos.startX ][ pos.endY ] = 1;
            break;
        case 'right':
            board[ pos.startX ][ pos.startY ] = 0;
            pos.startX++;
            pos.endX++;
            board[ pos.endX ][ pos.startY ] = 1;
            break;
        case 'bottom':
            board[ pos.startX ][ pos.startY ] = 0;
            pos.startY--;
            pos.endY--;
            board[ pos.startX ][ pos.endY ] = 1;
            break;
        case 'left':
            board[ pos.startX ][ pos.startY ] = 0;
            pos.startX--;
            pos.endX--;
            board[ pos.endX ][ pos.startY ] = 1;
            break;
        }

        // Clear the canvas
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        // And draw it
        for ( var i = 0; i < ctx.canvas.width; i++ ) {
            for ( var j = 0; j < ctx.canvas.height; j++ ) {
                // If it's 1, it's the snake
                if ( board[ i ][ j ] === 1 ) {
                    if ( this.direction === 'left' || this.direction === 'right' ) {
                        ctx.fillRect( i, j, this.length, 1 );
                    }
                    else {
                        ctx.fillRect( i, j, 1, this.length );
                    }
                }
            }
        }

        // Stop it if it's out of bounds
        Object.keys( pos ).forEach( function( key ) {
            if ( pos[ key ] <= 1 ||
                pos[ key ] >= ctx.canvas.width - 1 ) {
                this.game.stop( reqID );
            }
        }, this );
    }
};

module.exports = Snake;

