"use strict";

var cvs = document.getElementById( 'cvs' ),
    ctx = cvs.getContext( '2d' );

var width = 300,
    height = 300;

// Set the properties of the canvas
cvs.width = width;
cvs.height = height;

var Game = require( './Game.js' );

// Spawn a new game
var game = new Game( ctx );

// And start the game
game.start();

