require( [ 'snake', 'fruit' ], function( Snake, Fruit ) {
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

    // Spawn a snake
    var snake = new Snake();

    // Add the event listeners for the arrow keys
    window.addEventListener( 'keydown', function( e ) {
        if ( !!~[ 37, 38, 39, 40 ].indexOf( e.keyCode ) ) {
            snake.move.bind( this );
        }
    } );

    // Spawn a new fruit
    var fruit = new Fruit();
} );

