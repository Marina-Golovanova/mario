class Flower extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, "flower");
    this.scene = data.scene;
    this.setOrigin(0.5, 0);
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.body.setAllowGravity(0);
    this.scale = 0.25;
    this.body.setImmovable(true);
    this.body.setSize(200, 200);
    this.scene.events.on("update", this.update, this);
  }

  update() {
    if (this.scene) {
      if (this.scene.bgMoving) {
        this.x -= 5;
      }
    }

    if (this.x <= 0 - this.width) {
      this.destroy();
    }
  }

  static generate(scene, x, y) {
    return new Flower({ scene, x, y });
  }
}
