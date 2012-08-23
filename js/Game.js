"use strict";

var Snake = require( './Snake.js' ),
    Food = require( './Food.js' ),
    that;

function Game( ctx ) {
    this.score = 0;
    this.ctx = ctx;
    this.thickness = 5;
}

Game.prototype = {
    constructor: Game,

    start: function() {
        that = this;

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
        this.keyEvt = window.addEventListener( 'keydown', this.handleKeys );
    },

    stop: function( reqID ) {
        var cvs = this.ctx.canvas;
        window.cancelAnimationFrame( reqID );
        window.removeEventListener( this.keyEvt );
        //this.ctx.clearRect( 0, 0, cvs.width, cvs.height );
        alert( 'Game over! You got ' + this.score + ' points!' );
        this.restart();
    },

    restart: function() {
        var button = document.createElement( 'button' );
        button.textContent = 'Restart the game';
        button.addEventListener( 'click', function() {
            this.parentNode.removeChild( this );
            that.start();
        }, false );
        document.body.appendChild( button );
    },

    handleKeys: function( e ) {
        if ( that.keyCodes[ e.keyCode ] ) {
            that.snake.move( that.keyCodes[ e.keyCode ] );
        }
    }
};


module.exports = Game;

