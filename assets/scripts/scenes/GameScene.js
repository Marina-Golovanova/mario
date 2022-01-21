class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.ground = new Ground(this);
    this.playerVelocity = 500;
    this.player = new Player(this, this.playerVelocity);
    // this.gift = new Gift(this);
    this.gifts = new Gifts(this);
    this.gifts.createGift();
    this.addOverlap();
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.bgMoving = false;
  }

  update() {
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.gifts, this.ground);
    this.physics.add.collider(this.player, this.gifts);
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

  addOverlap() {
    this.physics.add.overlap(
      this.player,
      this.gifts,
      this.player.rebound.bind(this.player),
      undefined,
      this
    );
  }
}
