// Initialize Phaser
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game_div');

// Define all the states
game.state.add('load', load_state);
game.state.add('countdown', countdown);  
game.state.add('menu', menu_state);  
game.state.add('play', play_state);  

// Start with the 'load' state
game.state.start('load');  