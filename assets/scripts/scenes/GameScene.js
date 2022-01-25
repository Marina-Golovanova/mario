class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.ground = new Ground(this);
    this.playerVelocity = 500;
    this.player = new Player(this, this.playerVelocity);
    this.gifts = new Gifts(this);
    this.gifts.createGift();
    this.addOverlap();
    this.createText();
    this.createCompleteEvents();
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.bgMoving = false;
    this.flowers = 0;
    this.maxFlowers = 3;
  }

  update() {
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.gifts, this.ground);
    this.colliderPlayerToGift = this.physics.add.collider(
      this.player,
      this.gifts
    );
    this.player.move();
    this.player.jump();
    if (
      this.player.x >= config.width / 2 &&
      this.player.moving &&
      this.player.direction != -1
    ) {
      this.bg.tilePositionX += 5;
      this.bgMoving = true;
      this.player.changeVelocity(0);
      //   if (this.enemy) {
      //     this.enemy.changeVelocity(-100);
      //     console.log(this.enemy.velocity);
      //   }
    } else {
      this.player.changeVelocity(500);
      this.bgMoving = false;
    }
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }

  createText() {
    this.timeoutText = this.add.text(50, 50, "Flowers: 0", {
      font: "40px CurseCasual",
      fill: "#fff",
    });
  }

  addOverlap() {
    this.physics.add.overlap(
      this.player,
      this.gifts,
      this.collision,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.flower,
      this.takeFlower,
      undefined,
      this
    );
  }

  collision() {
    this.player.rebound();
    if (this.player.y + this.player.height !== this.ground.y) {
      this.events.emit("opened");
      if (this.gifts.result === "enemy") {
        this.enemy = this.gifts.enemy;
        this.enemy.direction = this.player.direction * -1;
        this.enemy.move();
        this.physics.add.collider(
          this.enemy,
          this.player,
          this.collisionWithEnemy,
          undefined,
          this
        );
      } else {
        this.flower = this.gifts.flower;
        this.addOverlap();
      }
    }
  }

  takeFlower() {
    this.flowers++;
    if (this.flowers === this.maxFlowers) {
      this.events.emit("win");
    }
    this.timeoutText.setText("Flowers: " + this.flowers);
    this.gifts.flower.destroy();
  }

  collisionWithEnemy() {
    if (this.enemy.body.touching.left || this.enemy.body.touching.right) {
      if (this.flowers === 0) {
        this.events.emit("game-over");
      }
      this.flowers -= 1;
      this.gifts.countCreated--;
      this.timeoutText.setText("Flowers: " + this.flowers);
      this.enemy.body.checkCollision.left = false;
      this.enemy.body.checkCollision.right = false;
    } else if (this.enemy.body.touching.up) {
      this.enemy.killed();
    }
  }

  createCompleteEvents() {
    this.events.once("game-over", this.onComplete, this);
    this.events.once("win", this.onComplete, this);
  }

  onComplete() {
    this.scene.start("Start");
  }
}
