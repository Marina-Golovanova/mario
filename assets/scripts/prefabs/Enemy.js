class Enemy extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, "zombie", "zombie1");
    this.scene = data.scene;
    // this.moving = false;
    this.scale = 0.3;
    this.direction = 1;
    this.velocity = 50;
    this.setOrigin(0, 0.5);
    this.init();

    const frames = this.scene.anims.generateFrameNames("zombie", {
      prefix: "zombie",
      start: 1,
      end: 10,
    });
    this.scene.anims.create({
      key: "move",
      frames,
      frameRate: 10,
      repeat: -1,
    });
  }

  static generate(scene, x, y) {
    return new Enemy({ scene, x, y });
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(150, 300);
    this.body.pushable = false;
    this.scene.physics.add.collider(this, this.scene.ground);
    this.scene.events.on("update", this.update, this);
  }

  move() {
    this.flipX = this.direction !== 1;
    this.play("move", true);
    this.body.setVelocityX(this.velocity * this.direction);
  }

  update() {
    if (this.x + this.width <= 0 || this.x >= config.width + this.width) {
      this.destroy();
    }
    if (this.scene) {
      if (this.scene.bgMoving) {
        this.x -= 5;
      }
    }
  }

  killed() {
    this.boom = Boom.generate(this.scene, this.x + 40, this.y);
    this.destroy();
  }

  changeVelocity(velocity) {
    this.velocity = velocity;
  }
}
