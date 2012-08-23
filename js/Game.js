"use strict";

var Snake = require( './Snake.js' ),
    Food = require( './Food.js' );

function Game( ctx ) {
    this.score = 0;
    this.ctx = ctx;
    this.thickness = 5;
}

Game.prototype = {
    constructor: Game,

    start: function() {
        // Create an event object
        var EventEmitter = require( 'events' ).EventEmitter;
        this.evt = new EventEmitter;

        // Have a mapping object and pass the correct string
        // to the snake
        this.keyCodes = {
            '37': 'left',
            '38': 'top',
            '39': 'right',
            '40': 'bottom'
        };

        // Spawn a new food
        this.food = new Food( this.ctx, this );

        // Spawn a new snake
        this.snake = new Snake( this.ctx, this );

        var that = this;
        // Listen for when a snake eats a food
        this.evt.on( 'I ate some food', function() {
            // Increase the score
            that.score++;

            // Clear the current food
            that.food.clear();

            // And spawn a new one
            that.food = new Food( that.ctx, that );
        });

        // Add the event listener on the arrow keys
        this.handleKeys = window.addEventListener( 'keydown', handleKeys.bind( this ) );
    },

    stop: function( reqID ) {
        var cvs = this.ctx.canvas;
        window.cancelAnimationFrame( reqID );
        window.removeEventListener( this.handleKeys );
        this.ctx.clearRect( 0, 0, cvs.width, cvs.height );
        alert( 'Game over! You got ' + this.score + ' points!' );
        this.restart();
    },

    restart: function() {
        var that = this
        var button = document.createElement( 'button' );
        button.textContent = 'Restart the game';
        button.addEventListener( 'click', function() {
            that.start();
            this.parentNode.removeChild( this );
        }, false );
        document.body.appendChild( button );
    }
};

function handleKeys( e ) {
    /*jshint validthis:true*/
    this.snake.move( this.keyCodes[ e.keyCode ] );
}

module.exports = Game;

