class Gift extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, config.width + 300, 565, "gift");
    this.scene = scene;
    this.setOrigin(0.5, 0);
    this.scale = 0.4;
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setSize(80, 150);
  }

  isDead() {
    return this.active && this.x < -this.width;
  }

  move(n) {
    this.x += n;
  }

  blust() {
    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    });
  }

  tick() {
    if (this.active) {
      this.boom = Boom.generate(this.scene, this.x, this.y);
      this.destroy();
    } else {
      this.timer.remove();
    }
  }
}
