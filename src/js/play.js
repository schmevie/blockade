var BULLET_SPEED = 400;
var PLAYER_SPEED = 200;

var play_state = {

    // No more 'preload' function, since it is already done in the 'load' state

    create: function() {
        game.physics.startSystem(Phaser.Physics.Arcade); 
        //SETTINGS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.isRotatingOne = false;
        this.isRotatingTwo = false;

        //Adding the bullets
        this.bulletOne = game.add.weapon(30, 'bullet-one');
        this.bulletTwo = game.add.weapon(30, 'bullet-two');

        this.bulletTwoAlt = game.add.weapon(30, 'bullet-two-alt');
        this.bulletTwoAltOne = game.add.weapon(30, 'bullet-two-alt');
        this.bulletTwoAltTwo = game.add.weapon(30, 'bullet-two-alt');
        this.bulletTwoAltThree = game.add.weapon(30, 'bullet-two-alt');

        this.bulletOneAltOne = game.add.weapon(30, 'bullet-alt-one');
        this.bulletOneAltTwo = game.add.weapon(30, 'bullet-alt-one');
        this.bulletOneAltThree = game.add.weapon(30, 'bullet-alt-one');

        //PLAYER  ONE
        this.blockPlayerOne = this.add.sprite(100, 250, 'block-player');
        this.blockPlayerOne.anchor.setTo(0.5, 0.5);
        this.movementDirectionPlayerOne = 0;
        this.blockPlayerOne.activeBullets = [];
        this.blockPlayerOne.sidesActive = {
            '0' : true,
            '1' : false,
            '2' : false,
            '3' : false
        };
        this.blockPlayerOne.nonActiveBullets = [this.bulletOneAltOne, this.bulletOneAltTwo, this.bulletOneAltThree];

        //PLAYER TWO
        this.blockPlayerTwo = this.add.sprite(500, 250, 'block-player');
        this.blockPlayerTwo.anchor.setTo(0.5, 0.5);
        this.movementDirectionPlayerTwo = 0;
        this.blockPlayerTwo.activeBullets = [];
        this.blockPlayerTwo.sidesActive = {
            '0' : true,
            '1' : false,
            '2' : false,
            '3' : false
        };
        this.blockPlayerTwo.nonActiveBullets = [this.bulletTwoAltOne, this.bulletTwoAltTwo, this.bulletTwoAltThree];


        //BULLET ONE
        this.bulletOne.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletOne.bulletSpeed = BULLET_SPEED;
        this.bulletOne.fireRate = 200;
        this.bulletOne.fireAngle = 0;
        this.bulletOne.autofire = true;
        this.bulletOne.trackSprite(this.blockPlayerOne, 0, 0);
        // this.bulletOne.trackRotation = true;
        this.blockPlayerOne.activeBullets.push(this.bulletOne);

        //BULLET TWO
        this.bulletTwo.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.bulletTwo.bulletSpeed = BULLET_SPEED;
        this.bulletTwo.fireRate = 200;
        this.bulletTwo.fireAngle = 0;
        this.bulletTwo.autofire = true;
        this.bulletTwo.trackSprite(this.blockPlayerTwo, 0, 0);
        // this.bulletTwo.trackRotation = true;
        this.blockPlayerTwo.activeBullets.push(this.bulletTwo);

        //WALLS
        this.wallOne = this.add.sprite(150, 150, 'wall-1');
        this.wallTwo = this.add.sprite(500, 0, 'wall-2');
        this.wallThree = this.add.sprite(530, 350, 'wall-3');

        game.physics.arcade.enable([this.blockPlayerOne, this.blockPlayerTwo, this.wallOne, this.wallTwo, this.wallThree]);

        this.blockPlayerOne.body.collideWorldBounds = true;


        // this.blockPlayerTwo.body.immovable = true;
        this.blockPlayerTwo.body.collideWorldBounds = true;

        this.wallOne.body.immovable = true;
        this.wallTwo.body.immovable = true;
        this.wallThree.body.immovable = true;


    },

    update: function() {
        //Player to player
        game.physics.arcade.collide(this.blockPlayerTwo, this.bulletOne.bullets, this.hitPlayer, null, this);
        game.physics.arcade.collide(this.blockPlayerOne, this.bulletTwo.bullets, this.hitPlayer, null, this);

        //players to walls
        game.physics.arcade.collide(this.blockPlayerOne, [this.wallOne, this.wallTwo, this.wallThree]);
        game.physics.arcade.collide(this.blockPlayerTwo, [this.wallOne, this.wallTwo, this.wallThree]);
        //Player 1 main bullets with player 2 main bullets
        game.physics.arcade.collide(this.bulletOne.bullets, this.bulletTwo.bullets, this.bulletCollide, null, this);
        //Player 1 main bullets with player 2 secondary bullets
        game.physics.arcade.collide(this.bulletOne.bullets, this.bulletTwoAltOne.bullets, this.bulletCollide, null, this);
        //Player 1 main bullets with player 2 thrid bullets
        game.physics.arcade.collide(this.bulletOne.bullets, this.bulletTwoAltTwo.bullets, this.bulletCollide, null, this);
        //Player 1 main bullets with player 2 fourth bullets
        game.physics.arcade.collide(this.bulletOne.bullets, this.bulletTwoAltThree.bullets, this.bulletCollide, null, this);
        
        if (this.cursors.left.isDown) {
            if (!this.isRotatingOne) {
                this.isRotatingOne = true;
                this.rotatePlayer(this.blockPlayerOne, 'left');
                this.movementDirectionPlayerOne = (((this.movementDirectionPlayerOne - 1) % 4) + 4) % 4;
            }
        } else if (this.cursors.right.isDown) {
            if (!this.isRotatingOne) {
                this.isRotatingOne = true;
                this.rotatePlayer(this.blockPlayerOne, 'right');
                this.movementDirectionPlayerOne = (((this.movementDirectionPlayerOne + 1) % 4) + 4) % 4;
            }
        } else if (this.cursors.left.isUp) {
            this.isRotatingOne = false;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if (!this.isRotatingTwo) {
                this.isRotatingTwo = true;
                this.rotatePlayer(this.blockPlayerTwo, 'left');
                this.movementDirectionPlayerTwo = (((this.movementDirectionPlayerTwo - 1) % 4) + 4) % 4;
            }
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            if (!this.isRotatingTwo) {
                this.isRotatingTwo = true;
                this.rotatePlayer(this.blockPlayerTwo, 'right');
                this.movementDirectionPlayerTwo = (((this.movementDirectionPlayerTwo + 1) % 4) + 4) % 4;
            }
        } else if (!game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.isRotatingTwo = false;
        }
        this.movePlayer(this.blockPlayerOne, this.movementDirectionPlayerOne);
        this.movePlayer(this.blockPlayerTwo, this.movementDirectionPlayerTwo);
    },

    //Callback if Player two is hit
    hitPlayer: function(body1, bullet) {
        //TODO : check to see which side got hit and then
        // either add another bullet stream or end the game
        bullet.kill();
        var degree = (body1.body.angle * 180) / Math.PI;
        var orientation = (((degree / 90) % 4) + 4) % 4;
        var bulletAngle;



        var stringNumber;
        if (body1.body.touching.left) {
            var leftEq = (((2- orientation) % 4) + 4) % 4;
            stringNumber = leftEq.toString();
            bulletAngle = 180;
        } else if (body1.body.touching.right) {
            var rightEq = (((4- orientation) % 4) + 4) % 4;
            stringNumber = rightEq.toString();
            bulletAngle = 0;
        } else if (body1.body.touching.up) {
            var upEq = (((3- orientation) % 4) + 4) % 4;
            stringNumber = upEq.toString();
            bulletAngle = -90;
        } else if (body1.body.touching.down) {
            var downEq = (((1- orientation) % 4) + 4) % 4;
            stringNumber = downEq.toString();
            bulletAngle = 90;
        }

        //Adding the bullet
        if (stringNumber && !(body1.sidesActive[stringNumber])) {
            if (body1.nonActiveBullets.length > 0) {
                var bullet = body1.nonActiveBullets.pop();
                bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                bullet.bulletSpeed = BULLET_SPEED;
                bullet.fireRate = 200;
                bullet.fireAngle = bulletAngle;
                bullet.autofire = true;
                bullet.trackSprite(body1, 0, 0);
                body1.activeBullets.push(bullet);

                body1.sidesActive[stringNumber] = true;
                // this.bulletTwoAlt.trackRotation = true;
            }
        }
    },

    //Callback if two bullets collide
    bulletCollide: function(bullet1, bullet2) {

        bullet1.kill();
        bullet2.kill();
    },

    //Rotating the player
    rotatePlayer: function(player, direction) {
        if (direction === 'left') {
            var blockBullets = player.activeBullets;
            for (var i = 0; i < blockBullets.length; i++) {
                var thisBullet = blockBullets[i];
                thisBullet.fireAngle -=90;
            }
            player.body.rotation -=90;
        } else {
            var blockBullets = player.activeBullets;
            for (var i = 0; i < blockBullets.length; i++) {
                var thisBullet = blockBullets[i];
                thisBullet.fireAngle +=90;
            }
            player.body.rotation +=90;
        }
    },

    //Moving the player
    movePlayer: function(player, movementDirection) {
        if (movementDirection === 0) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.velocity.x = PLAYER_SPEED;
            // player.body.moveRight(100);
        } else if (movementDirection === 1) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.velocity.y = PLAYER_SPEED;
            // player.body.moveDown(100);

        } else if (movementDirection === 2) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.velocity.x = -PLAYER_SPEED;
            // player.body.moveLeft(100);
            
        } else if (movementDirection === 3) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.velocity.y = -PLAYER_SPEED;
            // player.body.moveUp(100);
        }
    }
};