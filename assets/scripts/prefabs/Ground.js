class Ground extends Phaser.GameObjects.Rectangle {
  constructor(scene) {
    super(scene, 0, 634, config.width, 720 - 634);
    this.setOrigin(0);
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.setAllowGravity(false);
  }
}
