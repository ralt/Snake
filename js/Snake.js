"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 10;
    this.direction = 'right';
    this.game = game;
    this.pos = this.build();
    this.draw();
}

Snake.prototype = {
    constructor: Snake,

    build: function() {
        var pos = [];
        for ( var i = 0; i < this.length; i++ ) {
            pos.push( {
                x: 150 + i,
                y: 150
            });
        }
        return pos;
    },

    move: function( direction ) {
        // Check for errors
        if (
            ( this.direction === 'left' && direction === 'right' ) ||
            ( this.direction === 'right' && direction === 'left' ) ||
            ( this.direction === 'top' && direction === 'bottom' ) ||
            ( this.direction === 'bottom' && direction === 'top' )
        ) {
            this.game.stop( this.reqID );
        }
        this.direction = direction;
    },

    draw: function() {
        var ctx = this.ctx,
            board = this.game.board,
            dir = this.direction,
            pos = this.pos;

        this.reqID = window.requestAnimationFrame(
            this.draw.bind( this )
        );

        var that = this;

        // Add the next position
        var mapDir = {
            'top': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x,
                    y: pos[ pos.length - 1 ].y - 1,
                });
                pos.shift();
            },
            'right': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x + 1,
                    y: pos[ pos.length - 1 ].y,
                });
                pos.shift();
            },
            'bottom': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x,
                    y: pos[ pos.length - 1 ].y + 1,
                });
                pos.shift();
            },
            'left': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x - 1,
                    y: pos[ pos.length - 1 ].y,
                });
                pos.shift();
            }
        };

        mapDir[ dir ].call( this );

        // Clear the canvas
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        // And draw each element of the pos array
        pos.forEach( function( p ) {
            ctx.fillRect( p.x, p.y, 1, 1 );
        }, this );
    }
};

module.exports = Snake;

