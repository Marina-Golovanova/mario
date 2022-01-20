class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.atlas(
      "player",
      "assets/sprites/player.png",
      "assets/sprites/player.json"
    );
    this.load.image("gift", "assets/sprites/gift.png");
  }

  create() {
    this.scene.start("Start");
  }
}
