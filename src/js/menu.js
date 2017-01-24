var menu_state = {  
    create: function() {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(200, 210, "Press Space to Start", style); 

    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};