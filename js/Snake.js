"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 30;
    this.speed = 1;
    this.direction = 'right';
    this.sWidth = 5;
    this.sHeight = 5;
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
            thickness = this.game.thickness,
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
                    y: pos[ pos.length - 1 ].y - this.speed,
                });
            },
            'right': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x + this.speed,
                    y: pos[ pos.length - 1 ].y,
                });
            },
            'bottom': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x,
                    y: pos[ pos.length - 1 ].y + this.speed,
                });
            },
            'left': function() {
                var pos = this.pos;
                pos.push( {
                    x: pos[ pos.length - 1 ].x - this.speed,
                    y: pos[ pos.length - 1 ].y,
                });
            }
        };

        mapDir[ dir ].call( this );
        pos.shift();

        // Clear the canvas
        ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

        // And draw each element of the pos array
        pos.forEach( function( p ) {
            ctx.fillRect( p.x, p.y, thickness, thickness );
        }, this );

        // Check if we're out of bounds
        var lastPos = pos[ pos.length -1 ];
        if (
            ( lastPos.x < 1 || lastPos.x > 299 ) ||
            ( lastPos.y < 1 || lastPos.y > 299 )
        ) {
            this.game.stop( this.reqID );
        }
    }
};

module.exports = Snake;

