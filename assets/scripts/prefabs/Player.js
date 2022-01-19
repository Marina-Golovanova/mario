class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, velocity) {
    super(scene, 20, 520, "player", "player20");
    this.scene = scene;
    this.setOrigin(0);
    this.init();
    this.velocity = velocity;
    this.direction = 1;
    this.moving = false;

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
    this.body.setVelocityX(0);
    this.moving = false;

    if (this.scene.cursors.right.isDown) {
      this.direction = 1;
      this.runAnimation(this.direction);
    } else if (this.scene.cursors.left.isDown && this.body.x > 0 + this.width) {
      this.direction = -1;
      this.runAnimation(this.direction);
    } else {
      this.stopAnimation();
    }
  }

  jump() {
    if (this.scene.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(-300);
    }
  }

  stopAnimation() {
    this.moving = false;
    this.stop("run");
    this.setFrame("player20");
  }

  runAnimation(direction) {
    this.moving = true;
    this.scaleX = direction;
    this.play("run", true);
    this.body.setVelocityX(this.velocity * direction);
  }

  changeVelocity(velocity) {
    this.velocity = velocity;
  }
}
