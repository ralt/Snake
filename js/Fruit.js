"use strict";

function Fruit( ctx, game ) {
    this.ctx = ctx;
    this.game = game;
    this.draw();
}

Fruit.prototype = {
    constructor: Fruit,

    draw: function() {
    }
};

module.exports = Fruit;

