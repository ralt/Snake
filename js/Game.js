"use strict";

var Snake = require( './Snake.js' ),
    Fruit = require( './Fruit.js' );

function Game( ctx ) {
    this.score = 0;
    this.ctx = ctx;

    // Build the board
    this.board = [];
    this.buildBoard();
}

Game.prototype = {
    constructor: Game,

    buildBoard: function() {
        var width = this.ctx.canvas.width,
            height = this.ctx.canvas.height,
            arr = [];


        while( width-- ) {
            arr.push( 0 );
        }
        while( height-- ) {
            this.board.push( arr.slice( 0 ) );
        }
    },

    start: function() {
        // Have a mapping object and pass the correct string
        // to the snake
        this.keyCodes = {
            '37': 'left',
            '38': 'top',
            '39': 'right',
            '40': 'bottom'
        };

        // Spawn a new snake
        this.snake = new Snake( this.ctx, this );

        // Add the event listener on the arrow keys
        window.addEventListener( 'keydown', handleKeys.bind( this ) );
    },

    stop: function( reqID ) {
        window.cancelAnimationFrame( reqID );
        alert( 'Game over!' );
    }
};

function handleKeys( e ) {
    /*jshint validthis:true*/
    this.snake.move( this.keyCodes[ e.keyCode ] );
}

module.exports = Game;

