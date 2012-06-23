define( [ 'Snake', 'Fruit' ], function( Snake, Fruit ) {
    "use strict";

    function Game( ctx ) {
        this.score = 0;
        this.ctx = ctx;
    }

    Game.prototype = {
        constructor: Game,

        start: function() {
            // Add the event listener on the arrow keys
            window.addEventListener( 'keydown', handleKeys.bind( this ) );
        },
    };

    function handleKeys( e ) {
        if ( !!~[ 37, 38, 39, 40 ].indexOf( e.keyCode ) ) {
            // Have a mapping object and pass the correct string
            // to the snake
            var keyCodes = {
                '37': 'left',
                '38': 'top',
                '39': 'right',
                '40': 'bottom'
            };

            // Spawn a new snake if it doesn't exist
            if ( typeof this.snake === 'object' ) {
                this.snake.move( keyCodes[ e.keyCode ] );
            }
            else {
                this.snake = new Snake( this.ctx, keyCodes[ e.keyCode ] );
            }
        }
    }

    return Game;
} );

