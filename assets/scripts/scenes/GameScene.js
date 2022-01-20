class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.createBackground();
    this.ground = new Ground(this);
    this.playerVelocity = 500;
    this.player = new Player(this, this.playerVelocity);
    this.gift = new Gift(this);
    this.addOverlap();
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.gift, this.ground);
    this.physics.add.collider(this.gift, this.player);
    this.player.move();
    this.player.jump();
    if (
      this.player.x >= config.width / 2 &&
      this.player.moving &&
      this.player.direction != -1
    ) {
      this.bg.tilePositionX += 5;
      this.player.changeVelocity(0);
    } else {
      this.player.changeVelocity(500);
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
      this.gift,
      this.player.rebound.bind(this.player),
      undefined,
      this
    );
  }
}
