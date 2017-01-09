var load_state = {  
    preload: function() { 
        this.game.stage.backgroundColor = '#282F44';

        game.load.image('block-player', 'assets/block-player-smaller.png');
        game.load.image('bullet-one', 'assets/bullet-one.png');
        game.load.image('bullet-two', 'assets/bullet-two.png');
        game.load.image('bullet-two-alt', 'assets/bullet-alt-two.png');

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};