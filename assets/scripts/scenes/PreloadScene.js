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
    this.load.atlas(
      "boom",
      "assets/sprites/boom.png",
      "assets/sprites/boom.json"
    );
  }

  create() {
    this.scene.start("Start");
  }
}
