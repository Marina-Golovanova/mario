class Gift extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 500, 565, "gift");
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
}
