var COUNTDOWN_TIME_TO_START = 3;
var COUNTDOWN_TEXT = null;

var countdown = {
    create: function(){
        var _this = this;
        var timer = game.time.events.loop(Phaser.Timer.SECOND, this.decrement, this);
        COUNTDOWN_TEXT = this.game.add.text(200, 210, COUNTDOWN_TIME_TO_START, { font: "30px Arial", fill: "#ffffff" });
    },
    decrement: function(){
      COUNTDOWN_TIME_TO_START -= 1;
      if(COUNTDOWN_TIME_TO_START <= 0){
          this.game.state.start('play');
      }
    },
    update: function(){
        COUNTDOWN_TEXT.setText(COUNTDOWN_TIME_TO_START);
    }
};