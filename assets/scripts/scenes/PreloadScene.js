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
  }

  create() {
    this.scene.start("Start");
  }
}
