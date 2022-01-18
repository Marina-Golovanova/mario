class Player extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 20, 520, "player", "player20");
    this.scene = scene;
    this.setOrigin(0);
    this.init();
    this.velocity = 500;

    const frames = this.scene.anims.generateFrameNames("player", {
      prefix: "player",
      start: 1,
      end: 8,
    });
    this.scene.anims.create({
      key: "run",
      frames,
      frameRate: 10,
      repeat: -1,
    });
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
  }

  move() {
    this.body.setVelocity(0);
    this.moving = false;

    if (
      this.scene.cursors.right.isDown &&
      this.body.x < config.width - this.width
    ) {
      this.runAnimation(1);
    } else if (this.scene.cursors.left.isDown && this.body.x > 0 + this.width) {
      this.runAnimation(-1);
    } else {
      this.stopAnimation();
    }
  }

  stopAnimation() {
    this.stop("run");
    this.setFrame("player20");
  }

  runAnimation(direction) {
    this.scaleX = direction;
    this.play("run", true);
    this.body.setVelocityX(this.velocity * direction);
  }
}
