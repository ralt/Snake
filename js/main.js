require( [ 'Game' ], function( Game ) {
    "use strict";

    var cvs = document.getElementById( 'cvs' ),
        ctx = cvs.getContext( '2d' );

    var width = 300,
        height = 300;

    // Set the properties of the canvas
    cvs.width = width;
    cvs.height = height;

    // And its border
    ctx.strokeStyle = '#000';
    ctx.strokeRect( 0, 0, width, height );

    // Spawn a new game
    var game = new Game( ctx );

    // And start the game
    game.start();
} );

