"use strict";

function Snake( ctx, game ) {
    this.ctx = ctx;
    this.length = 30;
    this.speed = 1;
    this.direction = 'right';
    this.game = game;
    this.pos = this.build();
    this.drawFirst();
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

    drawFirst: function() {
        var pos = this.pos,
            ctx = this.ctx,
            thickness = this.game.thickness;

        pos.forEach( function( p ) {
            ctx.fillRect( p.x, p.y, thickness, thickness );
        }, this );
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
            pos = this.pos,
            lastX,
            lastY;

        this.reqID = window.requestAnimationFrame(
            this.draw.bind( this )
        );

        // Add the next position
        var mapDir = {
            'top': function() {
                lastX = pos[ pos.length - 1 ].x,
                lastY = pos[ pos.length - 1 ].y - this.speed;
            },
            'right': function() {
                lastX = pos[ pos.length - 1 ].x + this.speed,
                lastY = pos[ pos.length - 1 ].y;
            },
            'bottom': function() {
                lastX = pos[ pos.length - 1 ].x,
                lastY = pos[ pos.length - 1 ].y + this.speed;
            },
            'left': function() {
                lastX = pos[ pos.length - 1 ].x - this.speed,
                lastY = pos[ pos.length - 1 ].y;
            }
        };

        mapDir[ dir ].call( this );

        // Add the last element to the position array
        pos.push( {
            x: lastX,
            y: lastY
        });

        // Draw the last element
        var lastElem = pos[ pos.length - 1 ];
        ctx.fillRect( lastElem.x, lastElem.y, thickness, thickness );

        // Remove the first element and clear it from the canvas
        var firstElem = pos.shift();
        ctx.clearRect( firstElem.x, firstElem.y, thickness, thickness );


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

