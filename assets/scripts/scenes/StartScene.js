class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create() {
    this.createBackground();
    this.createStart();
    this.setEvents();
  }

  createBackground() {
    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  createStart() {
    this.add
      .graphics()
      .fillStyle("#000", 0.5)
      .fillRoundedRect(
        config.width / 2 - 200,
        config.height / 2 - 50,
        400,
        175
      );

    this.add
      .text(config.width / 2, config.height / 2 + 40, "Tap to start", {
        font: "60px Marker Felt",
        fill: "#fff",
      })
      .setOrigin(0.5);
  }

  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
