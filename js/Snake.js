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
                x: ( this.ctx.canvas.width / 2 ) + i,
                y: ( this.ctx.canvas.height / 2 ),
                dir: this.direction
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
            food = this.game.food,
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

        mapDir[ dir ].call( this );//{{{

        // Add the last element to the position array
        pos.push( {
            x: lastX,
            y: lastY,
            dir: dir
        });

        // Draw the last element
        var lastElem = pos[ pos.length - 1 ];
        ctx.fillRect( lastElem.x, lastElem.y, thickness, thickness );

        // Remove the first element and clear it from the canvas
        var firstElem = pos.shift();
        ctx.clearRect( firstElem.x - this.speed, firstElem.y - this.speed, thickness + this.speed + 1, thickness + this.speed + 1 );

        // Check if we're eating a food
        this.detectFood();

        // Check if we're eating our own tail

        // Check if we're out of bounds
        if (
            ( lastElem.x < 1 || lastElem.x > ctx.canvas.width - 1 ) ||
            ( lastElem.y < 1 || lastElem.y > ctx.canvas.height - 1 )
        ) {
            this.game.stop( this.reqID );
        }
    },

    detectFood: function() {
        var pos = this.pos,
            lastElem = pos[ pos.length - 1 ],
            food = this.game.food,
            evt = this.game.evt;

        // Check if we're eating a food
        if (
            // Allow 3 pixels of error
            ( lastElem.x >= food.x - 3 && lastElem.x <= food.x + 8 ) &&
            ( lastElem.y >= food.y - 3 && lastElem.y <= food.y + 8 )
        ) {
            evt.emit( 'I ate some food' );

            // We need to add 10 to the length
            this.length += 10;

            // And 0.2 to its speed
            this.speed += 0.2;

            // And also to the pos array
            for ( var i = 0; i < 10; i++ ) {
                switch( pos[ 0 ].dir ) {
                case 'top':
                    pos.unshift( {
                        x: pos[ 0 ].x,
                        y: pos[ 0 ].y + i + this.speed,
                        dir: 'top'
                    });
                    break;
                case 'right':
                    pos.unshift( {
                        x: pos[ 0 ] - i - this.speed,
                        y: pos[ 0 ],
                        dir: 'right'
                    });
                    break;
                case 'bottom':
                    pos.unshift( {
                        x: pos[ 0 ],
                        y: pos[ 0 ] - i - this.speed,
                        dir: 'right'
                    });
                    break;
                case 'left':
                    pos.unshift( {
                        x: pos[ 0 ] + i + this.speed,
                        y: pos[ 0 ],
                        dir: 'right'
                    });
                    break;
                }
            }
        }
    }
};

module.exports = Snake;

