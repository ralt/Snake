"use strict";

function Food( ctx, game ) {
    this.ctx = ctx;
    this.game = game;
    this.draw();
}

Food.prototype = {
    constructor: Food,

    draw: function() {
        var ctx = this.ctx,
            cvs = ctx.canvas,
            thickness = this.game.thickness;

        // Randomly get a position
        this.x = Math.random() * ( cvs.width - 5 ) + 1;
        this.y = Math.random() * ( cvs.height - 5 ) + 1;

        // And add the food to this position
        ctx.fillRect( this.x, this.y, thickness, thickness );
    },

    clear: function() {
        var ctx = this.ctx,
            thickness = this.game.thickness;

        ctx.clearRect( this.x - 1, this.y - 1, thickness + 3, thickness + 3 );
    }
};

module.exports = Food;

